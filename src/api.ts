import {io, Socket} from "socket.io-client";

export const API = {
    socket: null as null | Socket,
    createConnection() {
        this.socket = io('https://socket-io-back-chat.herokuapp.com/', {transports: ['websocket']})
    },
    subscribe(initMessagesHandler: (message: any) => void, newMessageSendHandler: (message: any) => void) {
        this.socket?.on('init-messages-published', initMessagesHandler)
        this.socket?.on('new-message-sent',newMessageSendHandler)
    },
    destroyConnection() {
        this.socket?.disconnect()
        this.socket = null
    },
    sendName(name: string) {
        this.socket?.emit('client-name-sent', name)
    },
    sendMessage(message: string) {
        this.socket?.emit('client-message-sent',message)
    }
}