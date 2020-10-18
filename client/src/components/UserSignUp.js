import React, {Component} from "react";
import Form from './Form';
import { Link } from 'react-router-dom';

class UserSignUp extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors: [],
    }

    render() {
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            errors,
        } = this.state;

        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <Form
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitButtonText="Sign Up"
                        elements={() => (
                            <React.Fragment>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    value={firstName}
                                    onChange={this.change}
                                    placeholder="First Name" />
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    value={lastName}
                                    onChange={this.change}
                                    placeholder="Last Name" />
                                <input
                                    id="email"
                                    name="email"
                                    type="text"
                                    value={email}
                                    onChange={this.change}
                                    placeholder="Email Address" />
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={this.change}
                                    placeholder="Password" />
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="confirmPassword"
                                    value={confirmPassword}
                                    onChange={this.change}
                                    placeholder="Confirm Password" />
                            </React.Fragment>
                        )} />
                    <p>
                        Already have a user account? <Link to="/signin">Click here</Link> to sign in!
                    </p>
                </div>
            </div>
        );
    }

    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

    submit = () => {
        const {context} = this.props;
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        } = this.state;

        // Create user
        const user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        };

        if (password !== confirmPassword) {
            this.setState({
                errors: ["Password and Confirm password dont match"]
            });
        } else {
            context.data.createUser(user)
                .then(errors => {
                    if (errors.length) {
                        this.setState({errors});
                    } else {
                        console.log(`${lastName} is successfully signed up and authenticated!`);
                        context.actions.signIn(lastName, password)
                            .then(() => {
                                this.props.history.push('/courses');
                            });
                    }
                }).catch((err) => {
                    console.log(err);
                    this.props.history.push('/error');
                });

        }
    }
    cancel = () => {
        this.props.history.push('/');
    }

}

export default UserSignUp;
