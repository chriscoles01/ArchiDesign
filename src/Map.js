import DeckGL from 'deck.gl';
import { EditableGeoJsonLayer, DrawPolygonMode } from 'nebula.gl';
import React, {Component} from 'react';

const myFeatureCollection = {
  type: 'FeatureCollection',
  features: [
    /* insert features here */
  ]
};
 
const selectedFeatureIndexes = [];
 
class Map extends Component {
  state = {
    data: myFeatureCollection
  };
 
  render() {
    const layer = new EditableGeoJsonLayer({
      id: 'geojson-layer',
      data: this.state.data,
      mode: DrawPolygonMode,
      selectedFeatureIndexes,
 
      onEdit: ({ updatedData }) => {
        this.setState({
          data: updatedData,
        });
      }
    });
 
    return <DeckGL {...this.props.viewport} layers={[layer]} />;
  }
}
export default Map;