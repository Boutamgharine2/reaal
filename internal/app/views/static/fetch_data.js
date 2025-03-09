import { InitPost } from "./post.js";
import { reacPost } from "./reactPost.js";
import { comment } from "./comment.js";
import { Registred } from "./registred.js";
import { filter } from "./filter.js";
import { Login } from "./verify_login.js";
import { Registration } from "./verify_registration.js";
// import { reactComment } from "./reactComment.js";


Navbar()
let submit_post = document.querySelector(".post_btn")
let post_title = document.querySelector(".post_title")
let post_content = document.querySelector(".post_content")
let post_category = document.querySelectorAll(".category")
let load_more = document.querySelector(".load_more")
let div0 = document.createElement("div")
let div_pop = document.querySelector(".form-popup");
//div_pop.style.display="none";
let cancel_botton =document.getElementById("cancel");
let login_botton = document.getElementById("login_button");
let register_button = document.getElementById("register_button");
const pop = document.querySelector(".form-container");
console.log(register_button);


let userid = await Registred()
if (!userid) {
    const cnt = document.getElementById("container");
    
    
    cnt.remove();
   // document.querySelector(".navbar").style.display="none";
   
   createLoginForm();

} else {



}


login_botton.onclick=()=>{
    const cnt = document.getElementById("container");
    
    
    cnt.remove();
    document.querySelector(".navbar").style.display="none";
   
    createLoginForm() ;
};
register_button .onclick=()=>{
    const cnt = document.getElementById("container");
    
    
    cnt.remove();
    document.querySelector(".navbar").style.display="none";
   
    CreatRegisterForm();
};




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
            <input type="number" id = "age" name="age" >gi
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
        </form>`
        document.body.appendChild(formContainer);
        Registration();
}


function createLoginForm() {
    

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




submit_post.onclick = async function (event) {

    event.preventDefault()
    let userid = await Registred()
    if (!userid) {

        window.location.replace("/login");

    } else {



        let x = document.querySelector(".no_post")
        if (x != null) {
            x.remove()
        }

        let category = []

        for (let i = 0; i < post_category.length; i++) {


            if (post_category[i].checked && (post_category[i].value === "sport" || post_category[i].value === "science" || post_category[i].value === "entertainment")) {
                if (!category.includes(post_category[i].value)) {

                    category.push(post_category[i].value)
                }
            }
        }


        let z = post_title.value.trim();
        let y = post_content.value.trim();

        if (z.length == 0 || y.length == 0) {
            alert("Ensure you input a value in both fields!");


        } else {
            var OBJ = {
                id: null,
                user_id: 2,
                title: post_title.value,
                content: post_content.value,
                comment: null,
                like: 0,
                dislike: 0,
                category,



            }


            fetch("/api/addPost", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(OBJ),

            })
                .then(resp => resp.json())
                .then(data => {


                    if (data.Title != "") {



                        let posts = document.getElementById("posts")


                        data.like = 0
                        data.dislike = 0
                        let card = InitPost(data)
                        posts.insertBefore(card, posts.firstChild);


                        reacPost(data)
                        comment(data)


                    } else {
                        alert("Ensure you input a value in both fields!");

                    }
                })

        }

    }

    post_content.value = ""
    post_title.value = ""

    for (const e of post_category) {

        e.checked = false
    }

}


export async function Get_Data(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();


        return data

    } catch (error) {
        console.error('Error fetching data:', error);
    }

}


let i = 0
let max = 5
let data = ""

let count = -1
window.onload = function () {
    Get_All_Posts()
}
async function Get_All_Posts() {

    let x = document.querySelector(".login_button")


    let cookie = decodeURIComponent(document.cookie.split("=")[1])
    const eqPos = cookie.indexOf('=')



    if (cookie.length > 0) {
        // hide login ----  show logout
        let login = document.querySelector(".login_button")
        login.innerText = "Logout"
        login.style.backgroundColor = "#a00"

        let register = document.querySelector(".register_button")
        if (register != null) {

            register.remove()
        }

        login.onclick = function () {
            if (login.innerText === "Logout") {
                // hide logout ----  show login
                // delete session
                document.cookie = 'session_id='; 'Max-Age=0'

                login.innerText = "Login"
            }
        }

    }

    let postsData = await Get_Data(`/api`)



    if (postsData.posts == null) {

        let load_more_button = document.querySelector(".load_more").remove()
        let noPost = ADDElement("div", "no_post", "Be the first one!")
        noPost.style.fontWeight = "bold"

        let container = document.querySelector(".container").appendChild(noPost)
        return
    } else {
        let noPost = document.querySelector(".no_post")
        if (noPost != null) {

            noPost.remove()
        }
    }
    postsData = postsData.posts;
    data = postsData
    const tour = Math.floor(data.length / 5)
    if (tour == count) {
        let load_more_button = document.querySelector(".load_more").remove()
        return
    }
    count++

    if (postsData != null) {

        for (i; i < postsData.length; i++) {

            if (i < max) {

                // Initialize Post
                postsData[i].category = postsData[i].categories
                let card = InitPost(postsData[i])

                let posts = document.getElementById("posts")

                posts.appendChild(card);
                reacPost(postsData[i])
                comment(postsData[i])


            } else {

                break
            }


        }
        max += 5

    } else {

    }


}
Get_All_Posts();


load_more.addEventListener("click", Get_All_Posts)

export function ADDElement(elem, classs, content) {
    let posts = document.getElementById("posts")

    let x = document.createElement(elem)
    x.classList.add(classs)

    if (content != "") {
        x.innerText = content
    }

    return x
}


export function F(postsData) {



    let load_more = document.querySelector(".load_more")
    load_more.style.display = 'none'


    let posts = document.getElementById("posts")
    posts.innerHTML = ''

    for (let i = 0; i < postsData.length; i++) {


        // Initialize Post
        postsData[i].category = postsData[i].categories
        let card = InitPost(postsData[i])

        let posts = document.getElementById("posts")

        posts.appendChild(card);
        reacPost(postsData[i])

        comment(postsData[i])
        /////////// Maybe It's not working
        // reactComment(postsData[i])


    }
}

export async function updateLikeandDislike(postId, reaction, action) {

    if (reaction == "like") {

        try {
            const response = await fetch(`/api/posts/${postId}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: action // "crimenter ola dicrementer"
                })
            });

            if (!response.ok) {
                throw new Error('Failed  e like');
            }

            return await response.json();
        } catch (error) {

            console.error('Error updating like:', error);
            throw error;
        }

    } else {

        try {
            const response = await fetch(`/api/posts/${postId}/dislike`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: action // "crimenter ola dicrementer"
                })
            });

            if (!response.ok) {
                throw new Error('Failed  e dislike');
            }

            return await response.json();
        } catch (error) {
            console.error('Error updating dislike:', error);
            throw error;
        }

    }


}


filter()



/******************************************************navebar functio**************************************************************************** */
function  Navbar(){

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

