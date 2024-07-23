import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { api } from '../../../service/api';
import { StyledApprenticeButton, StyledCloseButton, StyledForm, StyledInput, StyledModalContent, StyledModalOverlay, StyledSkillButton, StyledSubmitButton } from '../Style';
import { toast } from 'react-toastify';

interface ApprenticeData {
    id: number;
    classId: ClassData;
    edv: number;
    foto: string;
    name: string;
    email: string;
    password: string;
    role: string;
    birthDate: string;
}

interface UserSkillsData {
    id: number;
    userId: ApprenticeData;
    skillsId: SkillsData;
    value: number;
}

interface SkillsData {
    id: number;
    subjectClassId: SubjectClassData;
    name: string;
    description: string;
    weight: number;
}

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

export const SkillsTable = () => {
    const { subjectclassId } = useParams<{ subjectclassId: string }>();

    const [apprentices, setApprentices] = useState<ApprenticeData[]>([]);
    const [skills, setSkills] = useState<SkillsData[]>([]);
    const [userSkills, setUserSkills] = useState<UserSkillsData[]>([]);
    const [subjectClass, setSubjectClass] = useState<SubjectClassData | null>(null);

    const [value, setValue] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentApprentice, setCurrentApprentice] = useState<ApprenticeData | null>(null);
    const [currentSkill, setCurrentSkill] = useState<SkillsData | null>(null);

    const openModal = (apprentice: ApprenticeData, skill: SkillsData, skillValue: string) => {
        setCurrentApprentice(apprentice);
        setCurrentSkill(skill);
        setValue(skillValue);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const subjectClassResponse = await api.get(`/subjectclass/id/${subjectclassId}`);
                const subjectClassData = subjectClassResponse.data;
                setSubjectClass(subjectClassData);

                const skillsResponse = await api.get(`/skills/${subjectclassId}`);
                const skillsData = skillsResponse.data;
                setSkills(skillsData);

                const apprenticesResponse = await api.get(`/user/class/${subjectClassData.classId.id}`);
                const apprenticesData = apprenticesResponse.data;
                setApprentices(apprenticesData);

                const userSkillsResponse = await api.get(`/userskills/`);
                const userSkillsData = userSkillsResponse.data;
                setUserSkills(userSkillsData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [subjectclassId, isModalOpen]);

    const renderSkillValue = (apprenticeId: number, skillId: number) => {
        const skill = userSkills.find(us => us.userId.id === apprenticeId && us.skillsId.id === skillId);
        return skill ? skill.value : 'x';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!currentApprentice || !currentSkill) return;

        const existingUserSkill = userSkills.find(us => us.userId.id === currentApprentice.id && us.skillsId.id === currentSkill.id);
        const token = localStorage.getItem("token")

        try {
            if (existingUserSkill) {
                await api.put(`/userskills/auth/${existingUserSkill.id}/${value}`, [], {
                    headers: {
                        auth: token
                    }
                });

                toast.success("Competência atualizada!");
                setUserSkills(prev =>
                    prev.map(us =>
                        us.id === existingUserSkill.id
                            ? { ...us, value: Number(value) }
                            : us
                    )
                );
            } else {

                const newUserSkill = {
                    userId: currentApprentice.id,
                    skillsId: currentSkill.id,
                    value: value
                };

                const response = await api.post(`/userskills/auth`, newUserSkill, {
                    headers: {
                        auth: token
                    }
                });
                toast.success("Competência atualizada!");
                setUserSkills(prev => [...prev, response.data]);
            }
            closeModal();
        } catch (error) {
            toast.error('Erro ao salvar a competência!');
            console.error(error);
            console.error(`/userskills/auth/${existingUserSkill?.id}/${value}`);
        }
    };

    return (
        <TableContainer component={Paper} style={{ overflowX: "scroll" }}>
            <Table>
                <TableHead>
                    <TableRow style={{ backgroundColor: "#d7dae0" }}>
                        <TableCell style={{ fontSize: "1rem", fontWeight: "700", cursor: "default" }}>Nome</TableCell>
                        {skills.map(skill => (
                            <TableCell align='right' style={{ fontSize: "1rem", fontWeight: "700", cursor: "default" }} key={skill.id}>{skill.name}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {apprentices.map(apprentice => (
                        <TableRow key={apprentice.id}>
                            <TableCell style={{ cursor: "default", minWidth: "350px" }}><StyledApprenticeButton to={`/profile/${apprentice.id}`} >{apprentice.name}</StyledApprenticeButton></TableCell>
                            {skills.map(skill => (
                                <TableCell align='right' key={skill.id} style={{ minWidth: "150px"}} >
                                    <StyledSkillButton onClick={() => openModal(apprentice, skill, renderSkillValue(apprentice.id, skill.id).toString())}>
                                        {renderSkillValue(apprentice.id, skill.id)}
                                    </StyledSkillButton>
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {isModalOpen && (
                <StyledModalOverlay>
                    <StyledModalContent>
                        <StyledCloseButton onClick={closeModal}>X</StyledCloseButton>
                        <h2>Editar competência de {currentApprentice?.name} - {currentSkill?.name}</h2>
                        <StyledForm onSubmit={handleSubmit}>
                            <StyledInput
                                placeholder="Digite um valor"
                                type="number"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                required
                            />
                            <StyledSubmitButton type="submit">Salvar</StyledSubmitButton>
                        </StyledForm>
                    </StyledModalContent>
                </StyledModalOverlay>
            )}
        </TableContainer>
    );
};
