import { StyledLink } from "./style";
import { StyledCard } from "./style";


interface CardProps {
    name: string;
    strenght: string;
}

export const Card: React.FC<CardProps> = ({ name, strenght}) => {
    return(
        <>  
            <StyledLink to ="">
                <StyledCard>
                    <h3>{name}</h3>
                    <hr  style={{width: "100%"}}/>
                    <p><b>Nível da habilidade:</b> {strenght}</p>

                </StyledCard>
            </StyledLink>
        </>
    );  
}