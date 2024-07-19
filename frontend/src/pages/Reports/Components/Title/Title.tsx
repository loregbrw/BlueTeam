import { StyledHeader } from "./style"
import { StyledAddButton, StyledCloseButton, StyledForm, StyledInput, StyledModalContent, StyledModalOverlay, StyledSubmitButton } from "../../../Profile/Components/style"
import { useEffect, useState } from "react";
import { StyledDropdown } from "../../../Class/style";
import { api } from "../../../../service/api";
import { toast } from "react-toastify";
import { LessonData } from "../../../Home/apiService";

export const Title = () =>{

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userId, setUserId] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [description, setDescription] = useState('')
    const [lessonId, setLessonId] = useState('')
    const [lesson, setLesson] = useState<LessonData[]>([]);
    


    // É necessario implementar um getAll pra lessons no backend
    // userId deve ser pego pelo url
    // author id deve pegar o id do localStorage
    useEffect(() => {
        const getClasses = async () => {
            try {
                const response = await api.get(`lesson`) // esse endopoint ainda não existe
                setCourse(response.data)
            } catch (error) {
                console.error(error);
                setCourse([])
            }
        }
        getClasses()
    }, [isModalOpen])

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const newSubject = {
            userId: userId,
            authorId: authorId,
            description: description,
            lessonId: lessonId
        };

        console.log(token)
        console.log(newSubject)

        try {
            const response = await api.post("class/auth", newSubject, {
                headers: {
                    auth: token
                }
            });
            toast.success("Turma criada com sucesso!")
            console.log(response)

            closeModal();
        } catch (error) {
            toast.error("Erro ao criar turma: " + error);
        }
    };

    return(
        <>
            <StyledHeader>
                <h1>Relatorios</h1>
                <StyledAddButton onClick={openModal}>Relatorio +</StyledAddButton>
                {isModalOpen && (
                <StyledModalOverlay>
                    <StyledModalContent>
                        <StyledCloseButton onClick={closeModal}>X</StyledCloseButton>
                        <h2>Adicionar Novo Curso</h2>
                        <StyledForm onSubmit={handleSubmit}>
                            <StyledInput
                                type="text"
                                placeholder="Nome do usuario"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                required
                            />
                            <StyledInput
                                placeholder="Descrição"
                                value={authorId}
                                onChange={(e) => setAuthorId(e.target.value)}
                                required
                            />
                            <StyledInput
                                placeholder="Duração Planejada"
                                type="date"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                            <StyledDropdown required value={lessonId} onChange={(e) => setLessonId(e.target.value)} name="class" id="class">
                                <option value={""}>Selecione uma turma</option>
                                {
                                    course.map((courseItem) => (
                                        <option key={courseItem.id} value={courseItem.id}>{courseItem.name}</option>
                                    ))
                                }

                            </StyledDropdown>


                            <StyledSubmitButton type="submit">Salvar</StyledSubmitButton>
                        </StyledForm>
                    </StyledModalContent>
                </StyledModalOverlay>
            )}

            </StyledHeader>
        </>
    )

}