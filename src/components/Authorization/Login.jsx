import React, { useState } from "react";
import "../../less/style.scss";
import Input from "../../utils/Input/Input";
import {useDispatch} from "react-redux";
import { login } from "../../actions/user";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    return (
        <div className="authorization">
            <div className="form-authentication">
                <div className="form-authentication__header">Login</div>
                <Input value={email} setValue={setEmail} className="form-authentication__input" type="email" placeholder="email"/>
                <Input value={password} setValue={setPassword} className="form-authentication__input" type="password" placeholder="password"/>
                <div className="form-authentication__button-wrapper">
                    <button className="form-authentication__button" onClick={() => dispatch(login(email, password)) }>login</button>
                </div>
            </div>
        </div>
    )
}

export default Login;