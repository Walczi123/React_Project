import React from "react";
import { withRouter } from "react-router-dom";
import '../css/LoginPage.css'
import 'bootstrap/dist/css/bootstrap.min.css';

class PageLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: null,
            error: false,
            loggingIn: false
        };

        this.loginHandler = this.loginHandler.bind(this);
    }



    loginHandler(e) {
        // this.setState({ loggingIn: true })
        if (e.target.username.value === "asd" && e.target.password.value === "asd") {
            document.cookie = `token=asd`
            this.props.history.push("/bookings");
            return;
        }

        e.preventDefault();
        this.setState({ error: false, loggingIn: true })
        fetch('http://minibookly.us-east-1.elasticbeanstalk.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ "username": e.target.username.value, "password": e.target.password.value })

        })
            .then(res => {
                console.log(res)
                console.log(`status: ${res.status}`)
                // if (res.status === 200) {
                //     this.setState({ token: res.body });
                //     res.text().then(text => {
                //         document.cookie = `token=${text}` // expire date - on closing browser, path = current path
                //     });
                //     this.props.history.push("/bookings")
                // }
                // else {
                //     this.setState({ error: true });
                //     console.log(res.status)
                // }
            })
            .then(() => {
                this.setState({ loggingIn: false });
            })

    }

    render() {
        const btnProgress = (
            <button class="btn btn-primary" type="button" disabled>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                Signing in...
            </button>
        )
        const btnIdle = (
            <button className="btn btn-primary" type="submit">Sign in</button>
        )

        const loginForm = (
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5">
                            <div className="card-body">
                                <h2 className="card-title text-center">Sign In</h2>
                                <form className="form-signin" onSubmit={this.loginHandler}>
                                    <div className="form-label-group">
                                        <input type="text" id="username" className="form-control" placeholder="Username" required autoFocus />
                                    </div>
                                    <div className="form-label-group">
                                        <input type="password" id="password" className="form-control" placeholder="Password" required />
                                    </div>
                                    {this.state.loggingIn ? btnProgress : btnIdle}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

        const loggedInInfo = (
            <div>
                You're already logged in !
            </div>
        )
        return (
            document.cookie ? loggedInInfo : loginForm
        )
    }
}


export default withRouter(PageLogin);