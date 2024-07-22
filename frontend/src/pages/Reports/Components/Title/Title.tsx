import { StyledHeader } from "./style"
import { StyledAddButton, StyledCloseButton, StyledForm, StyledInput, StyledModalContent, StyledModalOverlay, StyledSubmitButton } from "../../../Profile/Components/style"
import { useEffect, useState } from "react";
import { StyledDropdown } from "../../../Class/style";
import { api } from "../../../../service/api";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";


export const Title = () => {

    interface reportData {
        id: number,
        userId: userData,
        authorId: userData,
        description: string,
        lessonId: lessonData
    }

    interface userData {
        id: number,
        classId: classData
        edv: number,
        foto: string,
        name: string,
        email: string,
        password: string,
        role: string,
        birthDate: string

    }

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

    interface lessonData {
        id: number,
        subjectClassId: number,
        title: string,
        description: string,
        shift: string,
        date: string

    }

    interface subjectClass{
        id: number,
        name: string,
        expectedDuration: number
    }

    interface subjectClassData{
        id: number,
        clasId: classData,
        subjectId: subjectClass,
        duration: number
        
    }

    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const [description, setDescription] = useState('')
    // const [lessonId, setLessonId] = useState('')
    // const [user, setUser] = useState<userData>()
    // const [subjectClasses, setSubjectClasses] = useState<subjectClassData[]>([])
    // const { userId } = useParams<{ userId: string }>();
    // const authorId = localStorage.getItem("id")


    // useEffect(() => {
    //     const getUsers = async () => {
    //         try {
    //             const response = await api.get(`user/id/${userId}`)
    //             setUser(response.data)
    //             console.log(user)
    //         } catch (error) {
    //             console.error(error);
    //             console.log("banana")
    //         }
    //     }
    //     getUsers()
    // }, [isModalOpen])

    // useEffect(() => {
    //     const getSubjectClass = async () => {
    //         try {
    //             const response = await api.get(`subjectclass/${user?.classId.id}`)
    //             setSubjectClasses(response.data)
    //             console.log(subjectClasses)
    //         } catch (error) {
    //             console.error(error);
    //             setSubjectClasses([])
    //             console.log(error)
    //         }
    //     }
    //     getSubjectClass()
    // }, [isModalOpen])

    // const openModal = () => {
    //     setIsModalOpen(true);
    // };

    // const closeModal = () => {
    //     setIsModalOpen(false);
    // };

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();

    //     const token = localStorage.getItem("token");

    //     const newSubject = {
    //         userId: userId,
    //         authorId: authorId,
    //         description: description,
    //         lessonId: lessonId
    //     };

    //     console.log(token)
    //     console.log(newSubject)

    //     try {
    //         const response = await api.post("report/auth", newSubject, {
    //             headers: {
    //                 auth: token
    //             }
    //         });
    //         toast.success("Relatorio criado com sucesso!")
    //         console.log(response)

    //         closeModal();
    //     } catch (error) {
    //         toast.error("Erro ao criar relatorio: " + error);
    //     }
    // };

    return (
        <>
            {/* <StyledHeader>
                <h1>Relatorios {user?.name}</h1>
                <StyledAddButton onClick={openModal}>Relatorio +</StyledAddButton>
                {isModalOpen && (
                    <StyledModalOverlay>
                        <StyledModalContent>
                            <StyledCloseButton onClick={closeModal}>X</StyledCloseButton>
                            <h2>Adicionar Novo Relatorio</h2>
                            <StyledForm onSubmit={handleSubmit}>

                                <StyledInput
                                    placeholder="Descrição"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                                <StyledDropdown required value={lessonId} onChange={(e) => setLessonId(e.target.value)} name="class" id="class">
                                    <option value={""}>Selecione uma aula</option>
                                    {
                                        subjectClasses.map((subjectClasses) => (
                                            <option key={subjectClasses.id} value={subjectClasses.id}>{subjectClasses.subjectId.name}</option>
                                        ))
                                    }

                                </StyledDropdown>


                                <StyledSubmitButton type="submit">Salvar</StyledSubmitButton>
                            </StyledForm>
                        </StyledModalContent>
                    </StyledModalOverlay>
                )}

            </StyledHeader> */}
        </>
    )

}