import React from "react";

const Input = (props) => {
    return (
        <input
            value={props.value}
            className={props.className}
            placeholder={props.placeholder}
            type={props.type}
            onChange={(event) => {
                props.setValue(event.target.value);
            }}
        />
    );
}

export default Input;