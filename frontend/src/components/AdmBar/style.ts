import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledNavBar = styled.div`
    width: 100%;
    height: 60px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
`;

export const StyledLogoutButton = styled.button`
    align-items: center;
    cursor: pointer;
    border: none;

    &:hover{
        scale: 1.05;
    }

    img{
        height: 20px;
        width: 20px;
    }
`

export const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    cursor: pointer;
    padding-bottom: 5px;
    display: inline-block;
    position: relative;

    &::after{
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 0;
        height: 2px;
        background: red;
        transition: width 0.3s ease;
    }

    &:hover:after{
        width: 100%;
    }
`