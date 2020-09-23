import React, {useEffect, useState } from "react";
import Faq from "./components/terminalBox.js"
import "bootstrap/dist/css/bootstrap.min.css";
import "./componentStyling/divStyling.css"
import Login from "./components/login";
import Logout from "./components/logout"
import SignedIn from "./components/signedIn"

function App(){
  const [user, setUser] = useState();

  //sets user from browser storage to see if we were logged in or not
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user"); //Given to us in string format
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  // Should pass excersize and reps to do to signedIn to display the video and reps to do



    if(user){ //If logged in
      return(
        <div className="App">
          <div style={{ height: "0px" }}>
            <Logout />
            <SignedIn user={user}  />
          </div>
        </div>
      )
    } else { //If not logged in
      return(
        <div className="App">
          <div style={{ height: "0px" }}>
            <Login />
            <Faq />
          </div>
        </div>
      )
    }
}
export default App;

