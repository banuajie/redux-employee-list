import React from "react";

const Header = () => {
    return (
        <>
            <section id="header">
                <nav className="navbar bg-body-tertiary bg-primary sticky-top">
                    <div className="container-fluid justify-content-center pt-2 pb-2">
                        <span className="navbar-brand mb-0 fs-3">Aplikasi List Karyawan</span>
                    </div>
                </nav>
            </section>
        </>
    );
};

export default Header;
