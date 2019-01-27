const _ = require("lodash");
const fs = require("fs");
const path = require("path");
const fd = require("../fsm");
const dbg = require("debug")("plop");
const handlebars = require("handlebars");

const StateMachine = require("@taoqf/javascript-state-machine/dist/state-machine");
const StateMachineVisualize = require("@taoqf/javascript-state-machine/dist/state-machine-visualize");
const Viz = require("viz.js");
const { Module, render } = require("viz.js/full.render.js");

const transitions_list = fd.transitions;
const transitions = _.uniq(_.map(transitions_list, "name"));
const states = _.uniq(_.concat(_.map(transitions_list, "from"), _.map(transitions_list, "to")));
const defaultState = states[0].toUpperCase() + "_STATE";


function fsmSvg() {
    const log = function(msg, separate) {
        dbg(msg);
    };

    const fsm = new StateMachine({
        init: fs.start,
        transitions: fd.transitions,
        statedefs: fd.statedefs,
        methods: {
            onBeforeTransition: function(lifecycle) {
                  dbg("BEFORE: " + lifecycle.transition, true);
            },

            onLeaveState: function(lifecycle) {
                  dbg("LEAVE: " + lifecycle.from);
            },

            onEnterState: function(lifecycle) {
                  dbg("ENTER: " + lifecycle.to);
            },

            onAfterTransition: function(lifecycle) {
                  dbg("AFTER: " + lifecycle.transition);
            },

            onTransition: function(lifecycle) {
                  dbg("DURING: " + lifecycle.transition + " (from " + lifecycle.from + " to " + lifecycle.to + ")");
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
    let data = {};
    data.stateName = o + "State";
    data.stateNameCaps = _.snakeCase(data.stateName).toUpperCase();
    data.beforeStateName = "onBefore" + _.upperFirst(data.stateName)
    data.beforeStateNameCaps = _.snakeCase(data.beforeStateName).toUpperCase();
    data.leaveStateName = "onLeave" + _.upperFirst(data.stateName);
    data.leaveStateNameCaps = _.snakeCase(data.leaveStateName).toUpperCase();
    return data;
}

function getTransNames(o) {
    let data = {};
    data.canTransName = "can" + _.upperFirst(o);
    data.canTransNameCaps = _.snakeCase(data.canTransName).toUpperCase();
    data.enterTransName = "enter" + _.upperFirst(o);
    data.enterTransNameCaps = _.snakeCase(data.enterTransName).toUpperCase();
    data.fireTransName = "fire" + _.upperFirst(o);
    data.fireTransNameCaps = _.snakeCase(data.fireTransName).toUpperCase();
    data.beforeTransName = "onBefore" + _.upperFirst(data.fireTransName);
    data.beforeTransNameCaps = _.snakeCase(data.beforeTransName).toUpperCase();
    data.errorTransName = "error" + _.upperFirst(data.fireTransName);
    data.errorTransNameCaps = _.snakeCase(data.errorTransName).toUpperCase();
    return data;
}

function getTransDetails() {
    let info = [];
    _.each(transitions_list, o => {
        let data     = {};
        data.name = _.padEnd(`name: ${getTransNames(o.name).canTransNameCaps},`, 50);
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
                defaultState,
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
    console.log('done');
});
