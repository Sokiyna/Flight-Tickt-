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
      msg:"",
   
      AllMsg:[],
    };
  }
  componentDidMount() {
    const userName = prompt("Can you provide us with your name?");
    this.setState({ userName });
    socket.on('connect', () => {
      socket.on('claimed', function (payload) {
        alert(`${payload.name} ,
        ${payload.randomNum},
        ${payload.txt}
        `
        );
      });
    });

    socket.on('replaymsg',  (payload) => {
      this.setState({ newMsg:payload.msg}); 
      this.setState({oldmsg:this.state.newMsg+this.state.oldmsg}); 

    });

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
    console.log('hello', payload);
    // once the user submit the form we need to emit a ticket so all TAs can see that ticket

    // 1
    socket.emit('createTicket', payload);
  };

  handleMsg=async (e)=>{
    await this.setState({msg:e.target.value});
    
  }


  updatestate=(e)=>{
    this.setState({ AllMsg: [...this.state.AllMsg,this.state.msg] })

  }
  sendMsg=async (e)=>{
    console.log('tst');
    e.preventDefault();
    await this.updatestate()

    const payload = {
     msg:this.state.AllMsg,
      created_at: Date.now(),
      userName:this.state.userName
    };
    console.log('Msg', payload);
    // once the user submit the form we need to emit a ticket so all TAs can see that ticket

    // 1
    socket.emit('sendmsg', payload);


  }

  render() {
    return (
      <div>
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
            <label className="row1">
              <input
                type="checkbox"
                name="cityname"
                value="Amman"
                
                onChange={this.handleChange}
              />
              Amman
            </label>
            <label className="row2">
              <input
                type="checkbox"
                name="cityname"
                value="Aqaba"
                onChange={this.handleChange}
              />
              Aqaba
            </label>
            <label>
              <input
                type="checkbox"
                name="cityname"
                value=" Wadi Rum"
                
                onChange={this.handleChange}
              />
              Wadi Rum
            </label>
            <label>
              <input
                type="checkbox"
                name="flight"
                value="Qatar Airlines"
                
                onChange={this.handleChange}
              />
              Qatar Airlines
            </label>
            <label>
              <input
                type="checkbox"
                name="flight"
                value="Fly Emirates"
                onChange={this.handleChange}
              />
              Fly Emirates
            </label>
            <label>
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

            <button >help!</button>

          </form>
        </section>
<br></br>

      </main>


<div className="feedback">
<h3>Leave A feedback</h3>
        <input
            type="text"
            onChange={this.handleMsg}
         />
    <button  onClick={this.sendMsg}>Send </button>
    <h2 >{this.state.oldmsg}</h2>
    </div> </div>
    );
  }
}

export default Home;
