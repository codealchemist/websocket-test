# websocket-test

Periodically send messages to a websocket.

## Install

`npm i -g websocket-test`

## Run without installing

`npx websocket-test`

## Usage

`HOST=[target-host] MS=[milliseconds] websocket-test [text]`

Environment vars:

- HOST: Set target host, should include ws protocol (ws or wss).
- SECONDS: Sets interval in seconds.
- MS: Sets interval in milliseconds.

Default host is `ws://localhost:3333`.

Default interval is 3 seconds. Can be set specifying seconds or milliseconds.

Default text is `WS-TEST`.

Example:

`HOST=wss://server.com:8080 MS=500 websocket-test Hey!`
