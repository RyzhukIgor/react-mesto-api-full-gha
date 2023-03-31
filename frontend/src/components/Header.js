import React from "react";
import headerLogo from "../images/logo.svg";
import { Routes, Route, Link } from "react-router-dom";

export default function Header(props) {
    const {userEmail,onSignExit} = props;
    return (
        <div className="header">
            <img
                src={headerLogo}
                className="header__logo"
                alt="логотип Место"
            />
            <div className="header__nav"> 
            <Routes>
                <Route path="sign-in" element={<Link to="/sign-up" className="header__link" >Регистрация</Link> }/>
                <Route path="sign-up" element={<Link to="/sign-in" className="header__link" >Войти</Link> }/>
                <Route path="/" element={
                    <>
                    <p className="header__email">{userEmail}</p>
                    <Link to="/sign-in" className="header__link" onClick={onSignExit}>Выйти</Link>
                    </>
                }/>
            </Routes>
            </div>
        </div>
    );
}
