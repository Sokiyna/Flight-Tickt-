import {Card,Button} from 'react-bootstrap'
import React from "react";
import { useState } from 'react';


export default function Ticket(props){

  // const [buttonDisabled, setButtonDisabled] = useState(false);

  return(
<main>
<Card className="text-center">
  <Card.Header>{props.question}</Card.Header>
  <Card.Body>
    <Card.Title>City: {props.cityname}</Card.Title>
    <Card.Text>
    User Name: {props.userName}       </Card.Text>

  


        <Card.Text>
    flight:
        </Card.Text>
    <Button
    variant="primary" onClick={()=>props.handleAccept(props.id,props.socketId)  }>Accept</Button>



    <Button variant="primary" onClick={()=>props.handleRefuse(props.id,props.socketId)}>Refuse</Button>

  </Card.Body>
  <Card.Footer className="text-muted">{new Date(Date.now()).toLocaleDateString()}</Card.Footer>

</Card>


</main>
  )
}