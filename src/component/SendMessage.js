import React, { Component } from 'react'

class SendMessage extends Component {
    constructor (props){
        super(props)
        this.state = {
            message: ''
        }
    }
    handleChange = (e) => {
        this.setState({message: e.target.value})
    }
    sendMessage = () => {
        this.setState({message: ''})
        this.props.sendMessage(this.state.message) 
    }
    render() {
        const friend = this.props.friendChat[0] ? this.props.friendChat[1] : {}
        friend.id = this.props.friendChat[1]
        return (
            <div className="chat">
                <div className="chat-header clearfix">
                    {friend.avatarUrl ? <img src={friend.avatarUrl} alt="avatar" className="avatar-profile"/> : ''}
                    <div className="chat-about">
                        <div className="chat-with">{friend.displayName ? friend.displayName : 'No message' }</div>
                        <div className="chat-num-messages">already {this.props.messages.length} messages</div>
                    </div>
                    <i className="fa fa-star"></i>
                </div>
                <div className="chat-history">
                    <ul>
                        {
                            this.props.messages.map((message, i) => { // map to list message history
                                return (
                                    <li className="clearfix" key={message.key}>
                                        <div className="message-data align-right">
                                            {
                                                i == 0
                                                && 
                                                <span className="message-data-time">{new Date(message.info.time).toDateString()}</span>
                                            }
                                            {
                                                this.props.messages[i + 1] && this.props.messages[i + 1].info.uid != message.info.uid &&
                                                <span className="message-data-time">{new Date(message.info.time).toDateString()}</span> || 
                                                <span className="message-data-name">{message.info.uid !== friend.id ? friend.displayName : this.props.profile.displayName }</span> 
                                            }
                                            
                                        </div>
                                        <div className="message other-message float-right">
                                            {message.info.message}
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="chat-message clearfix">
                    <textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows="2" value={this.state.message} onChange={(e) => this.handleChange(e)}></textarea>
                    <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
                    <i className="fa fa-file-image-o"></i>            
                    <button onClick={() => this.sendMessage()}>Send</button>
                </div>
            </div> 
        )
    }
}

export default SendMessage;