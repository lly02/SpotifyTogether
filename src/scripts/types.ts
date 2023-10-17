// CHROMEAPI.TS
export interface message {
    target: string,
    message: string
}

// CLIENT.TS
export enum ConnectionType {
    Host = "Host",
    Join = "Join",
    Disconnected = "Disconnected"
}

export interface clientSession {
    connectionType: ConnectionType,
    self?: string,
    peers?: string[]
}