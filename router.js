const queryString = require("querystring");

const Profile = require("./profile.js");
const renderer = require("./renderer");

function homeRoute(request, response) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');

    renderer.view("header", {}, response);
    renderer.view("search", {}, response);
    renderer.view("footer", {}, response);

    response.end();
}

function userRoute(request, response) {

    const username = request.url.replace("/", "");

    if (username.length > 0){

        response.setHeader('Content-Type', 'text/html');

        renderer.view("header", {}, response);

        const studentProfile = new Profile(username);

        studentProfile.on("end", profileJSON => {

            const values = {
                avatarURL: profileJSON.gravatar_url,
                username: profileJSON.profile_name,
                badges: profileJSON.badges.length,
                javascriptPoints: profileJSON.points.JavaScript
            };

            response.statusCode = 200;
            renderer.view("profile", values, response);
            renderer.view("footer", {}, response);
            response.end();
        });

        studentProfile.on("error", error => {
            response.statusCode = 400;
            renderer.view("error", {errorMessage : error.message}, response);
            renderer.view("search", {}, response);
            renderer.view("footer", {}, response);
            response.end();
        });
    } else {
        request.on("data", data => {
            const queryUsername = queryString.parse(data.toString()).username;
            response.statusCode = 303;
            response.setHeader("Location", `/${queryUsername}`);
            response.end();
        });
    }
}

module.exports.home = homeRoute;
module.exports.user = userRoute;