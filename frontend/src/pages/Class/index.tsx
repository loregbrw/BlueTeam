import { Apprentices } from "./components/Apprentices/Apprentices"
import { StyledBox, StyledDiv, StyledDropdown, StyledMain } from "./style"
import { StyledButton } from "./components/SubjectClasses/style"
import { useNavigate, useParams } from "react-router-dom"
import { api } from "../../service/api"
import { useEffect, useState } from "react"
import { StyledAddButton, StyledCloseButton, StyledContainer, StyledForm, StyledInput, StyledModalContent, StyledModalOverlay, StyledSubmitButton } from "./components/dropdown/style"
import { toast } from "react-toastify"
import AppBar from "../../components/AppBar/AppBar"
import { Card } from "./components/card/Card"

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

interface SubjectClass {
    id: number,
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
  const [subjects, setSubjects] = useState<SubjectData[]>([])
  const [subjectsClass, setSubjectsClass] = useState<SubjectClassData[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [duration, setDuration] = useState('');
  const [editName, setEditName] = useState('');
  const [editDuration, setEditDuration] = useState('');
  const [editInitialDate, setEditInitialDate] = useState('');
  const userType = localStorage.getItem("role");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const openEditModal = () => {
    setEditName(classData?.name || '');
    setEditDuration(String(classData?.duration || ''));
    setEditInitialDate(classData?.initialDate || '');
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
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

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const updatedClassData = {
      courseId: classData?.courseId.id,
      name: editName,
      duration: parseFloat(editDuration),
      initialDate: editInitialDate,
    };

    const updatedClassDataWithClass = {
      courseId: classData?.courseId,
      name: editName,
      duration: parseFloat(editDuration),
      initialDate: editInitialDate,
    };

    try {
      const response = await api.patch(`/class/auth/${classId}`, updatedClassData, {
        headers: {
          auth: token
        }
      });
      toast.success("Dados da turma atualizados!")
      console.log(response)
      setClassData(updatedClassDataWithClass as ClassData);
      closeEditModal();
    } catch (error) {
      toast.error('Erro ao atualizar dados da turma');
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    try {
      await api.delete(`/class/auth/${classId}`, {
        headers: {
          auth: token
        }
      });
      toast.success("Turma deletada com sucesso!");
      navigate("/classes")
      closeDeleteModal();
    } catch (error) {
      toast.error('Erro ao deletar a turma');
      console.error(error);
    }
  };

  return (
    <>
      <StyledMain>
        <h1>{classData?.name} - Aprendizes</h1>
        <div style={{ width: "100%", display: "flex", justifyContent: "space-between", flexWrap: "wrap", marginTop: "25px" }}>
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
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
                                key={subject.id}
                                title={subject.subjectId.name}
                                plannedDuration={subject.duration}
                                subjectId={subject.id}
                                onEdit={newDuration => {
                                  subject.subjectId.expectedDuration = newDuration;
                                }}
                            />
                        ))}
                    </StyledBox>
                </div>

        {isEditModalOpen && (
          <StyledModalOverlay>
            <StyledModalContent>
              <StyledCloseButton onClick={closeEditModal}>X</StyledCloseButton>
              <h2>Editar Turma</h2>
              <StyledForm onSubmit={handleEditSubmit}>
                <StyledInput
                  placeholder="Nome da Turma"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                />
                <StyledInput
                  placeholder="Duração"
                  type="number"
                  value={editDuration}
                  onChange={(e) => setEditDuration(e.target.value)}
                  required
                />
                <StyledInput
                  placeholder="Data de Início"
                  type="date"
                  value={editInitialDate}
                  onChange={(e) => setEditInitialDate(e.target.value)}
                  required
                />
                <StyledSubmitButton type="submit">Salvar Alterações</StyledSubmitButton>
              </StyledForm>
            </StyledModalContent>
          </StyledModalOverlay>
        )}

        {isDeleteModalOpen && (
          <StyledModalOverlay>
            <StyledModalContent>
              <h3>Tem certeza que deseja deletar esta turma?</h3>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                <StyledButton onClick={closeDeleteModal}>Cancelar</StyledButton>
                <StyledButton onClick={handleDelete} style={{ backgroundColor: "red" }}>Deletar</StyledButton>
              </div>
            </StyledModalContent>
          </StyledModalOverlay>
        )}
      </StyledMain>
    </>
  )
}
