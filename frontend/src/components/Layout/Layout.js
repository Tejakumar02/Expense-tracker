import React from "react";
import Header from "../Header/Header";
import LeftNav from "../LeftNav/LeftNav";

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <Header />
            <div className="main-area">
                <LeftNav />
                <div className="content-area">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout;