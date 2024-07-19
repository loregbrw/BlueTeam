import { useState } from "react";
import { MainContainer, StyledForm, StyledInput, StyledButton } from "./styled";
import { api } from "../../../../service/api";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const [edv, setEdv] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const formValue = {
      edv: parseFloat(edv),
      password: password
    }

    try {
      const response = await api.post("auth", formValue);

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("id", response.data.id);
        console.log("Login bem-sucedido. Token salvo no localStorage.");

        console.log(edv)
        console.log(password)

        if (edv == password) {
          navigate('/password')
          return;
        }

        navigate('/home')
      } else {
        console.error("Token não encontrado na resposta.");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <MainContainer>
      <StyledForm onSubmit={handleLogin}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h2>Login</h2>
        </div>
        <p>EDV</p>
        <StyledInput
          type="text"
          value={edv}
          onChange={(e) => setEdv(e.target.value)}
          required
        />
        <p>Senha</p>
        <StyledInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <a href="">Esqueci minha senha</a>
          <StyledButton type="submit">Login</StyledButton>
        </div>
      </StyledForm>
    </MainContainer>
  );
};
