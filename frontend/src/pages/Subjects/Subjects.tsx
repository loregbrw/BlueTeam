import { Card } from "./components/card/Card";
import { StyledBox, StyledMain } from "./style";
import { AdmBar } from "../../components/AdmBar/AdmBar";
import { StyledInputDiv } from "./style";
import { Dropdown } from "./components/dropdown/Dropdown";
import { StyledAddButton, StyledCloseButton, StyledContainer, StyledForm, StyledInput, StyledModalContent, StyledModalOverlay, StyledSelect, StyledSubmitButton } from "./components/dropdown/style";
import { useState } from "react";

interface CardData {
    id: number;
    title: string;
    plannedDuration: number;
    classes: string;
}

const cardData: CardData[] = [
    { id: 1, title: 'IoT', plannedDuration: 4, classes: "Desenvolvimento de sistemas" },
    { id: 2, title: 'Card 2', plannedDuration: 2, classes: "Desenvolvimento de sistemas" },
    { id: 3, title: 'Card 3', plannedDuration: 3, classes: "Desenvolvimento de sistemas" },
    { id: 3, title: 'Card 3', plannedDuration: 1, classes: "Desenvolvimento de sistemas" },
    // adicione mais cartões conforme necessário
];

export const Subjects = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [subjectName, setSubjectName] = useState('');
    const [course, setCourse] = useState('');
    const [classGroup, setClassGroup] = useState('');
    const [duration, setDuration] = useState('');

    const openModal = () => {
        setIsModalOpen(true);
    };
    
      const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Lógica de envio do formulário
        console.log('Matéria:', subjectName);
        console.log('Curso:', course);
        console.log('Turma:', classGroup);
        console.log('Duração:', duration);
        closeModal();
      };

    return (
        <>
        <StyledMain>
            <StyledInputDiv >
                <h1>Matérias</h1>
                <StyledContainer>
                    <StyledAddButton onClick={openModal}>+ Matéria</StyledAddButton>

                    {isModalOpen && (
                        <StyledModalOverlay>
                            <StyledModalContent>
                                <StyledCloseButton onClick={closeModal}>X</StyledCloseButton>
                                    <h2>Adicionar Nova Turma</h2>
                                    <StyledForm onSubmit={handleSubmit}>
                                        <StyledInput
                                          type="text"
                                          placeholder="Nome da Matéria"
                                          value={subjectName}
                                          onChange={(e) => setSubjectName(e.target.value)}
                                          required
                                        />
                                        <StyledSelect
                                          value={course}
                                          onChange={(e) => setCourse(e.target.value)}
                                          required
                                        >
                                          <option value="">Selecione o Curso</option>
                                          <option value="curso1">Curso 1</option>
                                          <option value="curso2">Curso 2</option>
                                          <option value="curso3">Curso 3</option>
                                        </StyledSelect>
                                        <StyledSelect
                                          value={classGroup}
                                          onChange={(e) => setClassGroup(e.target.value)}
                                          required
                                        >
                                          <option value="">Selecione a Turma</option>
                                          <option value="turma1">Turma 1</option>
                                          <option value="turma2">Turma 2</option>
                                          <option value="turma3">Turma 3</option>
                                        </StyledSelect>
                                        <StyledInput
                                          type="text"
                                          placeholder="Duração Planejada"
                                          value={duration}
                                          onChange={(e) => setDuration(e.target.value)}
                                          required
                                        />
                                        <StyledSubmitButton type="submit">Salvar</StyledSubmitButton>
                                    </StyledForm>
                            </StyledModalContent>
                        </StyledModalOverlay>
                    )}

                    <Dropdown></Dropdown>
                </StyledContainer>
                
            </StyledInputDiv>

            <div style={{ display: "flex", justifyContent: "center", overflow: "auto" }}>
                <StyledBox>
                    {cardData.map(card => (
                        <Card key={card.id} title={card.title} plannedDuration={card.plannedDuration} classes={card.classes} />
                    ))}
                </StyledBox>

            </div>
        </StyledMain>
        </>
    );

}