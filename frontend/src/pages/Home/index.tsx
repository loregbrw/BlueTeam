import { AdmBar } from "../../components/AdmBar/AdmBar"
import { Instructorbar } from "../../components/InstructorBar/Instructorbar"
import Calendar from "react-calendar"
import { StyledCalendar, StyledModalContent, StyledModalContainer, StyledCloseButton} from "./style"
import { useEffect, useState } from "react"
import { ApprendiceBar } from "../../components/ApprendiceBar/ApprendiceBar"
import { EmptyNav } from "../../components/EmptyNav/EmptyNav"

interface Lesson {
    id: number;
    name: string;
    date: Date;
    shift: string;
    description: string;
}

export const Home = () =>{

    const [ userType, setUserType ] = useState("0");
    const [ events, setEvents ] = useState<Lesson[]>([]);
    const [ selectedDate, setSelectedDate ] = useState<Date | null>(null);
    const [ showModal, setShowModal ] = useState(false);
    const [ modalMode, setModalMode ] = useState<'view' | 'add' | 'edit'>('view');
    const [modalLessonData, setModalLessonData] = useState<Lesson | null>(null);

    useEffect(() => {
        fetchLessons();
    }, []);

    const fetchLessons = () => {
        // Simulação de busca de eventos no banco de dados
        const mockEvents: Lesson[] = [
            { id: 1, name: "Aula 1", date: new Date(2024, 7, 20), shift: "Manhã", description: "Descrição do Evento 1" },
            { id: 2, name: "Aula 2", date: new Date(2024, 7, 21), shift: "Tarde", description: "Descrição do Evento 2" },
            // Adicione mais eventos conforme necessário
        ];
        setEvents(mockEvents);
    }

    let navBarComponent;
    let modalActions = {
        view: true,
        add: false,
        edit: false
    }

    switch (userType) {
        case '0':
            navBarComponent = <AdmBar/>;
            modalActions = {
                view: true,
                add: true,
                edit: true
            };
            break;
        case '1':
            navBarComponent = <Instructorbar/>
            modalActions = {
                view: true,
                add: true,
                edit: true
            };
            break;
        case '2':
            navBarComponent = <ApprendiceBar/>;
            modalActions = {
                view: true,
                add: false,
                edit: false
            };
            break;
        default:
            navBarComponent = <EmptyNav/>;
    }

    const handleDateClick = (value: Date) => {
        setSelectedDate(value);
        setShowModal(true);
    }

    const handleCloseModal = () =>{
        setShowModal(false);
    }

    return(
        <>
            
            {navBarComponent}
            <main style={{height:"94vh", marginTop: "4vh", padding: "30px", fontFamily: ""}}>
                <h1 style={{margin: "10px"}}>Calendário</h1>
                <StyledCalendar>
                    <Calendar locale="pt-BR" onClickDay={handleDateClick}/>
                </StyledCalendar>

                <StyledModalContainer show={showModal}>
                    <StyledModalContent>
                        <StyledCloseButton onClick={handleCloseModal}>&times;</StyledCloseButton>
                        <h2>Detalhes do Dia</h2>
                        {selectedDate && (
                            <p>Data selecionada: {selectedDate.toLocaleDateString()}</p>
                        )}
                    </StyledModalContent>
                </StyledModalContainer>

            </main>
            
        </>
    )
}