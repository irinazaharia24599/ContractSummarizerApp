import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import styles from '../css/Login.css';

const formValid = ({ formErrors, ...rest }) => {
    let valid = true;
    console.log(formErrors)
    Object.values(formErrors).forEach(val => {
        if (val.length !== 0) {
            valid = false;
        }
    });

    console.log(rest)
    Object.values(rest).forEach(val => {
        if (val === null) {
            valid = false;
        }
    });

    return valid;
}

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

class Login extends Component {

    signUpClickHandler() {
        document.getElementById('container').classList.add("right-panel-active");
    }

    signInClickHandler() {
        document.getElementById('container').classList.remove("right-panel-active");
    }

    // constructor(props) {
    //     super(props);
    // }

    constructor(props) {
        super(props);

        this.state = {
            // firstName: null,
            // lastName: null,
            // email: null,
            // password: null,
            formErrors: {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
            }
        };

        //this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleLoginSubmit = e => {
        e.preventDefault();
        const email = document.getElementById('emailLogin').value
        const password = document.getElementById('parolaLogin').value
        let user = {
            email,
            password
        }

        fetch('http://localhost:8080/api/users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(response => response.json())
            .then(data => {

                this.setState({ user: data.user, token: data.token })

                console.log(this.state)

                //redirrect catre pagina contracte
                //this.props.history.push('/contracts', { state: data })
            })
    }

    handleRegisterSubmit = async e => {

        if (formValid(this.state)) {
            let user = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
            }

            const response = await fetch('http://localhost:8080/api/users', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            response.json().then(data => {
                this.setState({
                    user: data.user,
                    token: data.token
                })
                console.log(this.state)
            })
        }
        else {
            e.preventDefault();
            console.error('form invalid');
        }
    }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;
        switch (name) {
            case 'firstName':
                formErrors.firstName = value.length < 3 ? 'minimum 3 characters required' : "";
                break;

            case 'lastName':
                formErrors.lastName = value.length < 3 ? 'minimum 3 characters required' : "";
                break;
            case 'email':
                formErrors.email =
                    emailRegex.test(value) ? "" : "invalid email address";
                break;
            case 'password':
                formErrors.password = value.length < 6 ? 'minimum 6 characters required' : "";
                break;
            default:
                break;
        }

        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    };

    render() {
        const { formErrors } = this.state;

        return (

            <div className="container" id="container">
                <div className="form-container sign-up-container">
                    <form onSubmit={this.handleRegisterSubmit} noValidate>
                        <h1>Creează un cont</h1>
                        <input
                            className={formErrors.firstName.length > 0 ? "error" : null}
                            type="text"
                            placeholder="Nume"
                            name="firstName"
                            noValidate
                            onChange={this.handleChange}
                        />
                        <input
                            type="text"
                            placeholder="Prenume"
                            name="lastName"
                            noValidate
                            onChange={this.handleChange} />
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            noValidate
                            onChange={this.handleChange} />
                        <input
                            type="password"
                            placeholder="Parola"
                            name="password"
                            noValidate
                            onChange={this.handleChange} />
                        <button onClick={e => this.handleRegisterSubmit(e)}>Register</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form action="#">
                        <h1>Autentificare</h1>
                        <input
                            id="emailLogin"
                            type="email"
                            placeholder="Email"
                            noValidate
                            onChange={this.handleChange} />
                        <input
                            id="parolaLogin"
                            type="password"
                            placeholder="Parola"
                            noValidate
                            onChange={this.handleChange} />
                        <button onClick={e => this.handleLoginSubmit(e)}>Login</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Bine ai revenit!</h1>
                            <p>Dacă ai deja un cont, te rugăm să te autentifici introducând datele de acces.</p>
                            <button className="ghost" id="signIn" onClick={this.signInClickHandler}>Intră în cont</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Bine ai venit!</h1>
                            <p>Pentru a crea un cont, completează formularul de înregistrare cu datele personale.</p>
                            <button className="ghost" id="signUp" onClick={this.signUpClickHandler}>Creează un cont</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;
