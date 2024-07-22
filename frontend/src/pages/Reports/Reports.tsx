import { Title } from "./Components/Title/Title";
import { PatternDiv, StyledContainer } from "./Components/Title/style";
import { useEffect, useState } from "react";
import { CardReport } from "./Components/CardReport/CardReport";
import { api } from "../../service/api";
import { useParams } from "react-router-dom";


export const Reports = () => {

    interface reportData {
        id: number,
        userId: userData,
        authorId: userData,
        description: string,
        lessonId: lessonData
    }

    interface userData {
        id: number,
        classId: classData
        edv: number,
        foto: string,
        name: string,
        email: string,
        password: string,
        role: string,
        birthDate: string

    }

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

    interface lessonData {
        id: number,
        subjectClassId: subjectClassData,
        title: string,
        description: string,
        shift: string,
        date: string

    }

    interface subjectClass{
        id: number,
        name: string,
        expectedDuration: number
    }

    interface subjectClassData{
        id: number,
        clasId: classData,
        subjectId: subjectClass,
        duration: number
        
    }


    const [reports, setReports] = useState<reportData[]>([])
    const { userId } = useParams<{ userId: string }>();

    useEffect(() => {
        const getClasses = async () => {
            try {
                const response = await api.get(`report/user/${userId}`)
                setReports(response.data)
                
            } catch (error) {
                console.error(error);
                setReports([])
            }
        }
        getClasses()
    }, [])


    return (
        <>
            <PatternDiv>
                <Title />
                <StyledContainer style={{display: 'flex'}}>
                    {
                        reports.map((reportItem) => (
                            <CardReport key={reportItem.id} id={reportItem.id} authorName={reportItem.authorId.name} description={reportItem.description} lesson={reportItem.lessonId.title} 
                            />
                        ))
                    }
                </StyledContainer>

            </PatternDiv>
        </>
    )
}