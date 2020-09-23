import React, { Component} from 'react'
import FirstTimeForm from "./firstTimeForm"
import axios from "axios"
import ShowExercise from "./showExercise"
import TopButtons from "./topButtons"

//Renders first time form / current workout
export class signedIn extends Component {
    state = {
        firstTime: localStorage.getItem("firstTime")
    }
    /* Form for inputting reps done, need another component to handle user input.
     * The child component will be passed the excersize that will be done 
     * The child component will pass back the number of reps done as an integer
     
     * get youtube videos to render
     * Form for how many reps are done: checkbox for did all reps(1/2 max), or a input box for manual input if less than 1/2 max 
     * Set up how the page looks for 1 set i.e display goal reps per set, reps to go for week, videos

    */

    //Function that returns the repGoals for the week, used to set this number for the first time
    //@PARAM strength is the strength object of the user
    setReps = (strength) => {
        let repGoals = {
            pullups: strength.data.pullStrength.pullups * 3, // maxReps * 1/2 * 6 (1/2 maxSet * 6)
            dips: strength.data.pushStrength.dips * 3,
            rows: strength.data.pullStrength.rows * 3,
            pushups: strength.data.pushStrength.pushups * 3
        }
        return repGoals;
    }

    //Sets the number a user will do per gtg set
    setRepsPerSet = (strength) => {
        let repsPerSet = {
            pullups: Math.round(strength.data.pullStrength.pullups * .5), // maxReps * 1/2 * 6 (1/2 maxSet * 6)
            dips: Math.round(strength.data.pushStrength.dips * .5),
            rows: Math.round(strength.data.pullStrength.rows * .5),
            pushups: Math.round(strength.data.pushStrength.pushups *.5)
        }
        return repsPerSet;
    }

   // Change newUser = false
        //Set the strength of the user
            //Get strength of user -> update weeklyRep Counts -> set the repsPerSet that a user will do

    formSubmit = (strengthData) => {//strengthData is an object in JSON form
        //Need to change newUser to false, THEN save strength in database, THEN set the repGoals 
        axios.put(`/api/notNewUser/${this.props.user.sub}`)
            .then(response => {

                //Save Strength in DB
                axios({
                    method: "PUT",
                    url: `/api/setStrengthData/${this.props.user.sub}`,
                    data: {
                        strengthData
                    }}).then(responseFromSetStrength => {

                        //responseFromSetStrength is not updated to hold strength -> just get from server 
                          axios({ //Gets strength Data from server
                              method: "GET",
                              url:`/api/getStrengthData/${this.props.user.sub}`
                          }).then(responseFromGetStrength => {
                            let newRepGoals = this.setReps(responseFromGetStrength);
                            let newRepsPerSet = this.setRepsPerSet(responseFromGetStrength);
                            axios({ //Sets the weekly repgoals of the user
                                method:"PUT",
                                url:`/api/updateRepCount/${this.props.user.sub}`,
                                data: { newRepGoals }
                            }).then(respRepGoal => {

                                //Set reps per excersize set
                                axios({
                                    method:"PUT",
                                    url: `/api/setRepsPerSet/${this.props.user.sub}`,
                                    data: {newRepsPerSet}
                                 }).then(res => {
                                    window.location.reload(false);
                                    console.log(respRepGoal)}) .catch(err => {console.log(err)});
                                 }).catch(repPerExErr => {console.log(`Error when setting rep per set ${repPerExErr}`)})

                          }).catch(err => {
                              console.log(`error when getting strength: ${err}`)
                          })
                    }).catch(errorFromSettingStrength => { 
                        console.log(`error when setting strength: ${errorFromSettingStrength}`)
                });

                console.log(`recieved this response from api when changing newUser to false: ${JSON.stringify(response)}`)
                //this.props.user = response; //Why???
            }).catch(error => {
                console.log(`error when changing newUser to false: ${error}`)
            });
        localStorage.setItem("firstTime", false);
     }
    


    render() {
        if (this.state.firstTime === "true" || this.state.firstTime === true) { //If the user is a newUser
            return (
                <div>
                    <FirstTimeForm formSubmit={this.formSubmit} /> 
                </div>
            )
        } else { // SHOW THE GOODS Need to get exercise to do, then display this info to our form, which will send back to backend
            return (
                <div>
                    <ShowExercise user = {this.props.user} />
                </div>
            )
        }
    }
}

export default signedIn
