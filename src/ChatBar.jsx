import React from 'react';
 class ChatBar extends React.Component {
    
    handlerSubmitMsg(event) {  
        if (event.key === "Enter") {
          this.props.handlerSubmitMsg(event.target.value);
          event.target.value = "";
        }
    }
  render() {
    return (
      <footer className="chatbar">
         <input className="chatbar-username" defaultValue={this.props.currentUser} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.handlerSubmitMsg.bind(this)}/>
      </footer>
    );
  }
}
 export default ChatBar; 

 