// style.js
import styled from "styled-components";
import Appbar from "./AppBar";

export const StyledNav = styled.nav`
    display: flex;
    padding: 20px;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    border: none;
    border-bottom: 1px #023E7D solid;
    position: fixed;
    background-color: #e9e9e9;
    top: 0;
    padding:0;
`;

export const StyledImage = styled.img`
    width: 100%;
    height: 15px;
    object-fit: cover;
    padding: 0;
`;

export const StyledAppbar = styled.header`
    position: fixed;
    width: 100%;

    z-index: 100;

    display: flex;
    flex-direction: column;
`