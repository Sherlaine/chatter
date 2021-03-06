import React from 'react';
 class ChatBar extends React.Component {
    
  handleSubmitName(event) {
    if (event.key === "Enter") {
      const newUsername = event.target.value;
      this.props.handleNewUsername(newUsername);
    } 
  }
  handleSubmitMsg(event) {  
    if (event.key === "Enter") {
      const type = "postMessage";
      const newMessage = event.target.value;
      this.props.handleSubmit(newMessage, type);
      event.target.value = "";
    }
  }
  render() {
    console.log('Rendering <Chatbar />')
    return (
      <footer className="chatbar">
        <input className="chatbar-username" 
          defaultValue={this.props.currentUser}
          onKeyUp={this.handleSubmitName.bind(this)} />
        <input className="chatbar-message" 
          placeholder="Type a message and hit ENTER" 
          onKeyPress={this.handleSubmitMsg.bind(this)} />
      </footer>
    );
  }
}

 export default ChatBar; 

 