import React, { Component } from 'react'

class Users extends Component {
    constructor(props){
        super(props)
    }

    User = (user) => {
        return (
            <li className="clearfix" key={user[0] + user.name}
                onClick={() => this.props.chatting(user)} 
                >
                <img src={user[1].avatarUrl} alt="avatar"/>
                <div className="about">
                    <div className="name">{user[1].displayName}</div>
                </div>
                {user[1].status === 1 ? <i className="fa fa-circle online"></i> : ''}
            </li>
        )
    }
    render() {
        let users = this.props.userList
        // console.log( this.props.usersList)
        if (users) {
            users = Object.entries(users) // =>??
            return (
                <ul className="list">
                    {users.map(user => {
                       
                        return (
                            this.User(user)
                        )
                    })}
                </ul>
            )
        } else {
            return <ul></ul>
        }
    }
}

export default Users