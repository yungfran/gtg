import React, { Component } from 'react'

//Create a form that asks for Pushup and Dip Strength, onSubmit, will send data back to firstTimeForm
export class pushForm extends Component {

    state = {
        pullups: ' ',
        dips: ' ',
    }

    handlePushupChange = (event) => {
        this.setState({
            pushups: event.target.value,
            dips: this.state.rows //Keep row State
        })
    }

    handleDipChange = (event) => {

    }

    handleSubmit = (event) => {

    }



    render() {
        return (
            <div>

            </div>
        )
    }
}

export default pushForm
