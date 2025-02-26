import { InitPost } from "./post.js";
import { reacPost } from "./reactPost.js";
import { comment } from "./comment.js";
import { Registred } from "./registred.js";
import { filter } from "./filter.js";
// import { reactComment } from "./reactComment.js";


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
const pop = document.querySelector(".form-container")
console.log(login_botton);


//pop.style.display ="block"
// cancel_botton.onclick=()=>{
//     div_pop.style.display="none";
//     document.body.removeChild(div0);
//     closeForm();

    
    
    
// };
login_botton.onclick=()=>{
    const cnt = document.getElementById("container");
    console.log(cnt);
    
    cnt.remove();
   
    CreatLoginPage();
};


function openForm() {
    //debugger    
    document.querySelector(".form-popup").style.display="block"
    pop.style.display = "block";
    
    
    
    
}
function closeForm() {
    pop.style.display = "none";
    document.body.removeChild(".pop_up");

    
}
function CreatLoginPage(){
  
     let overly = document.createElement("div");
     overly.classNames="popup-overly";
     document.body.appendChild(overly);
    // coverdiv.style.backgroundColor="rgba(187,187,187,0,9)";
    // coverdiv.style.width="100%";
    // coverdiv.style.height="100%";
    // document.body.appendChild(coverdiv);
    
    let loginDiv =document.createElement("div");
    loginDiv.style.width="500px"
    loginDiv.style.height="500px"
    loginDiv.style.margin="auto"
    loginDiv.className="divlogin"
    let loginForm = document.createElement('form');
    loginForm.className="loginform";
    let hedding= document.createElement("h2");
    hedding.textContent="Login";
    loginForm.appendChild(hedding);
    loginDiv.appendChild(loginForm);
    let firsthed = document.createElement("h3");
    firsthed.textContent="enter your email or username";
    firsthed.style.textAlign="center";
    firsthed.style.fontSize="20px";
    loginDiv.appendChild(firsthed);
    let firstInput = document.createElement("input");
    firstInput.placeholder="enter your email";
    firstInput.style.width="100%";
    firstInput.style.height="20%";
    loginDiv.appendChild(firstInput);
    let secondhead = document.createElement('h3');
    secondhead.textContent="enter your password";
    secondhead.style.textAlign="center";
    secondhead.style.fontSize="20px";
    loginDiv.appendChild(secondhead);
    let secondInput = document.createElement("input");
 secondInput.placeholder="enter your password";
 secondInput.style.width="100%";
 secondInput.style.height="20%";
 loginDiv.appendChild(secondInput);
let loginbottun = document.createElement("button");
loginbottun.textContent="submit";
loginbottun.style.height="15%";
loginbottun.style.width="100%";
loginbottun.style.margin="6px 0px 6px 0px"
loginDiv.appendChild(loginbottun);
    document.body.prepend(loginDiv);
    console.log(loginDiv);
    let registerbutton = document.createElement("button");
registerbutton.textContent="register";
registerbutton.style.height="15%";
registerbutton.style.width="100%";
registerbutton.style.margin="6px 0px 6px 0px"
loginDiv.appendChild(registerbutton);
    document.body.appendChild(loginDiv);
    console.log(loginDiv);
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






