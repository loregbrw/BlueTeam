import { Header } from "./Header/Header"
import { SkillsTable } from "./Table/SkillsTable"


export const SubjectClass = () => {

    
    return (
        <>
            <main style={{padding: "90px 3% 3% 3%", display: "flex", flexDirection: "column", alignItems: "center", gap: "25px"}}>
                <Header />
                <SkillsTable />
            </main>
        </>
    )
}