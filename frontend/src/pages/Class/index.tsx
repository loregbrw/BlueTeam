import { Apprentices } from "./components/Apprentices/Apprentices"
import { SubjectClasses } from "./components/SubjectClasses/SubjectClasses"
import { StyledDiv, StyledMain } from "./style"
import { StyledButton } from "./components/SubjectClasses/style"
import { useParams } from "react-router-dom"
import { api } from "../../service/api"
import { useEffect, useState } from "react"

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

export const Class = () => {

    const { classId } = useParams<{ classId: string }>();
    const [classData, setClassData] = useState<ClassData | null>(null);

    useEffect(() => {
        const getClassData = async () => {
            try {
                const response = await api.get(`/class/id/${classId}`);
                console.log("response")
                console.log(response.data)
                setClassData(response.data);
            } catch (error) {
                console.error(error)
                setClassData(null)
            }
        };

        getClassData();
    }, [classId]);

    return (
        <>
            <StyledMain>
                <h1>{classData?.name} - Aprendizes</h1>
                <div style={{width: "100%", display: "flex", justifyContent: "space-between", flexWrap: "wrap", marginTop: "25px"}}>
                    <StyledDiv>
                        <span>Curso: {classData?.courseId.name}</span>
                        <span>Duração: {classData?.duration} horas</span>
                    </StyledDiv>
                    <StyledDiv>
                        <span>Data de início: {classData?.initialDate}</span>
                    </StyledDiv>
                </div>
                <Apprentices />
                <hr style={{ margin: "25px 0" }} />
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <h1>Matérias</h1>
                    <StyledButton>+ Matéria</StyledButton>
                </div>
                <SubjectClasses />
            </StyledMain>
        </>
    )
}