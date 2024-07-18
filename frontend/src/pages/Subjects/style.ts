import styled from 'styled-components';

export const StyledBox = styled.div`
    display: inline-flex;
    flex-wrap: wrap;
    width: max-content;
    padding: 50px;
    justify-content: center;
`

export const StyledInputDiv = styled.div`
    display: flex; 
    justify-content: space-between;
    align-items: center;
    gap: 25px;
    width: 100%;
`

export const StyledInputCourses = styled.input`

    padding: 8px;
    background-color: white;
    width: 80%;
    border: none;
    border-bottom: solid black 1px;
    outline: none;
    
`

export const StyledMain = styled.main`
    width: 100%;
    min-height: 100vh;
    padding: 90px 3% 3% 3%;
    height: fit-content;
`