import { isWin } from "@src/store";
import { DesktopInterface } from "./platform/desktop";
import { RaspberryPiInterface } from "./platform/rpi";

export interface IHardwareInterface {
}

export class HardwareFactory {
    public static getInstance(): IHardwareInterface {
        if (!HardwareFactory.instance) {
            HardwareFactory.instance = isWin ? new DesktopInterface() : new RaspberryPiInterface();
        }
        return HardwareFactory.instance;
    }

    private static instance: IHardwareInterface;
}
