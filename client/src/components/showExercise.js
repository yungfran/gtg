import React, {useEffect, useState } from "react";
import axios from "axios"
import TopButtons from "./topButtons"
import "./text.css"
import YouTube from 'react-youtube'
import RepsCompletedForm from "./repsCompletedForm"

function showExercise(props){
    const[isLoading, setLoading] = useState(true);
    const[isLoading2, setLoading2] = useState(true);
    const[exercise,setExercise] = useState();
    const[repsDoneInExercise,setRepsDoneInExercise] = useState();
    const beforeBoxStyle = {
        width: "75vw",
        height: "75vh",
        marginTop: "10vh",
        marginLeft: "10vw",
        borderRadius: "10px",
        backgroundColor: "#DFE1E5",
        outlineWidth: "thin",
        outlineStyle: "solid",
        boxShadow: "-1px 8px 15px 0px rgba(0,0,0,0.2)",
        opacity: "95%",
    }
    //Style inside box
    const boxStyle = {
        marginTop: "1px",
        borderRadius: "5px 5px 5px 5px",
        fontSize:"80px",
        textAlign: "center",
        opacity: "90%"
    }
    const formStyle = {
        width: "25%",
        marginLeft: " 0.5vw",
        opacity: "100%"
    }

    const colors = ["#ff5e57", "#ffbf2f", "#28c93f"]; //Colors for our buttons

    //Show load page first, then show exercise needed to be done;
    useEffect(() => {
        axios({
            method:"GET",
            url:`/api/getNextExercise/${props.user.sub}`
        }).then(response => { //Returned {exercise: pullups, numReps: 3}
            setExercise(response.data);
            setLoading(false);
        }).catch(err => {console.log(err)})
    }, [])

   

    const handleRepSubmit = (numReps) => {
        console.log(numReps);
        const newExercise = {
            repsDone: numReps,
            exercise:exercise.exercise  //exercise.exercise is the name of the exercise ex "pullup"
        }
        axios({
            method: "PUT",
            url:`/api/updateRepsCompleted/${props.user.sub}`,
            data: {newExercise}
        }).then(response =>{
            window.location.reload(false);
            console.log(`Response when updating reps completed ${response}`)
        }).catch(err => {
            console.log(err);
        })
    }

    if(isLoading === true || isLoading === "true"){
        return (
            <div> App is Loading</div>
        )
    } 


    return(
       // const currentExercise = exercise.exercise.charAt(0).toUpperCase() + exercise.exercise.slice(1);
        <div>
            <div style = {beforeBoxStyle}>
            <TopButtons colors = {colors}/>
                <div style = {boxStyle}>
                    <div>
                        {/* Capitalize first letter of exercise GACK*/}
    {exercise.exercise.charAt(0).toUpperCase() + exercise.exercise.slice(1)} for {exercise.numReps} Reps
                    </div>
                    
                </div>
                <div style = {formStyle}>
                        <RepsCompletedForm numReps = {exercise.numReps} 
                        exerciseName = {exercise.exercise} 
                        user = {props.user}
                        handleRepSubmit = {handleRepSubmit}/>
                 </div>
                 <div style = {{textAlign : "center"}}>
                     You have repped out {exercise.totalReps} {exercise.exercise} this week
                 </div>
                 <div style = {{textAlign : "center"}}>
                     [TBD: Video will go here]
                 </div>
            </div>
        </div>
    )
    
}

export default showExercise