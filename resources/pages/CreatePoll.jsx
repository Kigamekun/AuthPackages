import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import $ from 'jquery';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function CreatePoll() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const addChoice = (event) => {
        var html = ` <div class="mb-3">
        <input type="text" name="choices[]" class="form-control" id="choices" placeholder="choices" />
    </div>`;
        $('#choice-adder').append(
            html
        );
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const loggedInUser = JSON.parse(localStorage.getItem("user"));

        

        var choices = $("input[name='choices[]']")
        .map(function(){return $(this).val();}).get();
        choices = Object.assign({}, choices); 

        fetch('http://127.0.0.1:8000/api/poll', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
                Authorization: "Bearer " + loggedInUser.access_token,
            },
            body: JSON.stringify({
                title: $('#title').val(),
                description: $('#description').val(),
                deadline: $('#deadline').val(),
                choices: choices
            }),
        }).then((response) => {
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
                    window.location.href = '/';
                }, 2000);
            }
        });
    }

    return <>
        <div className="container">
            <br />
            <br />
            <center>
                <h2 className="text-white"><b>Create Poll</b></h2>
            </center>
            <Button variant="primary" onClick={handleShow}>
                Create Poll
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create Poll</Modal.Title>
                </Modal.Header>
                <form onSubmit={submitHandler}>

                    <Modal.Body>
                        <div className="mb-3">
                            <label for="title" className="form-label">Title</label>
                            <input type="text" name="title" className="form-control" id="title" placeholder="Title" />
                        </div>
                        <div className="mb-3">
                            <label for="exampleFormControlTextarea1" className="form-label">Description</label>
                            <textarea name="description" className="form-control" id="description" rows="3"></textarea>
                        </div>


                        <div className="mb-3">
                            <label for="deadline" className="form-label">deadline Address</label>
                            <input type="date" name="deadline" className="form-control" id="deadline" placeholder="deadline" />
                        </div>

                        <div className="mb-3">
                            <label for="choices" className="form-label">Choices</label>
                            <input type="text" name="choices[]" className="form-control" id="title" placeholder="Title" />
                        </div>

                        <div id="choice-adder">

                        </div>
                        <div className="d-flex justify-content">

                        <button type="button" onClick={addChoice} className="btn btn-outline-info">Add</button>


                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type="submit" variant="primary">Understood</Button>
                    </Modal.Footer>

                </form>
            </Modal>
        </div>
    </>
}


export default CreatePoll;
