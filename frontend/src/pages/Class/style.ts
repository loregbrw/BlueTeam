import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledLink = styled(Link)`
    color: blue;
    text-decoration: none;
    color: #2b2b2b;
    padding: 7.5px;

    max-width: 100%;
    width: 350px;
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

    width: 100%;

    gap: 15px;

    background-color: #d7dae0;
    border-radius: 15px; 
    padding: 10px 20px;

    transition: 0.1s;
    &:hover {
        transform: scale(1.05);
        filter: brightness(90%);
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
    width: 35px;
    object-fit: cover;
`

export const StyledCard = styled.div`

    flex: 0 0 auto;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;

    width: 100%;

    height: 200px;
    background-color: #d7dae0;
    border-radius: 15px; 
    padding: 25px;

    transition: 0.1s;
    &:hover {
        transform: scale(1.05);
        filter: brightness(90%);
    }
`

export const StyledBox = styled.div`
    display: inline-flex;
    flex-wrap: wrap;
    width: max-content;
    justify-content: center;
`

export const StyledApprenticeText = styled.p`
    flex: 1;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

export const StyledDiv = styled.div`
    flex: 0 0 auto;
    display: flex;

    flex-direction: column;

    justify-content: start;
    align-items: start;

    max-width: 100%;
    width: 350px;

`

export const StyledDropdown = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
  background-color: #f9f9f9;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const StyledGraphContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 700px;
  width: 100%;
`;