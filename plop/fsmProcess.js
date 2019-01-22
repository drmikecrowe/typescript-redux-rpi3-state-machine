const _ = require("lodash");
const fs = require("fs");
const path = require("path");
const fd = require("../fsm");
const debug = require("debug")("plop");
const handlebars = require("handlebars");

const StateMachine = require("@taoqf/javascript-state-machine/dist/state-machine");
const StateMachineVisualize = require("@taoqf/javascript-state-machine/dist/state-machine-visualize");
const Viz = require("viz.js");
const { Module, render } = require("viz.js/full.render.js");

const transitions_list = fd.transitions;
const transitions = _.uniq(_.map(transitions_list, "name"));
const states = _.uniq(_.concat(_.map(transitions_list, "from"), _.map(transitions_list, "to")));

function fsmSvg() {
    const log = function(msg, separate) {
        debug(msg);
    };

    const fsm = new StateMachine({
        init: fs.start,
        transitions: fd.transitions,
        statedefs: fd.statedefs,
        methods: {
            onBeforeTransition: function(lifecycle) {
                log("BEFORE: " + lifecycle.transition, true);
            },

            onLeaveState: function(lifecycle) {
                log("LEAVE: " + lifecycle.from);
            },

            onEnterState: function(lifecycle) {
                log("ENTER: " + lifecycle.to);
            },

            onAfterTransition: function(lifecycle) {
                log("AFTER: " + lifecycle.transition);
            },

            onTransition: function(lifecycle) {
                log("DURING: " + lifecycle.transition + " (from " + lifecycle.from + " to " + lifecycle.to + ")");
            }
        }
    });

    const viz = StateMachineVisualize(fsm, fd);
    // console.log(viz);
    // fs.writeFileSync("/tmp/info.txt", viz);
    const v = new Viz({ Module, render });
    return v.renderString(viz)
        .then(svg => svg);
}

function getStateNames(o) {
    let data = {
    };
    data.stateName = o + "State";
    data.beforeStateName = "onBefore" + _.upperFirst(data.stateName)
    data.leaveStateName = "onLeave" + _.upperFirst(data.stateName);
    data.stateNameCaps = _.snakeCase(data.stateName).toUpperCase();
    data.beforeStateNameCaps = _.snakeCase(data.beforeStateName).toUpperCase();
    data.leaveStateNameCaps = _.snakeCase(data.leaveStateName).toUpperCase();
    return data;
}

function getTransNames(o) {
    let data = {};
    data.transName = "fire" + _.upperFirst(o);
    data.beforeTransName = "onBefore" + _.upperFirst(data.transName);
    data.canTransName = "can" + _.upperFirst(data.transName);
    data.errorTransName = "error" + _.upperFirst(data.transName);
    data.transNameCaps = _.snakeCase(data.transName).toUpperCase();
    data.beforeTransNameCaps = _.snakeCase(data.beforeTransName).toUpperCase();
    data.canTransNameCaps = _.snakeCase(data.canTransName).toUpperCase();
    data.errorTransNameCaps = _.snakeCase(data.errorTransName).toUpperCase();
    return data;
}

function getTransDetails() {
    let info = [];
    _.each(transitions_list, o => {
        let data     = {};
        data.name = _.padEnd(`name: ${getTransNames(o.name).transNameCaps},`, 50);
        data.from = _.padEnd(`from: ${getStateNames(o.from).stateNameCaps},`, 40);
        data.to =  _.padEnd(`to: ${getStateNames(o.to).stateNameCaps},`, 40);
        info.push(data);
    });
    return info;
}

function fsmStateDefs() {
    const info = [];
    _.each(states, o => {
        info.push(getStateNames(o));
    });
    return info;
}

function fsmTransDefs() {
    const info = [];
    _.each(transitions, o => {
        info.push(getTransNames(o));
    });
    return info;
}

const proc = () => {
    return new Promise((resolve, reject) => {
        (async () => {
            let ret = {
                transitions: fsmTransDefs(),
                states: fsmStateDefs(),
                transitions_list: getTransDetails(),
                fsmSvg: await fsmSvg()
            };
            // const fs = require("fs");
            // fs.writeFileSync("/tmp/info.txt", JSON.stringify(ret, null, 4));
            return resolve(ret);
        })().catch((err) => {
            console.error(err);
            process.exit(1);
        });
    });
};

module.exports = proc;

proc().then(ret=>{
    console.log(JSON.stringify(ret, null, 4))
});