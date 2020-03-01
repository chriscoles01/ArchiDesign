import React, { Component } from 'react';
import MapGL from 'react-map-gl';
import { Editor, EditorModes } from 'react-map-gl-draw';
import {StaticMap} from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import {GeoJsonLayer, PolygonLayer} from '@deck.gl/layers';
import {LightingEffect, AmbientLight, _SunLight as SunLight} from '@deck.gl/core';
import {render} from 'react-dom';

const MODES = [
  { id: EditorModes.EDITING, text: 'Select and Edit Feature'},
  { id: EditorModes.DRAW_POINT, text: 'Draw Point'},
  { id: EditorModes.DRAW_PATH, text: 'Draw Polyline'},
  { id: EditorModes.DRAW_POLYGON, text: 'Draw Polygon'},
  { id: EditorModes.DRAW_RECTANGLE, text: 'Draw Rectangle'}
];
const MAPBOX_TOKEN = 'pk.eyJ1IjoiY2hyaXNjb2xlczAxIiwiYSI6ImNrNnhqaDF3dzBhNjMzZW8waHpnMzN5ZWsifQ.mLeEly0rwEBCNiffXh_0tg'; 

const DEFAULT_VIEWPORT = {
  width: 800,
  height: 600,
  longitude: -122.45,
  latitude: 37.78,
  zoom: 14
};

const INITIAL_VIEW_STATE = {
    latitude: 41.650623,
    longitude: -102.693757,
    zoom: 3,
    maxZoom: 16,
    pitch: 10,
    bearing: 0
  };
 
export default class Map extends Component {
  state = {
    // map
    viewport: DEFAULT_VIEWPORT,
    // editor
    selectedMode: EditorModes.READ_ONLY
  };
 
  _switchMode = evt => {
    const selectedMode = evt.target.id;
    this.setState({
     selectedMode: selectedMode === this.state.selectedMode ? null : selectedMode
    });
  };
 
  
  _renderToolbar = () => {
    return (
      <div style={{position: "absolute", top: 0, right: 0, maxWidth: '320px'}}>
        <select onChange={this._switchMode}>
          <option value="">--Please choose a mode--</option>
          {MODES.map(mode => <option value={mode.id}>{mode.text}</option>)}
        </select>
      </div>
    );
  };
 
//   render() {
//     const {mapStyle = 'mapbox://styles/mapbox/light-v9'} = this.props;

//     return (
//       <DeckGL
//         layers={this._renderLayers(this.state.choice)}
//         // effects={this._effects}
//         initialViewState={this.state.INITIAL_VIEW_STATE}
//         controller={true}
//         viewState={this.state.viewState}

//       >
        // <StaticMap
        //   reuseMaps
        //   mapStyle={mapStyle}
        //   preventStyleDiffing={true}
        //   mapboxApiAccessToken={MAPBOX_TOKEN}
        // />

  render() {
    const { viewport, selectedMode } = this.state;
    return (
        
        
        <DeckGL
        // layers={this._renderLayers(this.state.choice)}
        // effects={this._effects}
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        viewState={this.state.viewState}

        // onViewportChange={this.setState({ viewport })}
      >
          <Editor
          clickRadius={12}
          mode={selectedMode}
        />
        {this._renderToolbar()}
        <MapGL
          reuseMaps
          mapStyle={'mapbox://styles/mapbox/light-v9'}
          preventStyleDiffing={true}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        //   onViewportChange={this.setState({ viewport })}
        >
        
      </MapGL>
      
      </DeckGL>
    );
  }
}
export function renderToDOM(container) {
    render(<Map />, container);
  }
  