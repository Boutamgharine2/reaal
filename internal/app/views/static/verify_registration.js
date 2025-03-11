import {createLoginForm}from "./login.js"
import { navigateTo } from "./fetch_data.js";




export function CreatRegisterForm(){
    const cnt = document.getElementById("container");
    
    
    
    cnt.innerHTML="";
    

    let formContainer = document.getElementById("container");
   // formContainer.className = "form-container";
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
            <a href="/login"  class="login" id="Login">Login</a>
             


        </form>`
      //  document.body.appendChild(formContainer);
        Registration();
}










const cnt = document.querySelector(".form-container")


class User {
    constructor(first_name,laste_name,username,age,gender,email,password,){
        this.first_name=first_name;
        this.laste_name=laste_name;
        this.username=username;
        this.age=age;
        this.gender=gender;
        this.email=email;
        this.password=password;

    }
}
export function Registration(){ 
    document.getElementById("Login").addEventListener("click",(e)=>{
    
        e.preventDefault();
        console.log(e.target.href);
        
        navigateTo(e.target.href);
    
    
    
    })
    
    
    const login_botton2 = document.getElementById("Login")
    login_botton2.addEventListener("click",()=>{
        const cnt = document.querySelector(".form-container")

        cnt.innerHTML="";
        createLoginForm();

    })



document.querySelector(".regsiter_form").addEventListener("submit", function (event) {
    event.preventDefault();
    const errorDiv = document.getElementById('server_error');
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confpassword = document.getElementById("password2").value;
    let First_Name = document.getElementById("firstname").value;
    let Laste_Name = document.getElementById("lastname").value;
    let Age = parseInt(document.getElementById("age").value);
    let Gender = document.getElementById("gender").value;
    
    let validusername = false;
    let validemail = false;
    let validpassword = false;
    let validconfpassword = false;
    let validfirstname = false;
    let validlastname = false;
    let validage = false;
    let validgender = false;  
    if (First_Name.length < 25 && First_Name.length >= 3 && Validstring(First_Name) ) {
        validfirstname = true;

    }
    if (Laste_Name.length < 25 && Laste_Name.length >= 3 && Validstring(Laste_Name) ) {
        validlastname = true;

    }
    if (Gender === "male" || Gender === "feminine"){
         validgender = true;
    }    
    if (isNaN(Age)==false && Age > 14 && Age<100){
        validage = true;
    }
        
    if (username.length < 25 && username.length >= 2 && Validstring(username) == true) {
        validusername = true;

    }
    if (email.length < 60 && email.length >= 8 && EmailIsValid(email) && Validstring(email) == true) {
        validemail = true;

    }
    if (password.length < 50 && password.length > 8 && Validstring(password) == true && checkCharacter(password) == true) {
        validpassword = true;

    }
    if (password == confpassword) {
        validconfpassword = true;
    }
    if (!validfirstname){
        let myerror = document.getElementById("error6");
        myerror.innerHTML = "your first name is invalid";
        

    }
    if (!validlastname){
        let myerror = document.getElementById("error7");
        myerror.innerHTML = "your last name is invalid";

    }
    if (!validgender){
        let myerror = document.getElementById("error5");
        myerror.innerHTML = "We accept only male or female gender!";
    }
    if (!validage){
        let myerror = document.getElementById("error4");
        myerror.innerHTML =  "Your age should be between 15 and 80!";
    }
    


    if (!validusername) {
        let myerror = document.getElementById("error0");
        myerror.innerHTML = "invalid username";


    }
    if (!validemail) {
        let myerror = document.getElementById("error1");
        myerror.innerHTML = "invalid email";
        


    }
    if (!validpassword) {
        let myerror = document.getElementById("error2");
        myerror.innerHTML = "invalid password";
        


    }
    if (!validconfpassword) {
        let myerror = document.getElementById("error3");
        myerror.innerHTML = "invalid confpassword";
        


    }
    debugger
    if (!validconfpassword || !validpassword || !validemail || !validusername) {
        return
    }
    const person = new User(First_Name,Laste_Name,username,Age,Gender,email,password)
    console.log(person);
    

    fetch( '/register',{
        method:"POST",
        headers: {
            "Content-Type": "application/Json",
          },
        body :JSON.stringify (person)}).then(responseData => {

        if (!responseData.emilorusernameexsist) {
            const cnt = document.querySelector(".form-container")

           cnt.remove();
           createLoginForm();
        }

    })
        .catch(err => {
            console.log(err);
            
            if (err.emilorusernameexsist) {
                errorDiv.textContent = " your email or username already exists!!!"
                errorDiv.style.color = `red`

            } else if (err.InternalError) {
                errorDiv.textContent = "server problem, try later!!!"
                errorDiv.style.color = `red`


            } else {
                errorDiv.textContent = "invaliddata!!"
                errorDiv.style.color = `red`

            }


        });

});
}
function EmailIsValid(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);


}
function checkCharacter(s) {
    let hasUpper = false;
    let hasLower = false;
    let hasDigit = false;
    let hasSpecial = false;

    for (let i = 0; i < s.length; i++) {
        const ch = s[i];

        if (/[A-Z]/.test(ch)) {
            hasUpper = true;
        } else if (/[a-z]/.test(ch)) {
            hasLower = true;
        } else if (/\d/.test(ch)) {
            hasDigit = true;
        } else if (!/[a-zA-Z0-9]/.test(ch)) {
            hasSpecial = true;
        }
    }

    return hasUpper && hasLower && hasDigit && hasSpecial;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Validstring(username) {
    for (let i = 0; i < username.length; i++) {
        if (username.charCodeAt(i) < 32) {
            return false;
        }
    }
    return true;
}


