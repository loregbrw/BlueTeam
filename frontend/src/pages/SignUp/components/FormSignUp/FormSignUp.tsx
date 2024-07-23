import React, { useEffect, useState } from "react"
import { api } from "../../../../service/api"
import { MainContainer, StyledButton, StyledDateInput, StyledDropdown, StyledForm, StyledInput, StyledMiniBox } from "../../../../components/loginForm/styled"
import { toast } from "react-toastify"
import { StyledSelect, StyledSubmitButton } from "../../../Profile/Components/style"

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
        "Adm",
        "Instructor",
        "Apprentice"
    ]

    const [classes, setClasses] = useState<classData[]>([])
    const [classId, setClassId] = useState("")
    const [edv, setedv] = useState("")
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [role, setrole] = useState("")
    const [birthDate, setbirthDate] = useState("")

    useEffect(() => {
        const getClasses = async () => {
            try {
                const response = await api.get(`class`)
                setClasses(response.data)
            } catch (error) {
                console.error(error);
                setClasses([])
            }
        }
        getClasses()
    }, [])


    const FormValues = {
        classId: parseInt(classId),
        edv: parseInt(edv),
        name: name,
        email: email,
        role: role,
        birthDate: birthDate
    }
    console.log(FormValues)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = localStorage.getItem("token")
        try {
            const response = await api.post("user/auth", FormValues, {
                headers: {
                    auth: `${token}`
                }
            });
            toast.success("Usuário criado!")

        } catch (error) {
            console.error("Erro ao criar usuario:", error);
        }
    }

    console.log(classes);


    return (
        <>
            <MainContainer>
                <StyledForm onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <h2>Novo usuário</h2>
                    </div>
                    <StyledMiniBox>
                        <p>Edv</p>
                        <StyledInput required type="text" value={edv} onChange={(e) => setedv(e.target.value)} />
                    </StyledMiniBox>
                    <StyledMiniBox>
                        <p>Nome</p>
                        <StyledInput required type="text" value={name} onChange={(e) => setname(e.target.value)} />
                    </StyledMiniBox>
                    <StyledMiniBox>
                        <p>Turma</p>
                        <StyledSelect required value={classId} onChange={(e) => setClassId(e.target.value)} name="class" id="class">
                            <option disabled value={""}>Selecione uma turma</option>
                            {
                                classes.map((classItem) => (
                                    <option key={classItem.id} value={classItem.id}>{classItem.name}</option>
                                ))
                            }

                        </StyledSelect>
                    </StyledMiniBox>
                    <StyledMiniBox>
                        <p>E-mail</p>
                        <StyledInput required type="email" value={email} onChange={(e) => setemail(e.target.value)} />
                    </StyledMiniBox>
                    <StyledMiniBox>
                        <p>Tipo</p>
                        <StyledSelect required value={role} onChange={(e) => setrole(e.target.value)}>
                            <option disabled value={""}>Selecione um tipo</option>
                            {
                                roleData.map((roleItem) =>
                                    <option key={roleItem} value={roleItem}>{roleItem}</option>
                                )
                            }
                        </StyledSelect>
                    </StyledMiniBox>
                    <StyledMiniBox>
                        <p>Data de nascimento</p>
                        <StyledInput required type="date" value={birthDate} onChange={(e) => setbirthDate(e.target.value)} />
                    </StyledMiniBox>
                    <StyledSubmitButton type="submit">Criar</StyledSubmitButton>
                </StyledForm>
            </MainContainer>

        </>

    )


}