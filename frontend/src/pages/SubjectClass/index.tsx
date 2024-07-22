import { Header } from "./Header/Header"
import { SkillsTable } from "./Table/SkillsTable"
import { Lessons } from "./Lessons/Lessons"
import { StyledAddButton, StyledCloseButton, StyledContainer, StyledDropdown, StyledForm, StyledInput, StyledModalContent, StyledModalOverlay, StyledSubmitButton, StyledTextArea } from "./Style"
import { useState } from "react"

export const SubjectClass = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [shift, setShift] = useState('');
    const [date, setDate] = useState('');

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    return (
        <>
            <main style={{ padding: "90px 3% 3% 3%", display: "flex", flexDirection: "column", alignItems: "center", gap: "25px" }}>
                <Header />
                <SkillsTable />
                <hr style={{ margin: "25px 0", width: "100%" }} />
                <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }} >
                    <h1>Aulas</h1>

                    <StyledContainer>
                        <StyledAddButton onClick={openModal}>+ Aula</StyledAddButton>
                        {isModalOpen && (
                            <StyledModalOverlay>
                                <StyledModalContent>
                                    <StyledCloseButton onClick={closeModal}>X</StyledCloseButton>
                                    <h2>Adicionar Nova Aula</h2>
                                    <StyledForm>
                                        <StyledInput
                                            placeholder="Título da aula"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            maxLength={255}
                                            required
                                        />
                                        <StyledTextArea
                                            placeholder="Descrição da aula"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            maxLength={255}
                                            required
                                        />
                                        <StyledDropdown required value={shift} onChange={(e) => setShift(e.target.value)}>
                                            <option value={""}>Selecione um turno</option>
                                            <option value={"MORNING"}>Manhã</option>
                                            <option value={"AFTERNOON"}>Tarde</option>
                                            <option value={"ALLDAY"}>Dia inteiro</option>
                                        </StyledDropdown>
                                        <StyledInput
                                            type="date"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            required
                                        />
                                        <StyledSubmitButton type="submit">Salvar</StyledSubmitButton>
                                    </StyledForm>
                                </StyledModalContent>
                            </StyledModalOverlay>
                        )}
                    </StyledContainer>
                </div>
                <Lessons />
            </main>
        </>
    )
}