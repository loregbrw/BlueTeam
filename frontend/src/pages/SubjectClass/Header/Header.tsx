import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../service/api";

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
    const { subjectclassId } = useParams<{ subjectclassId: string }>();

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


    return (
        <>
            <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }} >
                <h1>{subjectClass?.subjectId.name} - {subjectClass?.classId.name}</h1>
                
            </div>
        </>
    )
}