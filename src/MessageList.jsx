import React from 'react';
import Message from './Message.jsx';
 class MessageList extends React.Component {
  render() {
    return (
        <main className="mesages">
        {this.props.messages.map((message) => {
          return ( //return messaged as an array (app.jsx) and loop
                <Message key={message.id} username={message.username} content={message.content} />
          );
        })}
    {/*<div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>  */}
      </main>
    );
  }
}
 export default MessageList;