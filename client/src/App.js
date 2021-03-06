import './global.css';
import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from "./components/UserSignOut";
import withContext from './Context';
import PrivateRoute from './PrivateRoute';
import Header from "./components/Header";
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
const HeaderWithContext = withContext(Header);
const CoursesWithCOntext = withContext(Courses);
const CourseDetailsWithContext = withContext(CourseDetail);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);

class App extends Component {
    render() {
        return (
            < BrowserRouter >
                < div className="container">
                    <HeaderWithContext/>
                    <Switch>
                        <PrivateRoute path="/courses/create" component={CreateCourseWithContext}/>
                        <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext}/>
                        <PrivateRoute path="/courses/:id" component={CourseDetailsWithContext}/>
                        <Route path="/signup" component={UserSignUpWithContext}/>
                        <Route path="/signin" component={UserSignInWithContext}/>
                        <Route path="/signout" component={UserSignOutWithContext}/>
                        <Route exact path="/" component={CoursesWithCOntext}/>
                        <Route exact path="/courses" component={CoursesWithCOntext}/>
                    </Switch>
                    </div>
            </BrowserRouter>
    );
}
}
export default App;
