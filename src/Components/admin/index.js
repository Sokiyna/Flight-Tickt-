import React from 'react';
import Ticket from './ticket';
import './admin.css';
import io from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';

import {NotificationContainer, NotificationManager} from 'react-notifications';

import {ListGroup,Table,Button} from 'react-bootstrap'
const socket = io('https://soket-io-app.herokuapp.com/', { transports: ['websocket'] });
class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      staffName: '',
      tickets: [],
      Allmsg: [],
      userid:0,
    oldmsg:"",
      newMsg:[],
      userName:"",
      showMsg: false
      };
  }
  componentDidMount() {
    // run once when component is mounted
    const staffName = "Admin"
    this.setState({ staffName });
    socket.on('connect', () => {
      socket.emit('join', { name: staffName });
      socket.on('newReq', (payload) => {
console.log(payload)
        this.setState({ tickets: [...this.state.tickets, payload]
        }
          ); 
console.log(this.state.tickets)
 
      });
      socket.on('sentMsg',  async (payload) => {
      await  this.setState({ 
        Allmsg: [...this.state.Allmsg,payload],
        showMsg: true,
        userid:payload.socketId
      }); 




      });

      // reciveendmsg
     
      socket.emit('getAllQueuing');

    });
    // this.setState({
    //   Allmsg:[]
    // })
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

  handleReplay = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  replayMsg=(e)=>{



    e.preventDefault();
 
    const payload = {
     msg:this.state.repliies,
      userName:'Admin',
      msg2:this.state.Allmsg[this.state.Allmsg.length-1].msg,
      userName2:this.state.Allmsg[this.state.Allmsg.length-1].clientName,
      userId:this.state.userid
    };
    console.log("hello",payload.userName2)
    socket.emit('replayTo', payload);
  }

  render() {
    return (
      <div>
      <main className="admin-container">
        <section id="container">
          <h2>Opened Tickets</h2>
          <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>User Name</th>
      <th>Address</th>
      <th>Phone</th>
      <th>Flight</th>
      <th>Date</th>
      <th>State</th>

    </tr>
    </thead>
    <tbody>
    <NotificationContainer/>

            {this.state.tickets.map((ticket) => {
              return (
                <Ticket {...ticket} handleAccept={this.handleAccept} handleRefuse={this.handleRefuse}key={ticket.id} nofitication={this.createNotification}/>
              );
            })
           }
         
    </tbody>
             </Table>
        </section>
        <aside id="online-staff">
          <h2>New Requests</h2>
          {/* {this.state.onlineStaff.map((staff) => (
            <h2 key={staff.id}>{staff.name}</h2>
          ))} */}

     


         {/* <input
            type="text"
            onChange={this.handleMsg}
         />
    <button className="question" onClick={this.sendMsg}>Send </button> */}

        </aside>
      </main>

<div>
<ListGroup>

{
this.state.showMsg &&
this.state.Allmsg.map((msg2) => (
  <>
    <ListGroup.Item> {msg2.userName}: {msg2.msg}</ListGroup.Item>
    <ListGroup.Item> 
    <input 
    className="replay"
    type="text"
    name="repliies"
    placeholder="write a replay..."
    onChange={this.handleReplay}
>

    </input>

  <Button className="replay" onClick={this.replayMsg}>Replay </Button> 
  </ListGroup.Item>

</>
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
