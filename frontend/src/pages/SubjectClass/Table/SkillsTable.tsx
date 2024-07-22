import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../../service/api';

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
    skills: UserSkillsData[];
}

interface UserSkillsData {
    id: number;
    userId: number;
    skillsId: number;
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

interface Column {
    id: number;
    label: string;
    minWidth?: number;
    align?: 'right';
}

export const SkillsTable = () => {
    const { subjectclassId } = useParams<{ subjectclassId: string }>();

    const [apprentices, setApprentices] = useState<ApprenticeData[]>([]);
    const [skills, setSkills] = useState<SkillsData[]>([]);
    const [subjectClass, setSubjectClass] = useState<SubjectClassData | null>(null);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const subjectClassResponse = await api.get(`/subjectclass/id/${subjectclassId}`);
                const subjectClassData = subjectClassResponse.data;
                setSubjectClass(subjectClassData);
    
                const skillsResponse = await api.get(`skills/${subjectclassId}`);
                const skillsData = skillsResponse.data;
                setSkills(skillsData);
    
                const apprenticesResponse = await api.get(`/user/class/${subjectClassData.classId.id}`);
                const apprenticesData = apprenticesResponse.data;
                setApprentices(apprenticesData);
    
                const updatedApprentices = apprenticesData.map(async (apprentice: ApprenticeData) => {
                    const response = await api.get(`/userskills/${apprentice.id}`);
                    apprentice.skills = response.data;
                    return apprentice;
                });
    
                // Esperando todas as atualizações terminarem
                const updatedApprenticesWithData = await Promise.all(updatedApprentices);
                setApprentices(updatedApprenticesWithData);
    
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData();
    }, [subjectclassId]);
    

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const columns: Column[] = [
        { id: 0, label: 'Aprendiz', minWidth: 170 },
        ...(skills ? skills.map(skill => ({ id: skill.id, label: skill.name, minWidth: 100 })) : [])
    ];

    return (
        <>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell key="apprenticeName" align="left" style={{ background: "#007BFF" }} >
                                    <span style={{ color: "white", fontWeight: "600", fontSize: "1.15rem" }}>Aprendiz</span>
                                </TableCell>
                                {skills && skills.map((skill) => (
                                    <TableCell
                                        key={skill.id}
                                        align="right"
                                        style={{ minWidth: 100, background: "#007BFF" }}
                                    >
                                        <span style={{ color: "white", fontWeight: "600", fontSize: "1.15rem" }}>{skill.name}</span>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {apprentices
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((apprentice, index) => (
                                    <TableRow hover key={apprentice.id}>
                                        <TableCell style={{ fontWeight: "600" }} align="left">{apprentice.name}</TableCell>

                                        {apprentice.skills && apprentice.skills.map((skill) => (
                                            <TableCell key={skill.id} style={{ fontWeight: "600" }} align="right">
                                                {skill.value}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    style={{ backgroundColor: "#d7dae0" }}
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={apprentices.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    );
};
