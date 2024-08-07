import { useEffect, useState } from "react";
import { StyledBox, StyledMain, StyledInputDiv } from "./style";
import { Dropdown } from "./components/dropdown/Dropdown";
import {
    StyledAddButton,
    StyledCloseButton,
    StyledContainer,
    StyledForm,
    StyledInput,
    StyledModalContent,
    StyledModalOverlay,
    StyledSubmitButton
} from "./components/dropdown/style";
import { api } from "../../service/api";
import { Card } from "./components/card/Card";
import { toast } from "react-toastify";

interface Subject {
    id: number;
    name: string;
    expectedDuration: number;
}

interface classData {
    id: number;
    courseId: courseData;
    name: string;
    duration: number;
    initialDate: string;
}

interface courseData {
    id: number;
    name: string;
    description: string | null;
}

export const Subjects = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [subjectName, setSubjectName] = useState('');
    const [duration, setDuration] = useState('');
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [classes, setClasses] = useState<classData[]>([]);
    const [courses, setCourses] = useState<courseData[]>([]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const getSubjects = async () => {
            try {
                const response = await api.get(`subject`);
                setSubjects(response.data);
            } catch (error) {
                console.error(error);
                setSubjects([]);
            }
        };
        getSubjects();
    }, []);

    useEffect(() => {
        const getClasses = async () => {
            try {
                const response = await api.get(`class`);
                setClasses(response.data);
            } catch (error) {
                console.error(error);
                setClasses([]);
            }
        };
        getClasses();
    }, []);

    useEffect(() => {
        const getCourses = async () => {
            try {
                const response = await api.get(`course`);
                setCourses(response.data);
            } catch (error) {
                console.error(error);
                setCourses([]);
            }
        };
        getCourses();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const newSubject = {
            name: subjectName,
            expectedDuration: parseFloat(duration),
        };

        try {
            const response = await api.post("subject/auth", newSubject, {
                headers: {
                    auth: token
                }
            });
            toast.success("Matéria criada com sucesso!");
            setSubjects([...subjects, response.data]);
            closeModal();
        } catch (error) {
            toast.error("Erro ao criar matéria");
            console.error("Erro ao criar matéria:", error);
        }
    };

    return (
        <>
            <StyledMain>
                <StyledInputDiv>
                    <h1>Matérias</h1>
                    <StyledContainer>
                        <StyledAddButton onClick={openModal}>+ Matéria</StyledAddButton>

                        {isModalOpen && (
                            <StyledModalOverlay>
                                <StyledModalContent>
                                    <StyledCloseButton onClick={closeModal}>X</StyledCloseButton>
                                    <h2>Adicionar Nova Matéria</h2>
                                    <StyledForm onSubmit={handleSubmit}>
                                        <StyledInput
                                            type="text"
                                            placeholder="Nome da Matéria"
                                            value={subjectName}
                                            onChange={(e) => setSubjectName(e.target.value)}
                                            required
                                        />
                                        <StyledInput
                                            placeholder="Duração Planejada"
                                            type="number"
                                            value={duration}
                                            onChange={(e) => setDuration(e.target.value)}
                                            required
                                        />
                                        <StyledSubmitButton type="submit">Salvar</StyledSubmitButton>
                                    </StyledForm>
                                </StyledModalContent>
                            </StyledModalOverlay>
                        )}

                    </StyledContainer>
                </StyledInputDiv>

                <div style={{ display: "flex", justifyContent: "center", overflow: "auto" }}>
                    <StyledBox>
                        {subjects.map(subject => (
                            <Card
                                key={subject.id}
                                title={subject.name}
                                plannedDuration={subject.expectedDuration}
                                subjectId={subject.id} 
                            />
                        ))}
                    </StyledBox>
                </div>
            </StyledMain>
        </>
    );
};
