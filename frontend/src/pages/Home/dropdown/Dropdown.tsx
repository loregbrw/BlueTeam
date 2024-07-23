
import { api } from "../../../service/api";
import { StyledDropdownContainer } from "./style"
import { StyledDropdownButton } from "./style"
import { StyledDropdownContent } from "./style"
import React, { useEffect, useState } from 'react';

export const Dropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classes, setClasses] = useState<ClassData[]>([]);

 interface ClassData{
    id: number;
    courseId: {
        id: number;
        name: string;
        description: string;
    };
    name: string;
    duration: number;
    initialDate: string;
}

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const getClasses = async () => {
      try {
        const response = await api.get(`class`)
        setClasses(response.data)
      } catch (error) {
        console.error(error);
        setClasses([])
      }
    }
    getClasses()
  }, [])

  return (
    <StyledDropdownContainer>
      <StyledDropdownButton onClick={toggleDropdown}>
        Cursos
      </StyledDropdownButton>
      <StyledDropdownContent isOpen={isOpen}>
      {classes.map(classData => (
        <option key={classData.id} value={classData.id}>
            {classData.name}
        </option>
      ))}
      </StyledDropdownContent>
    </StyledDropdownContainer>
  );
};