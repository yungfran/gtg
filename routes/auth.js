const express = require("express");
const router = express.Router();

//Using default: /api/   here

//
//
router.post("/googlelogin", (req, res) => {
    console.log(req);
});















//Will link with /auth, so we can use /google to get access to /auth/google


// //DESC:     Authenticating requests with google
// //ROUTE:    GET /auth/google
// router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
// //Gives us scope access to profile (we can see whatever is in profile)

// //DESC:     Google Authentication CallBack
// //ROUTE:    GET /auth/google/callback
// router.get("/google/callback", passport.authenticate("google", {
//   failureRedirect: "/", // on failure redirect to homepage (login screen)
// }),
//   (req, res) => {
//     res.redirect("/"); //takes in path and redirects to main page
//   }
// );

// //DESC:      Logout the User
// //ROUTE:     /auth/logout
// router.get("/logout", (req, res) => {
//   req.logout();
//   res.redirect("/");
// });
