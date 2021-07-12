import React from 'react';
import './home.css';
import io from 'socket.io-client';
const SERVER_URL = process.env.SERVER_URL || 'localhost:5000/';
const socket = io(SERVER_URL, { transports: ['websocket'] });

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
    };
  }
  componentDidMount() {
    const userName = prompt("Can you provide us with your name?");
    this.setState({ userName });
    socket.on('connect', () => {
      socket.on('claimed', function (payload) {
        alert(`${payload.name} claimed your ticket , hhhhhh${payload.randomNum}`);
      });
    });
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...this.state,
      created_at: Date.now(),
    };
    console.log('hello', payload);
    // once the user submit the form we need to emit a ticket so all TAs can see that ticket

    // 1
    socket.emit('createTicket', payload);
  };
  render() {
    return (
      <main className="container">
        <section className="form-card">
          <form id="questions-form" onSubmit={this.handleSubmit}>
            {/* <input
              className="Countries"
              type="text"
              name="question"
              placeholder="write your question here..."
              required
              onChange={this.handleChange}
            /> */}
            <label className="lab">
              <input
                type="checkbox"
                name="cityname"
                value="Amman"
                
                onChange={this.handleChange}
              />
              Amman
            </label>
            <label className="cc">
              <input
                type="checkbox"
                name="cityname"
                value="Aqaba"
                onChange={this.handleChange}
              />
              Aqaba
            </label>
            <label className="course">
              <input
                type="checkbox"
                name="cityname"
                value=" Wadi Rum"
                
                onChange={this.handleChange}
              />
              Wadi Rum
            </label>
            <label className="course">
              <input
                type="checkbox"
                name="flight"
                value="Qatar Airlines"
                
                onChange={this.handleChange}
              />
              Qatar Airlines
            </label>
            <label className="course">
              <input
                type="checkbox"
                name="flight"
                value="Fly Emirates"
                onChange={this.handleChange}
              />
              Fly Emirates
            </label>
            <label className="course">
              <input
                type="checkbox"
                name="flight"
                value=" Jordanian Royal"
                onChange={this.handleChange}
              />
              Jordanian Royal
            </label>

            {/* <label for="vehicle1">Fly Emirates </label><br/>
            <input type="checkbox" name="location"  value="Fly Emirates" onChange={this.handleChange}/>

            <label for="vehicle2">Qatar Airlines</label><br/>
                <input type="checkbox" name="location"  value="Qatar Airlines" onChange={this.handleChange}/> */}

            <button className="question">help!</button>

          </form>
        </section>
      </main>
    );
  }
}

export default Home;
