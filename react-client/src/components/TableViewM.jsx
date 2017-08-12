import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


const TableViewM = (props) => (
  <MuiThemeProvider>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHeaderColumn>Sales Associate ID No.</TableHeaderColumn>
        <TableHeaderColumn>Date</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody>    
      { props.items.map(item => 
        <TableRow>
          <TableRowColumn>{ item.sales }</TableRowColumn>
          <TableRowColumn>{ item.date }</TableRowColumn>
        </TableRow>)
      }
    </TableBody>
  </Table>
  </MuiThemeProvider>
);

export default TableViewM;

