import { StyledLink } from "./style";
import { StyledCard } from "./style";


interface CardProps {
    title: string;
    plannedDuration: number;
    classes: string;
}

export const Card: React.FC<CardProps> = ({ title, plannedDuration, classes}) => {
    return(
        <>  
            <StyledLink to ="">
                <StyledCard>
                    <h3>{title}</h3>
                    <hr  style={{width: "100%"}}/>
                    <p>{plannedDuration}</p>
                    <p style={{color: "#005691"}}>{classes}</p>

                </StyledCard>
            </StyledLink>
        </>
    );  
}