import { useEffect, useState } from "react"
import { StyledDropdown, StyledForm } from "../../../../components/loginForm/styled"
import { StyledInput } from "../../../../components/loginForm/styled"
import { MainContainer } from "../../../../components/loginForm/styled"
import { StyledDateInput } from "../../../../components/loginForm/styled"
import { StyledButton } from "../../../../components/loginForm/styled"
import { StyledMiniBox } from "../../../../components/loginForm/styled"
import { api } from "../../../../service/api"

export const FormSignUp = () => {
    const [classes, setClasses] = useState<string[]>([])

    useEffect(() => {
        const getClasses = async () =>{
            try{
                const response = await api.get(`classes`)
                setClasses(response.data)
            } catch(error){
                setClasses([])
            }
        }
        getClasses()
    },[classes])

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
                        <StyledDropdown name="class" id="class">
                        {
                            classes.length > 0 
                            ? classes.map((classItem, index) => (
                                <option key={index} value={classItem.id}>{classItem.name}</option>
                            ))
                            : <option value="">Problema Interno</option>
                        } 
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