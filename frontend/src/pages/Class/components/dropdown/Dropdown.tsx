import { api } from "../../../../service/api";
import { StyledDropdownContainer } from "./style"
import { StyledDropdownButton } from "./style"
import { StyledDropdownContent } from "./style"
import { StyledModalContent, StyledModalOverlay } from "./style"
import React, { useEffect, useState } from 'react';

export const Dropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courses, setCourses] = useState<courseData[]>([])

  interface courseData {
    id: number,
    name: string,
    description: string | null
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
    const getCourses = async () => {
      try {
        const response = await api.get(`course`)
        setCourses(response.data)
      } catch (error) {
        console.error(error);
        setCourses([])
      }
    }
    getCourses()
  }, [])

  return (
    <StyledDropdownContainer>
      <StyledDropdownButton onClick={toggleDropdown}>
        Cursos
      </StyledDropdownButton>
      <StyledDropdownContent isOpen={isOpen}>
        {courses.map((courseItem, index) => (
          <option key={index} value={courseItem.id}>
            {courseItem.name}
          </option>
        ))}
      </StyledDropdownContent>
    </StyledDropdownContainer>
  );
};