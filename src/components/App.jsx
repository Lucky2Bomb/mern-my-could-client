import React, { useEffect } from 'react';
import Navbar from './Navbar/Navbar';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./App.scss";
import Registration from './Authorization/Registration';
import Login from './Authorization/Login';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../actions/user';
import Disk from './Disk/Disk';
import Profile from './Profile/Profile';

function App() {

  const isAuth = useSelector(state => state.user.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth());
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        {!isAuth ?
          <Switch>
            <Route path="/registration" component={Registration} />
            <Route path="/login" component={Login} />
            <Redirect to="/login"/>
          </Switch> 
          :
          <Switch>
            <Route exact path="/" component={Disk} />
            <Route exact path="/profile" component={Profile} />
            <Redirect to="/"/>
          </Switch>
        }
      </div>
    </BrowserRouter>
  );
}

export default App;
