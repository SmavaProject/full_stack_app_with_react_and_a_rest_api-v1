import React, {Component} from 'react';
import {Link, NavLink} from "react-router-dom";
import ReactMarkdown from "react-markdown";

class CourseDetail extends Component {
    state = {
        courseDetail: {
            user: {},
            materialsNeeded: {}
        },
        errors: []
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        const {context} = this.props;

        context.data.detCourseDetails(id).then((response => {
            if (response){
                this.setState({
                    courseDetail: response,
                    user: response.owner,
                    materialsNeeded: response.materialsNeeded
                });
            }else{
                this.props.history.push("/error");
            }
        })).catch(error => {
            console.log(error);
        });
    }


    userIsAuthenticated (authenticatedUser, user) {
        return authenticatedUser.emailAddress === user.emailAddress
    }

    deleteCourse = () => {
        const {context} = this.props;
        const {
            courseDetail,
        } = this.state;

        const user = courseDetail.user;
        //need to get the password from the context.authenticatedUser, because API returns courseDetail.user without the password
        const password = context.authenticatedUser.password;
        context.data.deleteCourse(courseDetail.id, user.emailAddress, password).then( errors => {
            if (errors.length > 0){
                console.log(errors);
            }else{
                this.props.history.push('/');
            }
        }).catch(errors => {
            console.log(errors);
        });
    }

    render() {

        const {
            courseDetail,
        } = this.state;

        const user = courseDetail.user;
        const materialsNeeded = courseDetail.materialsNeeded;

        console.log("materialsNeeded " + materialsNeeded)
        const {context} = this.props;
        const {authenticatedUser} = context;

        console.log("authenticatedUser.emailAddress " + authenticatedUser.emailAddress)
        console.log("user.emailAddress " + user.emailAddress)

        const courseID = this.props.match.params.id; //string
        //const courseID = courseDetail.id; //number
        console.log("user " + user)
        console.log("courseDetail " + courseDetail)

        return (

            <div>
                <div className="action--bar">
                    <div className="bounds">
                        <div className="grid-100">


                        <span>{this.userIsAuthenticated(authenticatedUser, user) ? (
                                <React.Fragment>
                                    <NavLink className="button" to={`/courses/${courseID}/update`}>Update Course</NavLink>
                                    <button className="button" onClick={this.deleteCourse}>Delete Course</button>
                                </React.Fragment>
                            ) : <hr/>}
                        </span>
                            <Link className="button button-secondary" to="/">Return to List</Link>

                        </div>
                    </div>
                </div>


                <div className="bounds course--detail">
                    <div className="grid-66">
                        <div className="course--header">

                            <h4 className="course--label"> Course </h4>
                            <h3 className="course--title"> {courseDetail.title} </h3>
                            <h3> Owner </h3>
                            <h3> By {user.firstName} {user.lastName} </h3>
                            <div className="course--description">
                                <p> {courseDetail.description} </p>
                            </div>

                            <div className="grid-25 grid-right">
                                <div className="course--stats">
                                    <ul className="course--stats--list">
                                        <li className="course--stats--list--item">
                                            <h4>Estimated Time</h4>
                                            <h3> {courseDetail.estimatedTime} </h3>

                                        </li>

                                        <li className="course--stats--list--item">
                                            <h4>Materials Needed</h4>
                                            <ReactMarkdown>{materialsNeeded}</ReactMarkdown>
                                        </li>
                                    </ul>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
export default CourseDetail;
