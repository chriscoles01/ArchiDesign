import React, {Component} from 'react';
import {render} from 'react-dom';
import {StaticMap} from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import {GeoJsonLayer, PolygonLayer} from '@deck.gl/layers';
import {LightingEffect, AmbientLight, _SunLight as SunLight} from '@deck.gl/core';
// import {scaleThreshold} from 'd3-scale';
// import ControlPanel from './control-panel';
import { EditableGeoJsonLayer, DrawPolygonMode } from 'nebula.gl';


// Set your mapbox token here
const MAPBOX_TOKEN = 'pk.eyJ1IjoiY2hyaXNjb2xlczAxIiwiYSI6ImNrNnhqaDF3dzBhNjMzZW8waHpnMzN5ZWsifQ.mLeEly0rwEBCNiffXh_0tg'; 

// export const COLOR_SCALE = scaleThreshold()
//   .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
//   .range([
//     [65, 182, 196],
//     [127, 205, 187],
//     [199, 233, 180],
//     [237, 248, 177],
//     [255, 255, 204],
//     [255, 237, 160],
//     [254, 217, 118],
//     [254, 178, 76],
//     [253, 141, 60],
//     [252, 78, 42],
    
//   ]);

const INITIAL_VIEW_STATE = {
  latitude: 41.650623,
  longitude: -102.693757,
  zoom: 3,
  maxZoom: 16,
  pitch: 10,
  bearing: 0
};
const selectedFeatureIndexes = [];

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0
});

const dirLight = new SunLight({
  timestamp: Date.UTC(2019, 7, 1, 22),
  color: [255, 255, 255],
  intensity: 1.0,
  _shadow: true
});

// const data = require('./result.json');

const myFeatureCollection = {
    type: 'FeatureCollection',
    features: [
      /* insert features here */
    ]
  };
export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hoveredObject: null,
      data: myFeatureCollection,
      INITIAL_VIEW_STATE: INITIAL_VIEW_STATE
      
    };
    this._onHover = this._onHover.bind(this);
    // this._renderTooltip = this._renderTooltip.bind(this);

    const lightingEffect = new LightingEffect({ambientLight, dirLight});
    lightingEffect.shadowColor = [0, 0, 0, 0.5];
    this._effects = [lightingEffect];


  }

  
  

  _onHover({x, y, object}) {
    this.setState({x, y, hoveredObject: object});
  }

  _renderLayers(choice) {
    
    return [
        new EditableGeoJsonLayer({
            id: 'geojson-layer',
            data: this.state.data,
            mode: DrawPolygonMode,
            selectedFeatureIndexes,
      
            onEdit: ({ updatedData }) => {
              this.setState({
                data: updatedData,
              });
            }
          })
    //   // only needed when using shadows - a plane for shadows to drop on
    //   // new PolygonLayer({
    //   //   id: 'ground',
    //   //   data: data,
    //   //   stroked: false,
    //   //   getPolygon: f => f,
    //   //   getFillColor: [0, 0, 0, 0]
    //   // }),
    //   new GeoJsonLayer({
    //     id: 'geojson',
    //     data,
    //     opacity: 0.8,
    //     stroked: false,
    //     filled: true,
    //     extruded: true,
    //     wireframe: true,
    //     // getElevation: f => Math.sqrt(f.properties[this.state.choice]) * 100000 ,
    //     getFillColor: f => COLOR_SCALE(f.properties[choice] / this.state.modifier),
    //     getLineColor: [255, 255, 255],
    //     pickable: true,
    //     onHover: this._onHover,
    //     updateTriggers: {
    //       getFillColor: [this.state.choice]
    //   }
    //   })
    ];
  }

//   _renderTooltip() {
//     const {x, y, hoveredObject} = this.state;
//     return (
//       hoveredObject && (
//         <div className="tooltip" style={{top: y, left: x}}>
//           <div>
//             <b>Average Solar Radiation</b>
//           </div>
//           <div>
//             <div>{hoveredObject.properties.AREA_1} KM size </div>
//             <div>
//               {hoveredObject.properties[this.state.choice]} KWh {this.state.text}
//             </div>
//             <div>
//             ZIP: {hoveredObject.properties.zip} 
//             </div>
//           </div>
//          </div>
     
//       )
//     );
//   }

  render() {
    const {mapStyle = 'mapbox://styles/mapbox/light-v9'} = this.props;

    return (
      <DeckGL
        layers={this._renderLayers(this.state.choice)}
        // effects={this._effects}
        initialViewState={this.state.INITIAL_VIEW_STATE}
        controller={true}
        viewState={this.state.viewState}

      >
        <StaticMap
          reuseMaps
          mapStyle={mapStyle}
          preventStyleDiffing={true}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        />
      
      </DeckGL>
    );
  }
}
// export default App;
export function renderToDOM(container) {
  render(<Map />, container);
}
