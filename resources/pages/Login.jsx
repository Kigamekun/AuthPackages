import React, { useState } from "react";

import {
Navigate,
} from "react-router-dom";
import "./login.css";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function Login() {
  // React States
	const [errorMessages, setErrorMessages] = useState({});
	const [isSubmitted, setIsSubmitted] = useState(false);

	const errors = {
    email: "invalid email",
    password: "invalid password",
	};

	const handleSubmit = (event) => {
    event.preventDefault();

    var { email, password } = document.forms[0];

    // Find user login info
    fetch("http://127.0.0.1:8000/api/login", {
		method: "POST",
		headers: {
        "Content-Type": "application/json",
        accept: "application/json",
	},
	body: JSON.stringify({
        email: email.value,
        password: password.value,
	}),
    })
      // fetch('http://127.0.0.1:8000/api/poll/' + e.currentTarget.getAttribute("data-id") + '/vote/' + e.currentTarget.getAttribute("data-choices_id"))
    .then((response) => {
        if (response.status === 200) {
        	return response.json();
        } else {
        }
    }).then(function (json) {
		const MySwal = withReactContent(Swal);

		console.log(json);
        if (typeof json === 'undefined') {
			Swal.fire({
				position: 'center',
				icon: 'error',
				title: 'Login Failed !',
				showConfirmButton: false,
				timer: 1500
			});
		}else {
			localStorage.setItem("user", JSON.stringify(json));
		window.location.href = '/';
		}
    });
    // Compare user info
    // if (userData) {
    //   if (userData.password !== pass.value) {
    //     // Invalid password
    //     setErrorMessages({ name: "pass", message: errors.pass });
    //   } else {
    //     setIsSubmitted(true);
    //   }
    // } else {
    //   // Username not found
    //   setErrorMessages({ name: "uname", message: errors.uname });
    // }
};

  // Generate JSX code for error message
	const renderErrorMessage = (name) =>
    name === errorMessages.name && (
    	<div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
const renderForm = (
    // <div className="form">
    // 	<form onSubmit={handleSubmit}>
    //     <div className="input-container">
    //     <label>Email </label>
    //     <input type="email" name="email" required />
    //     {renderErrorMessage("email")}
    //     </div>
    //     <div className="input-container">
    //     <label>Password </label>
    //     <input type="password" name="password" required />
    //     {renderErrorMessage("password")}
    //     </div>
    //     <div className="button-container">
    //     <input type="submit" />
    //     </div>
    // </form>
    // </div>
	<section className="area-login">
        <h1>Login YukPilih</h1>
        <div className="login">
    	<div>
        </div>
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" required  placeholder="You're Email !" autoFocus />
            <input type="password" name="password" required  placeholder="Password" />
            <input type="submit" defaultValue="enter" />
        </form>
        <p>Dont Have Account ? <a href="/register">Register</a></p>
        </div>
    </section>
);

const loggedInUser = localStorage.getItem("user");
console.log(loggedInUser);
if (loggedInUser === null || loggedInUser == null) {
    return (
		renderForm
    );
	} else {
    return <Navigate to="/" />;
	}
}

export default Login;
