import { styled } from "styled-components";

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

export const PasswordWarning = styled.span`
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translate(-50%, 0);
  text-align: center;
  color: #c93d50;
  width: 90%;
`;

export const ProgressBar = styled.div<{ fillValue: number; backgroundClass: string }>`
  height: 10px;
  border-radius: 50px;  
  transition: width 0.3s ease-in-out;  
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); 
  width: ${(props) => props.fillValue}%;
  background-color: ${(props) =>
    props.backgroundClass === "bg-danger"
      ? "#dc3545"
      : props.backgroundClass === "bg-warning"
      ? "#ffc107"
      : props.backgroundClass === "bg-secondary"
      ? "#6c757d"
      : props.backgroundClass === "bg-info"
      ? "#17a2b8"
      : "#28a745"};
`;
