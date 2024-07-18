import { ReactNode } from 'react'

type ClassesProps = {
    children: ReactNode
}

export const Classes = ({ children }: ClassesProps) => {
    return (
        <>
            {children}
        </>
    )
}
