import { Peer, type DataConnection }  from "peerjs"

export default class PeerClient {
    peer: Peer;

    private static instance: Peer;

    private constructor() {
        this.peer = this.createPeer();
    }

    public static getInstance(): Peer {
        if (!PeerClient.instance) {
            PeerClient.instance = new Peer();
        }

        return PeerClient.instance;
    }

    private createPeer(): Peer {
        return new Peer();
    }

    public async connectPeer(id: string): Promise<DataConnection> {
        return new Promise( resolve => {
            const connection = this.peer.connect(id);
            connection.on("open", () => resolve(connection));
        });
    }
}