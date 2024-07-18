import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledLink = styled(Link)`
    color: blue;
    text-decoration: none;
    color: #2b2b2b;
    padding: 7.5px;
`
export const StyledApprentices = styled.div`
    display: flex;
    flex-wrap: wrap;

    justify-content: center;

    padding: 20px 0;

    width: 100%;
`

export const StyledApprentice = styled.div`
    flex: 0 0 auto;
    display: flex;

    justify-content: start;
    align-items: center;

    max-width: 400px;
    width: 100%;
    gap: 15px;

    background-color: #d7dae0;
    border-radius: 15px; 
    padding: 10px 20px;

    transition: 0.1s;
    &:hover {
        transform: scale(1.05);
    }
`
export const StyledMain = styled.main`
    padding: 90px 3% 3% 3%;
    width: 100%;

    min-height: 100vh;
    height: fit-content;

`

export const StyledImg = styled.img`
    border-radius: 90px;
    height: 35px;
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

export const StyledBox = styled.div`
    display: inline-flex;
    flex-wrap: wrap;
    width: max-content;
    justify-content: center;
`