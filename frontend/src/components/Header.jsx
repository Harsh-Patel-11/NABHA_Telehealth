import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from 'react-router-dom';
import { FaClinicMedical} from "react-icons/fa";
const Header = () => {
    return (
        <header>
            <div className="header-content">
                <div className="logo">
                    <FaClinicMedical />
                    <span>Nabha Telehealth</span>
                </div>
                <nav>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#register-patient">Register (Patient)</a></li>
                        <li><a href="#register-doctor">Register (Doctor)</a></li>
                        <li><a href="#find-doctor">Find Doctor</a></li>
                        <li><a href="#book">Book</a></li>
                        <li><a href="#chat">Chat (AI)</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;