import { StyledDropdown, StyledForm } from "../../../../components/loginForm/styled"
import { StyledInput } from "../../../../components/loginForm/styled"
import { MainContainer } from "../../../../components/loginForm/styled"
import { StyledDateInput } from "../../../../components/loginForm/styled"
import { StyledButton } from "../../../../components/loginForm/styled"
import { StyledMiniBox } from "../../../../components/loginForm/styled"

export const FormSignUp = () => {
    return (
        <>
            <MainContainer>
                <StyledForm>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <h2 style={{}}>Novo usuario</h2>
                    </div>
                    <StyledMiniBox>
                        <p>Edv</p>
                        <StyledInput />
                    </StyledMiniBox>
                    <StyledMiniBox>
                        <p>Nome</p>
                        <StyledInput />
                    </StyledMiniBox>

                    <StyledMiniBox>
                        <p>Turma</p>
                        <StyledDropdown name="">
                            <option value="opcao1">Opção 1</option>
                            <option value="opcao2">Opção 2</option>
                            <option value="opcao3">Opção 3</option>
                        </StyledDropdown>
                    </StyledMiniBox>

                    <StyledMiniBox>
                        <p>Emai</p>
                        <StyledInput />
                    </StyledMiniBox>

                    <StyledMiniBox>
                        <p>Role</p>
                        <StyledDropdown name="">
                            <option value="opcao1">Opção 1</option>
                            <option value="opcao2">Opção 2</option>
                            <option value="opcao3">Opção 3</option>
                        </StyledDropdown>
                    </StyledMiniBox>

                    <StyledMiniBox>
                        <p>Data de nascimento</p>
                        <StyledDateInput />
                    </StyledMiniBox>
                    
                    <StyledButton>Criar</StyledButton>

                </StyledForm>
            </MainContainer>

        </>

    )


}