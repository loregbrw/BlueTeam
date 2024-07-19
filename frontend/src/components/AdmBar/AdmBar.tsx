import "./style"
import { StyledLogoutButton, StyledNavBar, StyledLink } from "./style";
import BoschLogo from "../../assets/BoschLogo.png"
import LogoutIcon from "../../assets/sair.png"
import { useNavigate } from "react-router-dom";

export const AdmBar = () => {

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('id');
        navigate('/')
    }

    return(
        <>
            <StyledNavBar>
                <img src={BoschLogo} alt="" style={{width: "150px"}} />
                <div style={
                    {
                        display: 'flex',
                        gap: "30px"
                    }
                }>
                    <StyledLink href={`/profile/${localStorage.getItem("id")}`}>Perfil</StyledLink>
                    <StyledLink href="/signup">Adicionar Usuário</StyledLink>
                    <StyledLink href="/classes">Turmas</StyledLink>
                    <StyledLink href="/subjects">Matérias</StyledLink>
                    <StyledLogoutButton onClick={handleLogout}>
                        <img src={LogoutIcon} alt="logout"/>
                    </StyledLogoutButton>
                </div>
            </StyledNavBar>
        </>
    )
}