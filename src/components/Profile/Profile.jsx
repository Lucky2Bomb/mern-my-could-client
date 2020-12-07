import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAvatar, uploadAvatar } from "../../actions/user";
import defaultAvatar from "../../assets/svg/defaultAvatar.svg";
import uploadIcon from "../../assets/svg/upload.svg";
import "../../less/style.scss";
import { API_URL } from "../../config";
import getFormatSizeString from "../../utils/sizeFormat";

const Profile = () => {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.user.currentUser);
    console.log(profile);
    const avatar = profile.avatar ? `${API_URL}/${profile.avatar}` : defaultAvatar;

    function uploadChangeHandler(e) {
        const file = e.target.files[0];
        dispatch(uploadAvatar(file));
    }

    return (
        <div className="profile-wrapper">
            <div className="profile">
                <div className="profile__avatar-info">
                    <div className="profile__avatar"><img src={avatar} alt="" /></div>

                    <button className="profile__button" onClick={() => dispatch(deleteAvatar())}>Delete avatar</button>
                    <label className="profile__upload-label" htmlFor="UploadAvatarInput"><img className="profile__icon" src={uploadIcon} alt="" /> Upload avatar</label>
                    <input accept="image/*" className="profile__input-file" onChange={(e) => uploadChangeHandler(e)} id="UploadAvatarInput" type="file" placeholder="Upload avatar" />

                </div>

                <div className="profile__info">
                    <div className="profile__email">{profile.email}</div>
                    <div className="profile__disk-space">
                        <div className="profile__fill-bar">
                            <div className="profile__fill-bar_filling" style={{width: `${Math.round(profile.usedSpace / profile.diskSpace * 100)}%`}}>

                            </div>
                        </div>
                        <div className="profile__info-filling">{getFormatSizeString(profile.usedSpace)} out of {getFormatSizeString(profile.diskSpace)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;