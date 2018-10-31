import React from 'react';
import Message from './Message.jsx';
 class MessageList extends React.Component {
  render() {
    return (
        <div>
        {this.props.messages.map((message) => {
          return (
                <Message key={message.id} username={message.username} content={message.content} />
          );
        })}
      </div>
    );
  }
}
 export default MessageList;