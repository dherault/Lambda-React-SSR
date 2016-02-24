import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

// import config from '../../config';
import ac from '../state/actionCreators';
// import definitions from '../models/definitions';
// import xhr from '../utils/xhr';
// import customFetch from '../utils/customFetch';
import { capitalizeFirstChar } from '../utils/textUtils';
import { randomInteger, randomString, randomEmail } from '../utils/randomUtils';

const cfc = capitalizeFirstChar;

class TestPage extends React.Component {
  
  constructor() {
    super();
    
    this.state = {
      recordsOffset: 0,
      // model: 'user',
      // id: '',
      // updateOneKey: '',
      // updateOneValue: '',
      // createUserEmail: '',
      // createUserPassword: '12345678',
      // createImageSize: 200,
      // createImageUrl: '',
      // createImageOriginalUrl: '',
      // createImageOriginalName: '',
      // kvsKey: '',
      // kvsValue: '',
    };
  }
  
  // componentDidMount() {
  //   this.handleCreateUserRandom();
  // }
  
  handleClear() {
    this.setState({ recordsOffset: this.props.records.length });
  }
  
  // handleModelSelection(e) {
  //   this.setState({ model: e.target.value });
  // }
  
  // handleInput(k, e) {
  //   this.setState({ [k]: e.target.value });
  // }
  
  // READ ALL
  // handleReadAllClick() {
  //   this.props.dispatch(ac.readAll({ table: definitions[this.state.model].pluralName }));
  // }
  
  // // READ ONE
  // handleReadOneClick() {
  //   this.props.dispatch(ac['read' + cfc(this.state.model)]({ id: this.state.id }));
  // }
  
  // // UPDATE ONE
  // handleUpdateOneClick() {
  //   this.props.dispatch(ac['update' + cfc(this.state.model)]({ 
  //     id: this.state.id,
  //     [this.state.updateOneKey]: this.state.updateOneValue
  //   }));
  // }
  
  // // DELETE ONE
  // handleDeleteOneClick() {
  //   this.props.dispatch(ac['delete' + cfc(this.state.model)]({ id: this.state.id }));
  // }
  
  // // CREATE USER
  // handleCreateUserClick() {
  //   this.props.dispatch(ac.createUser({ 
  //     email: this.state.createUserEmail,
  //     password: this.state.createUserPassword,
  //     username: this.state.createUserEmail,
  //   }));
  // }
  
  // handleCreateUserRandom() {
  //   this.setState({ createUserEmail: randomEmail() });
  // }
  
  // handleCreateXClick(email) {
  //   this.props.dispatch(ac.createUser({ email, username: email, password: 'password'}));
  // }
  
  // KVS SERVER
  // handleCKvsClick(op) {
  //   const url = config.services.kvs.url;
  //   const key = this.state.kvsKey;
  //   const value = this.state.kvsValue;
  //   const store = 'test';
    
  //   if (op === 'get') {
  //     customFetch(url, { key, store })
  //     .then(r => console.log(r))
  //     .catch(err => console.error(err));
  //   } else if (op === 'set') {
  //     customFetch(url, { key, value, store }, { method: 'put' })
  //     .then(r => console.log(r))
  //     .catch(err => console.error(err));
  //   }
  // }
  
