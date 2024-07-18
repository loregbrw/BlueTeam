import styled from "styled-components"

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

    .react-calendar__navigation__label, .react-calendar__navigation__arrow{
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    .react-calendar {
        width: 100%;
        height: 75vh;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        border-radius: 8px;
    }

    .react-calendar__month-view__days__day--neighboringMonth {
        background: #d3d3d3;
        color: white;
    }

    .react-calendar__month-view__days__day{
        width: calc(100% / 7);
        height: calc((100% - 40px) / 6);
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #ddd;
        box-sizing: border-box;
    }

    .react-calendar__tile {
        border-radius: 5px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .react-calendar__tile--active {
        background: #007bff;
        color: white;
        text-align: center;
    }
    
`