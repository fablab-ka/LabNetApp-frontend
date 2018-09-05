export enum DeviceStatus {
    Unknown = '',
    On = 'on',
    Off = 'off'
}

export interface DeviceStateList { [plugId: string]: DeviceStatus }

export enum NodeType {
    Powerhub = 'powerhub',
    Basis = 'basis'
}

export interface Node {
    address: number;
    id: string;
    displayText: string;
    type: NodeType;
    location: string;
}

export interface PowerStrip {
    nodeId: string;
    address: number;
    id: string;
    displayText: string;
    location: string;
}

export interface Plug {
    stripId: string;
    address: number;
    id: string;
    displayText: string;
    description: string;
    changeable: boolean;
}

export interface DeviceList {
    nodes: Node[];
    strips: PowerStrip[];
    plugs: Plug[];
}