import { useState } from "react";
import { StyledCardButton } from "./style";
interface CardProps {
    id: number;
    authorName: string;
    description: string;
    lesson: string;
}

export const CardReport: React.FC<CardProps> = ({ id, authorName, description, lesson}) => {

    

    return(
        <>  
                <StyledCardButton>
                    <h3>{authorName}</h3>
                    <hr  style={{width: "100%"}}/>
                    <p> Descrição: {description}</p>
                    <p style={{color: "#005691"}}>Aula: {lesson}</p>
                </StyledCardButton>
            
        </>
    );  

}