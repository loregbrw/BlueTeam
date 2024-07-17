import { StyledLogoutButton, StyledNavBar, StyledLink } from "./style"
import BoschLogo from "../../assets/BoschLogo.png";
import LogoutIcon from "../../assets/sair.png";
import { useNavigate } from "react-router-dom";

export const EmptyNav = () => {

    return(
        <>
            <StyledNavBar>
                <img src={BoschLogo} alt="" style={{width: "150px"}} />
            </StyledNavBar>
        </>
    )
}