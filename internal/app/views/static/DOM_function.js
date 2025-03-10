import { Login } from "./verify_login.js";
import { Registration } from "./verify_registration.js";






export function CreatRegisterForm(){

    let formContainer = document.createElement("div");
    formContainer.className = "form-container";
    formContainer.innerHTML=    `<h2>Register</h2>
        <form class="regsiter_form" method="post">
            <label for="username">USER NAME</label>
            <input type="text" id="username" name="username" placeholder="Username">
            <br>
            <span id="error0"></span>
            <label for ="age">Age *</label>
            <input type="number" id = "age" name="age" >
            <span id="error4"></span>
            <label for="gender">Select your gender: *</label>
            <select id="gender" name="select">
            <option value="male" >Mal</option>
            <option value="feminine">feminine</option>
            </select>
            <br>
            <span id="error5"></span>
            <label for="firstname">Your  First Name*</label>
            <input type="text" id="firstname" name="firstname" placeholder="Enter your First Name">
            <span id="error6"></span>
            <label for="lastname">Your  Last Name*</label>
            <input type="text" id="lastname" name="lastname" placeholder="Enter your  Last Name">
            <span id="error7"></span>
            <br>
            <label for="email">EMAIL *</label>
            <input type="email" id="email" name="email" placeholder="Enter your email here">
            <br>
            <span id="error1"></span>
            <label for="password">PASSWORD *</label>
            <input type="password" id="password" name="password" placeholder="Setup your password">
            <br>
            <span id="error2"></span>
            <label for="password2">REPEAT YOUR PASSWORD *</label>
            <input type="password" id="password2" name="password2" placeholder="Repeat your password">
            <br>
            <span id="error3"></span>
            <input type="submit" id="submit" value="Register" >
            <div id="server_error"></div>
            <button type="button" class="register" id="Login">Login</button>

        </form>`
        document.body.appendChild(formContainer);
        Registration();
}
export function createLoginForm() {
    

    // Créer la div contenant tout le formulaire
    let formContainer = document.createElement("div");
    formContainer.className = "form-container";

   formContainer.innerHTML=` <h2>Login</h2>
            <form method="post" class="login_form">
                <label for="email">EMAIL OR USERNAME:</label>
                <input type="text" id="email" name="emailorusername" placeholder="Email or Username" >

                <label for="password">PASSWORD:</label>
                <input type="password" id="password" name="password" placeholder="Setup your password" >

                <input type="submit" value="Login">

                <button type="button" class="register" id="Register">Register</button>

                <span id="server_error"></span>
               
            </form>
`
    document.body.appendChild(formContainer);
    Login()
}
export function  Navbar(){

    const navbardiv = document.createElement("div");
    navbardiv.className="navbar";
    navbardiv.innerHTML=` <div>
            <a href="/" class="button">Home</a>
        </div>
        <div class="SiiiiiiiiiiiiiiiR">
            <button  class="login_button" id="login_button">Login</button>
            <button  class="register_button" id="register_button">Register</button>
        </div>`;
        document.body.prepend(navbardiv);

}