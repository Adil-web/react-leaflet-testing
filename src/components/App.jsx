import React, { useEffect, useState } from 'react';
import "./App.css"
import { Drawer } from './Drawer';
import { Filter } from './Filter';
import { Loading } from './Loading';
import { Map } from './Map';

// input_data_2000
// import clients from "../datas/input_data_2000/NeRelog_clients.json"; 
// import apps from "../datas/input_data_2000/NeRelog_apps.json";

// input_data_5000
import clients from "../datas/input_data_5000/NeRelog_clients.json";
import apps from "../datas/input_data_5000/NeRelog_apps.json";

function App() {
  const mapCenter = [43.238949, 76.889709];
  const [map, setMap] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [allData, setAllData] = useState([]);
  const [appsData, setAppsData] = useState([]);
  const [clientNames, setClientNames] = useState([]);

  useEffect(() => {
    const combinedData = [];
    clients.map(client => {
      apps.map(app => {
        if (app.client_id === client.id) {
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

    const clientNames = clients.map(client => client.name)
    setClientNames([...new Set(clientNames)])
    setAppsData(combinedData);
    setAllData(combinedData);
    setIsLoading(false)
  }, []);

  const selectAppHandler = (app) => {
    map.flyTo([app.coords.lat, app.coords.long], 18)
  }
  
  const fitlerDataHandler = (name) => {
    setIsLoading(true)
    if(name === 'all') {
      setIsLoading(false)
      return setAppsData(allData)
    }
    const filteredData = allData.filter(app => {
      if(app.name === name) {
        return app
      }
    })
    setAppsData(filteredData)
    map.flyTo(mapCenter, 10)
    setIsLoading(false)
  }

  return (
    <div className="container">
      {isLoading && <Loading/>}
      <Drawer appsData={appsData} selectedApp={appsData} selectAppHandler={selectAppHandler} />
      <Filter clientNames={clientNames} fitlerDataHandler={fitlerDataHandler} />
      <Map mapCenter={mapCenter} setMap={setMap} appsData={appsData} />
    </div>
  )
}

export default App;
