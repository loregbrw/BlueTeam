import { Apprentices } from "./components/Apprentices/Apprentices"
import { SubjectClasses } from "./components/SubjectClasses/SubjectClasses"
import { StyledBox, StyledDiv, StyledDropdown, StyledGraphContent, StyledMain } from "./style"
import { StyledButton } from "./components/SubjectClasses/style"
import { useParams } from "react-router-dom"
import { api } from "../../service/api"
import { useEffect, useState } from "react"
import { StyledAddButton, StyledCloseButton, StyledContainer, StyledForm , StyledInput, StyledModalContent, StyledModalOverlay, StyledSubmitButton} from "./components/dropdown/style"
import { Card } from "../Subjects/components/card/Card"
import { toast } from "react-toastify"
import AppBar from "../../components/AppBar/AppBar"

interface ClassData {
    id: number;
    courseId: CourseData;
    name: string;
    duration: number;
    initialDate: string;
}

interface CourseData {
    id: number;
    name: string;
    description: string;
}

interface Subject {
    id: number;
    name: string;
    expectedDuration: number;
  }

  interface SubjectClass {
    subjectId: Subject,
    classId: number,
    duration: number,
  };

  interface SubjectClassName {
    subjectId: Subject,
    classId: ClassData,
    duration: number,
  };

export const Class = () => {

    const { classId } = useParams<{ classId: string }>();
    const [classData, setClassData] = useState<ClassData | null>(null);
    const [subjects, setSubjects] = useState<Subject[]>([])
    const [subjectsClass, setSubjectsClass] = useState<SubjectClass[]>([])
    const [subjectsClassName, setSubjectsClassName] = useState<SubjectClassName[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAverageGraphOpen, setAverageGraphOpen] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState<string>("");
    const [duration, setDuration] = useState('');

    const openModal = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };

      const openAverageGraph = () => {
        setAverageGraphOpen(true);
    }

    const closeAverageGraph = () => {
        setAverageGraphOpen(false);
    }


    useEffect(() => {
        const getClassData = async () => {
            try {
                const response = await api.get(`/class/id/${classId}`);
                console.log("response")
                console.log(response.data)
                setClassData(response.data);
            } catch (error) {
                console.error(error)
                setClassData(null)
            }
        };

        getClassData();
    }, [classId]);

    useEffect(() => {
        const getSubjects = async () => {
          try {
            const response = await api.get(`subject`)
            setSubjects(response.data)
          } catch (error) {
            console.error(error);
            setSubjects([])
          }
        }
        getSubjects()
      }, [])

      useEffect(() => {
        const getSubjectsClass = async () => {
          try {
            const response = await api.get(`subjectclass/${classId}`)
            setSubjectsClass(response.data)
          } catch (error) {
            console.error(error);
            setSubjectsClass([])
          }
        }
        getSubjectsClass()
      }, [])

      const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSubject(e.target.value);
      };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const newSubject = {
            subjectId: selectedSubject,
            classId: classId,
            duration: parseFloat(duration),
          };

        try {
          const response = await api.post('/subjectclass/auth', newSubject, {
            headers: {
                auth: token
              }
          });
          toast.success("Matéria criada!")
            console.log(response)
          closeModal(); 
        } catch (error) {
          toast.error('Erro em adicionar matéria');
          alert("Erro ao criar matéria")
        }
      };  

    return (
        <>
        <AppBar></AppBar>
            <StyledMain>
                <div style={{width: '100%', display: 'flex', alignItems: 'justify-between'}}>
                <h1 style={{width: '100%'}}>{classData?.name} - Aprendizes</h1>
                    <StyledAddButton onClick={openAverageGraph}>Média</StyledAddButton>

                </div>
                <div style={{width: "100%", display: "flex", justifyContent: "space-between", flexWrap: "wrap", marginTop: "25px"}}>
                    <StyledDiv>
                        <span>Curso: {classData?.courseId.name}</span>
                        <span>Duração: {classData?.duration} horas</span>
                    </StyledDiv>
                    <StyledDiv>
                        <span>Data de início: {classData?.initialDate}</span>
                    </StyledDiv>
                </div>
                <Apprentices />
                <hr style={{ margin: "25px 0" }} />
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <h1>Matérias</h1>
                    <StyledContainer>
            <StyledAddButton onClick={openModal}>+ Matéria</StyledAddButton>

            {isModalOpen && (
              <StyledModalOverlay>
                <StyledModalContent>
                  <StyledCloseButton onClick={closeModal}>X</StyledCloseButton>
                  <h2>Adicionar Nova Matéria</h2>
                  <StyledForm onSubmit={handleSubmit}>
                        <StyledDropdown
                            value={selectedSubject}
                            onChange={handleSubjectChange}
                        >
                            <option value="" disabled>Select a Subject</option>
                            {subjects.map((subject) => (
                                <option key={subject.id} value={subject.id}>
                                    {subject.name}
                                </option>
                            ))}
                        </StyledDropdown>
                        <StyledInput
                            placeholder="Duração Planejada"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            required
                        />
                        <StyledSubmitButton type="submit">Salvar</StyledSubmitButton>
                    </StyledForm>
                </StyledModalContent>
              </StyledModalOverlay>
            )}

            {isAverageGraphOpen && (
                <StyledModalOverlay>
                    <StyledGraphContent>
                        <StyledCloseButton onClick={closeAverageGraph}>x</StyledCloseButton>
                        <img width={'100%'} src={`http://127.0.0.1:4040/class/${classId}`}></img>
                    </StyledGraphContent>
                </StyledModalOverlay>
            )}


          </StyledContainer>
                </div>
                <div style={{ display: "flex", justifyContent: "center", overflow: "auto" }}>
  <StyledBox>
    {subjectsClass.map((subject) => (
      <Card
        key={subject.subjectId.id}
        title={subject.subjectId.name}
        plannedDuration={subject.subjectId.expectedDuration}
      />
    ))}
  </StyledBox>
</div>
            </StyledMain>
        </>
    )
}