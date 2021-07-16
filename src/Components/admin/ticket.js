import {Table,Button} from 'react-bootstrap'
import React from "react";


export default function Ticket(props){
// console.log(propsclientName)
  // const [buttonDisabled, setButtonDisabled] = useState(false);

  return(

<tr>  
<td>{props.counter2}</td>
      <td>{props.clientName}</td>
      <td>{props.address}</td>
      <td>{props.phone} </td>
      <td>{props.Airlines}</td>
<td>{new Date(Date.now()).toLocaleDateString()}</td>
<td>
<Button
  variant="primary" onClick={()=>props.handleAccept(props.id,props.socketId) 
  
  }>Accept</Button>


  <Button variant="primary" onClick={()=>props.handleRefuse(props.id,props.socketId)}>Refuse</Button> 
  </td>
</tr>



  )
}