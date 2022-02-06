import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster';
import "./App.css"
import Lists from './Lists';

// input_data_2000
// import clients from "../datas/input_data_2000/NeRelog_clients.json"; 
// import apps from "../datas/input_data_2000/NeRelog_apps.json";

// input_data_5000
import clients from "../datas/input_data_5000/NeRelog_clients.json";
import apps from "../datas/input_data_5000/NeRelog_apps.json";

function App() {
  const mapCenter = [43.238949, 76.889709];
  const [map, setMap] = useState(null);
  const [listIsOpened, setListIsOpened] = useState(true);
  const [appsData, setAppsData] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [filteredApp, setFilteredApp] = useState([]);

  useEffect(() => {
    const combinedData = [];
    clients.map(client => {
      apps.map(app => {
        if(app.client_id === client.id) {
          combinedData.push({
            ...client,
            appId: app.id,
            type: app.type,
            price: app.price,
            coords: app.coords
          })
        }
      })
    })
    setAppsData(combinedData);
  }, []);
  
  const selectAppHandler = (app) => {
    setSelectedApp(app);
    setFilteredApp(appsData.filter(data => data.name === app.name))
    map.flyTo([app.coords.lat, app.coords.long], 15)
  }

  return (
    <div className="container">
      <div className='burger-button' onClick={() => setListIsOpened(!listIsOpened)}>
        <div className='burger-line'></div>
      </div>
      <div className='list' style={{
        width: listIsOpened ? '200px' : '0'
      }}>
        <Lists appsData={appsData} selectedApp={selectedApp} selectAppHandler={selectAppHandler} />
      </div>
      <MapContainer center={mapCenter} zoom={11} scrollWheelZoom={false} whenCreated={setMap}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup>
          {filteredApp.map(data => {
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
    </div>
  )
}

export default App;
