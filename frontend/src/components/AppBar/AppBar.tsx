// Appbar.js
import boschColors from "../../assets/boschColors.jpg";
import { StyledImage } from "./style";
import { Instructorbar } from "../InstructorBar/Instructorbar";
import { StyledAppbar } from "./style";
import { AdmBar } from "../AdmBar/AdmBar";
import { ApprendiceBar } from "../ApprendiceBar/ApprendiceBar";
import { EmptyNav } from "../EmptyNav/EmptyNav";


const Appbar = () => {

    const role = localStorage.getItem("role");

    let navBarComponent = null;

    if(role == "Adm"){
        navBarComponent = <AdmBar/>;
    }
    else if(role == "Instructor"){
        navBarComponent = <Instructorbar/>
    }
    else if(role == "Apprentice"){
        navBarComponent = <ApprendiceBar/>
    }
    else{
        navBarComponent = <EmptyNav/>
    }

    return (
        <>
            <StyledAppbar>
                <StyledImage src={boschColors} alt="Bosch Colors Logo" />
                {/* {navBarComponent} */}
                <AdmBar/>
            </StyledAppbar>
        </>
    );
};

export default Appbar;