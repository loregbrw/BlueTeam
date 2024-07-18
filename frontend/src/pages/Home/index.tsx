import { AdmBar } from "../../components/AdmBar/AdmBar"
import { Instructorbar } from "../../components/InstructorBar/Instructorbar"
import { ApprendiceBar } from "../../components/ApprendiceBar/ApprendiceBar"
import { EmptyNav } from "../../components/EmptyNav/EmptyNav"
import {
    StyledCalendar,
    StyledModalContent,
    StyledModalContainer,
    StyledCloseButton,
    StyledForm,
    StyledButton
} from "./style"
import Calendar from "react-calendar"
import { useEffect, useState } from "react"

interface Lesson {
    id: number;
    name: string;
    date: Date;
    shift: string;
    description: string;
}

export const Home = () => {

    const [userType, setUserType] = useState("1");
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState<'view' | 'add' | 'edit'>('view');
    const [modalLessonData, setModalLessonData] = useState<Lesson | null>(null);
    const [formData, setFormData] = useState<Lesson>({
        id: 0,
        name: "",
        date: new Date(),
        shift: "Manhã",
        description: ""
    });

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
        if (!lesson) {
            setFormData({ id: 0, name: "", date: value, shift: "Manhã", description: "" });
        }
    };

    const handleSaveLesson = () => {
        if (formData.name.trim() === "" || formData.description.trim() === "") {
            alert("Nome e descrição não podem estar vazios.");
            return;
        }
        let updatedLessons: Lesson[] = [];
        if (modalLessonData) {
            updatedLessons = lessons.map((lesson) =>
                lesson.id === modalLessonData.id ? { ...formData, id: modalLessonData.id } : lesson
            );
        } else {
            updatedLessons = [...lessons, { ...formData, id: lessons.length + 1 }];
        }

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "date" ? new Date(value) : value,
        }));
    };

    const tileClassName = ({ date, view }: { date: Date, view: string }) => {
        if (view === "month") {
            const lesson = lessons.find((lesson) => lesson.date.toDateString() === date.toDateString());
            if (lesson) {
                return "highlight";
            }
        }
        return null;
    };

    return (
        <>
            <main style={{ height: "100vh", padding: "90px 3% 3% 3%", fontFamily: "" }}>
                <h1 style={{ margin: "10px" }}>Calendário</h1>
                <StyledCalendar>
                    <Calendar locale="pt-BR" onClickDay={handleDateClick} tileClassName={tileClassName}/>
                </StyledCalendar>

                <StyledModalContainer show={showModal}>
                    <StyledModalContent>
                        <StyledCloseButton onClick={handleCloseModal}>&times;</StyledCloseButton>

                        {modalLessonData && modalMode === "view" && (
                            <>
                                <StyledForm>
                                    <h1>{modalLessonData.name}</h1>
                                    <p>Data: {modalLessonData.date.toLocaleDateString()}</p>
                                    <p>Turno: {modalLessonData.shift}</p>
                                    <p>Descrição: {modalLessonData.description}</p>
                                    {(userType === "0" || userType === "1") && (
                                        <>
                                            <button onClick={() => setModalMode("edit")}>Editar</button>
                                            <button onClick={handleDeleteLesson}>Excluir</button>
                                        </>
                                    )}
                                </StyledForm>
                            </>
                        )}
                        {modalMode !== "view" && (
                            <>
                                <StyledForm>
                                    <h1>Aula</h1>
                                    <label>Nome</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange}/>

                                    {/* <label>Data</label>
                                    <input type="date" name="date" value={formData.date.toISOString().split('T')[0]} onChange={handleChange}/> */}

                                    <label> Turno:</label>
                                    <select name="shift" value={formData.shift} onChange={handleChange}>
                                            <option value="Manhã">Manhã</option>
                                            <option value="Tarde">Tarde</option>
                                            <option value="Noite">Noite</option>
                                    </select>

                                    <label>Descrição</label>
                                    <textarea name="description" value={formData.description} onChange={handleChange}/>

                                    {(userType === "0" || userType === "1") && (
                                        <StyledButton onClick={handleSaveLesson}>Salvar</StyledButton>)}
                                </StyledForm>
                            </>
                        )}
                    </StyledModalContent>
                </StyledModalContainer>
            </main>
        </>
    )
}