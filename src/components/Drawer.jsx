import React, { useState } from 'react';
import Lists from './Lists';

export const Drawer = ({ appsData, selectedApp, selectAppHandler }) => {
  const [listIsOpened, setListIsOpened] = useState(true);

  return <>
    <div className='burger-button' onClick={() => setListIsOpened(!listIsOpened)}>
      <div className='burger-line'></div>
    </div>
    <div className="list" style={{
      width: listIsOpened ? '200px' : '0px'
    }}>
      <Lists appsData={appsData} selectedApp={selectedApp} selectAppHandler={selectAppHandler} />
    </div>
  </>;
};
