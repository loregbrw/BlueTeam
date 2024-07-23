import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../service/api";
import { StyledCard, StyledLink } from "./Style";
import { CenturyView } from "react-calendar";

interface LessonData {
    id: number;
    subjectClassId: SubjectClassData;
    title: string;
    description: string;
    shift: string;
    date: string;
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

export const Lessons = () => {

    const { subjectclassId } = useParams<{ subjectclassId: string }>();

    const [lessons, setLessons] = useState<LessonData[]>([]);

    const convertToBrazilianDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    };

    const roleData: string[] = [
        "Adm",
        "Instructor",
        "Apprentice"
    ]

    useEffect(() => {
        const getLessons = async () => {
            try {
                const response = await api.get(`/lesson/${subjectclassId}`);
                setLessons(response.data);

            } catch (error) {
                console.error(error);
            }
        };

        getLessons();
    }, [subjectclassId]);

    return (
        <>
            <div style={{ width: "100%", display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                {lessons.map((lesson) => (
                    <StyledLink to={""} key={lesson.id}>
                        <StyledCard>
                            <span style={{ fontSize: "1.2rem", fontWeight: "700" }}>{lesson.title}</span>
                            <hr style={{ width: "100%" }} />
                            <span>{lesson.description}</span>
                            <span>{lesson.shift} - {convertToBrazilianDate(lesson.date)}</span>
                        </StyledCard>
                    </StyledLink>

                ))}
            </div>

        </>
    )
}