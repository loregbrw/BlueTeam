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

    padding:5px;
    border: none;
    background-color: #d7dae0;
    border-bottom: solid 1px;
    outline: none;
`

export const MainContainer = styled.div`
    height: 98vh;

    display: flex;
    justify-content: center;
    background-color: #ffffff;

    align-items: center;
`

export const StyledButton = styled.button`
    padding: 15px;

    background-color:  #005691;
    color: white;
    cursor: pointer;
    border-radius: 15px;
    font-weight: 600;
    border: 1px #023E7D solid;
    width: 30%
    
`