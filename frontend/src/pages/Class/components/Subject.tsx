import { StyledLink } from "../style";
import { StyledCard } from "../style";

interface CardProps {
    title: string;
    plannedDuration: number;
}

export const Subject: React.FC<CardProps> = ({ title, plannedDuration}) => {
    return(
        <>  
            <StyledLink to="">
                <StyledCard>
                    <h3>{title}</h3>
                    <hr  style={{width: "100%"}}/>
                    <p>{plannedDuration} horas</p>

                </StyledCard>
            </StyledLink>
        </>
    );  

}