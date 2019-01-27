import { IPayloadAction } from '@src/store';
import { HardwareFactory, IHardwareInterface } from '@src/store/app/hardware';

export * from "./hardwareSagas";
export * from "./hardwareInterface";

export interface IHardwareState {
    hardware: IHardwareInterface
}

export let initialHardwareState: IHardwareState = {
    hardware: HardwareFactory.getInstance()
};

export const OPEN_DOOR = "OPEN_DOOR";
export let openDoor = () => ({ type: OPEN_DOOR });

export const CLOSE_DOOR = "CLOSE_DOOR";
export let closeDoor = () => ({ type: CLOSE_DOOR });

export let hardwareReducer = (state = initialHardwareState, { type, payload }: IPayloadAction<any>): IHardwareState => {
    switch (type) {
        default:
            return state;
    }
};

export function getHardwareState(state: any): IHardwareState {
    return state.app.hardware;
}
