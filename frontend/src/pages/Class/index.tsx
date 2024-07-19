import { Apprentices } from "./components/Apprentices/Apprentices"
import { SubjectClasses } from "./components/SubjectClasses/SubjectClasses"
import { StyledBox, StyledDiv, StyledDropdown, StyledMain } from "./style"
import { StyledButton } from "./components/SubjectClasses/style"
import { useParams } from "react-router-dom"
import { api } from "../../service/api"
import { useEffect, useState } from "react"
import { StyledAddButton, StyledCloseButton, StyledContainer, StyledForm, StyledInput, StyledModalContent, StyledModalOverlay, StyledSubmitButton } from "./components/dropdown/style"
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

interface SubjectData {
  id: number;
  name: string;
  expectedDuration: number;
}

interface SubjectClassData {
  id: number;
  classId: ClassData,
  subjectId: SubjectData,
  duration: number,
};


export const Class = () => {

  const { classId } = useParams<{ classId: string }>();
  const [classData, setClassData] = useState<ClassData | null>(null);
  const [subjects, setSubjects] = useState<SubjectData[]>([])
  const [subjectsClass, setSubjectsClass] = useState<SubjectClassData[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [duration, setDuration] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
                <h1>{classData?.name} - Aprendizes</h1>
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


          </StyledContainer>
        </div>
        <div style={{ display: "flex", justifyContent: "center", overflow: "auto" }}>
          <StyledBox>
            {subjectsClass.map((subject) => (
              <Card
                key={subject.subjectId.id}
                id={subject.subjectId.id}
                title={subject.subjectId.name}
                duration={subject.duration}
              />
            ))}
          </StyledBox>
        </div>
      </StyledMain>
    </>
  )
}