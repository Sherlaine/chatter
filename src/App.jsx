import React from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages:[]
    };

    this.socket = new WebSocket("ws://localhost:3001");

    this.socket.onmessage = (event) => {
      console.log(event);
      const message = JSON.parse(event.data);
      const newState = this.state.messages.concat(message); // concatenates new message to exisiting messages
      this.setState({ messages: newState }); //sets updated messages
    };

    this.sendMessageServer = this.sendMessageServer.bind(this);
  }

//invoked immediately after updating occurs, called for initial render 
  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket.onopen = () => {
      console.log('Connected to server');
    }
  }

  sendMessageServer(newMessage) {
    console.log('Message to server is', newMessage);
    const message = {
      username: this.state.currentUser.name,
      content: newMessage
    } 
    this.socket.send(JSON.stringify(message)); // send to server
    const allMessages = this.state.messages.concat(message); // concatenates new message to exisiting messages
    this.setState({messages: allMessages}); //sets updated messages
  }		   

  render() {
    console.log("rendering <App />");
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser.name} handlerSubmitMsg={this.sendMessageServer} />
      </div>
    );
  } 
}


 export default App;
  

