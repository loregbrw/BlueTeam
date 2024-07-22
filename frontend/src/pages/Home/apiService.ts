import { api } from "../../service/api";

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

export interface SubjectClass {
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

const token = localStorage.getItem("token");

export async function deleteLesson(id: number){

    const response = await api.delete(`/lesson/auth/${id}`, {
        headers: {
            auth: `${token}`
        }
    });
    if (!response.data) {
        throw new Error('Erro ao deletar aula.');
    }
}