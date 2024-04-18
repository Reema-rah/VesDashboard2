import React from "react";
import { useCookies } from 'react-cookie'
import { Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function Splash() {

    const navigate = useNavigate()

    const login = () => {
        navigate("/login")
    }

    const Signup = () => {
        navigate("/Signup")
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <Button className="button1" onClick={Signup}>Signup</Button>
                <br />
                <br />
                <center>
                    OR
                </center>

                <br />
                <Button className="button2" onClick={login}>Login</Button>
            </div>
        </div>

    )
}

export default Splash;