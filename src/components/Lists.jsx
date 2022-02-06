import React from 'react';
import './Lists.css'
import { FixedSizeList as List } from "react-window";

const Lists = ({ appsData, selectAppHandler, selectedApp }) => {

  const Row = ({ index, style }) => (
    <div 
      style={style}
      className={['list-item', selectedApp?.appId === appsData[index]?.appId && 'active'].join(' ')} 
      key={appsData[index].appId} 
      onClick={() => { selectAppHandler(appsData[index]) }}
    >
      <h5>{appsData[index].name}</h5>
      <div>
        <span>Тип: </span>
        {appsData[index].type === 'delivery' ? 'Доставка' : 'Забор'}
      </div>
      <div>
        <span>Цена: </span>
        {appsData[index].price}
      </div>
    </div>
  );
  
  return <>
    <List
      width={200}
      height={window.innerHeight}
      itemCount={appsData.length}
      itemSize={80}
    >
      {Row}
    </List>
  </>;
};

export default Lists;
