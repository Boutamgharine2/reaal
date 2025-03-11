






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