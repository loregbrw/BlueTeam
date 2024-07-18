import { api } from "../../../../service/api";
import { DropdownContainer } from "./style"
import { DropdownButton } from "./style"
import { DropdownContent } from "./style"
import { ModalContent, ModalOverlay } from "./style"
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
                const getCourses = async () =>{
                    try{
                        const response = await api.get(`course`)
                        setCourses(response.data)
                    } catch(error){
                        console.error(error);
                        setCourses([])
                    }
                }
                getCourses()
            },[])
  
    return (
      <DropdownContainer>
        <DropdownButton onClick={toggleDropdown}>
          Cursos 
        </DropdownButton>
        <DropdownContent isOpen={isOpen}>
          {courses.map((courseItem, index) => (
            <option key={index} value={courseItem.id}>
              {courseItem.name}
            </option>
          ))}
        </DropdownContent>
      </DropdownContainer>
    );
  };