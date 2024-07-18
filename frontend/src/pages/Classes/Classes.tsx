import { Card } from "./components/card/Card";
import { StyledBox } from "./style";
import { AdmBar } from "../../components/AdmBar/AdmBar";
import { StyledInputCourses } from "./style";
import { StyledInputDiv } from "./style";
import lupa from "../../assets/lupa.png"
import { useState } from "react";

interface CardData {
    id: number;
    title: string;
    content: string;
    classes: string;
}

const cardData: CardData[] = [
    { id: 1, title: 'Técnico em desenvolvimento de sistemas', content: 'Um técnico em desenvolvimento de sistemas é um profissional que desenvolve programas de computador, seguindo as especificações da lógica e das linguagens de programação.',classes: "Desenvolvimento de sistemas"},
    { id: 2, title: 'Card 2', content: 'Content 2', classes: "Desenvolvimento de sistemas" },
    { id: 3, title: 'Card 3', content: 'Content 3', classes: "Desenvolvimento de sistemas" },
    { id: 3, title: 'Card 3', content: 'Content 3', classes: "Desenvolvimento de sistemas" },
    // adicione mais cartões conforme necessário
];

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
                    {cardData.map(card => (
                        <Card key={card.id} id={card.id} title={card.title} content={card.content} classes={card.classes} />
                    ))}
                </StyledBox>

            </div>
        </>
    );

}