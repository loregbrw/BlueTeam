
import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  align-items: end;
  gap: 10px; 
`;

 export const StyledDropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const StyledDropdownButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  width: 150px;
  &:hover {
    background-color: #45a049;
  }

`;

export const StyledDropdownContent = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: absolute;
  background-color: white;
  min-width: 160px;
  max-width: 200px;  
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  border-radius: 4px;
  right: 0; 
  
  & option {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    white-space: nowrap;  
    overflow: hidden;
    text-overflow: ellipsis;  

    &:hover {
      background-color: #f1f1f1;
    }
  }
`;

export const StyledAddButton = styled.button`
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
`;

export const StyledModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const StyledModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 100%;
`;

export const StyledCloseButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  width: 30px;  
  height: 30px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  border-radius: 50%;  
  display: flex;
  align-items: center;
  justify-content: center;
  float: right;

  &:hover {
    background-color: #e60000;
  }
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
`;

export const StyledInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  outline: none;
`;

export const StyledSelect = styled.select`
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  outline: none;
`;

export const StyledSubmitButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 10px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 10px;

  &:hover {
    background-color: #218838;
  }
`;
