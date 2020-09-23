import React, { Component } from 'react'


//Create a form that asks for Lsit and Handstand holds, onSubmit, will send data back to firstTimeForm
export class staticsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lsit: '',
            handstand: '',
        };
        this.handleLsitChange = this.handleLsitChange.bind(this);
        this.handleHandstandChange = this.handleHandstandChange.bind(this);
        this.handleLsitSubmit = this.handleLsitSubmit.bind(this);
        this.handleHandstandSubmit = this.handleHandstandSubmit.bind(this);
    }


    render() {
        return (
            <div>

            </div>
        )
    }
}

export default staticsForm
