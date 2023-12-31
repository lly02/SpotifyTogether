export default class PeerClient {
    id;
    peer;
    connections = {};

    static instance;

    static getInstance() {
        if (!PeerClient.instance) {
            PeerClient.instance = new PeerClient();
        }

        return PeerClient.instance;
    }

    async createPeer() {
        return new Promise( (resolve, error) => {
            this.peer = new Peer();
            this.peer.on("open", (id) => {
                this.id = id;
                console.log(`Your peer connection has been established with ID: ${id}`);
                resolve(id);
            });
            this.peer.on("error", (e) => {
                console.log(e);
                error(e);
            });
        });
    }

    async connectPeer(id) {
        return new Promise( (resolve, error) => {
            this.connections[id] = this.peer.connect(id);
            this.connections[id].on("open", () => {
                console.log(`Connection established with ${id}.`)
                resolve(id);
            });
            this.connections[id].on("error", e => {
                console.error(e);
                error(e);
            })
        });
    }

    kill() {
        this.peer.disconnect();
        
        this.peer.on("disconnected", () => {
            this.peer.destroy();
            
            this.peer = null;
            this.id = null;
            this.connections = {};
        });

    }

    getAllConnectionIds() {
        let connections = "";

        for (const [key, _] of Object.entries(this.connections)) {
            connections += key + " ";
        };
        
        return connections.slice(0, -1);
    }
}