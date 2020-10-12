import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Courses extends Component {

    state = {
        courses: [],
        errors: []
    }

    render() {

        const {context} = this.props;
        let userCourses;

        if (this.context.courses != null){
            userCourses = this.context.courses.courses.map( course =>
            <li key={course.id}>
                <Link to={`/coursedetail/${course.id}`} className="links"> course.title </Link>
            </li>
            )
        }

        return (
            <div>
                <h1> Courses </h1>
                <ul>{userCourses}</ul>
            </div>
        );
    }
}

export default Courses;
