import React from 'react';
import TableViewM from './TableViewM.jsx';

const InfoTable = (props) => (
  <div>
    <TableViewM items={props.items}/>
  </div>
)

export default InfoTable;