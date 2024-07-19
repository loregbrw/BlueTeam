import { useState } from "react";
import { api } from "../../../service/api";
import { MainContainer, StyledButton, StyledForm, StyledInput } from "../style"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const FormPassword = () => {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const formValue = {
            password: password,
        }

        if (password != confirmPassword) {
            alert("As senhas precisam ser iguais!");
            return;
        }

        try {

            const response = await api.put(`/user/update/${localStorage.getItem("id")}`, formValue);

            console.log("senha:")
            console.log(password)

            if (response.data) {
                toast.success("Senha alterada com sucesso!");
                navigate('/subjects')

            } else {
                console.error("Token não encontrado na resposta.");
            }
        } catch (error) {
            toast.error("Erro ao trocar a senha");
        }
    };


    return (
        <>
            <MainContainer>
                <StyledForm onSubmit={handleLogin}>
                    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: "column", alignItems: "center" }}>
                        <h2>Trocar senha</h2>
                        <span>Para o primeiro login, é necessário troca a sua senha.</span>
                    </div>
                    <p>Senha</p>
                    <StyledInput
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <p>Confirmação da senha</p>
                    <StyledInput
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                        <StyledButton type="submit">Trocar senha</StyledButton>
                    </div>
                </StyledForm>
            </MainContainer>
        </>
    )
}