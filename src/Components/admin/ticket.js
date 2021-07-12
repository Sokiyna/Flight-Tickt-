export default function Ticket(props){
  return(
    <article className="ticket">
      <h2>{props.question}</h2>
      <p>City:{props.cityname}</p>
      <p>flight: {props.flight}</p>
      <p>time:{new Date(props.created_at).toLocaleDateString()}</p>
      <p>User Name: {props.userName}</p>
      <button onClick={()=>props.handleClaim(props.id,props.socketId)}>Claim</button>
    </article>
  )
}