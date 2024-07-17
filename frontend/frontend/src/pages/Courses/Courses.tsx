import { Card } from "./components/card/Card";
import { StyledBox } from "./style";
import { AdmBar } from "../../components/AdmBar/AdmBar";
import { StyledInputCourses } from "./style";
import { StyledInputDiv } from "./style";
import lupa from "../../assets/lupa.png"

export const Courses = () => {
    return (
        <>
            <AdmBar />
            <StyledInputDiv >
                <StyledInputCourses/>
                <img src={lupa} alt="" style={{width: "30px", height: "30px"}} />
            </StyledInputDiv>

            <StyledBox>
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </StyledBox>



        </>
    );

}