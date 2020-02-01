import React from 'react';
import GalaxyZ1 from './GalaxyZ1';
import ScreenModes from './ScreenModes';
import Visualizer from './Visualizer';

class GalaxyZVisualizer extends React.Component {
    public render() {
        return <Visualizer animations={[GalaxyZ1]} mode={ScreenModes.FULLSCREEN} />;
    }
}

export default GalaxyZVisualizer;
