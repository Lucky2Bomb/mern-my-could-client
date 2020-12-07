import React from 'react';
import UploadFile from './UploadFile/UploadFile';
import { useSelector, useDispatch } from 'react-redux';
import { hideUploader } from '../../../reducers/uploadReducer';

const Uploader = () => {
    const files = useSelector(state => state.upload.files);
    // [
    //     { id: 1, name: "file1", progress: 50 },
    //     { id: 2, name: "file2", progress: 0 },
    // ];
    const isVisible = useSelector(state => state.upload.isVisible);
    const dispatch = useDispatch();

    return (isVisible &&
        <div className="uploader">
            <div className="uploader__header">
                <div className="uploader__title">Downloads</div>
                <button className="uploader__button-x" onClick={() => dispatch(hideUploader())}>&#10006;</button>
            </div>
            {files.map(file =>
                <UploadFile key={file.id} file={file} />
            )}
        </div>
    )
}

export default Uploader;
