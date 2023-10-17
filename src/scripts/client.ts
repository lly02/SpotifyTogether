import { OAuthAuthorize } from "./api/spotifyAPI.js";
import * as chromeAPI from "./api/chromeAPI.js";
import { ConnectionType, type clientSession } from "./types.js";

export default class Client {
    private static instance: Client;
    private _keepAliveId?: number;
    private _connectionType = ConnectionType.Disconnected;
    private _connectionId?: string;
    
    private constructor() {
        console.log("Creating offscreen for PeerJS");
        chromeAPI.createPeerJSOffscreen();
    }

    public static getInstance(): Client {
        if (!Client.instance) {
            Client.instance = new Client();
        }

        return Client.instance;
    }

    public async host(): Promise<void> {
        console.log("Begin OAuth authorization");
        console.log("Hosting peer connection");

        const [_, newPeer] = await Promise.all([
            OAuthAuthorize(),
            chromeAPI.sendMessage({
                target: "offscreen",
                message: "new peer"
            })
        ]);

        if (newPeer.startsWith("error")) {
            console.error("Peer not created");
        };

        this._keepAlive();
        this._connectionId = newPeer;
        this._connectionType = ConnectionType.Host;
        console.log("Hosted");
    }

    public async join(connectId: string): Promise<void> {
        console.log("Begin OAuth authorization");
        console.log("Hosting peer connection");

        const [_, newPeer] = await Promise.all([
            OAuthAuthorize(),
            chromeAPI.sendMessage({
                target: "offscreen",
                message: "new peer"
            })
        ]);

        if (newPeer.startsWith("error")) {
            console.error("Peer not created");
        };

        this._keepAlive();
        this._connectionId = newPeer;
        
        await chromeAPI.sendMessage({
            target: "offscreen",
            message: `connect ${connectId}`
        })

        this._connectionType = ConnectionType.Join;
        console.log(`Joined ${connectId}`);
    }

    public async retrieveSession(): Promise<clientSession> {
        const peers = await chromeAPI.sendMessage({
            target: "offscreen",
            message: "all connections"
        });

        return {
            connectionType: this._connectionType,
            self: this._connectionId,
            peers: peers
        }
    }

    public async disconnect(): Promise<void> {
        await chromeAPI.sendMessage({
            target: "offscreen",
            message: "kill"
        });

        this._stopKeepAlive();
        this._connectionType = ConnectionType.Disconnected;
    }

    private _keepAlive(): void {
        this._keepAliveId = setInterval( () => {
            console.log("Keeping alive");
            chromeAPI.sendMessage({
                target: "offscreen",
                message: "keep alive"});
        }, 20*1000);
    }

    private _stopKeepAlive(): void {
        clearInterval(this._keepAliveId);
    }
}