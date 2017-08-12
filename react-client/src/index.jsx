import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Promise from 'bluebird';
import List from './components/List.jsx';
import InfoTable from './components/InfoTable.jsx';
import seed from './seedData.js';
import { Input, Button } from 'semantic-ui-react'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: seed,
      path: ''
    }
    this.handlePath = this.handlePath.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handlePath(event) {
    this.setState({path: event.target.value});
  }

  handleClick() {
    let that = this;
    axios.post('/', {
        path: that.state.path
      })
      .then(function(response) {
        console.log(response);
        that.setState({items: response.data});
      })
      .catch(function(error) {
        console.log(error);
      })
  }

  componentDidMount() {
  }

  render () {
    return (
      <div>
        <h1>LoyalT Receipt Reader</h1>
        <div className="ui input">
          <Input icon='search' value={this.state.path} onChange={this.handlePath} placeholder='Receipt Photos Folder Path'/>
          <Button onClick={this.handleClick} content='Read!' />
        </div>
        <InfoTable items={this.state.items} />
        <List items={this.state.items}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));