import client from "../src/scripts/client.ts"

function host() {
    const CLIENT = client.getInstance();
    CLIENT.host();
    console.log('h')
}