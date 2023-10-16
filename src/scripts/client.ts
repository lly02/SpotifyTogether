import { OAuthAuthorize } from "./api/spotifyAPI.js";
import * as chromeAPI from "./api/chromeAPI.js";

export default class Client {
    private static instance: Client;
    private _keepAliveId?: number;
    
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
        const newPeer = await chromeAPI.sendMessage({
            target: "offscreen",
            message: "new peer"
        });

        if (newPeer != "peer created") {
            console.error("Peer not created");
            return "false";
        };

        this._keepAlive();

        console.log("Hosted");
        return "true";
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