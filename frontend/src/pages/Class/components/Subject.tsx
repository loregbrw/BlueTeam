import { StyledLink } from "../style";
import { StyledCard } from "../style";

interface CardProps {
    title: string;
    content: string;
    classes: string;
}

export const Subject: React.FC<CardProps> = ({ title, content, classes}) => {
    return(
        <>  
            <StyledLink to="">
                <StyledCard>
                    <h3>{title}</h3>
                    <hr  style={{width: "100%"}}/>
                    <p>{content}</p>
                    <p style={{color: "#005691"}}>{classes}</p>

                </StyledCard>
            </StyledLink>
        </>
    );  

}