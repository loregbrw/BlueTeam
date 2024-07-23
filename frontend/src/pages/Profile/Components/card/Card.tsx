import { StyledLink } from "./style";
import { StyledCard } from "./style";


interface CardProps {
    id: number
    name: string;
    strenght: string;
    onClick?: (id: number
) => void;
}

export const Card: React.FC<CardProps> = ({ id, name, strenght, onClick}) => {
    const handleClick = () => {
        if (onClick) {
            onClick(id);
        }
    }
    return(
        <>  
            <StyledLink to ="" onClick={handleClick}>
                <StyledCard>
                    <h3>{name}</h3>
                    <hr  style={{width: "100%"}}/>
                    <p><b>Nível da habilidade:</b> {strenght}</p>

                </StyledCard>
            </StyledLink>
        </>
    );  
}