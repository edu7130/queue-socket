const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl()

const socketController = (socket) => {
    
    socket.emit('ultimo-ticket',`Ticket ${ticketControl.ultimo}`)
    socket.emit('estado-actual',ticketControl.ultimos4)
    socket.emit('pendientes',ticketControl.tickets.length)

    socket.on('siguiente-ticket', ( payload, callback ) => {
        const ticket = ticketControl.siguiente()
        socket.broadcast.emit('ultimo-ticket',`Ticket ${ticketControl.ultimo}`)
        socket.broadcast.emit('pendientes',ticketControl.tickets.length)
        callback(ticket)
    })

    socket.on('atender-ticket',({escritorio}, callback)=>{
        if(!escritorio){
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            })
        }
        const ticket = ticketControl.atenderSiguiente(escritorio)
        socket.broadcast.emit('estado-actual',ticketControl.ultimos4)
        socket.emit('pendientes',ticketControl.tickets.length)
        socket.broadcast.emit('pendientes',ticketControl.tickets.length)
        if(!ticket){
            return callback({
                ok: false,
                msg:'Ya no hay ticket pendientes'
            })
        }

        callback({
            ok: true,
            ticket,
            pendientes: ticketControl.tickets.length
        })

    })

}



module.exports = {
    socketController
}

