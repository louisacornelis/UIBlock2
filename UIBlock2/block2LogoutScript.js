var accountContainer;

function logout() {
    accountContainer.innerHTML = "";
    document.cookie = "Logged=false"
}

function login(){ 
    accountContainer.innerHTML = "Log Out";
    document.cookie = "Logged=true"
}

function register(){
    hide();
    var registerInterface = document.getElementById("registerContainer");
    registerInterface.style.display = "flex";
}   

function displayLogIn() {
    hide();
    var logInInterface = document.getElementById("logInContainer");
    logInInterface.style.display = "flex";
}

function hide() {
    var restaurants = document.getElementById("Restaurants");
    restaurants.style.display = "none";
    var museums = document.getElementById("Museums");
    museums.style.display = "none";
    var movies = document.getElementById("Movies");
    movies.style.display = "none";
    var logInInterface = document.getElementById("logInContainer");
    logInInterface.style.display = "none";
    var registerInterface = document.getElementById("registerContainer");
    registerInterface.style.display = "none";
}

window.onload = function () {
    dateTimeOnload();
    accountInitOnLoad();
};

function accountInitOnLoad() {
    loginContainer = document.getElementById("LoginButton");
    registerContainer = document.getElementById("registerButton")
    let logged = getCookie('Logged');
    console.log(logged);
    if (logged == "true") {
        var logOut = document.createElement("div");
        logOut.innerText = "Log Out";
        logOut.classList = "round menuItem logOut";
        loginContainer.appendChild(logOut);
        loginContainer.addEventListener("click", logout);
    } else {
        var register = document.createElement("div");
        register.innerText = "Register";
        register.classList = "round menuItem logOut";
        registerContainer.appendChild(register);
        registerContainer.addEventListener("click", register);

        var logIn = document.createElement("div");
        logIn.innerText = "Log In";
        logIn.classList = "round menuItem logOut";
        loginContainer.appendChild(logIn);
        loginContainer.addEventListener("click", login);
    }
}


function setCookie(logged, username, userMap) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}


function save(e) {
    // setCookie()
    e.preventDefault();
    let form = e.target;

}

function del(e) {
    console.log(e)
}

// "Save" and "Delete" buttons
// o By clicking on the "save" button, a cookie will be stored with all the information
// contained
// in the form. If there is a cookie with the same email, the user will be notified that
// there is
// already an account associated with the specified email.
//     o By clicking on the "delete" button, the initial information of the form will be
