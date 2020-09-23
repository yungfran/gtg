let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();
let path = require("path");
let person = require('../models/Person.js');
let dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const { OAuth2Client, UserRefreshClient } = require('google-auth-library');
const { isBuffer } = require('util');
const { urlencoded } = require('body-parser');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const exerciseHashmap = new Map([
    [0,"pullups"],
    [1,"dips"],
    [2,"rows"],
    [3,"pushups"]
]);


const strength = {
    pushStrength: {
        pushups: 0,
        dips: 0,
    },
    pullStrength: {
        pullups: 0,
        rows: 0,
    }
}

//Intially set our repsPerSet for all exercise to 0
const repsPerSet = {pullups:0 , dips:0 , rows:0 , pushups:0};
//Intially set our exerciseOrder to all 0's
const exerciseOrder = [0,0,0,0];
//Intially set our repsCompleted to all 0s
const repsCompleted = {pullups:0 , dips:0 , rows:0 , pushups:0};
//Intially set repgoals to empty
const repGoals = { pullups : 0,  dips: 0, rows: 0, pushups: 0};
//Used for initially setting the next week
let currDate = new Date();
let startOfNextWeek = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate()+7);

//@Route: localhost:4000/api/login
//@Log a person in
router.route('/login').post((req, res, next) => {
    const tokenId = req.body.tokenId;
    client.verifyIdToken({
        idToken: tokenId,
        audience: "506281202949-p02c4c7j5lo0v3egcfaund73dob02glb.apps.googleusercontent.com"
    })
        .then(response => {
            const { email_verified, name, email } = response.payload; //response.payload has all user data
            if (email_verified) {
                person.findOne({ sub: response.payload.sub }, (error, data) => {
                    if (error) {
                        return res.status(400).son({ error: "Something went wrong..." }) //Error handle, dont chane
                    } else { // No Error, proceed as normal
                        if (data) { // User exists,
                            res.json(data) //Send user data back to front end
                            console.log("User found")
                        } else { // User not found, try add to database
                            req.body.name = response.payload.name
                            req.body.email = response.payload.email
                            req.body.sub = response.payload.sub; //Add "sub" element to req.body object so we can add make a person with req.body
                            req.body.newUser = true;
                            req.body.strength = strength;
                            req.body.repGoals = repGoals;
                            req.body.startOfNextWeek = startOfNextWeek;
                            req.body.repsCompleted = repsCompleted;
                            req.body.exerciseOrder = exerciseOrder;
                            person.create(req.body, (error, data) => { //creates a person using the request body
                                if (error) {
                                    return next(error)
                                } else { //Success, add to db
                                    console.log("Creating person in database")
                                    res.json(data) //Send the created user back to front end
                                }
                            })
                        }
                    }
                })
            }
        })
});


