const lblEscritorio = document.querySelector('h1')
const lblTicket = document.querySelector('small')
const btnAtender = document.querySelector('button')
const divAlerta = document.querySelector('.alert')
const lblPendientes = document.querySelector('#lblPendientes')

const searchParams = new URLSearchParams(window.location.search)
if(! searchParams.has('escritorio')){
    window.location = 'index.html'
}
const socket = io()

const escritorio = searchParams.get('escritorio')
lblEscritorio.innerText = escritorio
divAlerta.style.display = 'none'


socket.on('connect',()=>{
    btnAtender.disabled = false;
})

socket.on('disconnect',()=>{
    btnAtender.disabled = true;
})

socket.on('pendientes',(pendientes)=>{
    if(pendientes===0){
        lblPendientes.style.display='none'
        divAlerta.style.display = ''
        return;
    }
    lblPendientes.style.display=''
    lblPendientes.innerText = pendientes
})

btnAtender.addEventListener('click',()=>{
    socket.emit('atender-ticket',{escritorio},({ok, ticket, msg})=>{
        
        if(!ok){
            lblTicket.innerText = `Nadie`
            return divAlerta.style.display = ''
        }
        divAlerta.style.display = 'none'
        lblTicket.innerText = `Ticket ${ticket.numero}`
    })
})
