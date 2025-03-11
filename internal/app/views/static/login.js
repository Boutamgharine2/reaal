import{CreatRegisterForm} from "./verify_registration.js";
import { navigateTo } from "./fetch_data.js";



export function createLoginForm() {
    document.getElementById("container").innerHTML="";
    
    
    
    
    

    

    // Créer la div contenant tout le formulaire
    let formContainer = document.getElementById("container");
   // formContainer.className = "form-container";

   formContainer.innerHTML=` <h2>Login</h2>
            <form method="post" class="login_form">
                <label for="email">EMAIL OR USERNAME:</label>
                <input type="text" id="email" name="emailorusername" placeholder="Email or Username" >

                <label for="password">PASSWORD:</label>
                <input type="password" id="password" name="password" placeholder="Setup your password" >

                <input type="submit" value="Login">

                <a href="/registers" class="register" id="Register">Register</a>

                <span id="server_error"></span>
               
            </form>
`
    //document.body.appendChild(formContainer);
    Login()
}
let form = document.getElementById("Register");
console.log(form);


export function Login() {
  document.getElementById("Register").addEventListener("click",(e)=>{
    
    e.preventDefault();
    console.log(e.target.href);
    
    navigateTo(e.target.href);



});
  let form = document.querySelector(".form-container");

  document.querySelector(".register").addEventListener("click",()=>{ 
    form.innerHTML="";
     CreatRegisterForm();
  })
    
    document.querySelector(".login_form").addEventListener("submit", async function (event) {
    
      event.preventDefault()
      const errorDiv = document.getElementById("server_error");
      const usernameoremail = document.getElementById("email").value;
      console.log(usernameoremail);
      
      const password = document.getElementById("password").value;
      console.log(password);

    
      let response = await fetch("/login",{
      method: "POST",
    headers: {
      "Content-Type": "application/Json",
    },
    body: JSON.stringify({
      emailorusername: usernameoremail,
      password: password,

    }),

      }).then((response) => {
     
        return response.json();
      
      }).then((result) =>{
      
      if (result.isValidData){
        window.location.href="/";
      }else if (result.errserver) {
          errorDiv.innerHTML = "internal problem try later"
          errorDiv.style.color = "red"
  
        } else {
          errorDiv.innerHTML = "Your password or username is incorrect.!"
          errorDiv.style.color = "red"
          errorDiv.style.margin = "5px"
        }
  
  
  
      });
  
  }
)
}