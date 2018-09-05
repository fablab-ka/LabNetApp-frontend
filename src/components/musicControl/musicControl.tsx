import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { RootAction, RootState } from 'src/state/rootReducers';

import './musicControl.css';

export interface MusicControlProps {
    nothing: string;
}

export class MusicControl extends React.Component<MusicControlProps> {
    constructor(props: MusicControlProps) {
        super(props);
    }

    public render() {
        return (
            <div className="music-control">
                The Music.
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(MusicControl);
