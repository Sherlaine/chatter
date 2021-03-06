import React from 'react';
import Message from './Message.jsx';
 class MessageList extends React.Component {
  render() {
    return (
        <main className="mesages">
          {
          this.props.messages.map((message) => {
            return ( // return messages array (in App.jsx) and loop
              <div key={message.id}>
                 <Message 
                  type = {message.type}
                  username={message.username} 
                  content={message.content} />
              </div>
            );
          })
        }
      </main>
    );
  }
}
 export default MessageList;