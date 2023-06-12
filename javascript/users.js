const searchBar = document.querySelector(".users .search input"),
searchBtn = document.querySelector(".users .search button"),
usersList = document.querySelector(".users .users-list");

searchBtn.onclick = ()=>{
	searchBar.classList.toggle("active");
	searchBar.focus();
	searchBtn.classList.toggle("active");
	searchBar.value = "";
}

searchBar.onkeyup = ()=>{
	let searchTerm = searchBar.ariaValue;
	if(searchTerm != ""){
		searchBar.classList.add("active");
	}else{
		searchBar.classList.remove("active");
	}
	// Ajax starts from here....

    let xhr = new XMLHttpRequest();  // Creating XML object
    xhr.open("POST", "php/search.php", true);
    xhr.onload = ()=>{
        if(xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.status === 200){
                let data = xhr.response;
                usersList.innerHTML = data;
            }
        }
    }
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send("searchTerm=" + searchTerm);
}

setInterval(()=>{
	// Ajax starts from here....

    let xhr = new XMLHttpRequest();  // Creating XML object
    xhr.open("GET", "php/users.php", true);
    xhr.onload = ()=>{
        if(xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.status === 200){
                let data = xhr.response;
                if(!searchBar.classList.contains("active")){
					usersList.innerHTML = data;
				}
            }
        }
    }
	xhr.send();
}, 500); // this function will run after 500ms