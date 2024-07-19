import { Card } from "./components/card/Card";
import { StyledBox } from "./style";
import { StyledInputCourses } from "./style";
import { StyledInputDiv } from "./style";
import lupa from "../../assets/lupa.png"
import { useEffect, useState } from "react";
import { api } from "../../service/api";

export const Classes = () => {

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

    const [classes, setClasses] = useState<classData[]>([])

    useEffect(() => {
        const getClasses = async () => {
            try {
                const response = await api.get(`class`)
                setClasses(response.data)
            } catch (error) {
                console.error(error);
                setClasses([])
            }
        }
        getClasses()
    }, [])

    const convertToBrazilianDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
      };

    return (
        <>
            <StyledInputDiv >
                <h1>Turmas</h1>
                <div>
                    <StyledInputCourses />
                    <img src={lupa} alt="" style={{ width: "30px", height: "30px" }} />
                </div>

            </StyledInputDiv>

            <div style={{ display: "flex", justifyContent: "center", overflow: "auto" }}>
                <StyledBox>
                    {
                        classes.map((classItem) => (
                            <Card key={classItem.id} id={classItem.id} title={classItem.name} duration={classItem.duration} classes={classItem.courseId.name}
                                initialDate={
                                    convertToBrazilianDate(classItem.initialDate)} />
                        ))
                    }
                </StyledBox>

            </div>
        </>
    );

}