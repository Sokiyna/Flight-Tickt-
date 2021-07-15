import React from 'react';
import './home.css';
import { Navbar } from 'react-bootstrap'

import { Form, Button, Col } from 'react-bootstrap/'
import io from 'socket.io-client';
import axios from 'axios';
import { logRoles } from '@testing-library/react';
const SERVER_URL = process.env.SERVER_URL || 'localhost:5000/';
const socket = io(SERVER_URL, { transports: ['websocket'] });

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      msg: "",
      showMsgs: false,
      AllMsg: [],
      msgs: []
    };
  }
  componentDidMount() {
    // const userName = prompt("Can you provide us with your name?");
    // this.setState({ userName });

    //clientName

   
    socket.on('connect', () => {
      socket.on('claimed', function (payload) {
        alert(`${payload.name} ,
        ${payload.randomNum},
        ${payload.txt}
        `
        );
      });
    });

    socket.on('replaiedtoUsers', (payload) => {
      this.setState({
        msgs: [...this.state.msgs, payload],
        showMsgs: true
      });


    }


    )

  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...this.state,
      created_at: Date.now().toLocaleString(),
    };
    console.log('hello', this.state.Destination);

    socket.emit('sendRequest', payload);
  };

  handleMsg = async (e) => {
    await this.setState({ msg: e.target.value });

  }


  updatestate = (e) => {

    this.setState({ AllMsg: [...this.state.AllMsg, this.state.msg] })
    // this.setState({msg:''});

  }
  sendMsg = async (e) => {

    e.preventDefault();
    await this.updatestate()


    const payload = {
      msg: this.state.msg,
      created_at: Date.now(),
      userName: this.state.clientName
    };
    console.log(payload.msg)
    socket.emit('sendmsg', payload);

  }

  render() {
    return (
      <div >
        <main className="container">
          <section className="form-card boxShadow"  >


            <Form onSubmit={this.handleSubmit}>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail" >
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    className="yourName"
                    type="text"
                    name="clientName"
                    placeholder="write your name here..."
                    onChange={this.handleChange}
                  />
                </Form.Group>



                <Form.Group controlId="formGridAddress1">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    className="yourName"
                    type="text"
                    name="address"
                    placeholder="write your address here..."
                    onChange={this.handleChange}
                  />
                </Form.Group>

                {/* <Form.Group controlId="formGridAddress2">
    <Form.Label>Address 2</Form.Label>
    <Form.Control placeholder="Apartment, studio, or floor" />
  </Form.Group> */}
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    className="center"
                    type="text"
                    name="phone"
                    placeholder="write your address here..."
                    onChange={this.handleChange}
                  />
                </Form.Group>

              </Form.Row>
              <fieldset >
                <Form.Group >
                  <Form.Label as="legend">
                    Airlines:
                  </Form.Label>

                  <Form.Check
                    className="center"
                    type="radio"
                    label="Fly Emirates"
                    name="Airlines"
                    value="Fly Emirates"
                    id="formHorizontalRadios1"
                    onChange={this.handleChange}

                  />

                  <Form.Check
                    className="center"
                    type="radio"
                    label="Qatar Airlines"
                    name="Airlines"
                    value="Qatar Airlines"
                    id="formHorizontalRadios1"
                    onChange={this.handleChange}

                  />
                  <Form.Check

                    className="center"
                    type="radio"
                    label="Jordanian Royal"
                    name="Airlines"
                    value="Jordanian Royal"
                    id="formHorizontalRadios1"
                    onChange={this.handleChange}


                  />

                </Form.Group>
              </fieldset>


              <fieldset className="center">
                <Form.Group>
                  <Form.Label as="legend">
                    Destination:       </Form.Label>

                  <Form.Check
                    type="radio"
                    label=" UK"
                    value="UK"
                    name="Destination"
                    id="formHorizontalRadios1"
                    onChange={this.handleChange}
                  />

                  <Form.Check
                    type="radio"
                    label="USA"
                    value="USA"
                    name="Destination"
                    id="formHorizontalRadios1"
                    onChange={this.handleChange}
                  />
                  <Form.Check
                    type="radio"
                    label="DE"
                    value="DE"
                    name="Destination"
                    id="formHorizontalRadios1"
                    onChange={this.handleChange}
                  />

                </Form.Group>
              </fieldset>




              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>






          </section>


        </main>


        <div className="feedback">
          <h3>Leave A feedback</h3>
          <input
            type="text"
            onChange={this.handleMsg}
          />
          <button onClick={this.sendMsg}>Send </button>


          <br></br>
          <h2>test</h2>

          {
            this.state.showMsgs &&

            this.state.msgs.map((msg) => {
              return (
                <div className="feedbackmsg">
                  <p>{msg.userName2}: {msg.msg2} </p>
                  <p> {"Admin : "} {msg.msg} </p>
                </div>
              )
            })
          }


          <Navbar bg="dark" variant="dark">
            <Navbar.Brand className="centerize">All Rights Reserved</Navbar.Brand>
          </Navbar>



        </div>

      </div>

    );
  }
}

export default Home;