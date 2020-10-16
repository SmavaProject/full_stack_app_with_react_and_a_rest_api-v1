import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import withContext from './Context';
import Header from "./components/Header";
const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);

class App extends Component {
    render() {
        return (
            < BrowserRouter >
                < div className="container">
                    <HeaderWithContext/>
                    <Switch>
                        <Route path="/signup" component={UserSignUpWithContext}/>
                        <Route path="/signin" component={UserSignInWithContext}/>

                        <Route path="/" component={Courses}/>
                        <Route path="/coursedetail/:id" component={CourseDetail}/>
                    </Switch>
                    </div>
            </BrowserRouter>
    );
}
}
export default App;
