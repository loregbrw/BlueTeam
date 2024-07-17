import { StyledForm } from "./styled"
import { StyledInput } from "./styled"
import { MainContainer } from "./styled";
import { StyledButton } from "./styled";
import BoschLogo from "../../../../assets/BoschLogo.png"

export const LoginForm = () => {

    return (
        <>
            <div style={{position:"fixed", padding: "15px" }}>
                <img src={BoschLogo} alt="" style={{ width: "150px" }} />
            </div>
            <MainContainer>

                <StyledForm>


                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <h2>Login</h2>
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

