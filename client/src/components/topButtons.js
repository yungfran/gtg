import React, { Component } from 'react'
import FakeButton from "./fakeButton";

export class topButtons extends Component {
    render() {
        return this.props.colors.map((color) => (
            <div style={{
                width: "12px",
                display: "inline-block",
                marginLeft: "7px",
                opacity: "100%"
            }}>
                <FakeButton color={color} />
            </div>

        ));
    }
}

export default topButtons
