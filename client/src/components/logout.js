import React from 'react'
import { GoogleLogout } from 'react-google-login';


function logout(){

    const signOutBoxStyle = {
        margin: "0px",
        position: "absolute",
        right: "0px",
        borderRadius: "12px 12px 12px 12px",
        fontFamily: "Monolith"
    }

    const logout = () => {
        localStorage.removeItem('user');
        window.location.reload(false);
    }

    return (
        <div style={signOutBoxStyle}>
            <GoogleLogout
                clientId="506281202949-p02c4c7j5lo0v3egcfaund73dob02glb.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={logout}
            ></GoogleLogout>
        </div>
    )
}
export default logout;