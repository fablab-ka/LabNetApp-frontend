import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { fetchDeviceList, togglePlugPower } from 'src/state/device/deviceActions';
import { getDeviceStates, getPlugsPerStrip, getStrips } from 'src/state/device/deviceSelectors';
import { DeviceStateList, DeviceStatus, Plug, PowerStrip } from 'src/state/device/deviceTypes';
import { RootAction, RootState } from 'src/state/rootReducers';

import './controlcenter.css';

export interface ControlCenterProps {
    fetchDeviceList: typeof fetchDeviceList;
    togglePlugPower: typeof togglePlugPower;
    strips: PowerStrip[];
    plugsPerStrip: { [stripId: string]: Plug[] }
    deviceStates: DeviceStateList;
}

export class ControlCenter extends React.Component<ControlCenterProps> {
    constructor(props: ControlCenterProps) {
        super(props);
    }

    public componentDidMount() {
        this.props.fetchDeviceList();
    }

    public render() {
        return (
            <ul className="controlcenter">
                {this.props.strips.map((strip) => this.renderStrip(strip))}
            </ul>
        );
    }

    private renderStrip(strip: PowerStrip) {
        const plugs = this.props.plugsPerStrip[strip.id] || [];

        return <li key={strip.id} className="strip">
            <h2>{strip.displayText}</h2>
            {plugs.map((plug) => this.renderPlug(plug))}
        </li>
    }

    private renderPlug(plug: Plug) {
        const plugHandler = () => this.props.togglePlugPower(plug.id);
        const state = this.props.deviceStates[plug.id] || DeviceStatus.Unknown;
        const classes = ['plug', 'plug--' + state];
        return <button key={plug.id} className={classes.join(' ')} onClick={plugHandler}>
            {plug.displayText}
        </button>;
    }
}

const mapStateToProps = (state: RootState) => ({
    deviceStates: getDeviceStates(state),
    plugsPerStrip: getPlugsPerStrip(state),
    strips: getStrips(state),
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
    fetchDeviceList: () => dispatch(fetchDeviceList()),
    togglePlugPower: (plugId: string) => dispatch(togglePlugPower(plugId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ControlCenter);
