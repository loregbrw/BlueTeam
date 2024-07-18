// import { useEffect, useState } from "react"

// const [userType, setUserType] = useState("1");
//     const [lessons, setLessons] = useState<Lesson[]>([]);
//     const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//     const [showModal, setShowModal] = useState(false);
//     const [modalMode, setModalMode] = useState<'view' | 'add' | 'edit'>('view');
//     const [modalLessonData, setModalLessonData] = useState<Lesson | null>(null);
//     const [formData, setFormData] = useState<Lesson>({
//         id: 0,
//         name: "",
//         date: new Date(),
//         shift: "Manhã",
//         description: ""
//     });

//     useEffect(() => {
//         fetchLessons();
//     }, []);

//     const fetchLessons = () => {
//         // Simulação de busca de eventos no banco de dados
//         // const mockLessons: Lesson[] = [
//         //     { id: 1, name: "Aula 1", date: new Date(2024, 7, 20), shift: "Manhã", description: "Descrição do Evento 1" },
//         //     { id: 2, name: "Aula 2", date: new Date(2024, 7, 21), shift: "Tarde", description: "Descrição do Evento 2" },
//         //     // Adicione mais eventos conforme necessário
//         // ];
//         // setLessons(mockLessons);
//     }

//     // let navBarComponent;
//     // switch (userType) {
//     //     case '0':
//     //         navBarComponent = <AdmBar />;
//     //         break;
//     //     case '1':
//     //         navBarComponent = <Instructorbar />
//     //         break;
//     //     case '2':
//     //         navBarComponent = <ApprendiceBar />;
//     //         break;
//     //     default:
//     //         navBarComponent = <EmptyNav />;
//     // }

//     const handleDateClick = (value: Date) => {
//         setSelectedDate(value);
//         setShowModal(true);
//         const lesson = lessons.find(
//             (lesson) => lesson.date.toDateString() === value.toDateString()
//         );
//         setModalLessonData(lesson || null);
//         setModalMode(lesson ? "view" : "add");
//         if (!lesson) {
//             setFormData({ id: 0, name: "", date: value, shift: "Manhã", description: "" });
//         }
//     };

//     const handleSaveLesson = () => {
//         const updatedLessons = modalLessonData
//             ? lessons.map((lesson) =>
//                 lesson.id === modalLessonData.id ? { ...formData, id: modalLessonData.id } : lesson
//             )
//             : [...lessons, { ...formData, id: lessons.length + 1 }];
//         setLessons(updatedLessons);
//         setShowModal(false);
//     };

//     const handleDeleteLesson = () => {
//         if (modalLessonData) {
//             const updatedLessons = lessons.filter(
//                 (lesson) => lesson.id !== modalLessonData.id
//             );
//             setLessons(updatedLessons);
//             setShowModal(false);
//         }
//     };

//     const handleCloseModal = () => {
//         setShowModal(false);
//     }

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: name === "date" ? new Date(value) : value,
//         }));
//     };