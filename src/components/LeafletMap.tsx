import React from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLng, LatLngExpression, LeafletMouseEvent } from 'leaflet';

interface LeafletMapProps {
  markerPosition?: LatLngExpression;
  onMapClick: (coords: LatLng) => void;
}

// Providers at [Leaflet Provider Demo](https://leaflet-extras.github.io/leaflet-providers/preview/)

const LeafletMap: React.FC<LeafletMapProps> = ({ markerPosition, onMapClick }) => {
  const defaultCenter: LatLngExpression = [37.3688, -122.0363];
  const convertToLatLng = (position: LatLngExpression): LatLng => {
    if (Array.isArray(position)) {
      return new LatLng(position[0], position[1]);
    } else if ('lat' in position && 'lng' in position) {
      return new LatLng(position.lat, position.lng);
    }
    return position;
  };

  const center = markerPosition ? convertToLatLng(markerPosition) : defaultCenter;

  const MapClickHandler = () => {
    useMapEvents({
      click: (e: LeafletMouseEvent) => {
        onMapClick(e.latlng);
      },
    });
    return null;
  };

  return (
    <MapContainer dragging={true} center={center} zoom={10} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://tile.jawg.io/jawg-terrain/{z}/{x}/{y}{r}.png?access-token={accessToken}"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapClickHandler />
      {markerPosition && <Marker position={markerPosition} />}
    </MapContainer>
  );
};

export default LeafletMap;