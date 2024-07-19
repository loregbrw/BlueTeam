import { Card } from "./components/card/Card";
import { StyledBox } from "./style";
import { StyledInputDiv } from "./style";
import { useEffect, useState } from "react";
import { api } from "../../service/api";
import { StyledAddButton, StyledCloseButton, StyledForm, StyledInput, StyledModalContent, StyledModalOverlay, StyledSubmitButton } from "../Subjects/components/dropdown/style";
import { StyledDropdown } from "../../components/loginForm/styled";
import { toast } from "react-toastify";

export const Classes = () => {

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



    const [classes, setClasses] = useState<classData[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [subjectName, setSubjectName] = useState('');
    const [duration, setDuration] = useState('');
    const [course, setCourse] = useState<courseData[]>([]);
    const [iniitialDate, setIniitialDate] = useState('');
    const[courseId,setCourseId] = useState('')

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

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
    }, [isModalOpen])

    useEffect(() => {
        const getCourse = async () => {
            try {
                const response = await api.get(`course`)
                setCourse(response.data)
            } catch (error) {
                console.error(error);
                setCourse([])
            }
        }
        getCourse()
    }, [])

    const convertToBrazilianDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const newSubject = {
            name: subjectName,
            duration: parseFloat(duration),
            courseId: parseInt(courseId),
            initialDate: iniitialDate
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
            toast.error("Erro ao criar matéria");
        }


    };

    return (
        <>
            <StyledInputDiv >
                <h1>Turmas</h1>
                <StyledAddButton onClick={openModal}>+ Turma</StyledAddButton>

            </StyledInputDiv>

            {isModalOpen && (
                <StyledModalOverlay>
                    <StyledModalContent>
                        <StyledCloseButton onClick={closeModal}>X</StyledCloseButton>
                        <h2>Adicionar Nova Turma</h2>
                        <StyledForm onSubmit={handleSubmit}>
                            <StyledInput
                                type="text"
                                placeholder="Nome da Turma"
                                value={subjectName}
                                onChange={(e) => setSubjectName(e.target.value)}
                                required
                            />
                            <StyledInput
                                placeholder="Duração Planejada"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                required
                            />
                            <StyledInput
                                placeholder="Duração Planejada"
                                type="date"
                                value={iniitialDate}
                                onChange={(e) => setIniitialDate(e.target.value)}
                                required
                            />
                            <StyledDropdown required value={courseId} onChange={(e) => setCourseId(e.target.value)} name="class" id="class">
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

            <div style={{ display: "flex", justifyContent: "center", overflow: "auto" }}>
                <StyledBox>
                    {
                        classes.map((classItem) => (
                            <Card key={classItem.id} id={classItem.id} title={classItem.name} duration={classItem.duration} classes={classItem.courseId.name}
                                initialDate={
                                    convertToBrazilianDate(classItem.initialDate)} />
                        ))
                    }
                </StyledBox>

            </div>
        </>
    );

}