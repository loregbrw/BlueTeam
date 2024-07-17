import { Instructorbar } from "../../components/InstructorBar/Instructorbar"
import { Class } from "./components/Class/Class"
import { Classes } from "./components/Classes/Classes"

export const Course = () => {
    return (
        <>
            <Instructorbar />
            <Classes>
                <Class />
                <Class />
                <Class />
                <Class />
                <Class />
                <Class />
                <Class />

            </Classes>
        </>
    )
}