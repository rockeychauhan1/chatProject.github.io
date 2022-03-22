// var port = Number(process.env.PORT) || 5500;
const io=require('socket.io')(process.env.PORT || 5500,{
    cors:{
        origin:'*',
    }
});
const socket = io('http://localhost:5500');
// http://localhost:5500
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer =document.querySelector('.container');

var audio= new Audio('');

const name= prompt("Enter YOUR NAME:");
socket.emit('new-user-joined', name);

const append = (message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position=="left"){
        audio.play();
    };
}

// const time=()=>{
//     a
// }
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value = '';
});
socket.on('user-joined',name=>{
     append(`${name} joined the chat`,'right');
});


socket.on('receive',data =>{
    append(`${data.name} : ${data.message}`,'left');
});

socket.on('left',name =>{
    append(`${name} left the chat`,'left');
});
