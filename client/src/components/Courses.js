import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Courses extends Component {

    state = {
        courses: [],
        errors: []
    }

    componentDidMount() {
        debugger;
        const { context } = this.props;
        console.log("context " + context);

        context.data.getCourses().then((courses) => {
            if (courses) {
                this.setState({ courses });
            }
        }).catch( (error) => {
                this.props.history.push("/error");
            });
    }

    render() {
        const courses = this.state.courses.map( (course) => (
            <div className="grid-33" key={course.id}>
                <Link className="course--module course--link" id={course.id} to={`/courses/${course.id}`}>
                    <h4 className="course-label">Course</h4>
                    <h3 className="course-title">{course.title}</h3>
                </Link>
            </div>
        ));

        return (
            <div className="bounds">
                {courses}
                <div className="grid-33">
                    <Link className="course--module course--add--module" to="/courses/create">
                        <h3 className="course--add--title">+ New Course</h3>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Courses;
