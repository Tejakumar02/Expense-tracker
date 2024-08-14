import React from "react";
import Header from "../Header/Header";

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <Header />
            <div className="content-area">
                {children}
            </div>
        </div>
    )
}

export default Layout;