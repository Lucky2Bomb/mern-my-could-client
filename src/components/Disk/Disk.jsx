import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFiles, uploadFile } from "../../actions/file";
import FileList from "./FileList/FileList";
import "../../less/style.scss";
import Popup from "./Popup/Popup";
import { setPopupDisplay, setCurrentDir, setFileView } from "../../reducers/fileReducer";
import Uploader from "./Uploader/Uploader";
import Loader from "../../utils/Loader/Loader";

const Disk = () => {
    const dispatch = useDispatch();
    const loader = useSelector(state => state.app.loader);
    const currentDir = useSelector(state => state.file.currentDir);
    const dirStack = useSelector(state => state.file.dirStack);
    const [dragEnter, setDragEnter] = useState(false);
    const [sort, setSort] = useState("name");
    const [view, setView] = useState("list");

    useEffect(() => {
        dispatch(getFiles(currentDir, sort));
    }, [currentDir, sort]);
    
    useEffect(() => {
        console.log(view);
        dispatch(setFileView(view));
    }, [view]);

    function createDirHandler() {
        dispatch(setPopupDisplay("flex"));
    }

    function backDirHandler() {
        const backDirId = dirStack.pop();
        dispatch(setCurrentDir(backDirId));
    }

    function fileUploadHandler(event) {
        const files = [...event.target.files];
        files.forEach(file => dispatch(uploadFile(file, currentDir)));
    }

    function dragEnterHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        setDragEnter(true);
    }

    function dragLeaveHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        setDragEnter(false);
    }

    function dropHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        let files = [...event.dataTransfer.files];
        files.forEach(file => dispatch(uploadFile(file, currentDir)));
        setDragEnter(false);
    }

    if (loader) {
        return (
            <Loader />
        )
    }

    if (dragEnter) {
        return (
            <div className="drop-area" onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
                <div className="drop-area__content">
                    <div className="drop-area__text">
                        Drop file this
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="disk-wrapper" onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
                <div className="disk">
                    <div className="disk__buttons">
                        <button className="disk__create-dir" onClick={() => createDirHandler()}>create directory</button>
                        <button className="disk__back" onClick={() => backDirHandler()}>back</button>
                        <div className="disk__upload">
                            <label htmlFor="disk__upload-input" className="disk__upload-label">Upload file</label>
                            <input multiple={true} onChange={(e) => fileUploadHandler(e)} type="file" id="disk__upload-input" className="disk__upload-input" />
                        </div>
                        <select value={sort} onChange={e => setSort(e.target.value)} className="disk__select">
                            <option value="name">Name</option>
                            <option value="type">Type</option>
                            <option value="date">Date</option>
                        </select>

                        <select value={view} onChange={e => setView(e.target.value)} className="disk__select">
                            <option value="list">List</option>
                            <option value="plate">Plate</option>
                        </select>
                    </div>
                    <FileList />
                    <Popup />
                    <Uploader />
                </div>
            </div>
        );
    }

}

export default Disk;