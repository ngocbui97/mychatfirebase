import React, { Component } from 'react'
import { firebaseConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'

class Login extends Component {
	handleClick = () => {
		const {firebase} = this.props;
		firebase.login({
			provider: 'google',
			type: 'popup'
		})
		.then((res) => {
			const { firebase } = this.props
			firebase.database().ref(`users/${res.user.uid}`).update({status : 1})
			this.props.history.push('/')
		})
		.catch(error =>{
			console.log(error);
		})
	}
	render() {
		return (
			<div className="container">
				<div className="alignitem">
					<div className="row">
						<span className="title text-center col-md-12 ">
						Please login
						</span>
						<button className="btn-google col-md-12" onClick={this.handleClick} type="button">
							<img src="/asserts/images/icon-google.png" alt="GOOGLE"></img>
							Google
						</button>
					</div>
				</div>
			</div>
		)
	}
}
export default compose(
	firebaseConnect([
		{path: 'users'}
	]),
	connect(state => {
		return {
			auth: state.firebase.auth,
			userList: state.firebase.data.users
		}
	})
)(Login);
