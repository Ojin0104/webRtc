const messageList=document.querySelector("ul");
const messageForm=document.querySelector("form");
console.log(12);
const socket = new WebSocket(`ws://${window.location.host}`);

function handleOpen(){
    console.log("Connected to server v");
}
socket.addEventListener("open",handleOpen);

socket.addEventListener("message",(message)=>{
    console.log("New message: ",message.data );
});

socket.addEventListener("close",()=>{
    console.log("disConnected from Server X ");
});
function handleSubmit(event){
    event.preventDefault();
    const input= messageForm.querySelector("input");
    
    socket.send(input.value);
    input.value="";
}
messageForm.addEventListener("submit",handleSubmit);
