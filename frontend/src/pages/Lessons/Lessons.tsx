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
    duration: number;
    subjectClass: string;
    description: string;
    shift: string;
}

const cardData: CardData[] = [
    { id: 1, title: 'Aula 1 IoT', duration: 4, subjectClass: "IoT", description: "bla bla bla", shift: "MANHÃ" },
    { id: 1, title: 'Aula 1 IoT', duration: 4, subjectClass: "IoT", description: "bla bla bla", shift: "MANHÃ" },
    { id: 1, title: 'Aula 1 IoT', duration: 4, subjectClass: "IoT", description: "bla bla bla", shift: "MANHÃ" },
    { id: 1, title: 'Aula 1 IoT', duration: 4, subjectClass: "IoT", description: "bla bla bla", shift: "MANHÃ" },

    // adicione mais cartões conforme necessário
];

export const Lessons = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [subjectName, setSubjectName] = useState('');
    const [subjectclass, setSubjectClass] = useState('');
    const [classGroup, setClassGroup] = useState('');
    const [duration, setDuration] = useState('');
    const [description, setDescription] = useState('');
    const [shift, setShift] = useState('');

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
        console.log('Matéria da Turma:', subjectclass);
        console.log('Turma:', classGroup);
        console.log('Duração:', duration);
        closeModal();
      };

    return (
        <>
        <StyledMain>
            <StyledInputDiv >
                <h1>Aulas</h1>
                <StyledContainer>
                    <StyledAddButton onClick={openModal}>+ Aula</StyledAddButton>

                    {isModalOpen && (
                        <StyledModalOverlay>
                            <StyledModalContent>
                                <StyledCloseButton onClick={closeModal}>X</StyledCloseButton>
                                    <h2>Adicionar Nova Aula</h2>
                                    <StyledForm onSubmit={handleSubmit}>
                                        <StyledInput
                                          type="text"
                                          placeholder="Nome da Matéria"
                                          value={subjectName}
                                          onChange={(e) => setSubjectName(e.target.value)}
                                          required
                                        />
                                        <StyledInput
                                          type="text"
                                          placeholder="Descrição"
                                          value={description}
                                          onChange={(e) => setDescription(e.target.value)}
                                          required
                                        />
                                        <StyledSelect
                                          value={subjectclass}
                                          onChange={(e) => setSubjectClass(e.target.value)}
                                          required
                                        >
                                          <option value="">Selecione a Matéria da Turma</option>
                                          <option value="curso1">Matéria da Turma 1</option>
                                          <option value="curso2">Matéria da Turma 2</option>
                                          <option value="curso3">Matéria da Turma 3</option>
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
                                          placeholder="Duração"
                                          value={duration}
                                          onChange={(e) => setDuration(e.target.value)}
                                          required
                                        />
                                        <StyledSelect
                                          value={shift}
                                          onChange={(e) => setShift(e.target.value)}
                                          required
                                        >
                                          <option value="">Selecione o Turno</option>
                                          <option value="turma1">Turno 1</option>
                                          <option value="turma2">Turno 2</option>
                                          <option value="turma3">Turno 3</option>
                                        </StyledSelect>
                                        <StyledSubmitButton type="submit">Salvar</StyledSubmitButton>
                                    </StyledForm>
                            </StyledModalContent>
                        </StyledModalOverlay>
                    )}
                </StyledContainer>
            </StyledInputDiv>

            <div style={{ display: "flex", justifyContent: "center", overflow: "auto" }}>
                <StyledBox>
                    {cardData.map(card => (
                        <Card key={card.id} title={card.title} duration={card.duration} subjectClass={card.subjectClass} description={card.description} shift={card.shift} />
                    ))}
                </StyledBox>

            </div>
        </StyledMain>
        </>
    );

}