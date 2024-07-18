// Appbar.js
import boschColors from "../../assets/boschColors.jpg";
import { StyledImage } from "./style";
import { Instructorbar } from "../InstructorBar/Instructorbar";
import { StyledAppbar } from "./style";


const Appbar = () => {
    return (
        <>
            <StyledAppbar>
                <StyledImage src={boschColors} alt="Bosch Colors Logo" />
                <Instructorbar />
            </StyledAppbar>
        </>
    );
};

export default Appbar;