import React, { Component } from 'react'

export class fakeButton extends Component {
    render() {

        const fakeButton = {
            backgroundColor: `${this.props.color}`,
            marginLeft: "10px",
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            display: "inline-block",
            opacity: "100%"
        }
        return (
            <div>
                <div style={fakeButton}></div>
            </div>
        )
    }
}

export default fakeButton;
