import { Link } from 'react-router-dom';
import React, {Component} from "react";

export default class Header extends Component {
    render() {
        const {context} = this.props;
        const user = context.authenticatedUser;
        console.log("context " + context);
        return (
            <div className="header">
                <div className="bounds">
                    <h1 className="header--logo">Courses</h1>
                    <nav>
                        {user ? (
                            <React.Fragment>
                                <span>Welcome, {user.firstName}  {user.lastName}!</span>
                                <Link className="signout" to="/signout">Sign Out</Link>
                            </React.Fragment>
                            ):(
                        <React.Fragment>
                            <Link className="signup" to="/signup">Sign Up</Link>
                            <Link className="signin" to="/signin">Sign In</Link>
                        </React.Fragment>
                            )}
                    </nav>
                </div>
            </div>
        );
    }
};
