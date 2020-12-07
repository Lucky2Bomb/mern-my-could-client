import React from 'react';
import "../../../less/style.scss";
import { useSelector } from 'react-redux';
import File from './File/File';
import { TransitionGroup, CSSTransition } from "react-transition-group";

const FileList = () => {

    const files = useSelector(state => state.file.files);
    const fileView = useSelector(state => state.file.view);

    if (files.length === 0) {
        return (
            <div className="container__center-center">This folder is still empty...</div>
        )
    }

    // const files = [{
    //     _id: 1,
    //     name: "directory_1",
    //     type: "dir",
    //     size: "1gb",
    //     date: "2020.12.25",
    // }, {
    //     _id: 2,
    //     name: "direc_2",
    //     type: "dir",
    //     size: "522mb",
    //     date: "2020.12.26",
    // }].map(file => <File key={file._id} file={file}/>);

    switch (fileView) {
        case "plate": return (
            <div className="file-plate-wrapper">
                {files.map(file =>
                    <File key={file._id} file={file} />
                )}
            </div>
        )
        default: return (
            <div className="file-list">
                <div className="file-list__header">
                    {/* <div className="file-list__icon"></div> */}
                    <div className="file-list__name">Name</div>
                    <div className="file-list__date">Date</div>
                    <div className="file-list__size">Size</div>
                </div>
                <TransitionGroup>
                    {
                        files.map(file =>
                            <CSSTransition key={file._id} timeout={600} classNames="file" exit={false}>
                                <File file={file} />
                            </CSSTransition>)
                    }
                </TransitionGroup>
            </div>
        );
    }

}

export default FileList;