import styled from "styled-components";

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
  padding: 30px;
  width: 40%;
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

export const StyledInput = styled.input`

    padding:2px;
    border: none;
    background-color: #d7dae0;
    border-bottom: solid 1px;
    outline: none;
    width: 100%;

`

export const MainContainer = styled.div`
    min-height: 100vh;
    height: fit-content;

    display: flex;
    justify-content: center;
    background-color: #ffffff;

    padding: 90px 3% 3% 3%;

    align-items: center;
`

export const StyledButton = styled.button`
  background-color: #007BFF;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  width: 150px;
  &:hover {
    background-color: #0056b3;
  }
`

export const StyledDropdown = styled.select`

    padding:5px;
    border: none;
    background-color: #d7dae0;
    border-bottom: solid 1px;
    outline: none;

`

export const StyledDateInput = styled.input.attrs({ type: 'date' })`

width: 100%;
  padding: 8px;
  background-color: #d7dae0;
  font-size: 16px;
  color: #333;
  border: none;
  border-bottom: 1px solid;


  &:focus {
    border-color: #007BFF;
    outline: none;
    background-color: #d7dae0;
  }
`

export const StyledMiniBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`