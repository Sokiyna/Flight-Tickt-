import React from 'react';
import Ticket from './ticket';
import './admin.css';
import io from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup'
const socket = io('localhost:5000/', { transports: ['websocket'] });
class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      staffName: '',
      tickets: [],
      onlineStaff: [],
      userid:0,
    oldmsg:"",
      newMsg:[],
      userName:"",
    };
  }
  componentDidMount() {
    // run once when component is mounted
    const staffName = prompt("WHAT's your name?");
    this.setState({ staffName });
    socket.on('connect', () => {
      //1a
      socket.emit('join', { name: staffName });
      socket.on('newTicket', (payload) => {

        this.setState({ tickets: [...this.state.tickets, payload] }); 
      });
      socket.on('onlineStaff', (payload) => {
        this.setState({ onlineStaff: [...this.state.onlineStaff, payload] });
      });
      socket.on('offlineStaff', (payload) => {
        this.setState({
          onlineStaff: this.state.onlineStaff.filter((staff) => staff.id !== payload.id),
        });
      });

      // reciveendmsg
      socket.on('sentMsg',  (payload) => {
        this.setState({ userName:payload.userName }); 
        this.setState({newMsg:payload.msg}); 

        console.log(this.state.newMsg)
      });



    });
  }
  
  handleAccept = (id, socketId) => {
    console.log(socketId);
    socket.emit('handle', { 
      id:id,
       name: this.state.staffName,
        studentId: socketId,
        flag:true

    });
  };


  handleRefuse=(id, socketId)=>{
    
    socket.emit('handle', { 
      id:id,
       name: this.state.staffName,
        studentId: socketId,
        flag:false

    });
  }


  handleMsg=(e)=>{
    this.setState({msg:e.target.value});
  }

  sendMsg=(e)=>{
    console.log('tst');
    e.preventDefault();
    const payload = {
     msg:this.state.msg+"\n ,",
      created_at: 0,
      id:this.state.userid
    };
    console.log('Msg', payload);

    socket.emit('replay', payload);
  }
  render() {
    return (
      <div>
      <main className="admin-container">
        <section id="container">
          <h2>Opened Tickets</h2>
          <section id="tickets">
            {this.state.tickets.map((ticket) => {
              return (
                <Ticket {...ticket} handleAccept={this.handleAccept} handleRefuse={this.handleRefuse}key={ticket.id} />
              );
            })}
          </section>
        </section>
        <aside id="online-staff">
          <h2>New Requests</h2>
          {this.state.onlineStaff.map((staff) => (
            <h2 key={staff.id}>{staff.name}</h2>
          ))}

     


         {/* <input
            type="text"
            onChange={this.handleMsg}
         />
    <button className="question" onClick={this.sendMsg}>Send </button> */}

        </aside>
      </main>

<div>
<ListGroup>

{this.state.newMsg.map((msg) => (
    <ListGroup.Item>{this.state.userName}: {msg}</ListGroup.Item>

            
          ))}

</ListGroup>

{/* <h2>{this.state.userName }:</h2> */}
          
          {/* <h2 >{this.state.oldmsg}</h2> */}
          </div>




          </div>
    );
  }
}

export default Admin;
