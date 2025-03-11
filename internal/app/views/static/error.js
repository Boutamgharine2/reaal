export function PageError(){


    const container = document.getElementById("container");
    container.innerHTML="";
    container.innerHTML=` <main class="err-main">
        <div class="err-bg"></div>
        <div class="err-content">
            <center>
                <h2>Error {{.ErrorNum}} : {{.ErrorType}}</h2>
            </center>
            <!-- <form action="/"> -->
            <button class="go-back-error" onclick="window.history.back()">Go Back</button>
            <!-- </form> -->
        </div>
    </main>`;
}