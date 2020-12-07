import React, { useState } from "react";
import Input from "../../../utils/Input/Input";
import "../../../less/style.scss";
import { useSelector, useDispatch } from "react-redux";
import { setPopupDisplay } from "../../../reducers/fileReducer";
import { createDir } from "../../../actions/file";

const Popup = () => {
    const [dirName, setDirName] = useState("New directory");
    const popupDisplay = useSelector(state => state.file.popupDisplay);
    const currentDir = useSelector(state => state.file.currentDir);
    const dispatch = useDispatch();

    function closePopupHandler() {
        dispatch(setPopupDisplay("none"));
    }

    function createDirHandler() {
        console.log("create dir");
        dispatch(createDir(currentDir, dirName));
        setDirName("");
        closePopupHandler();
    }

    return (
        <div className="popup" onClick={(() => { closePopupHandler() })} style={{ display: popupDisplay }} >
            <div className="popup__container" onClick={(event) => event.stopPropagation()}>
                <div className="popup__header">
                    <div className="popup__title">Create new directory</div>
                    <button className="popup__button-x" onClick={(() => { closePopupHandler() })}>&#10006;</button>
                </div>

                <Input className="popup__input" type="text" placeholder="Enter name of the new directory" value={dirName} setValue={setDirName} />

                <div className="popup__footer">
                    <button className="popup__create" onClick={(() => { createDirHandler() })}>Create directory</button>
                    <button className="popup__close" onClick={(() => { closePopupHandler() })}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default Popup;