import styled from "styled-components"

export const StyledCalendar = styled.div`
    width: 100%;
    background: #f0f0f0;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 10px;

    .react-calendar__navigation{
        
    }

    .react-calendar {
        border: none;
        font-family: 'Arial', sans-serif;
        border-radius: 8px;
    }

    .react-calendar__month-view__days__day--neighboringMonth {
        color: #aaa;
    }

    .react-calendar__tile {
        background: #fff;
        border-radius: 5px;
        height: 40px;
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .react-calendar__tile--active {
        background: #007bff;
        color: white;
        text-align: center;
    }

    .react-calendar__tile--hasActive {
        background: #e0e0e0;
    }
    
`