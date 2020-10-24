import React, {Component} from "react";
import Form from './Form';
import { Link } from 'react-router-dom';

class UserSignIn extends Component{

    state = {
        emailAddress: '',
        password: '',
        errors: []
    }

    render() {
        const {
            emailAddress,
            password,
            errors
        } = this.state;

        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    <Form
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitButtonText="Sign In"
                        elements={() => (
                            <React.Fragment>
                                <input
                                    id="emailAddress"
                                    name="emailAddress"
                                    type="text"
                                    value={emailAddress}
                                    onChange={this.change}
                                    placeholder="Email Address" />
                                <input
                                    id="password"
                                    name="password"
                                    type="current-password"
                                    value={password}
                                    onChange={this.change}
                                    placeholder="Password" />
                            </React.Fragment>
                        )} />
                    <p> Don't have a user account? <Link to="/signup">Click here</Link> to sign up! </p>
                </div>
            </div>
        );
    }
    submit = () => {
        const { context } = this.props;
        const { emailAddress, password } = this.state;
        //call signIn function every time uppon clicking on submit
        context.actions.signIn(emailAddress, password).then( user => {
            if (user == null){
                this.setState( () => {
                    return {errors: ['User was not found. SignIn is not successfull']};
                });
            }else{
                this.props.history.push('/');
                console.log(`SUCCESS! ${emailAddress} is now signed in!`);

            }
        }).catch( error => {
            console.log(error);
            this.props.history.push('/error');
        });
        debugger;
        console.log("signIn" + emailAddress + password);
    }

    cancel = () => {
        this.props.history.push('/');
    }

    change = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        this.setState( () => {
            return {
                [name]: value
            };
        });
    }

}
export default UserSignIn;
