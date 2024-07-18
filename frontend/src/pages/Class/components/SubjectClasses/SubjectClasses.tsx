import { ReactNode, useEffect, useState } from 'react'
import { StyledBox } from '../../style';
import { Subject } from '../Subject';
import { api } from '../../../../service/api';

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
    duration: number;
    initialDate: string;
}

interface CourseData {
    id: number;
    name: string;
    description: string;
}

export const SubjectClasses = () => {

    const [subjectClasses, setSubjectClasses] = useState<SubjectClassData[]>([])

    useEffect(() => {

        const getSubjectClasses = async () => {
            try {
                const response = await api.get(`subjectclass/1`)
                setSubjectClasses(response.data)
            } catch (error) {
                console.error(error)
                setSubjectClasses([])
            }
        }

        getSubjectClasses()
    }, [])


    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", overflow: "auto",  padding: "20px 0"}}>
                <StyledBox>
                    {subjectClasses.map(subject => (
                        <Subject key={subject.id} title={subject.subjectId.name} plannedDuration={subject.duration} />
                    ))}
                </StyledBox>

            </div>
        </>
    )
}
