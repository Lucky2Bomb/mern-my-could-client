import React, { useState } from "react";
import "../../less/style.scss";
import Logo from "../../assets/img/cloud-logo-64px.png";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../reducers/userReducer";
import { searchFiles, getFiles } from "../../actions/file";
import { showLoader } from "../../reducers/appReducer";
import defaultAvatar from "../../assets/svg/defaultAvatar.svg";
import { API_URL } from "../../config";

const Navbar = () => {
    const [searchName, setSearchName] = useState("");
    const currentUser =  useSelector(state => state.user.currentUser);
    const currentDir = useSelector(state => state.file.currentDir);
    const [searchTimeout, setSearchTimeout] = useState(false);
    const isAuth = useSelector(state => state.user.isAuth);
    const avatar = currentUser.avatar ? `${API_URL}/${currentUser.avatar}` : defaultAvatar;
    const dispatch = useDispatch();

    function searchChangeHandler(e) {
        setSearchName(e.target.value);
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        dispatch(showLoader());
        if (e.target.value !== "") {
            setSearchTimeout(setTimeout((value) => {
                dispatch(searchFiles(value));
            }, 1000, e.target.value));
        } else {
            dispatch(getFiles(currentDir));
        }
    }

    return (
        <div className="navbar-wrapper">
            <div className="navbar">
                <NavLink to="/" className="navbar__left-container">
                    <img className="navbar__logo" src={Logo} alt="" />
                    <div className="navbar__header">MY CLOUD</div>
                </NavLink>

                <div className="navbar__right-container">
                    {isAuth && <input value={searchName} onChange={e => searchChangeHandler(e)} className="navbar__search form-authentication__input" type="text" placeholder="Search file..." />}
                    {isAuth && <NavLink className="navbar__avatar" to="/profile"><img src={avatar} alt="" /></NavLink>}
                    {!isAuth && <div className="navbar__login"><NavLink to="/login">login</NavLink></div>}
                    {!isAuth && <div className="navbar__registration"><NavLink to="/registration">registration</NavLink></div>}
                    {isAuth && <div className="navbar__login" onClick={() => dispatch(logout())}>logout</div>}
                </div>
            </div>
        </div>
    )
}

export default Navbar;