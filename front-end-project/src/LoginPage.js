import React from "react";
import { withRouter } from "react-router-dom";
import './LoginPage.css';

class PageLogin extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            token: null,
            error: false
        };
    
        this.loginHandler = this.loginHandler.bind(this);
      }
    
      loginHandler(e) {
        e.preventDefault();
        this.setState({error: false})
        fetch('http://localhost:8080/login', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({"login":e.target.uname.value, "password":e.target.psw.value})
            
        })
        .then(res => {
        if (res.status != "200") {
            this.setState({error: true})
            console.log(res.status)
            res.text().then(text => { console.log(text); })
        } 
        else {
            console.log(res.status)
            console.log("test")
            res.text().then(text => { console.log(text); })
            this.setState({token: res.body})
            //this.props.history.push("/bookings");
        }
        })
      }


    render() {
        return (
            <div>
                <div className="Title">
                    <h2>Bookly - Reservation History</h2>
                </div>
                <div className="LoginForm" align="center">
                    <form onSubmit={e => this.loginHandler(e)}>
                        <div className="container">
                            <div className="label-input">
                                <label className="LoginLabel" htmlFor="uname">Username:</label>
                                <input
                                    type="text"
                                    placeholder="Enter username"
                                    name="uname"
                                    required
                                />
                            </div>
                            <div className="label-input">
                                <label className="LoginLabel" htmlFor="psw">Password:</label>
                                <input
                                    type="password"
                                    placeholder="Enter password"
                                    name="psw"
                                    required
                                />
                            </div>
                            <button className="LoginButton" type="submit">
                                Sign in
                            </button>
                            {this.state.error === true && <p className="error">Invalid username or password</p>}
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

  
export default withRouter(PageLogin);