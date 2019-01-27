import debug from "debug";
const dbg: debug.Debugger = debug("vips:hardware:hardwareSagas");

import {select, takeEvery, put} from 'redux-saga/effects';
import { OPEN_DOOR } from '.';

export let hardwareSagas: Array<() => void> = [];

hardwareSagas.push(function* () {

});
