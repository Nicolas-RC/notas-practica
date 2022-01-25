import React from "react";

// Toast
import { ToastContainer } from 'react-toastify';

// Componentes de reactstrap
import {
    Nav,
    Navbar,
    NavItem,
    NavbarText,
    Collapse,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';

import { FaUserAlt } from 'react-icons/fa';

// Contextos
import { useAuth } from "../contexts/AuthContext";

// Componentes de notas 🤯
import Links from "./links/Links";
import Notas from "./notas/Notas";


const Inicio = () => {

    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const exit = async () => {
        try {
            await logout();
            navigate("/");
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div>
            <div>
                <Navbar color="dark" expand="md" fixed="top">
                    <Collapse navbar>
                        <Nav className="me-auto" navbar>
                            <NavItem>
                                <NavLink to="notas" className='nav-link'>Notas</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="sitiosweb" className='nav-link'>Sitios web</NavLink>
                            </NavItem>
                        </Nav>
                        <NavbarText>
                            <UncontrolledDropdown>
                                <DropdownToggle caret nav>
                                    <FaUserAlt />
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem text>
                                        <span><strong> {currentUser.email} </strong></span>
                                    </DropdownItem>
                                    <DropdownItem onClick={exit}>
                                        <span>Cerrar sesión</span>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </NavbarText>
                    </Collapse>
                </Navbar>
                <div className='p-3' style={{ marginTop: "-48px", marginLeft: "-435px", width: "1518px" }}>
                    <br /><br /><br />
                    <Routes>
                        <Route path="/sitiosweb" element={<Links />} />
                        <Route path="/notas" element={<Notas />} />
                    </Routes>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
};

export default Inicio;