import React, {Component} from 'react';
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

        context.data.detCourseDetails(id).then(response => {
            if (response){

            }else{
                this.props.history.push("/error");
            }
        }).catch(error => {
            console.log(error);
        });

    }

    render() {
        return (
            <div>
                <h2>His is course details page</h2>
            </div>
        );
    }

}
export default CourseDetail;
