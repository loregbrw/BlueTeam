import React, { useState } from "react";
import { StyledButton } from "../../../Home/style";
import {
    StyledAddButton,
    StyledCloseButton,
    StyledForm,
    StyledInput,
    StyledModalContent,
    StyledModalOverlay,
    StyledSubmitButton
} from "../dropdown/style";
import { StyledLink, StyledCard } from "./style";
import { api } from "../../../../service/api";
import { toast } from "react-toastify";

interface CardProps {
    title: string;
    plannedDuration: number;
    subjectId: number; 
}

export const Card: React.FC<CardProps> = ({ title, plannedDuration, subjectId }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editName, setEditName] = useState(title);
    const [editDuration, setEditDuration] = useState(plannedDuration);

    const openEditModal = () => {
        setEditName(title || '');
        setEditDuration(plannedDuration);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            const response = await api.patch(`/subject/auth/${subjectId}`, {
                name: editName,
                expectedDuration: editDuration,
            }, {
                headers: {
                    auth: token
                }
            });
            toast.success("Matéria atualizada com sucesso!");
            console.log(response);
            closeEditModal();
        } catch (error) {
            toast.error('Erro ao atualizar a matéria');
            console.error(error);
        }
    };

    return (
        <>  
            <StyledLink to="">
                <StyledCard>
                    <h3>{title}</h3>
                    <hr style={{ width: "100%" }} />
                    <p><b>Duração planejada:</b> {plannedDuration} horas</p>
                    <StyledAddButton onClick={openEditModal}>Editar</StyledAddButton>
                </StyledCard>
            </StyledLink>

            {isEditModalOpen && (
                <StyledModalOverlay>
                    <StyledModalContent>
                        <StyledCloseButton onClick={closeEditModal}>X</StyledCloseButton>
                        <h2>Editar Matéria</h2>
                        <StyledForm onSubmit={handleEditSubmit}>
                            <StyledInput
                                placeholder="Nome da Matéria"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                required
                            />
                            <StyledInput
                                placeholder="Duração"
                                type="number"
                                value={editDuration}
                                onChange={(e) => setEditDuration(e.target.value)}
                                required
                            />
                            <StyledSubmitButton type="submit">Salvar Alterações</StyledSubmitButton>
                        </StyledForm>
                    </StyledModalContent>
                </StyledModalOverlay>
            )}
        </>
    );  
}
