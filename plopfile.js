const _ = require('lodash');
const fsm = require('./plop/fsmProcess');
const fs = require('fs');

module.exports = function (plop) {
	plop.setActionType('writeStates', async function (answers, config, plop) {
        const fsmData = await config.data();
        let created = [];
        let updated = [];
        for (let state of fsmData.states) {
            let template = fs.readFileSync('plop/templates/fsmStateDetails.ts.hbs', 'utf8');
            let contents = plop.renderString(template, state);
            let fname = `src/store/app/fsm/states/${state.stateName}.ts`;
            let exists = fs.existsSync(fname);
            if (!exists) {   
                created.push(fname);
                fs.writeFileSync(`${fname}`, contents);
            } else {
                updated.push(fname);

                let sections = {
                    beforeNameCapssaga: ["### beforeNameCaps-saga-start", "### beforeNameCaps-saga-end",],
                    nameCapssaga: ["### nameCaps-saga-start", "### nameCaps-saga-end",],
                    leaveNameCapssaga: ["### leaveNameCaps-saga-start", "### leaveNameCaps-saga-end",],
                    beforeNameCapsreducer: ["### beforeNameCaps-reducer-start", "### beforeNameCaps-reducer-end",],
                    nameCapsreducer: ["### nameCaps-reducer-start", "### nameCaps-reducer-end",],
                    leaveNameCapsreducer: ["### leaveNameCaps-reducer-start", "### leaveNameCaps-reducer-end",],
                };
                
                for (let name in sections) {
                    let [start, end] = sections[name];
                    let current = fs.readFileSync(fname, 'utf8');
                    let r = new RegExp(`(${start})([\\s\\S]*?)(${end})`);
                    let parts = r.exec(current);
                    if (parts && parts.length > 3) {
                        let new_section = `${parts[1]}${parts[2]}${parts[3]}`;
                        contents = contents.replace(r, `${start}${new_section}${end}`);
                    }
                }
            }
            fs.writeFileSync(`${fname}`, contents);
        };
		return "Created: \n" + created.join("\n") + "\nUpdated: \n" + updated.join("\n");
    });
    
    // create your generators here
    let actions = [
        {
            type: 'add',
            data: fsm,
            templateFile: 'plop/templates/fsmDefinition.ts.hbs',
            force: true,
            path: 'src/store/app/fsm/fsmDefinitions.ts',
        },
        {
            type: 'writeStates',
            data: fsm,
        },
        {
            type: 'add',
            data: fsm,
            templateFile: 'plop/templates/fsmIndex.ts.hbs',
            force: true,
            path: 'src/store/app/fsm/index.ts',
        },
        {
            type: 'add',
            data: fsm,
            template: '{{{fsmSvg}}}',
            force: true,
            path: 'documentation/fsm.svg',
        },
        {
            type: 'add',
            templateFile: 'plop/templates/fsm.css',
            force: true,
            path: 'documentation/fsm.css',
        },
        {
            type: 'add',
            templateFile: 'plop/templates/index.html',
            force: true,
            path: 'documentation/index.html',
        }
    ];
    plop.setGenerator('fsm', {
        description: 'generate FSM files',
        prompts: [], // array of inquirer prompts
        actions: actions,
    });
}