import { Apprentices } from "./components/Apprentices/Apprentices"
import { SubjectClasses } from "./components/SubjectClasses/SubjectClasses"
import { StyledMain } from "./style"
import { StyledButton } from "./components/SubjectClasses/style"

export const Class = () => {

    return (
        <>
            <StyledMain>
                <h1>Turma de Desenvolvimento de sistemas - Aprendizes</h1>
                <Apprentices />
                <hr style={{ margin: "25px 0" }} />
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <h1>Matérias</h1>
                    <StyledButton>+ Matéria</StyledButton>
                </div>
                <SubjectClasses />
            </StyledMain>
        </>
    )
}