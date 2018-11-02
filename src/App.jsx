import React from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends React.Component {

  constructor(props) {//constructing the state
    super(props);//allow the children to access props from this parent state
    this.state = { //parent's state listed
      currentUser: {name: "Bob"},
      messages:[],
      notification: " " //msg from server will be store here
    };

    this.changeCurrentUser = this.changeCurrentUser.bind(this);

    this.sendMessageServer = this.sendMessageServer.bind(this);
  }

  changeCurrentUser(newUsername) {
    this.setState({ currentUser: {name: newUsername} });
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
       const notifications = this.state.messages.concat(data); // concatenates new message to exisiting messages
       this.setState({ messages: notifications });
       break;
     default:
       // show an error in the console if the message type is unknown
       throw new Error("Unknown event type??? " + data.type);
     }
    };
  }  

  render() {
    console.log("rendering <App />");
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList 
          messages={this.state.messages}
           notification={this.state.notifcation} />
        <ChatBar 
          currentUser={this.state.currentUser.name} 
          handleSubmit={this.sendMessageServer} 
          handleNewUsername={this.changeCurrentUser} />
      </div>
    );
  } 
}


 export default App;
  

