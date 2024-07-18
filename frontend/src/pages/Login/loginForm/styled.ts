import styled from "styled-components";

export const StyledForm = styled.form`

    display: flex;
    flex-direction: column;
    justify-content: center;

    background-color: #d7dae0;
    width: 30%;
    min-width: 350px;
    padding: 30px;
    gap: 30px;
    border-radius: 10px;

    
`
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
    padding: 15px;

    background-color:  #005691;
    color: white;
    
    border-radius: 15px;
    font-weight: 600;
    border: 1px #023E7D solid;
    width: 30%
    
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