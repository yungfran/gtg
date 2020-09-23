import React, { Component } from 'react';
import {Form,Button} from 'react-bootstrap'

class repsCompletedForm extends Component {
    state = {
        exercise: this.props.exerciseName,
        repsDone : 0
    }

    textStyle = {
        fontSize: "20px"
    }

    boxStyle = {
        fontSize: "20px"
    }

    handleChange = (event) => {
        this.setState({
            exercise: this.props.exerciseName,
            repsDone: event.target.value,
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.handleRepSubmit(this.state.repsDone)
    }

    render() {
        return (
            <div>
                <Form onSubmit = {this.handleSubmit}>
                    <Form.Group>
                        <Form.Control type = "number" placeholder = "Number of Reps Completed" onChange = {this.handleChange}
                        style = {this.boxStyle} />
                    </Form.Group>
                    <Button className = "Secondary" type = "submit"  style = {this.textStyle}>
                        Finish Set
                    </Button>
                </Form>
            </div>
        );
    }
}

export default repsCompletedForm;