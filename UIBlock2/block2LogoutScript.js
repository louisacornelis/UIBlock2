var accountContainer;

function logout() {
    document.cookie = "Logged=out";
    accountInitOnLoad();
}

function login(e) {
    console.log("test");
    e.preventDefault();
    let emailel = document.getElementById("loginEmail");
    let passwordel = document.getElementById("loginPw");
    let email = emailel.value;
    let password = passwordel.value;
    let cookie = getCookie(email);
    if (cookie) {
        let userInfo = JSON.parse(cookie);
        if (userInfo.password === password) {
            emailel.value = "";
            passwordel.value = "";
            setCookieLogged(email);
            accountInitOnLoad();
        } else {
            alert("wrong password");
        }
    } else {
        alert("email not known");
    }

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
    registerContainer = document.getElementById("registerButton");
    let logged = getCookie("Logged");
    let mainContainer = document.getElementById("mainContainer");
    loginContainer.innerHTML = "";
    registerContainer.innerHTML = "";
    if (logged !== "out") {
        displayMainContainer();
        console.log("logged in");
        let src = localStorage.getItem("IMG_" + getCookie("Logged"));
        mainContainer.style.visibility = "unset";
        var logOutEl = document.createElement("div");
        var profile = document.createElement("div");
        var image = document.createElement("img");
        var name = document.createElement("p");
        let user = JSON.parse(getCookie(logged));
        name.innerText = user.username;
        image.src = src ? src : "default-profile-picture.png";
        image.classList = "profile";
        profile.classList = "round menuItem logOut";
        profile.appendChild(image);
        profile.appendChild(name);
        logOutEl.innerText = "Log Out";
        logOutEl.classList = "round menuItem logOut";
        loginContainer.appendChild(logOutEl);
        logOutEl.addEventListener("click", logout);
        registerContainer.appendChild(profile);
    } else {
        console.log("logged out");
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
        logIn.addEventListener('click', displayLogIn);
    }
}

function setCookieLogged(email) {
    document.cookie = "Logged=" + email;
}

function setCookieUser(userInfo) {
    setCookieLogged(userInfo.email);
    document.cookie = userInfo.email + "=" + JSON.stringify(userInfo);
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
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
    let image = document.getElementById("inputFile");
    readURL(email, image);
    if (getCookie(email)) {
        alert("This email is already registered.");
    } else {
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
        setCookieUser(userInfo);
        accountInitOnLoad();
    }
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

function readURL(email, input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            console.log(e.target.result);
            localStorage.setItem("IMG_" + email, e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}
