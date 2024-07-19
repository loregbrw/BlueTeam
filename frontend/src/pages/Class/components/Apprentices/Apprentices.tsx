import { useEffect, useState } from "react"
import { StyledApprentice } from "../../style"
import { StyledImg } from "../../style"
import { StyledLink } from "../../style"
import { StyledApprentices } from "../../style"
import { StyledApprenticeText } from "../../style"
import { api } from "../../../../service/api"
import { useParams } from "react-router-dom"


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


export const Apprentices = () => {

    const [apprentices, setApprentices] = useState<ApprenticeData[]>([])
    const { classId } = useParams<{ classId: string }>()

    useEffect(() => {

        const getApprentices = async () => {
            try {
                const response = await api.get(`user/class/${classId}`)
                setApprentices(response.data)
            } catch (error) {
                console.error(error)
                setApprentices([])
            }
        }

        getApprentices()
    }, [classId])

    console.log(apprentices)

    return (
        <>
            <StyledApprentices>
                {apprentices.map((apprentice) => (

                    <StyledLink to="" key={apprentice.id} id={apprentice.id.toString()}>
                        <StyledApprentice>
                            <StyledImg src={apprentice.foto}></StyledImg>
                            <StyledApprenticeText>{apprentice.name}</StyledApprenticeText>
                        </StyledApprentice>
                    </StyledLink>

                ))}
            </StyledApprentices>
        </>
    )
}