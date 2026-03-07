document.getElementById("sign-in-btn").addEventListener("click",() =>{
    // 1- add Username
    const inputUserName = document.getElementById("input-username");
    const userName = inputUserName.value; 
    // 2- add password
    const inputPassword =document.getElementById("input-password");
    const password = inputPassword.value;
    // 3- Invalid Username & password
    if(userName === "admin" && password === "admin123"){
        
        // 3.1- true::> alert --> Homepage
        alert ("Sign In Successful")
        window.location.assign("/github-issues-tracker.html")
    }
    else{
        // 3.2- false::> alert --> return
        alert("Sign In Failed")
        return;
    }
})