//@Route: localhost:4000/api/get
//Return a person based on their google subject ID ("sub")
router.get('/get/:sub', (req, res) => {
    const sub = req.params.sub;
    person.find({ sub: sub }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});


//@Route: localhost:4000/api/notNewUser
//Change a user's newUser value to false, takes in their mongoID
router.put('/notNewUser/:id', (req, res) => {
    const sub = req.params.id;
    person.find({ sub: sub }, (error, user) => {
        if (error) {
            return error
        } else {
            //No error, change the user's newUser value to false. Need to have " " around the "newUser"
            person.findOneAndUpdate(sub, { "newUser": false }, (err, result) => {
                if (err) {
                    return err;
                } else {
                    console.log("Success changing newUser to false");
                    res.json(result);
                }
            })
        }
    })
});


//@Route: localhost:4000/api/saveStrengthData/:sub
//Sub is the google subject id given to us, strengthData holds the strength object of
//Input the initial strength data of the user to the database

router.put('/setStrengthData/:sub', (req,res) => {
    const sub = req.params.sub;
    const strengthData = req.body.strengthData;
    console.log(sub);
    person.findOneAndUpdate(sub, {"strength": strengthData}, (error, result) => {
        if(error){
            return error;
        } else {
            res.json(result);
        }
    })
});


//@Route: localhost:4000/api/updateRepCount/:sub
//Sets the repGoals for the week
router.put('/updateRepCount/:sub',(req,res) => {
    const sub = req.params.sub;
    const repGoals = req.body.newRepGoals;
    person.findOneAndUpdate(sub, {"repGoals": repGoals}, (error,result) => {
        if(error){
            return error;
        } else {
            res.json(result);
        }
    })
});


//@Route: localhost:4000/api/updateNextWeek/:sub
//Change a user's next week date to the next week
//NOT WORKING??
//Having issues with passing req body probably, 500 errors regardless. 
router.put('/updateNextWeek/:sub', (req,res) => {
    const sub = req.params.sub;
    const nextWeekDate = req.body.startOfNextWeek;
    person.findOneAndUpdate(sub, {"startOfNextWeek": nextWeekDate}, (error,result) => {
        if(error){
            return error;
        } else {
            res.json(result);
        }
    })
});


//@Route: localhost:4000/api/notNewUser/:sub
//Change a user's newUser value to true, takes in their google subject #. FOR TESTING PURPOSES
router.put('/NewUser/:sub', (req, res) => {
    const sub = req.params.sub;
    person.find({ sub: sub }, (error, user) => {
        if (error) {
            return error
        } else {
            //No error, change the user's newUser value to false. Need to have " " around the "newUser"
            person.findOneAndUpdate(sub, { "newUser": true }, (err, result) => {
                if (err) {
                    res.send(`meep ${err}`)
                } else {
                    res.json(result)
                }
            })
        }
    })
})

//@Route: localhost:4000/api/getStrengthData/:sub
//Returns the user's strength data, takes in their google subject #
router.get('/getStrengthData/:sub', (req,res) => {
    const sub = req.params.sub;
    person.findOne({sub:sub}, (err,user) => {
        if(err){
            return err
        } else {
            res.send(user.strength);
        }
    })
})


//[Pullup,Dip,Row,Pushup]
//[0     ,1  ,2  ,3]
//@Route: localhost:4000/api/getExcersizeOrder/:sub
//Returns the user's ExcersizeOrder that stores which excersizes they have done this cycle
router.get('/getExerciseOrder/:sub', (req,res) => {
    const sub = req.params.sub;
    person.findOne({sub:sub}, (err,user) => {
        if(err){
            return err
        } else {
            res.send(user.exerciseOrder);
        }
    })
})

//@Route: localhost:4000/api/updateExcersizeOrder/:sub
//Updates the excersize that the user has finishes by changing its position in the completion
//Array to 1
router.put('/updateExerciseOrder/:sub/:pos', (req,res) => {
    const sub = req.params.sub;
    const exercisePos = req.params.pos;
    person.findOne({sub:sub}, (err,user) => {
        if(err){
            return err
        } else {
            //Change all excersizeOrder[i] to the user's except for the specified one
            let found = false;
            let resetExerciseOrder = [0,0,0,0];
            let newExerciseOrder = [0,0,0,0];
            for(let i = 0; i< user.exerciseOrder.length;i++){
                if(i == exercisePos){ //If at the index of the excersize we want to change, change to 1
                    if(user.exerciseOrder[i] === 0){
                        found = true;
                        newExerciseOrder[i] = 1;
                    }
                } else { //Keep the original value
                    newExerciseOrder[i] = user.exerciseOrder[i];
                }
            }
            if(found === false|| found == false){ //If the exercise order array is all 1's reset it to 0
                newExerciseOrder = resetExerciseOrder;
            }
            //Update person's excersize order
            person.findOneAndUpdate(sub, {"exerciseOrder":newExerciseOrder}, (error,result) => {
                if(error){
                    return error
                } else {
                    res.json(result);
                }
            })
        }
    })
})

//UNTESTED
//@Route: localhost:4000/api/getNextExercise/:sub
//Returns the next excersize to be completed
//If all excersizes are completed, return a special # to be handled by the front end
router.get('/getNextExercise/:sub', (req,res) => {
    const sub = req.params.sub;
    let nextExercise = {exercise : "-1",numReps :0};
    person.findOne({sub:sub},(err,user) => {
        if(err){
            return err
        } else {
        
        let changed = false;
        for(let i = 0; i < 4; i++){
            if(user.exerciseOrder[i] === 0){ //Haven't done this excersize this cycle yet
                let exerciseToDo = exerciseHashmap.get(i);
                //if(user.repsCompleted[exerciseToDo] < user.repGoals[exerciseToDo]){ //Still have more to do
                    let numRepsToDo = user.repsPerSet[exerciseToDo];
                    nextExercise.exercise = exerciseToDo;
                    nextExercise.numReps = numRepsToDo;
                    nextExercise.totalReps = user.repsCompleted[exerciseToDo];
                    changed = true;
                    i += 4; //Manually exit the loop after finding the first exercise GACK
               // }
            }
        }
        let defaultWorkout = {
            exercise: "pullups",
            numReps: user.repsPerSet.pullups,
            totalReps: user.repsCompleted.pullups
        }
        if(changed == false || changed === false){ // 
            nextExercise = defaultWorkout;
            let defaultExerciseOrder = [0,0,0,0];
            person.findOneAndUpdate(sub, {"exerciseOrder":defaultExerciseOrder}, (err,result) => { 
                if(err) return err
                res.json(nextExercise);
            })
        } else {
            res.json(nextExercise);
        }
    }
    })
})


//Sets the number of reps the user needs to do per exercise set
router.put('/setRepsPerSet/:sub', (req,res) =>{
    const sub = req.params.sub;
    const repsPerSet = req.body.newRepsPerSet;
    person.findOneAndUpdate(sub, {"repsPerSet":repsPerSet}, (err,result) => {
        if(err){
            return err;
        } else {
            res.json(result)
        }
    })
})


//UNTESTED
//@Route: localhost:4000/api/updateRepsCompleted/:sub
//updates the number of reps that a user completes in a set
// this route will only be used once a user is finished with an exercise, change the exercise order to match this
//Body will hold an object that stores the exercise done and the number of reps
router.put('/updateRepsCompleted/:sub', (req,res) => {
    const sub = req.params.sub;
    const exerciseCompleted = req.body.newExercise;
    person.findOne({sub:sub}, (err,user) => {
        if(err){
            return err;
        } else { //Found user, incremement the number of reps that the user does
            let exerciseName = exerciseCompleted.exercise;
            let repsDone = parseInt(exerciseCompleted.repsDone);
            let newRepsCompleted = user.repsCompleted; //Grabs the repsCompleted object from the user
            let repsUpdated = parseInt(user.repsCompleted[exerciseName]) + repsDone;
            console.log(repsUpdated);
            newRepsCompleted[exerciseName] = parseInt(user.repsCompleted[exerciseName]) + repsDone; //updates this object, will send back to database
            person.findOneAndUpdate(sub, {"repsCompleted":newRepsCompleted}, (err,result) => {
                if(err){
                    return err;
                } else {
                    //Find spot in exerciseOrder array and change to 1
                    let newExerciseOrder = [0,0,0,0];
                    for(let i = 0; i < 4; i++){
                        const currEx = exerciseHashmap.get(i);
                        if(exerciseName === currEx){ //Str equals
                            newExerciseOrder[i] = 1; //Change the exercise we just did to 1
                        } else {
                            newExerciseOrder[i] = user.exerciseOrder[i];
                        }
                    }
                    person.findOneAndUpdate(sub,{"exerciseOrder":newExerciseOrder}, (err,result) => {
                        if(err){
                            return err;
                        } else {
                            res.sendStatus(200);
                        }
                    })
                }
            })
        }   
    })
})

//Returns the number of reps done in a given exercise
router.get('/getRepsCompleted/:sub', (req,res) => {
    const sub = req.params.sub;
    const exercise = req.body.exercise;
    person.findOne({sub:sub}, (err,user) => {
        if(err) {
            return err
        } else {
            let repsDone = user.repsCompleted[exercise];
            let repsDoneObj = {repsDone};
            res.json(repsDoneObj);
        }
    })
})



//@Route: localhost:4000/api/deleteUser/:sub
//Deletes a user using their google subject #, FOR TESTING PURPOSES
router.delete('/deleteUser/:sub', (req,res) => {
    const sub = req.params.sub;
    person.deleteOne({sub:sub}, (err,result) =>{
        if(err) {
            return error;
        } else {
            res.send("successful deletion");
        }
    })
})
module.exports = router;
