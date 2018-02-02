
# Mirror Display

[![Greenkeeper badge](https://badges.greenkeeper.io/alexander-heimbuch/mirror-display.svg)](https://greenkeeper.io/)
[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

A webapp information screen to be used as a mirror display.

![Screenshot](https://raw.githubusercontent.com/alexander-heimbuch/mirror-display/master/footage/screenshot.png)

## Use Case

Main objective is to recycle old tablets. It doesn't matter what Android or iOS is used as long as it has a browser.
Using a server to deliver the information screen also gives the advantage to change the UI without touching the device itself.
Furthermore data crunching (like webscraping) is much easier on a server than on the tablet.

![Close Up](https://raw.githubusercontent.com/alexander-heimbuch/mirror-display/master/footage/closeup.jpg)
![Nearfield](https://raw.githubusercontent.com/alexander-heimbuch/mirror-display/master/footage/nearfield.jpg)

## Technology

On client side a simple redux + react app with independent components receives state updates via sockets from the node server.
Because of the passive user interaction every state change is triggered via sockets from the server side. A scheduler updates every component with state pushes.
The react components implementing their own rendering hook that reacts only to specific state changes.

## Configuration

The configuration is created with [node-config](https://github.com/lorenwest/node-config) and passed through the client via cookies on startup. To add your own config simply create a ``local.{json|yml}`` and enhance it with your configuration.
If you prefer environment overwrites have a look at the ``custom-environment-variables.yml``.

Example ``local.yml``
```
weather:
  api_key: ''
  timeout: 2500
  lat: ''
  long: ''

travel:
  car:
    base: 'https://www.google.de/maps/dir/'
    waypoints:
      - ''
      - ''

  train:
    base: 'https://reiseauskunft.bahn.de/bin/query.exe/dn?revia=yes&country=DEU&start=1&S='
    start: ''
    destination: ''
```

## Deployment

You can deploy it on any nodeJS (v5 or greater) enabled Server but I highly recommend to use docker for virtualization.
A working ``Dockerfile`` is included with a ``docker-compose`` configuration. Extend the environment variables for your needs if there are further runtime dependend variables.
