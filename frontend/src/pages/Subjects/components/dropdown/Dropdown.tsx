import { DropdownContainer } from "./style"
import { DropdownButton } from "./style"
import { DropdownContent } from "./style"
import { ModalContent, ModalOverlay } from "./style"
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
      <DropdownContainer>
        <DropdownButton onClick={toggleDropdown}>
          Cursos 
        </DropdownButton>
        <DropdownContent isOpen={isOpen}>
          <a href="#option1">Option 1</a>
          <a href="#option2">Option 2</a>
          <a href="#option3">Option 3</a>
        </DropdownContent>
      </DropdownContainer>
    );
  };