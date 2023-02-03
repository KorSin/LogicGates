export type ConnectorPointState = {
    id: string;
    connectedTo?: string;
    networkNode: string
    x: number;
    y: number;
    isActive: boolean;
}

export type NetworkNode = {
    id: string;
    x: number;
    y: number;
    connectorPoints: string[];
}