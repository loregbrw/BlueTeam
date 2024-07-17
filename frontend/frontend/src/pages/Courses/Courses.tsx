import { Card } from "./components/card/Card";
import { StyledBox } from "./style";
import { SideBar } from "./components/sideBar/SideBar";
export const Courses = () => {
    return (
        <>
            <div style={{display: "flex"}}>
                <SideBar />
                <StyledBox>
                    <Card />
                    <Card />
                    <Card />
                </StyledBox>
            </div>


        </>
    );

}