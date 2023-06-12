const form = document.querySelector(".typing-area"),
inputField = form.querySelector(".input-field"),
sendBtn = form.querySelector("button"),
chatBox = document.querySelector(".chat-box");

form.onsubmit = (e)=>{
    e.preventDefault();   // Here prevention code for form submitting
}

sendBtn.onclick = ()=>{
     // Ajax starts from here....

     let xhr = new XMLHttpRequest();  // Creating XML object
     xhr.open("POST", "php/insert-chat.php", true);
     xhr.onload = ()=>{
         if(xhr.readyState === XMLHttpRequest.DONE){
             if(xhr.status === 200){
                 inputField.value = ""; // cleare the input area once the chat inserted in the database
                 scrollToBottom();
             }
         }
     }
     // Now we have to send the form data trough ajax to php
 
     let formData = new FormData(form); //creating new formData Object
     xhr.send(formData); //Sending the formDat to php
}

chatBox.onmouseenter = ()=>{
    chatBox.classList.add("active");
}
chatBox.onmouseleave = ()=>{
    chatBox.classList.remove("active");
}

setInterval(()=>{
	// Ajax starts from here....

    let xhr = new XMLHttpRequest();  // Creating XML object
    xhr.open("POST", "php/get-chat.php", true);
    xhr.onload = ()=>{
        if(xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.status === 200){
                let data = xhr.response;
                chatBox.innerHTML = data;
                if(!chatBox.classList.contains("active")){
                    scrollToBottom();
                }
            }
        }
    }
    
    // Now we have to send the form data trough ajax to php
 
    let formData = new FormData(form); //creating new formData Object
    xhr.send(formData); //Sending the formDat to php
}, 500); // this function will run after 500ms

function scrollToBottom(){
    chatBox.scrollTop = chatBox.scrollHeight;
}