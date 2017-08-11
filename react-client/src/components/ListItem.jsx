import React from 'react';

const ListItem = (props) => (
  <div>
    { props.item.date }
    { props.item.sales }
  </div>
)

export default ListItem;