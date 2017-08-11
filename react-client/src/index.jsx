import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import Promise from 'bluebird';
import List from './components/List.jsx';
import seed from './seedData.js';


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
    console.log("clicked")
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
        <label>
          <input type="text" value={this.state.path} onChange={this.handlePath} />
          <button onClick={this.handleClick}>Read Photos</button>
        </label>
        <List items={this.state.items}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));