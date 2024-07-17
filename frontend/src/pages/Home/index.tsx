import { AdmBar } from "../../components/AdmBar/AdmBar"
import { Instructorbar } from "../../components/InstructorBar/Instructorbar"
import Calendar from "react-calendar"
import { StyledCalendar } from "./style"

export const Home = () =>{
    return(
        <>
            {/* <AdmBar/> */}
            <Instructorbar/>
            <main style={{padding: "30px", fontFamily: ""}}>
                <h1 style={{margin: "10px"}}>Calendário</h1>
                <StyledCalendar>
                    <Calendar locale="pt-BR"/>
                </StyledCalendar>
            </main>
            
        </>
    )
}