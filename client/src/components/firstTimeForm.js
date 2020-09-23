import React, { Component } from 'react'
import TopButtons from "./topButtons"

//First time form will ask stuff from strength schema
//Stores all data from the user, then will create a new strength object that stores the users init and current strength
//Unsure if i want to have strength in another collection or have a strength object in the person schema that has two objects:init and curr strength
//Maybe implement some react transitions, ask for push strength, then go to another form window that asks for pull strength
//Will look for videos too
export class firstTimeForm extends Component {
    state = {
        strength: {
            pushStrength: {
                pushups: '',
                dips: '',
            },
            pullStrength: {
                pullups: '',
                rows: '',
            },
            // staticStrength: {
            //     lsit: '',
            //     handstand: ''
            // }
        }
    }

    handlePushupChange = (event) => {
        //Keep state for pull strength, static strength, and dip strength
        this.setState({
                strength:{
                    pullStrength: this.state.strength.pullStrength,
                    //staticStrength: this.state.strength.staticStrength,
                    pushStrength: {
                        dips: this.state.strength.pushStrength.dips,
                        pushups: event.target.value
                }
            }
        })
    }

    handleDipChange = (event) => {
        //Keep state for pull strength and static strength, and pushup strength
        this.setState({
            strength: {
                pullStrength: this.state.strength.pullStrength,
                //staticStrength: this.state.strength.staticStrength,
                pushStrength: {
                    dips: event.target.value,
                    pushups: this.state.strength.pushStrength.pushups
                }
            }
        })
    }

    handlePullupChange = (event) => {
        //Keep state for push strength, static strength, and row strength
        this.setState({
            strength: {
                pushStrength: this.state.strength.pushStrength,
                //staticStrength: this.state.strength.staticStrength,
                pullStrength: {
                    rows: this.state.strength.pullStrength.rows,
                    pullups: event.target.value
                }
            }
        })
    }

    handleRowChange = (event) => {
        //Keep state for push strength and static strengthm, and pullup strength
        this.setState({
            strength: {
                pushStrength: this.state.strength.pushStrength,
                //staticStrength: this.state.strength.staticStrength,
                pullStrength: {
                    rows: event.target.value,
                    pullups: this.state.strength.pullStrength.pullups
                }
            }
        })
    }

    // handleLsitChange = (event) => {
    //     //Keep state for push strength and pull strength
    //     this.setState({
    //         strength: {
    //             pushStrength: this.state.strength.pushStrength,
    //             pullStrength: this.state.strength.pullStrength,
    //             staticStrength: {
    //                 lsit: event.target.value,
    //                 handstand: this.state.strength.staticStrength.handstand
    //             }
    //         }
    //     })
    // }

    // handleHandstandChange = (event) => {
    //     //Keep state for push strength and static strength
    //     this.setState({
    //         strength: {
    //             pushStrength: this.state.strength.pushStrength,
    //             pullStrength: this.state.strength.pullStrength,
    //             staticStrength: {
    //                 lsit: this.state.strength.lsit,
    //                 handstand: event.target.value
    //             }
    //         }
    //     })
    // }
    

    handleSubmit = (event) => {
        event.preventDefault();
        //Submit to signedIn.js, via some prop function call, reset state
        this.props.formSubmit(this.state.strength);
        this.setState({
            strength: {
                pushStrength: {
                    pushups: 0,
                    dips: 0,
                },
                pullStrength: {
                    pullups: 0,
                    rows: 0,
                },
                // staticStrength: {
                //     lsit: '',
                //     handstand: ''
                // }
            }
        })
    }

    render() {
        const colors = ["#ff5e57", "#ffbf2f", "#28c93f"]; //Colors for our buttons
        const formStyle = {
            width: "25vw",
            height: "30vh",
            marginTop: "30vh",
            marginLeft: "32vw",
            borderRadius: "10px",
            backgroundColor: "#DFE1E5",
            outlineWidth: "thin",
            outlineStyle: "solid",
            boxShadow: "-1px 8px 15px 0px rgba(0,0,0,0.2)",
            opacity: "90%",
            fontSize: "18px"
        }

        const textStyle = {
            marginLeft: "2vw",
            marginTop:"10px"
        }

        return (
            <div style={formStyle}>   {/* One Big form, handle change for all inputs, then submit*/}
            <TopButtons colors = {colors}/>
                <form onSubmit = {this.handleSubmit} > 
                    <div style = {textStyle}>
                        <label > 
                            Max Pushups
                            <input type = "number" value = {this.state.strength.pushStrength.pushups} onChange = {this.handlePushupChange}/>
                        </label>

                        <label > 
                            Max Dips
                            <input type = "number" value = {this.state.strength.pushStrength.dips} onChange = {this.handleDipChange}/>
                        </label>

                        <label > 
                            Max Pullups
                            <input type = "number" value = {this.state.strength.pullStrength.pullups} onChange = {this.handlePullupChange}/>
                        </label>

                        <label > 
                            Max Rows
                            <input type = "number" value = {this.state.strength.pullStrength.rows} onChange = {this.handleRowChange}/>
                        </label>

                    {/*  <label > 
                            Max Lsit Hold
                            <input type = "number" value = {this.state.strength.staticStrength.lsit} onChange = {this.handleLsitChange}/>
                        </label>

                        <label > 
                            Max Handstand hold
                            <input type = "number" value = {this.state.strength.staticStrength.handstand} onChange = {this.handleHandstandChange}/>
                    </label> */}

                        <br></br>
                        <label>
                            <input type = "submit" value = "Submit" /> {/* submit leads us back to login screen NEED TO FIX*/}
                        </label>
                    </div>
                </form>
            </ div>
        )
    }
}

export default firstTimeForm;
