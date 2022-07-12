import React, { useState } from "react";

import {
Navigate
} from "react-router-dom";
import "./register.css";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function Register() {

	const handleSubmit = (event) => {
    event.preventDefault();

    var { name,email, password } = document.forms[0];

    // Find user Register info
    fetch("http://127.0.0.1:8000/api/register", {
		method: "POST",
		headers: {
        "Content-Type": "application/json",
        accept: "application/json",
	},
	body: JSON.stringify({
        name: name.value,
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
				title: 'Register Failed !',
				showConfirmButton: false,
				timer: 1500
			});
		}else {
            Swal.fire({
				position: 'center',
				icon: 'success',
				title: 'Register Successfully !',
                footer:'You will redirected to login page',
				showConfirmButton: false,
				timer: 1500
			});
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
		}
    });
};

const renderForm = (
    <section className="area-login">
        <h1>Register YukPilih</h1>
        <div className="login">
        <div>
        </div>
        <form onSubmit={handleSubmit}>
            <input type="tex" name="name" required  placeholder="You're Name !" autoFocus />
            <input type="email" name="email" required  placeholder="You're Email !" autoFocus />
            <input type="password" name="password" required  placeholder="Password" />
            <input type="submit" defaultValue="enter" />
        </form>
        <p>Have Account ? <a href="/login">login</a></p>
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

export default Register;
