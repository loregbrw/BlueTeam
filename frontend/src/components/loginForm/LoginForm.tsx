import { StyledForm } from "./styled"
import { StyledInput } from "./styled"
import { MainContainer } from "./styled";
import { StyledButton } from "./styled";

export const LoginForm = () => {

    return (
        <>
            <MainContainer>

                <StyledForm>


                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <h2 style={{}}>Login</h2>
                    </div>
                    <p>EDV</p>
                    <StyledInput />
                    <p>Senha</p>
                    <StyledInput />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <a href="">Esqueci minha senha</a>
                        <StyledButton>Login</StyledButton>
                    </div>

                </StyledForm>
            </MainContainer>
        </>
    );

}

