import React, { Component } from 'react'


//Create a form that asks for Pullup and Row Strength, onSubmit, will send data back to firstTimeForm
export class pullForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pullups: '',
            rows: '',
        };
        this.handlePullupChange = this.handlePullupChange.bind(this);
        this.handleRowChange = this.handleRowChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handlePullupChange(event) {
        this.setState({
            pullups: event.target.value,
            rows: this.state.rows //Keep row State
        })
    }

    handleRowChange(event) {
        this.setState({
            pullups: this.state.pullups,//Keep pullup State
            rows: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        //send to firstTimeForm


        this.setState({
            pullups: "",
            rows: "",
        })
    }



    render() {
        return (
            <div>
                {/* pullup change input, PUT SOMEWHERE LATER */}<input value={this.state.pullups} onChange={this.handlePullupChange}></input>
                {/* row change input*/} <input value={this.state.rows} onChange={this.handleRowChange}></input>
            </div>
        )
    }
}

export default pullForm
