import { StyledLink } from "./style";
import { StyledCard } from "./style";


interface CardProps {
    id: number;
    title: string;
    duration: number;
}

export const Card: React.FC<CardProps> = ({ id, title, duration: duration}) => {
    return(
        <>  
            <StyledLink to ={`/subjectclass/${id}`}>
                <StyledCard>
                    <h3>{title}</h3>
                    <hr  style={{width: "100%"}}/>
                    <p><b>Duração:</b> {duration} horas</p>

                </StyledCard>
            </StyledLink>
        </>
    );  
}