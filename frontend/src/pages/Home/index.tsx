import { AdmBar } from "../../components/AdmBar/AdmBar"
import { Instructorbar } from "../../components/InstructorBar/Instructorbar"
import Calendar from "react-calendar"
import { StyledCalendar } from "./style"
import { useState } from "react"
import { ApprendiceBar } from "../../components/ApprendiceBar/ApprendiceBar"
import { EmptyNav } from "../../components/EmptyNav/EmptyNav"

export const Home = () =>{

    const [userType, setUserType] = useState("default");
    let navBarComponent;

    switch (userType) {
        case 'adm':
            navBarComponent = <AdmBar/>;
            break;
        case 'instrutor':
            navBarComponent = <Instructorbar/>
            break;
        case 'apprentice':
            navBarComponent = <ApprendiceBar/>;
            break;
        default:
            navBarComponent = <EmptyNav/>;
    }

    return(
        <>
            {navBarComponent}
            <main style={{padding: "30px", fontFamily: ""}}>
                <h1 style={{margin: "10px"}}>Calendário</h1>
                <StyledCalendar>
                    <Calendar locale="pt-BR"/>
                </StyledCalendar>
            </main>
            
        </>
    )
}