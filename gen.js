let a = 0;
async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/stablediffusionapi/juggernaut-xl-v5",
		{
			headers: { Authorization: "Bearer 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" , "Content-Type": "application/json" },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.blob();
	return result;
}

function generate(){
    
let img = document.createElement("img")
let load = document.createElement("img")
load.src = "icons/wait.gif"
load.style.width = "250px"
load.style.height = "250px"
load.style.marginLeft = "15px"

document.getElementById("results").appendChild(load)

document.getElementById("notif").style.display = "block"
setTimeout(function(){
    document.getElementById("notif").style.display = "none"
} , 2400)
query({"inputs": document.getElementById("prompt").value , timestamp: new Date().getTime()}).then((response) => {
        var src =  URL.createObjectURL(response)
        img.src = src
        fetch(src).then(response => response.json().then(data =>{
            document.getElementById("status").innerHTML = "Error: " + data.error
        }))
        setTimeout(function(){
            document.getElementById("status").innerHTML = ""
        } , 25000)
        img.style.width = "250px"
        img.style.height = "250px"
        img.style.marginLeft = "15px"
        img.onclick = function(){
            window.open(img.src)
        }
        document.getElementById("results").removeChild(load)
        document.getElementById("results").appendChild(img)
    })
}

 window.addEventListener("DOMContentLoaded" , function(){
    document.getElementById("prompt").addEventListener("keydown" , function(e){
        if(e.keyCode == 13){
            generate()
        }
    })



 })

 function save(){
    document.getElementById("notif").style.display = "block"
    document.getElementById("notif-txt").innerHTML = "Saved!!"

setTimeout(function(){
    document.getElementById("notif").style.display = "none"
} , 2100)
    localStorage.setItem("pro" , document.getElementById("sav-prompt").value)

}

function load(){
    document.getElementById("notif").style.display = "block"
    document.getElementById("notif-txt").innerHTML = "Loaded!!"

    setTimeout(function(){
        document.getElementById("notif").style.display = "none"
    } , 2100)
    document.getElementById("sav-prompt").value = localStorage.getItem("pro")

}

document.addEventListener("keydown" , function(e){
    if(e.ctrlKey && e.keyCode == 13){
        generate()
    }
  })
