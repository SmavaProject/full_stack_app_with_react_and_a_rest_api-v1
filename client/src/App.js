import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import withContext from './Context';


class App extends Component {


    render() {
        const UserSignUpWithContext = withContext(UserSignUp);

        console.log("rendering... ");
        return (
            < BrowserRouter >
                < div className = "container" >< /div>
                    <Switch>
                        <Route path="/signup" component={UserSignUpWithContext} />

                        <Route path="/" component={Courses}/>
                        <Route path="/coursedetail/:id" component={CourseDetail}/>
                    </Switch>
            < /BrowserRouter>
    )
        ;
    }
}
export default App;
