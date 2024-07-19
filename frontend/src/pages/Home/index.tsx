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
import { 
    fetchAllClasses, 
    fetchAllSubjectClasses, 
    fetchAllLessons,
    createLesson,
    updateLesson,
    deleteLesson,
    ClassData, 
    SubjectClassData,
    LessonRequest,
    LessonData
} from "./apiService"
import { toast } from "react-toastify"

export const Home = () => {

    const [userType, setUserType] = useState("1");
    const [lessons, setLessons] = useState<LessonData[]>([]);
    const [classes, setClasses] = useState<ClassData[]>([]);
    const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState<'view' | 'add' | 'edit'>('view');
    const [modalLessonData, setModalLessonData] = useState<LessonData | null>(null);
    const [formData, setFormData] = useState<LessonData>({
        id: 0,
        name: "",
        date: new Date(),
        shift: "Selecione",
        description: ""
    });

    useEffect(() => {
        fetchClasses();
    }, []);

    useEffect(() => {
        if(selectedClassId != null){
            const fetchLessonsForClass = async () => {
                try {
                    const subjectClasses = await fetchAllSubjectClasses(selectedClassId);
                    const lessonsDataPromises = subjectClasses.map(subjectClass => fetchAllLessons(subjectClass.id));
                    const lessonsDataArrays = await Promise.all(lessonsDataPromises);
                    const allLessons = lessonsDataArrays.flat().map(lesson => ({
                        ...lesson,
                        date: new Date(lesson.date)
                    }));
                    setLessons(allLessons);
                } catch (error) {
                    console.error('Erro ao carregar aulas:', error);
                }
            };
            fetchLessonsForClass();
        }
    }, [selectedClassId])

    const fetchClasses = async () => {
        try {
            const classesData = await fetchAllClasses();
            setClasses(classesData);
        } catch (error) {
            console.error('Erro ao carregar turmas:', error);
        }
    };

    const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = Number(e.target.value);
        setSelectedClassId(selectedId);
    };

    const handleDateClick = (value: Date) => {
        setSelectedDate(value);
        setShowModal(true);
        const lesson = lessons.find(
            (lesson) => lesson.date.toDateString() === value.toDateString()
        );
        setModalLessonData(lesson || null);
        setModalMode(lesson ? "view" : "add");
        if (!lesson) {
            setFormData({ id: 0, name: "", date: value, shift: "Selecione", description: "" });
        }
    };

    const handleSaveLesson = async () => {
        if (formData.name.trim() === "" || formData.description.trim() === "") {
            toast.error("Nome e descrição não podem estar vazios.");
            return;
        }
        try {
            console.log('Dados da nova aula: ', formData);
            if (modalLessonData) {
                const updatedLesson = await updateLesson(modalLessonData.id, formData);
                setLessons(lessons.map(lesson => (lesson.id === modalLessonData.id ? updatedLesson : lesson)));
            } else {
                const newLesson = await createLesson(formData);
                setLessons([...lessons, newLesson]);
            }
            setShowModal(false);
        } catch (error) {
            console.error('Erro ao salvar aula:', error);
            toast.error("Falha ao salvar a aula.");
        }
    };

    const handleDeleteLesson = async () => {
        if (modalLessonData) {
            try {
                await deleteLesson(modalLessonData.id);
                setLessons(lessons.filter(lesson => lesson.id !== modalLessonData.id));
                toast.success("Aula deletada com sucesso!");
                setShowModal(false);
            } catch (error) {
                toast.error("Falha ao tentar deletar a aula.");
                console.error('Erro ao deletar aula:', error);
            }
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
        return "";
    };

    return (
        <>
            <main style={{ height: "100vh", padding: "90px 3% 3% 3%", fontFamily: "" }}>
                <h1 style={{ margin: "10px" }}>Calendário</h1>
                {userType === "0" || userType === "1" ? (
                    <div style={{justifyContent: "end"}}>
                        <label htmlFor="classDropdown">Selecione a Turma:</label>
                        <select id="classDropdown" onChange={handleClassChange}>
                            <option value="">Selecione...</option>
                            {classes.map(classData => (
                                <option key={classData.id} value={classData.id}>
                                    {classData.name}
                                </option>
                            ))}
                        </select>
                    </div>
                ) : null}
                <StyledCalendar>
                    <Calendar locale="pt-BR" onClickDay={handleDateClick} tileClassName={tileClassName} />
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
                                            <StyledButton onClick={() => setModalMode("edit")}>Editar</StyledButton>
                                            <StyledButton onClick={handleDeleteLesson}>Excluir</StyledButton>
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
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} />

                                    <label>Data</label>
                                    <input type="date" name="date" value={formData.date.toISOString().split('T')[0]} onChange={handleChange} />

                                    <label> Turno:</label>
                                    <select name="shift" value={formData.shift} onChange={handleChange}>
                                        <option value="Manhã">Morning</option>
                                        <option value="Tarde">Afternoon</option>
                                        <option value="Noite">All day</option>
                                    </select>

                                    <label>Descrição</label>
                                    <textarea name="description" value={formData.description} onChange={handleChange} />

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