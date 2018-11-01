import React from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends React.Component {

  constructor(props) {//constructing the state
    super(props);//allow the children to access props from this parent state
    this.state = { //parent's state listed
      currentUser: {name: "Bob"},
      messages:[] //msg from server will be store here
    };

    this.socket = new WebSocket("ws://localhost:3001");

    this.changeCurrentUser = this.changeCurrentUser.bind(this);

    this.sendMessageServer = this.sendMessageServer.bind(this);
  }

  changeCurrentUser(newUsername) {
    this.setState({ currentUser: {name: newUsername} });
  }	

  sendMessageServer(newMessage) {
    console.log('Message to server is', newMessage);
    const message = {
      username: this.state.currentUser.name,
      content: newMessage
    } 
    this.socket.send(JSON.stringify(message)); // send to server
  }		  
  
  componentDidMount() {
    console.log("componentDidMount <App />");
    
    this.socket.onopen = () => {
      console.log('Connected to server');
    }
     this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const newState = this.state.messages.concat(message); // concatenates new message to exisiting messages
      this.setState({ messages: newState }); //sets updated messages
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
          messages={this.state.messages}/>
        <ChatBar 
          currentUser={this.state.currentUser.name} 
          handleSubmit={this.sendMessageServer} 
          handleNewUsername={this.changeCurrentUser} />
      </div>
    );
  } 
}


 export default App;
  

