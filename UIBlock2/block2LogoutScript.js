var accountContainer;

function logout() {
    console.log("sdds");
    document.cookie = "Logged=out";
    accountInitOnLoad();
}

function login() {
    accountContainer.innerHTML = "Log Out";
    document.cookie = "Logged=true"
}

function register() {
    hide();
    var registerInterface = document.getElementById("registerContainer");
    registerInterface.style.display = "flex";
}

function displayLogIn() {
    hide();
    var logInInterface = document.getElementById("logInContainer");
    logInInterface.style.display = "flex";
}

function displayMainContainer() {
    hide();
    var mainContainer = document.getElementById("mainContainer");
    mainContainer.style.display = "flex";
}

function hide() {
    var mainContainer = document.getElementById("mainContainer");
    mainContainer.style.display = "none";
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
    let mainContainer = document.getElementById("mainContainer");
    loginContainer.innerHTML = "";
    registerContainer.innerHTML = "";
    if (logged != "out") {
        displayMainContainer();
        console.log('logged in');
        mainContainer.style.visibility = "unset";
        var logOut = document.createElement("div");
        var profile = document.createElement("div");
        let user = JSON.parse(getCookie(logged));
        profile.innerText = user.name;
        profile.classList = "round menuItem logOut";

        logOut.innerText = "Log Out";
        logOut.classList = "round menuItem logOut";
        loginContainer.appendChild(logOut);
        loginContainer.addEventListener("click", logout);
        registerContainer.appendChild(profile);
    } else {
        console.log('logged out');
        mainContainer.style.visibility = "hidden";
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


function setCookie(logged, userInfo) {
    document.cookie = userInfo.email + "=" + JSON.stringify(userInfo);
    document.cookie = "Logged=" + userInfo.email;

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
    e.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let name = document.getElementById("name").value;
    let surname = document.getElementById("surname").value;
    let email = document.getElementById("email").value;
    let birthday = document.getElementById("birthday").value;
    let interest = getAllSelected(document.getElementById("interest"));
    let language = getAllSelected(document.getElementById("language"));
    let purpose = document.getElementById("purpose").value;
    let image= document.getElementById("inputFile");
    readURL(email,image);


    userInfo = {
        "username": username,
        "password": password,
        "name": name,
        "surname": surname,
        "email": email,
        "birthday": birthday,
        "interest": interest,
        "language": language,
        "purpose": purpose
    };
    console.log(JSON.stringify(userInfo));
    setCookie(true, userInfo);
    accountInitOnLoad();
}

function getAllSelected(fieldset) {
    var list = [];
    // get list of radio buttons with specified name
    var elements = fieldset.elements;

    // loop through list of radio buttons
    for (var i = 0, len = elements.length; i < len; i++) {
        if (elements[i].checked) { // radio checked?
            list.push(elements[i].value); // if so, hold its value in val
        }
    }
    return list; // return value of checked radio or undefined if none checked
}

function del(e) {
    console.log(e)
}

function readURL(email,input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            console.log("yes");
            console.log(e.target.result);
             document.cookie= "IMG_"+email+"="+e.target.result
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// "Save" and "Delete" buttons
// o By clicking on the "save" button, a cookie will be stored with all the information
// contained
// in the form. If there is a cookie with the same email, the user will be notified that
// there is
// already an account associated with the specified email.
//     o By clicking on the "delete" button, the initial information of the form will be
