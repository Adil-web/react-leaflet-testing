import React from 'react';

export const Filter = ({ clientNames, fitlerDataHandler }) => {
  return <>
    <select className='clients-filter' onChange={e => fitlerDataHandler(e.target.value)}>
      <option disabled>Фильтр по наименованию</option>
      <option value="all">Все</option>
      {clientNames.map((name, index) => {
        return <option value={name} key={index}>{name}</option>
      })}
    </select>
  </>;
};
