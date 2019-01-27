import * as _ from 'lodash';
import store from '@src/store';
import * as util from 'util';
import * as EventEmitter from'events';
import * as nodeCleanup from 'node-cleanup';
 
nodeCleanup((exitCode, signal) => {
    // release resources here before node exits
    console.log('Quitting');
    process.exit(0);
});
process.stdin.resume();

const main = async (): Promise<void> => {
    store.getState();
};
main();
