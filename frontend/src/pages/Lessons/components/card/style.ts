import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledLink = styled(Link)`
    color: blue;
    text-decoration: none;
    color: #2b2b2b;
    padding: 15px;

`

export const StyledCard = styled.div`

    flex: 0 0 auto;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;

    width: 380px;
    height: 300px;
    background-color: #d7dae0;
    border-radius: 15px; 
    padding: 25px;

    transition: 0.1s;
    &:hover {
        transform: scale(1.05);
    }
`



