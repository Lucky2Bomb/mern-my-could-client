import React from "react";
import "../../../../less/style.scss";
import fileIcon from "../../../../assets/svg/file.svg";
import dirIcon from "../../../../assets/svg/dir.svg";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentDir, pushToStack } from "../../../../reducers/fileReducer";
// import downloadIcon from "../../../../assets/svg/download.svg";
// import deleteIcon from "../../../../assets/svg/delete.svg";
import { downloadFile, deleteFile } from "../../../../actions/file";
import sizeFormat from "../../../../utils/sizeFormat";


const File = ({ file }) => {

    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.file.currentDir);
    const fileView = useSelector(state => state.file.view);
    const maxListFileLength = 90;
    const maxPlateFileLength = 45;

    function openDirHandler(file) {
        if (file.type === "dir") {
            dispatch(pushToStack(currentDir));
            dispatch(setCurrentDir(file._id));
        }
    }

    function downloadClickHandler(e) {
        e.stopPropagation();
        downloadFile(file);
    }

    function deleteClickHandler(e) {
        e.stopPropagation();
        dispatch(deleteFile(file));
    }

    switch (fileView) {
        case "plate":
            return (
                <div className="file-plate" onClick={() => openDirHandler(file)}>
                    <div className="file-plate__logo"><img src={file.type === "dir" ? dirIcon : fileIcon} alt="" /></div>
                    <div className="file-plate__name">{file.name.length < maxPlateFileLength ? file.name : `${file.name.slice(0, maxPlateFileLength)}...`}</div>
                    <div className="file-plate__buttons">
                        {file.type !== "dir" &&
                            <button className="file-plate__download" onClick={(e) => downloadClickHandler(e)}> Download </button>
                        }
                        <button className="file-plate__delete" onClick={(e) => deleteClickHandler(e)}> Delete </button>
                    </div>
                </div>
            );

        default:
            return (
                <div className="file" onClick={() => openDirHandler(file)}>
                    <div className="file__logo"><img src={file.type === "dir" ? dirIcon : fileIcon} alt="" /></div>
                    <div className="file__name">{file.name.length < maxListFileLength ? file.name : `${file.name.slice(0, maxListFileLength)}...`}</div>
                    <div className="file__date">{`${file.date.slice(0, 4)}.${file.date.slice(5, 7)}.${file.date.slice(8, 10)}`}</div>
                    <div className="file__size">{file.type !== "dir" && sizeFormat(file.size)}</div>
                    {file.type !== "dir" &&
                        <button className="file__download" onClick={(e) => downloadClickHandler(e)}>
                            Download
                            {/* <div className="file__icon-wrapper">
                                <img className="file__icon" src={downloadIcon} alt="" /> 
                            </div> */}
                        </button>}
                    <button className="file__delete" onClick={(e) => deleteClickHandler(e)}>
                        Delete
                        {/* <div className="file__icon-wrapper">
                            <img className="file__icon" src={deleteIcon} alt="" />
                        </div> */}
                    </button>
                </div>
            );
    }


}

export default File;
