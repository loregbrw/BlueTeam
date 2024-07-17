import { StyledBar } from "./style"
import { StyledInput } from "./style";
import { StyledButton } from "./style";

export const SideBar = () => {

    return (
        <>
            <StyledBar>
                <StyledInput type="text" />
                <StyledButton>Add</StyledButton>
            </StyledBar>
        </>
    );

}