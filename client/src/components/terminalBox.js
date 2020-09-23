import React, { Component } from 'react'
import TopButtons from "./topButtons"
import "./text.css"


export class faqBox extends Component {
    render() {

        const answer = { //For Answers in the Faq
            marginLeft: "7%",
        }

        const colors = ["#ff5e57", "#ffbf2f", "#28c93f"]; //Colors for our window
        const terminal = {
            fontFamily: "Oswald",
            backgroundColor: "#DFE1E5",
            opacity: "90%",
            marginLeft: "5%",
            marginTop: "5%",
            width: "30vw",
            height: "80vh", /* Height for terminal box need to change to percentage based since curr height is 0px*/
            borderRadius: "5px 5px 5px 5px",
            boxShadow: "-1px 8px 15px 0px rgba(0,0,0,0.2)",
            border: "1px solid"
        }

        return (
            <div>
                <div style={terminal}>
                    <TopButtons
                        colors={colors} />
                    <div style={{
                        margin: "0",
                        padding: "0",
                        marginLeft: "20px",
                        marginRight: " 20px"
                    }}>
                        <div style={{ textAlign: "center" }}>
                            Faq
                        </div>
                        <div>
                            &gt; What is "Grease The Groove"?
                        </div>
                        <div style={answer}>
                            Grease the Groove is a training method where you are working at 50% capacity throughout the day, rather than finishing all your sets in one session.
                        </div>
                        <div>
                            &gt; How can this improve my workouts?
                        </div>
                        <div style={answer}>
                            By having more than adequate rest after each set, you will start every set fresh and in turn, be able to produce more high quality repititions that aren't impacted by fatigue.
                        </div>
                        <div>
                            &gt; What does this website do?
                        </div>
                        <div style={answer}>
                            This website customizes workouts for you, notifying you every hour to do a set tailored to your current strength. You can track your progressions, and the system will advance you to harder exercises after you attain certain strength benchmarks.
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default faqBox
