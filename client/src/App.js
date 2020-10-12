import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";


class App extends Component {
    render() {
        console.log("rendering... ");
        return (
            < BrowserRouter >
                < div className = "container" >< /div>
                    <Switch>
                        <Route path="/" component={Courses}/>
                        <Route path="/coursedetail/:id" component={CourseDetail}/>
                    </Switch>
            < /BrowserRouter>
    )
        ;
    }
}
export default App;
