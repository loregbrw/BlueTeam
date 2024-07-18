import styled from "styled-components"

interface ModalContainerProps {
    show: boolean;
}

export const StyledCalendar = styled.div`
    width: 100%;
    height: fit-content;
    background: #f0f0f0;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 10px;

    .react-calendar__navigation, .react-calendar__month-view__weekdays{
        text-align: center;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .react-calendar__navigation__label, 
    .react-calendar__navigation__arrow{
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 
        Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    .react-calendar {
        width: 100%;
        height: 75vh;
        border-radius: 8px;
    }

    abbr[title]{
        text-decoration: none;
        font-weight: bold;
    }

    .react-calendar__month-view__days__day--neighboringMonth {
        background: #d3d3d3;
        color: white;
    }

    .react-calendar__month-view__days__day{
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #ddd;
        box-sizing: border-box;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 
        Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    .react-calendar__month-viewContainer{
        height: fit-content;
    }

    .react-calendar__tile {
        border-radius: 5px;
        height: calc(67vh / 6);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .react-calendar__tile--active {
        background: brown;
        color: white;
        text-align: center;
    } 
    
    .highlight{
        background-color: rgba(2, 2, 2, 0.1);
        width: 5px;
    }
`

export const StyledModalContainer = styled.div<ModalContainerProps>`
    display: ${props => props.show ? 'block' : 'none'};
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.4);
`
export const StyledModalContent = styled.div`
    flex-direction: column;
    background-color: #fefefe;
    margin: 15% auto;
    border: 1px solid #888;
    width: 40%;
    border-radius: 8px;
    position: relative;
`;

export const StyledCloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 40px;
    cursor: pointer;

    &:hover {
        color: black;
    }
`

export const StyledForm = styled.form`
    padding: 80px;
    text-align: center;
    display: flex;
    flex-direction: column;
`

export const StyledButton = styled.button`
    margin-top: 20px;
    width: 5vw;
    height: 3vh;
    border-radius: 5px;
    border: none;
    background-color: wheat;
    color: brown;
    cursor: pointer;

    &:hover{
        color: white;
        background-color: brown;
    }
`