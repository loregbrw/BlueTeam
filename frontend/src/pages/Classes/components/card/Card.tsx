import { StyledLink } from "./style";
import { StyledCard } from "./style";


interface CardProps {
    id: number;
    title: string;
    content: string;
    classes: string;
}

export const Card: React.FC<CardProps> = ({ id, title, content, classes}) => {
    return(
        <>  
            <StyledLink to={`/class/${id}`}>
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