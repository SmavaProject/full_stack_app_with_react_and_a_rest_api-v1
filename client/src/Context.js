import React, { Component } from 'react';
import Data from './Data';
const Context = React.createContext();

export class Provider extends Component {
    constructor() {
        super();
        this.data = new Data();
    }

    const value = {
        data: this.data,
    };

    render() {
        return (
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>
        );
    }

    export default function withContext(Component) {
        return function ContextComponent(props) {
            return (
                <Context.Consumer>
                    {context => <Component {...props} context={context} />}
                </Context.Consumer>
            );
        }
    }


}
