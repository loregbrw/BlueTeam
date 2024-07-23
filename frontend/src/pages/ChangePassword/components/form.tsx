import React, { useState } from "react";
import { api } from "../../../service/api";
import { MainContainer, ProgressBar, StyledForm } from "../style";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { StyledInput } from "../../Profile/Components/style";
import { StyledButton } from "../../../components/loginForm/styled";

export const FormPassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [strength, setStrength] = useState(1);
  const navigate = useNavigate();

  const evaluatePasswordStrength = (password: string) => {
    let strengthValue = 1;

    if (/[A-Z]+/.test(password)) strengthValue++;
    if (/[a-z]+/.test(password)) strengthValue++;
    if (/\d+/.test(password)) strengthValue++;
    if (password.length >= 8) strengthValue++;

    setStrength(strengthValue);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    evaluatePasswordStrength(newPassword);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const formValue = {
      password: password,
    };

    if (password !== confirmPassword) {
      alert("As senhas precisam ser iguais!");
      return;
    }

    try {
      const response = await api.put(
        `/user/update/${localStorage.getItem("id")}`,
        formValue
      );

      console.log("senha:");
      console.log(password);

      if (response.data) {
        toast.success("Senha alterada com sucesso!");
        navigate("/subjects");
      } else {
        console.error("Token não encontrado na resposta.");
      }
    } catch (error) {
      toast.error("Erro ao trocar a senha");
    }
  };

  let backgroundClass;
  let fillValue;

  switch (strength) {
    case 1:
      backgroundClass = "bg-danger";
      fillValue = 20;
      break;
    case 2:
      backgroundClass = "bg-warning";
      fillValue = 40;
      break;
    case 3:
      backgroundClass = "bg-secondary";
      fillValue = 60;
      break;
    case 4:
      backgroundClass = "bg-info";
      fillValue = 80;
      break;
    case 5:
      backgroundClass = "bg-success";
      fillValue = 100;
      break;
    default:
      backgroundClass = "bg-danger";
      fillValue = 20;
      break;
  }

  return (
    <MainContainer>
      <StyledForm onSubmit={handleLogin}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2>Trocar senha</h2>
          <span>Para o primeiro login, é necessário trocar a sua senha.</span>
        </div>
        <p>Senha</p>
        <StyledInput
          type="password"
          value={password}
          onChange={handleChangePassword}
          required
        />
        <p>Confirmação da senha</p>
        <StyledInput
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <div className="progress" style={{ height: "20px", width: "100%", marginBottom: "10px" }}>
          <ProgressBar
            id="password-strength"
            className={`progress-bar ${backgroundClass}`}
            style={{ width: `${fillValue}%` }}
            aria-valuenow={fillValue}
            aria-valuemin="0"
            aria-valuemax="100"
            fillValue={fillValue}
            backgroundClass={backgroundClass}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <StyledButton type="submit">Trocar senha</StyledButton>
        </div>
      </StyledForm>
    </MainContainer>
  );
};
