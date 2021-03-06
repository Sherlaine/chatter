import React from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends React.Component {
  constructor(props) {//constructing the state
    super(props);//allow the children to access props from this parent state
    this.state = { //parent's state listed
      currentUser: {name: "Laine", color: ''},
      messages:[],
      count: 0 
    };

    this.changeCurrentUser = this.changeCurrentUser.bind(this);

    this.sendMessageServer = this.sendMessageServer.bind(this);
  }

  changeCurrentUser(newUsername) {
    let previousUsername = this.state.currentUser.name;
    this.setState({ currentUser: {name: newUsername} });
    const newNotification = {
      type: "postMessage",
      username: null,
      content: `User ${previousUsername} changed their name to ${newUsername}`
    } 
    this.socket.send(JSON.stringify(newNotification));
  }	

  sendMessageServer(message, type) {
    console.log("Type of message is", type);
    console.log("Message to server is", message);
    const newMessage = {
      type: type,
      username: this.state.currentUser.name,
      content: message
    } 
    this.socket.send(JSON.stringify(newMessage)); // send to server
  }		  
  
  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onopen = () => {
      console.log('Connected to server');
    }
     this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch(data.type) {

     case "incomingMessage":
       console.log("Entering", data.type);

       const messages = this.state.messages.concat(data); // concatenates new message to exisiting messages
       this.setState({ messages: messages }); //sets updated messages
       break;
     case "incomingNotification":
       console.log("Entering", data.type);

       const notification = this.state.messages.concat(data); // concatenates new message to exisiting messages
       this.setState({ messages: notification });
       case "clientCount":
       console.log("Entering", data.type);
       const updateCount = data.count; 
       this.setState({ count: updateCount });
     break;

     default:
       // show an error in the console if the message type is unknown
       throw new Error("Unknown event type? " + data.type);
     }
    };
  }  

  render() {
    console.log("rendering <App />");
    return (
      <div>
        <nav className="navbar">
          <embed src="https://giphy.com/embed/HPbuRgMPF2vL2" width="45" height="45" frameBorder="0" class="giphy-embed" allowFullScreen/>
          <embed src="https://giphy.com/embed/5t5LMQzF4E8GmKMiWa" width="90" height="50" frameBorder="0" class="giphy-embed" allowFullScreen/>
          <a href="/" className="navbar-brand"></a>
          <p className="navbar-count">{this.state.count} users online</p>
        </nav>
        <MessageList 
          messages={this.state.messages} />
        <ChatBar 
          currentUser={this.state.currentUser.name} 
          handleSubmit={this.sendMessageServer} 
          handleNewUsername={this.changeCurrentUser} />
      </div>
    );
  } 
}


 export default App;
  