  // CREATE IMAGE
  // handleCreateImageClick() {
  //   console.log('Calling image server');
  //   customFetch(config.services.image.url + 'random/' + this.state.createImageSize)
  //   .then(r => this.setState({
  //     createImageUrl: r.url,
  //     createImageOriginalUrl: r.originalUrl,
  //     createImageOriginalName: r.originalName,
  //   }))
  //   .catch(err => console.error(err));
  // }
  
  
  render() {
    
    const { state, props } = this;
    // const m = cfc(state.model);
    const wrapperStyle = {
      width: '80%',
      margin: 'auto',
      marginTop: 50,
    };
    
    return <div style={wrapperStyle}>
      <div className="row">
        
        <div className="col-md-6">
          
          <h1>Test Page</h1>
          <div>It's time to manually test stuff!</div>
          { /*
          <div>
            <span>Current model: </span>
            <select value={state.model} onChange={this.handleModelSelection.bind(this)}>
              {
                Object.keys(definitions).map(key => <option key={key} value={key}>{ cfc(key) }</option>)
              }
            </select>
          </div>
          
          <section>
            <h2>readAll</h2>
            <button onClick={this.handleReadAllClick.bind(this)}>readAll</button>
          </section>
          
          <section>
            <h2>readOne</h2>
            <input type="text" value={state.id} onChange={this.handleInput.bind(this, 'id')} placeholder="id"/>
            <button onClick={this.handleReadOneClick.bind(this)}>{ 'read' + m }</button>
          </section>
          
          <section>
            <h2>updateOne</h2>
            <input 
              type="text" 
              placeholder="id"
              value={state.id} 
              onChange={this.handleInput.bind(this, 'id')} />
            <input 
              type="text" 
              placeholder="key"
              value={state.updateOneKey} 
              onChange={this.handleInput.bind(this, 'updateOneKey')} />
            <input 
              type="text" 
              placeholder="value"
              value={state.updateOneValue} 
              onChange={this.handleInput.bind(this, 'updateOneValue')} />
            <button onClick={this.handleUpdateOneClick.bind(this)}>{ 'update' + m }</button>
          </section>
          
          <section>
            <h2>deleteOne</h2>
            <input type="text" value={state.id} onChange={this.handleInput.bind(this, 'id')} placeholder="id"/>
            <button onClick={this.handleDeleteOneClick.bind(this)}>{ 'delete' + m }</button>
          </section>
          
          <section>
            <h2>createUser</h2>
            <div>
              <input type="text" value={state.createUserEmail} onChange={this.handleInput.bind(this, 'createUserEmail')} />
              <input type="text" value={state.createUserPassword} onChange={this.handleInput.bind(this, 'createUserPassword')} />
              <button onClick={this.handleCreateUserClick.bind(this)}>createUser</button>
              <button onClick={this.handleCreateUserRandom.bind(this)}>ʘ</button>
            </div>
            <div>
              <button onClick={this.handleCreateXClick.bind(this, 'admin')}>createAdmin</button>
              <button onClick={this.handleCreateXClick.bind(this, 'joe@joe.joe')}>createJoe</button>
            </div>
          </section>
          
          <section>
            <h2>Logout</h2>
            <button onClick={() => props.dispatch(ac.logout())}>Bye bye!</button>
          </section>
          
          <section>
            <h2>Failed validation</h2>
            <button onClick={() => props.dispatch(ac.readAll({ yolo: true }))}>This should fail on client</button>
            <button onClick={() => window.fetch(config.services.api.url + 'readAll?yolo=true')}>This should fail on server</button>
          </section>
          
          <section>
            <h2>KVS server</h2>
            <input 
              type="text" 
              placeholder="key"
              value={state.kvsKey} 
              onChange={this.handleInput.bind(this, 'kvsKey')} />
            <input 
              type="text" 
              placeholder="value"
              value={state.kvsValue} 
              onChange={this.handleInput.bind(this, 'kvsValue')} />
            <button onClick={this.handleCKvsClick.bind(this, 'get')}>Get</button>
            <button onClick={this.handleCKvsClick.bind(this, 'set')}>Set</button>
          </section>
          
          <section>
            <h2>createImage</h2>
            <div>
              <input type="integer" value={state.createImageSize} onChange={this.handleInput.bind(this, 'createImageSize')} />
              <button onClick={this.handleCreateImageClick.bind(this)}>createImage</button>
              
            </div>
              <img src={state.createImageUrl} style={{borderRadius: state.createImageSize/2}}/>
              <span>{ state.createImageOriginalName }</span>
              <img src={state.createImageOriginalUrl} />
            <div>
            </div>
          </section>
          */}
          
        </div>
        
        
        <div className="col-md-6">
          
          <div>
          <h2 style={{display:'inline-block'}}>Records</h2>&nbsp;&nbsp;
          <button onClick={this.handleClear.bind(this)}>Clear</button>
          </div>
          <ol start={state.recordsOffset}>
          { 
            props.records.map((record, i) => {
              if (i < state.recordsOffset) return;
              
              const { type, payload, params } = record;
              return <li key={i}>
                <strong>{ type }</strong>
                &nbsp;- { JSON.stringify(params) }
                &nbsp;- { JSON.stringify(payload) }
              </li>;
            })
          }
          </ol>
          
        </div>
        
      </div>
    </div>;
  }
}

export default connect(s => ({ records: s.records }))(TestPage);
