# Headless Raspberry PI 3 TypeScript / Redux State Machine

Example project implementing a TypeScript State Machine using Redux (headless).  This state machine has:

* 2 states, `Opened`, `Closed` 
* 2 transitions: `doOpen`, `doClose`

When run (either via local execution or remotely on the Raspberry PI via ssh), 

## Overview

* [Javascript State Machine](https://github.com/taoqf/javascript-state-machine) 
* State Machine managed in simple [Javascript definition file](../blob/master/fsm.js)
* [Redux](https://redux.js.org/) controlled state.  Multiple saga entry points:
    * onBefore_____State
    * _____State
    * onLeave_____State
* Templates managed by [Plop.js](https://plopjs.com/)
* Visual State Machine documentated automatically
* [Jest](https://jestjs.io/) testing

## Example Documentation 

Auto-generated from [this definition file](../blob/master/fsm.js)

![Example State Machine](https://github.com/drmikecrowe/typescript-redux-rpi3-state-machine/raw/master/documentation/fsm.svg "Example State Machine")

## Usage

```Lifecycle scripts included in typescript-redux-rpi3-state-machine:
  test
    jest

available via `npm run-script`:
  build:prod
    webpack --config webpack.config.prod.js
  build:dev
    webpack --config webpack.config.js
  plop
    plop
  test:debug
    node --inspect node_modules/.bin/jest --runInBand
  watch:webpack
    DEBUG=fsm:* webpack-watch-server --stdin --config webpack.config.js
  watch:app
    nodemon --no-stdin --config nodemon-ts.json
  watch:plop
    nodemon --exec plop fsm.js
```

## Raspberry PI Installation

On your PI:

```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y gcc g++ make nodejs git
mkdir ~/app
```

On your host, build:

```
npm run build:prod
```

Copy files to your PI.  For example:

```
scp package* pi@192.168.0.39:/home/pi/app/
scp dist/index.js pi@192.168.0.39:/home/pi/app/
```

Now, back on your PI:

```
cd ~/app
npm i --production
DEBUG=* node index.js
```

## Raspberry PI Output

```
[00:00]pi at raspberrypi in ~
$ cd app/
[00:00]pi at raspberrypi in ~/app
$ DEBUG=* node index.js 
  fsm:controller @@redux/INITi.v.t.y.t +0ms
  fsm:controller @@redux/PROBE_UNKNOWN_ACTION4.5.m.n.w +8ms
  fsm:controller @@redux/INITi.v.t.y.t +18ms
  fsm:controller @@redux/PROBE_UNKNOWN_ACTION3.s.a.3.t.a +1ms
winston:create-logger Define prototype method for "error"
winston:create-logger Define prototype method for "warn"
winston:create-logger Define prototype method for "info"
winston:create-logger Define prototype method for "http"
winston:create-logger Define prototype method for "verbose"
winston:create-logger Define prototype method for "debug"
winston:create-logger Define prototype method for "silly"
winston:create-logger Define prototype method for "error"
winston:create-logger Define prototype method for "warn"
winston:create-logger Define prototype method for "info"
winston:create-logger Define prototype method for "http"
winston:create-logger Define prototype method for "verbose"
winston:create-logger Define prototype method for "debug"
winston:create-logger Define prototype method for "silly"
  fsm:controller @@redux/INITi.v.t.y.t +330ms
  fsm:controller @@redux/PROBE_UNKNOWN_ACTION0.h.g.1.q.j +1ms
  fsm:controller @@redux/INITi.v.t.y.t +4ms
  fsm:controller FSM_CREATE +24ms
  fsm:controller Creating FSM +13ms
winston:file stat done: simulator.log { size: 0 }
winston:file create stream start /home/pi/app/logs/simulator.log { flags: 'a' }
winston:file create stream ok /home/pi/app/logs/simulator.log
winston:file file open ok /home/pi/app/logs/simulator.log
```

Now press `o` to trigger the Opened state:

```
o
  fsm::index.js got "keypress" o +0ms
  fsm:controller FIRE_DO_OPEN +2s
  fsm:controller Dispatching fireDoOpen in FSM +6ms
  fsm:controller event: onBeforeTransition, type: ON_BEFORE_FIRE_DO_OPEN_TRANS +3ms
  fsm:controller ON_BEFORE_FIRE_DO_OPEN_TRANS +3ms
  fsm::index.js got "keypress" enter +15ms
  fsm:controller event: onLeaveState, type: ON_LEAVE_CLOSED_STATE_STATE +5ms
  fsm:controller ON_LEAVE_CLOSED_STATE_STATE +2ms
  fsm:controller event: onTransition, type: FIRE_DO_OPEN_TRANS +2ms
  fsm:controller FIRE_DO_OPEN_TRANS +3ms
  fsm:controller event: onEnterState, type: OPENED_STATE_STATE +2ms
  fsm:controller OPENED_STATE_STATE +2ms
```

Now press `o` to attempt to transition to Opened again:

```
  fsm::index.js got "keypress" o +4s
  fsm:controller FIRE_DO_OPEN +4s
  fsm:controller Cannot transition from OPENED_STATE with fireDoOpen +3ms
  fsm:controller ERROR_FIRE_DO_OPEN +2ms
  fsm:controller TRANSITION_ERROR +2ms
  fsm::index.js got "keypress" enter +10ms
```

Now press `c` to trigger the Closed state:

```
  fsm::index.js got "keypress" c +7s
  fsm:controller FIRE_DO_CLOSE +7s
  fsm:controller Dispatching fireDoClose in FSM +3ms
  fsm:controller event: onBeforeTransition, type: ON_BEFORE_FIRE_DO_CLOSE_TRANS +1ms
  fsm:controller ON_BEFORE_FIRE_DO_CLOSE_TRANS +2ms
  fsm::index.js got "keypress" enter +9ms
  fsm:controller event: onLeaveState, type: ON_LEAVE_OPENED_STATE_STATE +3ms
  fsm:controller ON_LEAVE_OPENED_STATE_STATE +1ms
  fsm:controller event: onTransition, type: FIRE_DO_CLOSE_TRANS +2ms
  fsm:controller FIRE_DO_CLOSE_TRANS +1ms
  fsm:controller event: onEnterState, type: CLOSED_STATE_STATE +2ms
  fsm:controller CLOSED_STATE_STATE +2ms
```

Now press `c` to trigger the Closed state:

```
  fsm::index.js got "keypress" c +2s
  fsm:controller FIRE_DO_CLOSE +2s
  fsm:controller Cannot transition from CLOSED_STATE with fireDoClose +2ms
  fsm:controller ERROR_FIRE_DO_CLOSE +1ms
  fsm:controller TRANSITION_ERROR +2ms
  fsm::index.js got "keypress" enter +8ms
q
  fsm::index.js got "keypress" q +3s
Quitting
[00:00]pi at raspberrypi in ~/app
$ 
```