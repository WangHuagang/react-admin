import React, { Component } from 'react';

import {addAction, shortAction} from './redux/actions'
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        this.numRef = React.createRef()
    }
    render() { 
        return ( 
            <div>
                <p>当前值: {this.props.store.getState()}</p>
                <select ref={this.numRef}>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                </select>
                <button onClick={this.add}>+</button>
                <button onClick={this.short}>-</button>
            </div>
         );
    }

    add = () => {
        const num = this.numRef.current.value * 1
        this.props.store.dispatch(addAction(num))
    }

    short = () => {
        const num = this.numRef.current.value * 1
        this.props.store.dispatch(shortAction(num))
    }
}
 
export default App;