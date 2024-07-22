import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../service/api";
import { StyledAddButton, StyledCloseButton, StyledForm, StyledInput, StyledModalContent, StyledModalOverlay, StyledSubmitButton, StyledTextArea } from "../Style";
import { toast } from "react-toastify";

interface SubjectClassData {
    id: number;
    classId: ClassData;
    subjectId: SubjectData;
    duration: number;
}

interface SubjectData {
    id: number;
    name: string;
    expectedDuration: number;
}

interface ClassData {
    id: number;
    courseId: CourseData;
    name: string;
    duration: number;
    initialDate: string;
}

interface CourseData {
    id: number;
    name: string;
    description: string;
}


export const Header = () => {

    const [subjectClass, setSubjectClass] = useState<SubjectClassData | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { subjectclassId } = useParams<{ subjectclassId: string }>();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [weight, setWeight] = useState('');

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const getSubjectClass = async () => {
            try {
                const response = await api.get(`/subjectclass/id/${subjectclassId}`);
                setSubjectClass(response.data);
            } catch (error) {
                console.error(error)
                setSubjectClass(null)
            }
        };

        getSubjectClass();
    }, [subjectclassId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const newSkill = {
            subjectClassId: subjectclassId,
            name: name,
            description: description,
            weight: weight,
        };

        try {
            const response = await api.post('/skills/auth', newSkill, {
                headers: {
                    auth: token
                }
            });
            toast.success("Competência criada!")
            console.log(response)
            closeModal();
        } catch (error) {
            toast.error('Erro em adicionar competência!');
        }
    };

    return (
        <>
            <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }} >
                <h1>{subjectClass?.subjectId.name} - {subjectClass?.classId.name}</h1>
                <StyledAddButton onClick={openModal}>+ Competência</StyledAddButton>

                {isModalOpen && (
                    <StyledModalOverlay>
                        <StyledModalContent>
                            <StyledCloseButton onClick={closeModal}>X</StyledCloseButton>
                            <h2>Adicionar Nova Competência</h2>
                            <StyledForm onSubmit={handleSubmit}>
                                <StyledInput
                                    placeholder="Nome da competência"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    maxLength={255}
                                    required
                                />
                                <StyledTextArea
                                    placeholder="Descrição da competência"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    maxLength={255}
                                    required
                                />
                                <StyledInput
                                    placeholder="Peso da competência até cem"
                                    type="number"
                                    value={weight}
                                    min={0}
                                    max={100}
                                    onChange={(e) => setWeight(e.target.value)}
                                    maxLength={255}
                                    required
                                />
                                <StyledSubmitButton type="submit">Salvar</StyledSubmitButton>
                            </StyledForm>
                        </StyledModalContent>
                    </StyledModalOverlay>
                )}
            </div>
        </>
    )
}