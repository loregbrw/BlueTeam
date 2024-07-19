import React, { useEffect, useState } from 'react';
import { StyledAddButton, StyledCloseButton, StyledContainer, StyledDropdownButton, StyledForm, StyledInput, StyledModalContent, StyledModalOverlay, StyledSelect, StyledSubmitButton } from "./style";
import { StyledBox } from './style';
import { api } from '../../../service/api';
import { useParams } from 'react-router-dom';

export const StyledMain = () => {
    
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [username, setUsername] = useState('');
        const [userType, setUserType] = useState('');
        const [classSelected, setClass] = useState('');
        const [edv, setEdv] = useState('');
        const [email, setEmail] = useState('');
        const [role, setRole] = useState('');
        const [birthDate, setBirthDate] = useState('');
    
        const [isAverageGraphOpen, setAverageGraphOpen] = useState(false);
    
    interface userData {
        id: number;
        classId: classData;
        edv: number;
        foto: string;
        name: string;
        email: string;
        password: string;
        role: string;
        birthDate: string;
    }

    interface classData {
        id: number;
        courseId: courseData;
        name: string;
        duration: number;
        initialDate: Date;
    }

    interface courseData {
        id: number,
        name: string,
        description: string | null
    }

    const roleData: string[] = [
        "Server",
        "Adm",
        "Instructor",
        "Apprentice"
    ]

    const [classes, setClassData] = useState<classData[]>([])
    const { userId } = useParams<{ userId: string }>();

    useEffect(() => {
        const getClass = async () =>{
            try{
                const response = await api.get('class')
                setClassData(response.data)
            } catch(error){
                console.error(error);
                setClassData([])
            }
        }
        getClass()
    },[])
    
    const id = localStorage.getItem("id");
    const [user, setUserData] = useState<userData>()

    useEffect(() => {
        const getUser = async () =>{
            try{
                const response = await api.get(`user/id/${userId}`)
                setUserData(response.data)
                console.log(response.data)
            } catch(error){
                console.error(error);
            }
        }
        getUser()
    },[])

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


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const token = localStorage.getItem("token");

        const updateUser = {
            classId: classSelected,
            edv: parseInt(edv),
            name: username,
            email: email,
            role: role,
            birthDate: birthDate,
        };

        try {
            const response = await api.put("user/auth/1", updateUser, {
                headers: {
                    auth: `${token}`
                }});
            
            alert("Dados atualizados!")
            console.log(response)
            closeAverageGraph();
        } catch (error) {
            console.error("Erro ao atualizar os dados:", error);
        }
      };

    return (
        <> 

            <div style={{display: 'flex', justifyContent: 'end', padding: '10px'}}>
                <StyledDropdownButton onClick={openAverageGraph}>Médias</StyledDropdownButton>
                
                {isAverageGraphOpen && (
                    <StyledModalOverlay>
                        <StyledModalContent>
                            <StyledCloseButton onClick={closeAverageGraph}>x</StyledCloseButton>
                            <img width={'100%'} src={`http://127.0.0.1:4040/student/${userId}`}></img>
                        </StyledModalContent>
                    </StyledModalOverlay>
                )}
                <StyledContainer>
                {userType !== "Apprentice" && (

                    <StyledAddButton onClick={openModal}>Editar dados</StyledAddButton>
                )}
                    {isModalOpen && (
                            <StyledModalOverlay>
                                <StyledModalContent>
                                    <StyledCloseButton onClick={closeModal}>X</StyledCloseButton>
                                        <h2>Editar dados</h2>
                                        <StyledForm onSubmit={handleSubmit}>
                                        
                                <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                                    <StyledInput
                                        type="text"
                                        placeholder="Nome do aluno"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                    <StyledSelect
                                        value={classSelected}
                                        onChange={(e) => setClass(e.target.value)}
                                        required
                                    >
                                    {classes.map((classItem, index) => (
                                        <option key={index} value={classItem.id}>{classItem.name}</option>
                                    ))
                                    }
                                    </StyledSelect>
                                    <StyledInput
                                        type="text"
                                        placeholder="EDV"
                                        value={edv}
                                        onChange={(e) => setEdv(e.target.value)}
                                        required
                                    />
                                    <StyledInput
                                        type="text"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />

                                    {userType === "Adm" && (
                                        <StyledSelect
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            required
                                        >
                                            <option value="">Selecione o Cargo</option>
                                            {
                                              roleData.map((i) =>
                                                <option value={i}>{i}</option>  
                                            )}
                                        </StyledSelect>
                                    )}

                                    {userType === "Instructor" && (
                                        <StyledSelect
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            required
                                        >
                                            <option value="">Selecione o Cargo</option>
                                            <option value="Apprentice">Aprendiz</option>
                                            <option value="Instructor">Instrutor</option>
                                        </StyledSelect>
                                    )}
                                    <StyledInput
                                        type="date"
                                        value={birthDate}
                                        onChange={(e) => setBirthDate(e.target.value)}
                                        required
                                    />

                                    <StyledSubmitButton type="submit">Salvar</StyledSubmitButton>
                                </div>
                    
                        </StyledForm>
                    </StyledModalContent>
                </StyledModalOverlay>
            )}
            </StyledContainer>
        </div>

            <div style={{ display: "flex", justifyContent: "center", alignItems: 'center', overflow: "auto", width: '100%', height: '100%'}}>
                <StyledBox>
                    <h2>Dados do Usuário</h2>
                   
            <div style={{display: "flex", flexDirection: 'column', gap: '20px'}}>
                <p>Nome: {user?.name}</p>
                <p>Turma: {user?.classId.name}</p>
                <p>EDV: {user?.edv}</p>
                <p>Email: {user?.email}</p>
                <p>Data de Nascimento: {user?.birthDate}</p>
                {userType !== "Apprentice" && (
                    <p>Cargo: {user?.role}</p>
                )}
            </div>
        
                </StyledBox>

            </div>
        </>
    )
}