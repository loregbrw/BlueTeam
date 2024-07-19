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

    const [userType, setUserType] = useState(localStorage.getItem("role"))
    const [lessons, setLessons] = useState<LessonData[]>([]);
    const [classes, setClasses] = useState<ClassData[]>([]);
    const [subjectClasses, setSubjectClasses] = useState<SubjectClassData[]>([]);
    const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
    const [selectedSubjectClassId, setSelectedSubjectClassId] = useState<number | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState<'view' | 'add' | 'edit'>('view');
    const [modalLessonData, setModalLessonData] = useState<LessonData | null>(null);
    const [formData, setFormData] = useState<LessonRequest>({
        title: "",
        date: new Date(),
        shift: "Selecione",
        description: "",
        subjectClassId: 0
    });

    useEffect(() => {
        fetchClasses();
    }, []);

    useEffect(() => {
        if (selectedClassId != null) {
            fetchSubjectClasses(selectedClassId);
        }
    }, [selectedClassId]);

    useEffect(() => {
        if (selectedClassId != null) {
            fetchLessonsForClass();
        }
    }, [selectedClassId]);


    const fetchClasses = async () => {
        try {
            const classesData = await fetchAllClasses();
            setClasses(classesData);
        } catch (error) {
            console.error('Erro ao carregar turmas:', error);
        }
    };

    const fetchSubjectClasses = async (classId: number) => {
        try {
            const subjectClassesData = await fetchAllSubjectClasses(classId);
            setSubjectClasses(subjectClassesData);
        } catch (error) {
            console.error('Erro ao carregar matérias da turma:', error);
        }
    };

    const fetchLessonsForClass = async () => {
        if (selectedClassId) {
            try {
                // Buscar todas as matérias para a turma selecionada
                const subjectClassesData = await fetchAllSubjectClasses(selectedClassId);
                setSubjectClasses(subjectClassesData);
    
                // Buscar todas as aulas para todas as matérias da turma selecionada
                const lessonsDataPromises = subjectClassesData.map(subjectClass => fetchAllLessons(subjectClass.id));
                const lessonsDataArrays = await Promise.all(lessonsDataPromises);
    
                // Unir todas as aulas em um único array
                const allLessons = lessonsDataArrays.flat().map(lesson => ({
                    ...lesson,
                    date: new Date(lesson.date)
                }));
                setLessons(allLessons);
            } catch (error) {
                console.error('Erro ao carregar aulas:', error);
            }
        }
    };


    const handleClassChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = Number(e.target.value);
        setSelectedClassId(selectedId);
        setSelectedSubjectClassId(null);
        if (selectedId) {
            try {
                const subjectClassesData = await fetchAllSubjectClasses(selectedId);
                setSubjectClasses(subjectClassesData);
            } catch (error) {
                console.error('Erro ao carregar matérias da turma:', error);
            }
        }
    };

    const handleSubjectClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = Number(e.target.value);
        setSelectedSubjectClassId(selectedId);
        setFormData((prevData) => ({
            ...prevData,
            subject_class_id: selectedId,
        }));
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
            setFormData({
                title: "",
                date: value,
                shift: "Selecione",
                description: "",
                subjectClassId: selectedSubjectClassId || 0
            });
        } else {
            setFormData({
                title: lesson.title,
                date: new Date(lesson.date),
                shift: lesson.shift,
                description: lesson.description,
                subjectClassId: lesson.subjectClassId
            });
        }


    };

    const handleSaveLesson = async () => {
        try {

        console.log('Dados do formulário:', formData);

        if (formData.title.trim() === "" || formData.description.trim() === "") {
            toast.error("Nome e descrição não podem estar vazios.");
            return;
        }

            if (modalLessonData) {
                console.log('Atualizando aula... ', modalLessonData.id);
                const updatedLesson = await updateLesson(modalLessonData.id, formData);
                setLessons(lessons.map(lesson => (lesson.id === modalLessonData.id ? updatedLesson : lesson)));
                toast.success("Aula atualizada com sucesso!")
            } else {
                const newLesson = await createLesson(formData);
                setLessons([...lessons, newLesson]);
                toast.success("Aula criada com sucesso!")
                console.log("Nova aula criada: ", newLesson);
            }

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

    const handleSubmitSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSaveLesson();
    }

    const handleSubmitDelete = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleDeleteLesson();
    }

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
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <h1 style={{ margin: "10px" }}>Calendário</h1>
                    {userType === "Adm" || userType === "Instructor" ? (
                        <div style={{ alignContent: 'center' }}>
                            <label htmlFor="classDropdown">Selecione a Turma: </label>
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
                </div>
                <StyledCalendar>
                    <Calendar locale="pt-BR" onClickDay={handleDateClick} tileClassName={tileClassName} />
                </StyledCalendar>

                <StyledModalContainer show={showModal}>
                    <StyledModalContent>
                        <StyledCloseButton onClick={handleCloseModal}>&times;</StyledCloseButton>

                        {modalLessonData && modalMode === "view" && (
                            <>
                                <StyledForm onSubmit={handleSubmitDelete}>
                                    <h1>{modalLessonData.title}</h1>
                                    <p>Data: {modalLessonData.date.toLocaleDateString()}</p>
                                    <p>Turno: {modalLessonData.shift}</p>
                                    <p>Descrição: {modalLessonData.description}</p>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'end', gap: "10px" }}>
                                        {(userType === "Adm" || userType === "Instructor") && (
                                            <>
                                                <StyledButton onClick={() => setModalMode("edit")}>Editar</StyledButton>
                                                <StyledButton onClick={handleDeleteLesson}>Excluir</StyledButton>
                                            </>
                                        )}
                                    </div>
                                </StyledForm>
                            </>
                        )}
                        {modalMode !== "view" && (
                            <>
                                <StyledForm onSubmit={handleSubmitSave}>
                                    <h1>Aula</h1>
                                    <label>Nome</label>
                                    <input type="text" name="title" value={formData.title} onChange={handleChange} />

                                    <label>Data</label>
                                    <input type="date" name="date" value={formData.date.toISOString().split('T')[0]} onChange={handleChange} />

                                    <label> Turno:</label>
                                    <select name="shift" value={formData.shift} onChange={handleChange}>
                                        <option value="">Selecione...</option>
                                        <option value="MORNING">Manhã</option>
                                        <option value="AFTERNOON">Tarde</option>
                                        <option value="ALLDAY">Dia inteiro</option>
                                    </select>

                                    {selectedClassId && (
                                        <>
                                            <label htmlFor="subjectClassDropdown">Selecione a Matéria:</label>
                                            <select id="subjectClassDropdown" onChange={handleSubjectClassChange}>
                                                <option value="">Selecione...</option>
                                                {subjectClasses.map(subjectClass => (
                                                    <option key={subjectClass.id} value={subjectClass.id}>
                                                        {subjectClass.subjectId.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </>
                                    )}

                                    <label>Descrição</label>
                                    <textarea name="description" value={formData.description} onChange={handleChange} />
                                    <div style={{ display: 'flex', justifyContent: 'center'}}>
                                        {(userType === "Adm" || userType === "Instructor") && (
                                            <StyledButton onClick={handleSaveLesson}>Salvar</StyledButton>)}
                                    </div>
                                </StyledForm>
                            </>
                        )}
                    </StyledModalContent>
                </StyledModalContainer>
            </main>
        </>
    )
}