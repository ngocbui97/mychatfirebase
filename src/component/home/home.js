import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux';
import Users from '../Users';
import SendMessage from '../SendMessage';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: [],
            friendChat: {}
        }
    }
    componentWillReceiveProps() { // if not have user then redirect to login
        const { firebase, history } = this.props
        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                history.replace('/login')
            }
        })
    }
    handlerSignout = () => {// handle logout and update status and router
        const { firebase, history, profile } = this.props
        firebase.database().ref(`users/${profile.uid}`).update({status : 0, lastOnline: Date.now()})
        firebase.logout()
        history.replace('/login')
    }
    render() {
         console.log( this.props.userList)
        if (this.props.profile) {
            return (
                <div className="container clearfix">
                    <ul className="nav justify-content-end">
                        <li className="nav-item">
                            <img src={this.props.profile.photoURL} alt="avatar" className="avatar-profile" />
                        </li>
                        <li className="nav-item">
                            <span className="nav-link" href="">{this.props.profile.displayName}</span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link" onClick={this.handlerSignout}>Sign Out</span>
                        </li>
                    </ul>
                    <div className="content">
                        <SendMessage
                            messages={this.state.messages}
                            profile={this.props.profile}
                            friendChat={this.state.friendChat}
                            sendMessage={(message) => this.props.sendMessage(message, this)}/>
                        <div className="people-list" id="people-list">
                            <Users
                                chatting={(id) => this.props.chatting(id, this.props, this)}
                                userList={this.props.userList}
                            />
                            <div className="search">
                                <input type="text" placeholder="search" />
                                <i className="fa fa-search"></i>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return <div>Home</div>
        }
    }
}

export default compose(
    firebaseConnect((props) => [
        {path: 'users'},
    ]),
    connect(
        (state, props) => { // tien hanh tra cac state => props thuoc tinh va action
            console.log(state.firebase.data.users)
            return {// propverty
                profile: state.firebase.auth,
                userList: state.firebase.data.users
            }
            
        },
        (dispatch) => ({ // action
            chatting: async (user, props, state) => {
                const { firebase, profile } = props
                let id = user[0]
                let gid = id > profile.uid ? id + profile.uid : profile.uid + id 
                let messageList = await firebase.database().ref(`/messages/${gid}`).once('value') // get dada list message
                let temp = []
                messageList.forEach(message => {
                    temp.push({key: message.key, info: message.val()})
                })
                state.setState({ // update state
                    messages: temp,
                    friendChat: user
                })
            },
            sendMessage: async (text, self) => {// action
                const { firebase, profile } = self.props
                let id = self.state.friendChat[0]
                let gid = id > profile.uid ? id + profile.uid : profile.uid + id 
                let infoMes = { // onbject contain information message
                    uid: profile.uid,
                    message: text,
                    time: Date()
                }
                let message = await firebase.database().ref(`/messages/${gid}`).push(infoMes)
                firebase.database().ref(`/messages/${gid}`).on('child_added', (res) => { /// ???
                    let flag = self.state.messages.findIndex(item => item.key === res.key) // ??
                    console.log(flag)
                    if(flag === -1){
                        let temp = Object.assign([], self.state.messages) ///???
                        temp.push({key: res.key, info:res.val()})
                        self.setState({messages: temp})
                    }
                })
            }
        })
))(Home)
  