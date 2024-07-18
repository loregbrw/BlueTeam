import { ReactNode } from 'react'
import { StyledBox } from '../../style';
import { Subject } from '../Subject';


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

export const SubjectClasses = () => {
    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", overflow: "auto",  padding: "20px 0"}}>
                <StyledBox>
                    {cardData.map(card => (
                        <Subject key={card.id} title={card.title} content={card.content} classes={card.classes} />
                    ))}
                </StyledBox>

            </div>
        </>
    )
}
