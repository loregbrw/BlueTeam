import { StyledDropdownContainer } from "./style"
import { StyledDropdownButton } from "./style"
import { StyledDropdownContent } from "./style"
import { StyledModalContent, StyledModalOverlay } from "./style"
import React, { useState } from 'react';

export const Dropdown: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    const openModal = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };
  
    return (
      <StyledDropdownContainer>
        <StyledDropdownButton onClick={toggleDropdown}>
          Cursos 
        </StyledDropdownButton>
        <StyledDropdownContent isOpen={isOpen}>
          <a href="#option1">Option 1</a>
          <a href="#option2">Option 2</a>
          <a href="#option3">Option 3</a>
        </StyledDropdownContent>
      </StyledDropdownContainer>
    );
  };