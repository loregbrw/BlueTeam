import React, { useEffect, useState } from 'react';
import { StyledAddButton, StyledBoxCard, StyledCloseButton, StyledContainer, StyledDropdownButton, StyledForm, StyledInput, StyledModalContent, StyledModalOverlay, StyledSelect, StyledSubmitButton } from "./style";
import { StyledBox } from './style';
import { api } from '../../../service/api';
import { useParams } from 'react-router-dom';
import { Card } from './card/Card';

export const StyledMain = () => {
    
    const [username, setUsername] = useState('');
    const [classSelected, setClass] = useState('');
    const [edv, setEdv] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [birthDate, setBirthDate] = useState('');
    
    const [abilityName, setAbilityName] = useState('');
    const [strenght, setStrenght] = useState('');
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAverageGraphOpen, setAverageGraphOpen] = useState(false);
    const [isAbilityModalOpen, setAbilityModalOpen] = useState(false);
    const [isEditAbilityModalOpen, setEditAbilityModalOpen] = useState(false);
    
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


    interface abilityUserData {
        id: number
        userId: userData
        name: string
        strength: string
    }
    
    const abilityData : string[] = [
        "A",
        "B",
        "C",
        "D",
        "E"
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
    
    const [user, setUserData] = useState<userData>()
    const [ability, setAbilityData] = useState<abilityUserData[]>([])

    const userType = localStorage.getItem("role")

    useEffect(() => {
        const getUser = async () =>{
            try{
                const response = await api.get(`user/id/${userId}`)
                setUserData(response.data)
                setUsername(response.data.name)
                setBirthDate(response.data.birthDate)
                setClass(response.data.classId.id)
                setEdv(response.data.edv)
                setEmail(response.data.email)
                setRole(response.data.role)
                console.log(response.data)
            } catch(error){
                console.error(error);
            }
        }
        getUser()
    },[])

    useEffect(() => {
        const getAbilities = async () => {
            try{
                const response = await api.get(`ability/${userId}`)
                setAbilityData(response.data)
                console.log(response.data)
            } catch(error) {
                console.error(error);
            }
        }
        getAbilities()
    }, [isAbilityModalOpen])

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

    const openAbility = () => {
        setAbilityModalOpen(true);
    }

    const closeAbility = () => {
        setAbilityModalOpen(false);
    }

    const openEditAbility = () => {
        setEditAbilityModalOpen(true);
    }

    const closeEditAbility = () => {
        setEditAbilityModalOpen(false);
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
            const response = await api.put(`user/auth/${userId}`, updateUser, {
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

      const handleAbility = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const setAbility = {
            userId: userId,
            name: abilityName,
            strenght: strenght,
        };

        try {
            const response = await api.post(`ability/auth`, setAbility,{
                headers: {
                    auth: `${token}`
                }});
            setAbilityData(response.data)
            alert("Dados atualizados!")
            console.log(response)
            closeAbility()
        } catch (error) {
            console.error("Erro ao atualizar os dados:", error);
        }
      };

      const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const token = localStorage.getItem("token");

        const updateAbility = {
            userId: userId,
            name: abilityName,
            strenght: strenght
        };

        try {
            const response = await api.patch(`ability/auth/${ability[].id}`, updateAbility, {
                headers: {
                    auth: `${token}`
                }});
            
            alert("Habilidade atualizada!")
            console.log(response)
            closeEditAbility();
        } catch (error) {
            console.error("Erro ao atualizar a habilidade:", error);
        }
      };

    return (
        <> 

            <div style={{display: 'flex', justifyContent: 'end', padding: '10px'}}>
                {user?.role === "Apprentice" && (userType !== "Apprentice" || userType === user.role)&&(
                    <StyledDropdownButton onClick={openAverageGraph}>Médias</StyledDropdownButton>
                )}
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

                    <>
                        <StyledDropdownButton onClick={openAbility}>+ Habilidade</StyledDropdownButton>
                        <StyledAddButton onClick={openModal}>Editar dados</StyledAddButton>
                    </>
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
                                    {classes.map((classItem) => (
                                        <option key={classItem.id} value={classItem.id}>{classItem.name}</option>
                                        
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

        {isAbilityModalOpen && (
            <StyledModalOverlay>
                <StyledModalContent>
                    <StyledCloseButton onClick={closeAbility}>X</StyledCloseButton>
                        <h2>Adicionar habilidade</h2>
                        <StyledForm onSubmit={handleAbility}>
                        
                            <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                                <StyledInput
                                    type="text"
                                    placeholder="Nome da habilidade"
                                    value={abilityName}
                                    onChange={(e) => setAbilityName(e.target.value)}
                                    required
                                />
                              
                                    <StyledSelect
                                        value={strenght}
                                        onChange={(e) => setStrenght(e.target.value)}
                                        required
                                    >   
                                            <><option value="">Selecione um nível</option>
                                                {abilityData.map((i) =>(
                                                <option value={i}>{i}</option>  
                                                ))}
                                            
                                            </>
                                    </StyledSelect>

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

            <hr style={{ margin: "25px 0" }} />
            {userType !== "Apprentice"  &&(
                <>
                <h1>Habilidades</h1>
                <div style={{ display: "flex", justifyContent: "center", overflow: "auto" }}>
                
                    <StyledBoxCard>
                        {Array.isArray(ability) && Array.isArray(ability) && ability.map(index => (
                            <Card key={index.id} onClick={openEditAbility} name={index.name} strenght={index.strength} />
                            
                        ))}
                    </StyledBoxCard>

                </div>
                 {isEditAbilityModalOpen && (
            <StyledModalOverlay>
                <StyledModalContent>
                    <StyledCloseButton onClick={closeEditAbility}>X</StyledCloseButton>
                        <h2>Editar habilidade</h2>
                        <StyledForm onSubmit={handleEdit}>
                        
                            <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                                <StyledInput
                                    type="text"
                                    placeholder="Nome da habilidade"
                                    value={abilityName}
                                    onChange={(e) => setAbilityName(e.target.value)}
                                    required
                                />
                              
                                    <StyledSelect
                                        value={strenght}
                                        onChange={(e) => setStrenght(e.target.value)}
                                        required
                                    >   
                                            <><option value="">Selecione um nível</option>
                                                {abilityData.map((i) =>(
                                                <option value={i}>{i}</option>  
                                                ))}
                                            
                                            </>
                                    </StyledSelect>

                                <StyledSubmitButton  type="submit">Salvar</StyledSubmitButton>
                            </div>
    
                        </StyledForm>
                    </StyledModalContent>
                </StyledModalOverlay>
            )}
                </>
            )}

        </>
    )
}