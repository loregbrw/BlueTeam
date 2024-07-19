import { useState } from "react";
import axios from "axios";
import { MainContainer, StyledForm, StyledInput, StyledButton } from "./styled";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import { api } from "../../../../service/api";

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
        console.log("Login bem-sucedido. Token salvo no localStorage.");
        navigate('/subjects')
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