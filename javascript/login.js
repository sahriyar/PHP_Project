const form = document.querySelector(".login form"),
continueBtn =  form.querySelector(".button input"),
errorText =  form.querySelector(".error-txt");

form.onsubmit = (e)=>{
    e.preventDefault();   // Here prevention code for form submitting
}

continueBtn.onclick = ()=>{
    // Ajax starts from here....

    let xhr = new XMLHttpRequest();  // Creating XML object
    xhr.open("POST", "php/login.php", true);
    xhr.onload = ()=>{
        if(xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.status === 200){
                let data = xhr.response;
                console.log(data);
                if(data == "success"){
                    location.href = "user.php";
                }else{
                    errorText.style.display = "block";
                    errorText.textContent = data;  
                }
            }
        }
    }
    // Now we have to send the form data trough ajax to php

    let formData = new FormData(form); //creating new formData Object
    xhr.send(formData); //Sending the formDat to php
}