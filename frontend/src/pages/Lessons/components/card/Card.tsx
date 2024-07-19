import { StyledLink } from "./style";
import { StyledCard } from "./style";


interface CardProps {
    title: string;
    duration: number;
    subjectClass: string;
    description: string;
    shift: string;
}

export const Card: React.FC<CardProps> = ({ title, duration, subjectClass, description, shift }) => {
    return(
        <>  
            <StyledLink>
                <StyledCard>
                    <h3>{title}</h3>
                    <hr  style={{width: "100%"}}/>
                    <p>{duration}</p>
                    <p style={{color: "#005691"}}>{subjectClass}</p>
                    <p style={{color: "#005691"}}>{description}</p>
                    <p style={{color: "#005691"}}>{shift}</p>
                </StyledCard>
            </StyledLink>
        </>
    );  
}