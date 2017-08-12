import React from 'react';
import { 
  Icon, 
  Menu,
  Table,
  Label 
} from 'semantic-ui-react';

const TableViewS = (props) => (
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Sales Associate ID No.</Table.HeaderCell>
        <Table.HeaderCell>Date</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>    
      { props.items.map(item => 
        <Table.Row>
          <Table.Cell>{ item.sales }</Table.Cell>
          <Table.Cell>{ item.date }</Table.Cell>
        </Table.Row>)
      }
    </Table.Body>
    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan='3'>
          <Menu floated='right' pagination>
            <Menu.Item as='a' icon>
              <Icon name='left chevron' />
            </Menu.Item>
            <Menu.Item as='a'>1</Menu.Item>
            <Menu.Item as='a'>2</Menu.Item>
            <Menu.Item as='a' icon>
              <Icon name='right chevron' />
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
)

export default TableViewS;