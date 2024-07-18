import { AdmBar } from "../../components/AdmBar/AdmBar"
import { Instructorbar } from "../../components/InstructorBar/Instructorbar"
import Calendar from "react-calendar"
import {
    StyledCalendar,
    StyledModalContent,
    StyledModalContainer,
    StyledCloseButton
} from "./style"
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

export const Home = () => {

    const [userType, setUserType] = useState("0");
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState<'view' | 'add' | 'edit'>('view');
    const [modalLessonData, setModalLessonData] = useState<Lesson | null>(null);

    useEffect(() => {
        fetchLessons();
    }, []);

    const fetchLessons = () => {
        // Simulação de busca de eventos no banco de dados
        const mockLessons: Lesson[] = [
            { id: 1, name: "Aula 1", date: new Date(2024, 7, 20), shift: "Manhã", description: "Descrição do Evento 1" },
            { id: 2, name: "Aula 2", date: new Date(2024, 7, 21), shift: "Tarde", description: "Descrição do Evento 2" },
            // Adicione mais eventos conforme necessário
        ];
        setLessons(mockLessons);
    }

    let navBarComponent;
    switch (userType) {
        case '0':
            navBarComponent = <AdmBar />;
            break;
        case '1':
            navBarComponent = <Instructorbar />
            break;
        case '2':
            navBarComponent = <ApprendiceBar />;
            break;
        default:
            navBarComponent = <EmptyNav />;
    }

    const handleDateClick = (value: Date) => {
        setSelectedDate(value);
        setShowModal(true);
        const lesson = lessons.find(
            (lesson) => lesson.date.toDateString() === value.toDateString()
        );
        setModalLessonData(lesson || null);
        setModalMode(lesson ? "view" : "add");
    };

    const handleSaveLesson = (lessonData: Lesson) => {
        const updatedLessons = modalLessonData
            ? lessons.map((lesson) =>
                lesson.id === modalLessonData.id ? lessonData : lesson
            )
            : [...lessons, { ...lessonData, id: lessons.length + 1 }];
        setLessons(updatedLessons);
        setShowModal(false);
    };

    const handleDeleteLesson = () => {
        if (modalLessonData) {
            const updatedLessons = lessons.filter(
                (lesson) => lesson.id !== modalLessonData.id
            );
            setLessons(updatedLessons);
            setShowModal(false);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    }

    return (
        <>
            {navBarComponent}
            <main style={{ height: "94vh", marginTop: "4vh", padding: "30px", fontFamily: "" }}>
                <h1 style={{ margin: "10px" }}>Calendário</h1>
                <StyledCalendar>
                    <Calendar locale="pt-BR" onClickDay={handleDateClick} />
                </StyledCalendar>

                <StyledModalContainer show={showModal}>
                    <StyledModalContent>
                        <StyledCloseButton onClick={handleCloseModal}>&times;</StyledCloseButton>



                        {/* <h2>{modalLessonData?.name}</h2>
                        {selectedDate && (
                            <p>Data: {selectedDate.toLocaleDateString()}</p>
                        )}
                        <p>Turno: {modalLessonData?.shift}</p>
                        <p>Descrição: {modalLessonData?.description}</p>
                        {(userType === "0" || userType === "1") && (
                            <>
                                <button
                                    onClick={() =>
                                        setModalMode("edit")
                                    }
                                >
                                    Editar
                                </button>
                                <button onClick={handleDeleteLesson}>
                                    Excluir
                                </button>
                            </>
                        )} */}
                        
                        {modalLessonData && (
                            <>
                                <p>Nome: {modalLessonData.name}</p>
                                <p>
                                    Data:{" "}
                                    {modalLessonData.date.toLocaleDateString()}
                                </p>
                                <p>Turno: {modalLessonData.shift}</p>
                                <p>Descrição: {modalLessonData.description}</p>
                                {(userType === "0" || userType === "1") && (
                                    <>
                                        <button
                                            onClick={() =>
                                                setModalMode("edit")
                                            }
                                        >
                                            Editar
                                        </button>
                                        <button onClick={handleDeleteLesson}>
                                            Excluir
                                        </button>
                                    </>
                                )}
                            </>
                        )}
                        {modalMode === "add" && (
                            <>
                                <label>
                                    Nome:
                                    <input type="text" />
                                </label>
                                <label>
                                    Data:
                                    <input type="date" />
                                </label>
                                <label>
                                    Turno:
                                    <select>
                                        <option value="Manhã">Manhã</option>
                                        <option value="Tarde">Tarde</option>
                                        <option value="Noite">Noite</option>
                                    </select>
                                </label>
                                <label>
                                    Descrição:
                                    <textarea />
                                </label>
                                {/* {(userType === "0" || userType === "1") && (
                                    <button onClick={handleSaveLesson}>
                                        Salvar
                                    </button>
                                )} */}
                            </>
                        )}


                    </StyledModalContent>
                </StyledModalContainer>

            </main>

        </>
    )
}