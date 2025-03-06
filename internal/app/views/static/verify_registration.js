
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
    debugger   
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
    if (!validconfpassword || !validpassword || !validemail || !validusername) {
        return
    }
    const person = new User(name,username,age,gender,email,password)

    fetch( '/register',{
        method:"POST",
        headers: {
            "Content-Type": "application/Json",
          },
        body :JSON.stringify (person)}).then(responseData => {

        if (!responseData.emilorusernameexsist) {
            window.location.href = "/login"
        }

    })
        .catch(err => {
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


const sendHttpRequest = (method, url, data) => {

    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);

        xhr.responseType = 'json';

        if (data) {
            xhr.setRequestHeader('Content-Type', 'application/json');
        }

        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(xhr.response);
            } else {
                resolve(xhr.response);
            }
        };

        xhr.onerror = () => {
            reject('Something went wrong!');
        };

        xhr.send(JSON.stringify(data));
    });
    return promise;
};
