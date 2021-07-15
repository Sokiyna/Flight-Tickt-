import {Table,Button} from 'react-bootstrap'
import React from "react";


export default function Ticket(props){

  // const [buttonDisabled, setButtonDisabled] = useState(false);

  return(

<tr>  
<td>{1}</td>

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