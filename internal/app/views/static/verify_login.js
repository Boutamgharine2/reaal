

  export function Login() {
    console.log(document.querySelector(".login_form"));
    
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
)}
      // console.log(responseData.json())
        
    
        
        
        
        //const data = responseData.json()
      //  console.log(data.value);
        
      // console.log(data.isValidData);
        
        
      /*  if (data.isValidData) {
          console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
          
          window.location.href = "/"
    
          
        }
    
      })
        .catch(err => {
    
          if (err.errserver) {
            errorDiv.innerHTML = "internal problem try later"
            errorDiv.style.color = "red"
    
          } else {
            errorDiv.innerHTML = "Your password or username is incorrect.!"
            errorDiv.style.color = "red"
            errorDiv.style.margin = "5px"
          }
    
    
    
        });
    
    })
  }*/
  // hadi ana (anouar) lizdtha adrrari







/*
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











*/