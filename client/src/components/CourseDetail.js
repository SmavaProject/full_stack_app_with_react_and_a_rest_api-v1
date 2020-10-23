import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import {Link} from "react-router-dom";


class CourseDetail extends Component {
    state = {
        courseDetail: {},
        materialsNeeded:[],
        user: {}
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        const {context} = this.props;

        context.data.detCourseDetails(id).then((response => {
            if (response){
                this.setState({
                    courseDetail: response.course,
                    user: response.course.owner,
                })
                debugger;
            }else{
                this.props.history.push("/error");
            }
        })).catch(error => {
            console.log(error);
        });

    }

    render() {

        const {
            courseDetail,
            user,
        } = this.state;


        const {context} = this.props;
        const {authenticatedUser} = context;

        const courseID = this.props.match.params.id;
        const parsedId = parseInt(courseID);



        return (
            <div className="action--bar">
                <div className="bounds">
                    <div className="grid-100">





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
                                                    <ul>
                                                        <li>1/2 x 3/4 inch parting strip</li>
                                                        <li>1 x 2 common pine</li>
                                                        <li>1 x 4 common pine</li>
                                                        <li>1 x 10 common pine</li>
                                                        <li>1/4 inch thick lauan plywood</li>
                                                        <li>Finishing Nails</li>
                                                        <li>Sandpaper</li>
                                                        <li>Wood Glue</li>
                                                        <li>Wood Filler</li>
                                                        <li>Minwax Oil Based Polyurethane</li>
                                                    </ul>
                                                </li>
                                            </ul>

                                        </div>
                                    </div>
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
