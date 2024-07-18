import { StyledDropdown, StyledForm } from "../../../../components/loginForm/styled"
import { StyledInput } from "../../../../components/loginForm/styled"
import { MainContainer } from "../../../../components/loginForm/styled"

export const FormSignUp = () => {
    return (
        <>
            <MainContainer>
                <StyledForm>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <h2 style={{}}>Novo usuario</h2>
                    </div>
                    <p>Edv</p>
                    <StyledInput />
                    <p>Turma</p>
                    <StyledDropdown>
                        
                    </StyledDropdown>
                    <p>Emai</p>
                    <StyledInput />
                </StyledForm>
            </MainContainer>

        </>

    )


}