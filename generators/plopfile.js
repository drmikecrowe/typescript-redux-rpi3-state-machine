const _ = require('lodash');
const fsm = require('./fsmProcess');
const fs = require('fs');

module.exports = function (plop) {
	plop.setActionType('writeStates', async function (answers, config, plop) {
        const fsmData = await config.data();
        let created = [];
        let skipped = [];
        for (let state of fsmData.states) {
            let template = fs.readFileSync(__dirname + '/templates/fsmStateDetails.ts.hbs', 'utf8');
            let contents = plop.renderString(template, state);
            let fname = `${__dirname}/../src/store/app/fsm/states/${state.stateName}.ts`;
            let exists = fs.existsSync(fname);
            if (!exists || config.force) {   
                created.push(state.stateName);
                fs.writeFileSync(`${fname}`, contents);
            } else {
                skipped.push(state.stateName);
            }
        };
        let cstr = created.length > 0 ? `Created: ${created.join(",")}` : ``;
        let sstr = skipped.length > 0 ? `Skipped: ${skipped.join(",")}` : ``;
		return `src/store/app/fsm/states/ ${cstr} ${sstr}`;
    });
    
    // create your generators here
    let actions = [
        {
            type: 'add',
            data: fsm,
            templateFile: __dirname + '/templates/fsmDefinition.ts.hbs',
            force: true,
            path: __dirname + '/../src/store/app/fsm/fsmDefinitions.ts',
        },
        {
            type: 'writeStates',
            data: fsm,
        },
        {
            type: 'add',
            data: fsm,
            templateFile: __dirname + '/templates/fsmIndex.ts.hbs',
            force: true,
            path: __dirname + '/../src/store/app/fsm/index.ts',
        },
        {
            type: 'add',
            data: fsm,
            template: '{{{fsmSvg}}}',
            force: true,
            path: __dirname + '/../documentation/fsm.svg',
        },
        {
            type: 'add',
            templateFile: __dirname + '/templates/fsm.css',
            force: true,
            path: __dirname + '/../documentation/fsm.css',
        },
        {
            type: 'add',
            templateFile: __dirname + '/templates/index.html',
            force: true,
            path: __dirname + '/../documentation/index.html',
        }
    ];
    plop.setGenerator('fsm', {
        description: 'generate FSM files',
        prompts: [], // array of inquirer prompts
        actions: actions,
    });
}
