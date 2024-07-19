import { StyledLink } from "./style";
import { StyledCard } from "./style";


interface CardProps {
    id: number;
    title: string;
    duration: number;
    classes: string;
    initialDate: string;
}

export const Card: React.FC<CardProps> = ({ id, title, duration, classes, initialDate}) => {
    return(
        <>  
            <StyledLink to={`/class/${id}`}>
                <StyledCard>
                    <h3>{title}</h3>
                    <hr  style={{width: "100%"}}/>
                    <p> Duração: {duration} horas</p>
                    <p style={{color: "#005691"}}>Curso: {classes}</p>
                    <p>Data de inicio: {initialDate}</p>
                </StyledCard>
            </StyledLink>
        </>
    );  

}