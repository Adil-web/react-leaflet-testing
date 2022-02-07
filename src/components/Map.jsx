import React from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster';

export const Map = ({mapCenter, setMap, appsData}) => {
  return <>
    <MapContainer center={mapCenter} zoom={10} scrollWheelZoom={false} whenCreated={setMap}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup>
          {appsData.map(data => {
            return (
              <Marker position={[data.coords.lat, data.coords.long]} key={data.appId}>
                <Tooltip>
                  <div className='tooltip-item'>
                    <span className='tooltip-title'>ID заказа: </span>
                    <span>{data.appId}</span>
                  </div>
                  <div className='tooltip-item'>
                    <span className='tooltip-title'>Наименование: </span>
                    <span>{data.name}</span>
                  </div>
                  <div className='tooltip-item'>
                    <span className='tooltip-title'>Цена: </span>
                    <span>{data.price}</span>
                  </div>
                </Tooltip>
              </Marker>
            )
          })}
        </MarkerClusterGroup>
      </MapContainer>
  </>;
};
