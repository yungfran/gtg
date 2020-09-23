import React, { Component } from 'react'
import GoogleLogin from "react-google-login";
import axios from "axios";
import "./text.css"

export class login extends Component {

    render() {
        const signInBoxStyle = {
            margin: "10px",
            position: "absolute",
            right: "20px",
            borderRadius: "12px 12px 12px 12px",
            fontFamily: "Monolith"
        }

        //@PARAM: currDate is the date that the user has logged onto the website, get the next week from
        function getNextWeek(currDate){
            let startOfNextWeek = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate()+7);
            return startOfNextWeek;
        }

        function refreshReps(userData) {
            let repGoals = {
                pullupGoal: userData.strength.pullStrength.pullups * 3, // maxReps * 1/2 * 6 (1/2 maxSet * 6)
                rowGoal: userData.strength.pullStrength.rows * 3,
                dipGoal: userData.strength.pushStrength.dips * 3,
                pushupGoal: userData.strength.pushStrength.pushups * 3
            }
            return repGoals;
        }

        const responseGoogleSuccess = (response) => {
            //Sends data to Backend for user auth
            axios({
                method: "POST",
                url: "/api/login",
                data: {
                    tokenId: response.tokenId
                }
            }).then(response => { //Response from our API, contains profile data from the user (the mongoose schema)
                //Need to store in localStorage, to persist login state
                console.log("LOGIN SUCCESS");
                console.log(response.data);
                localStorage.setItem('user',JSON.stringify(response.data)); //Must send as a string, sets user to loggedin

                //Sets browser data to if the user is logged in for the first time or not, used to
                response.data.newUser ? localStorage.setItem('firstTime', true): localStorage.setItem('firstTime', false);
                window.location.reload(false); //Refresh window after login


                //Need to check if a week has passed since last rep refresh
                let currDate = new Date();
                let oneWeekHasPassed = currDate >= response.data.startOfNextWeek; //Does not work, date in diff formats

                if(oneWeekHasPassed && (response.data.newUser === false)){ //SHOULD BE if(oneWeekHasPassed);
                    let nextWeek = getNextWeek(currDate);
                    console.log(`nextWeek: ${nextWeek}`);
                    // NEED TO FIX, updates the startOfNextWeek to be accurate.
                    axios({
                        method: "PUT",
                        url: `/api/updateNextWeek/${response.data.sub}`,
                        data: {startOfNextWeek:nextWeek}
                    }).then(response => {
                        console.log(`Response when updating the week: ${response}`)
                    }).catch(error => {
                        console.log(error);
                    })
                    
                    //REFRESH REPS
                    let newRepGoals = refreshReps(response.data); 
                    console.log(newRepGoals);
                    //Update rep goals for the week in database
                    axios({
                        method:"PUT",
                        url:`/api/updateRepCount/${response.data.sub}`,
                        data: {
                            newRepGoals: newRepGoals
                        }
                    }).then(response => {
                        console.log(`Successfully updated rep goals for the week`);
                    }).catch(error => {
                        console.log(`Recieved this error when updating rep goals: ${error}`)
                    });
                    //AXIOS PUT REQUEST FOR UPDATING REPS
                }
            }).catch(error => {
                console.log("AXIOS ERROR");
                console.log(error);
            });
        }

        const responseGoogleError = (response) => {
            console.log(response);
        }

        return (
            <div style={signInBoxStyle}>
                <div style={{ margin: "3px", textAlign: "center" }}>Train Efficiently</div>
                <GoogleLogin
                    clientId="506281202949-p02c4c7j5lo0v3egcfaund73dob02glb.apps.googleusercontent.com"
                    buttonText="Login With Google"
                    onSuccess={responseGoogleSuccess}
                    onFailure={responseGoogleError}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        )
    }
}

export default login
