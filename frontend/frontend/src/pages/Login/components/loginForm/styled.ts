import styled from "styled-components";

export const StyledForm = styled.form`

    display: flex;
    flex-direction: column;
    justify-content: center;

    background-color: #d3d3d3;
    width: 40%;
    min-width: 350px;
    padding: 20px;
    gap: 30px;
    border-radius: 5px;

    
`
export const StyledInput = styled.input`

    border-radius: 15px;
    padding: 5px;
    border: none;
`

export const MainContainer = styled.div`
    height: 98vh;

    display: flex;
    justify-content: center;
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