import styled from "styled-components"

export const StyledCardButton = styled.div`

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
    border: none;

    transition: 0.1s;
    &:hover {
        transform: scale(1.05);
    }
`
