import { OAuthAuthorize } from "./api/spotifyAPI.js";
import * as chromeAPI from "./api/chromeAPI.js";
import PeerClient from "./offscreen/peerClient.js";

export default class Client {
    private static instance: Client;
    private _peerClient?: PeerClient;
    
    private constructor() {}

    public static getInstance(): Client {
        if (!Client.instance) {
            Client.instance = new Client();
        }

        return Client.instance;
    }

    public async host(): Promise<string> {
        console.log("Creating offscreen for PeerJS");
        await chromeAPI.createPeerJSOffscreen();

        console.log("Begin OAuth authorization");
        await OAuthAuthorize();

        console.log("Hosting peer connection");
        this._peerClient = await PeerClient.getInstance();
        const peerId = await chromeAPI.sendMessage("newPeer");

        this._keepAlive();

        console.log("Hosted");
        return peerId;
    }

    private _keepAlive(): void {
        const intervalId = setInterval( () => {
            if (this._peerClient != null) {
                console.log("Keeping alive");
                chromeAPI.sendMessage("keepAlive");
            } else {
                clearInterval(intervalId);
            };
        }, 20*1000);

    }
}