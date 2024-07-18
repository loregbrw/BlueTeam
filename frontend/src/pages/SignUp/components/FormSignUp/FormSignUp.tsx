import { useEffect, useState } from "react"
import { StyledDropdown, StyledForm } from "../../../Login/loginForm/styled"
import { StyledInput } from "../../../Login/loginForm/styled"
import { MainContainer } from "../../../Login/loginForm/styled"
import { StyledDateInput } from "../../../Login/loginForm/styled"
import { StyledButton } from "../../../Login/loginForm/styled"
import { StyledMiniBox } from "../../../Login/loginForm/styled"
import { api } from "../../../../service/api"

export const FormSignUp = () => {

    interface classData {
        id: number,
        courseId: courseData,
        name: string,
        duration: number,
        initialDate: string
    }

    interface courseData {
        id: number,
        name: string,
        description: string | null
    }

    const roleData: string[] = [
        "Server",
        "Adm",
        "Instructor",
        "Apprentice"
    ]
       
    const [classes, setClasses] = useState<classData[]>([])

    useEffect(() => {
        const getClasses = async () =>{
            try{
                const response = await api.get(`class`)
                setClasses(response.data)
            } catch(error){
                console.error(error);
                setClasses([])
            }
        }
        getClasses()
    },[])




    console.log(classes);
    

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
                            classes.map((classItem, index) => (
                                <option key={index} value={classItem.id}>{classItem.name}</option>
                            ))
                        } 
                        </StyledDropdown>
                    </StyledMiniBox>

                    <StyledMiniBox>
                        <p>E-mail</p>
                        <StyledInput />
                    </StyledMiniBox>

                    <StyledMiniBox>
                        <p>Tipo</p>
                        <StyledDropdown name="">
                            {
                                roleData.map((i) =>
                                    <option value={i}>{i}</option>  
                            )}
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