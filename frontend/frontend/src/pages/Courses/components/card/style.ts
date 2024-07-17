import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledLink = styled(Link)`
    color: blue;
    text-decoration: none;
    color: black;

    padding: 15px;

`;

export const StyledCard = styled.div`

    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;

    width: 350px;
    height: 200px;
    background-color: #d3d3d3;
    border-radius: 15px; 
    padding: 25px;

    transition: 0.3s;
    &:hover {
        transform: scale(1.1);
    }
`



