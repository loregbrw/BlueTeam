import { Apprentices } from "./components/Apprentices/Apprentices"
import { SubjectClasses } from "./components/SubjectClasses/SubjectClasses"
import { StyledMain } from "./style"

export const Class = () => {
    return (
        <>
            <StyledMain>
                <h1>Turma de Desenvolvimento de sistemas - Aprendizes</h1>
                <Apprentices />
                <hr />
                <h1 style={{marginTop: "20px"}}>Matérias</h1>
                <SubjectClasses />
            </StyledMain>
        </>
    )
}