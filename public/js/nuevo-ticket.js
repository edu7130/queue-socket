const lblTicket = document.querySelector('#lblNuevoTicket')
const btnCrear =document.querySelector('button')
const socket = io()


socket.on('connect',()=>{
    btnCrear.disabled = false;
})

socket.on('disconnect',()=>{
    btnCrear.disabled = true;
})

socket.on('ultimo-ticket',(ticket)=>{
    lblTicket.innerText = ticket
})

btnCrear.addEventListener('click',()=>{
    socket.emit('siguiente-ticket',null,(ticket)=>{
        lblTicket.innerText = ticket
    })
})
