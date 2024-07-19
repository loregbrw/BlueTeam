export interface ClassData{
    id: number;
    courseId: {
        id: number;
        name: string;
        description: string;
    };
    name: string;
    duration: number;
    initialDate: string;
}
export interface Subject{
    id: number;
    name: string;
    expectedDuration: number;
}

export interface SubjectClassData {
    id: number;
    classId: ClassData;
    subjectId: Subject;
    duration: number;
  };

export interface LessonData{
    id: number;
    title: string;
    date: Date;
    shift: string;
    description: string;
    subjectClassId: number;
}

export interface LessonRequest {
    title: string;
    date: Date;
    shift: string;
    description: string;
    subjectClassId: number;
}

const API_URL = 'http://localhost:8080'
const token = localStorage.getItem("token");

export async function fetchAllClasses() : Promise<ClassData[]> {
    const response = await fetch(`${API_URL}/class`);
    if(!response.ok){
        throw new Error('Erro ao buscar Turmas.');
    }
    return response.json();
}

export async function fetchAllSubjectClasses(classid: number) : Promise<SubjectClassData[]> {
    const response = await fetch (`${API_URL}/subjectclass/${classid}`);
    if(!response.ok){
        throw new Error('Erro ao buscar matérias por turma.');
    }
    return response.json();
}

export async function fetchAllLessons(subjectclassid: number) : Promise<LessonData[]> {
    const response = await fetch (`${API_URL}/lesson/${subjectclassid}`);
    if(!response.ok){
        throw new Error('Erro ao buscar aulas.');
    }
    return response.json();
} 

export async function createLesson(lessonRequest: LessonRequest) : Promise<LessonData> {
    const response = await fetch (`${API_URL}/lesson/auth`, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            auth: `Bearer ${token}`
        },
        body: JSON.stringify(lessonRequest)
    });

    if (!response.ok){
        throw new Error('Erro ao criar aula.');
    }
    return response.json();
} 

export async function updateLesson(id: number, lessonRequest: LessonRequest): Promise<LessonData> {
    const response = await fetch(`${API_URL}/lesson/auth/${id}`, {
        method: 'PATCH',
        headers: {
            auth: `Bearer ${token}`
        },
        body: JSON.stringify(lessonRequest)
    });
    if (!response.ok) {
        throw new Error('Erro ao atualizar aula.');
    }
    return response.json();
}

export async function deleteLesson(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/lesson/auth/${id}`, {
        method: 'DELETE',
        headers: {
            auth: `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error('Erro ao deletar aula.');
    }
}