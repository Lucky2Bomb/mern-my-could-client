import React, { useState } from "react";
import "../../less/style.scss";
import Input from "../../utils/Input/Input";
import { registration } from "../../actions/user";

const Registration = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div className="authorization">
            <div className="form-authentication">
                <div className="form-authentication__header">Registation</div>
                {/* <input className="form-authentication__input" value={email} setValue={setEmail} type="email" placeholder="email" name="" id="" />
                <input className="form-authentication__input" value={password} setValue={setPassword} type="password" placeholder="password" name="" id="" /> */}
                <Input value={email} setValue={setEmail} className="form-authentication__input" type="email" placeholder="email"/>
                <Input value={password} setValue={setPassword} className="form-authentication__input" type="password" placeholder="password"/>
                <div className="form-authentication__button-wrapper">
                    <button className="form-authentication__button" onClick={() => {
                        registration(email, password);
                    }}>registation</button>
                </div>
            </div>
        </div>
    )
}

export default Registration;