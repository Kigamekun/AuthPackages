import React, { Component, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Modal from 'react-bootstrap/Modal';
import {
  Navigate,
} from "react-router-dom";
import './home.css';
import $ from 'jquery';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


class Card extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }



  delete = (e) => {

    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    fetch('http://127.0.0.1:8000/api/poll/' + e.currentTarget.getAttribute('data-id'), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: "Bearer " + loggedInUser.access_token,
      }
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
          title: 'Delete Failed !',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Delete Successfully !',
          footer: 'You will redirected to login page',
          showConfirmButton: false,
          timer: 1500
        });
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      }
    });
  }


  vote = (e) => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    fetch(
      "http://127.0.0.1:8000/api/poll/" +
      e.currentTarget.getAttribute("data-id") +
      "/vote/" +
      e.currentTarget.getAttribute("data-choices_id"),
      {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: "Bearer " + loggedInUser.access_token,
        },
        method: "POST",
        body: JSON.stringify({

          user_id: loggedInUser.data.id

        }),
      })
      .then((response) => {
        return response.json();


      }).then(function (json) {

        if (json.statusCode === 200) {
          return Swal.fire({
            position: 'center',
            icon: json.status,
            title: json.message,
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          return Swal.fire({
            position: 'center',
            icon: json.status,
            title: json.message,
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
  };

  render() {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    var choices = JSON.parse(this.props.choices);
    var result = JSON.parse(this.props.result);
    return (
      <div className="card" style={{ margin: '20px', color: 'black' }}>
        <div className="card-body">
          <h4 ><b>{this.props.title}</b></h4>
          <h5 style={{ color: "red" }}><b>{this.props.deadline}</b></h5>
          <h6>{this.props.description}</h6>
          <div>
            {
              loggedInUser.data.role === 0 ? 
              <h6><b>Result Vooting</b></h6> : ''
            }
            {
              loggedInUser.data.role === 0 ?
                Object.keys(result).map((element) => (
                  <div>
                    <h6>{choices[element]}</h6>
                    <ProgressBar style={{ marginBottom: '10px' }} now={result[element]} label={`${result[element]}%`} />
                  </div>
                )) : ''
            }
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "30px",
            }}
          >
            {Object.keys(choices).map((element) => (
              <button className="btn btn-primary"
                data-id={this.props.id}
                data-choices_id={element}
                style={{ margin: "10px" }}
                onClick={this.vote}
              >
                {choices[element]}
              </button>
            ))}
            <br />

          </div>
          {
            loggedInUser.data.role === 0 ?
              <div className="d-flex justify-content-end">
                <button data-id={this.props.id} onClick={this.delete} className="btn btn-danger">
                  Delete
                </button>
              </div>
              : ''
          }
        </div>
      </div>

    );
  }
}



class Home extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      data: [],
    };
  }




  addChoices() {
    var html = ` <div class="mb-3">
    <input type="text" name="choices[]" class="form-control" id="choices" placeholder="choices" />
</div>`;
    $('#choice-adder').append(
      html
    );
  }


  createPoll = (event) => {
    event.preventDefault();

    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    var choices = $("input[name='choices[]']")
      .map(function () { return $(this).val(); }).get();
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
          title: 'Create Poll Failed !',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Create Poll Successfully !',
          footer: 'You will redirected to login page',
          showConfirmButton: false,
          timer: 1500
        });
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      }
    });
  }

  componentDidMount() {

    try {
      const loggedInUser = JSON.parse(localStorage.getItem("user"));

      fetch("http://127.0.0.1:8000/api/poll", {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: "Bearer " + loggedInUser.access_token,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          this.setState({
            data: json.data,
          });
        });
    } catch (error) {

    }
  }



  openModal = () => this.setState({ isOpen: true });

  closeModal = () => this.setState({ isOpen: false });


  renderPoll(item, index) {
    return (
      <Card
        id={item.id}
        title={item.title}
        description={item.description}
        deadline={item.deadline}
        choices={item.choices}
        result={item.result}
      />

    );
  }

  logout() {
    localStorage.clear();
    window.location.href = '/';
  }



  render() {




    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    if (loggedInUser === null) {
      return <Navigate to="/login" />;
    } else {
      return (
        <>
          <div className="header">
            <div className="container">
              <center><h1 style={{ color: 'white',marginTop:'70px' }}><b>YukPilih Pool List</b></h1>
                <button className="btn btn-outline-danger" onClick={this.logout}>Logout</button>
              </center>
              <br />
              <div className="cards">{this.state.data.map(this.renderPoll)}</div>

            </div>
          </div>
          {
            loggedInUser.data.role === 0 ? <div className="float">

              <Button style={{ borderRadius: '50%', width: '64px', height: "64px", margin: '20px' }} className=" my-float" onClick={this.openModal}>
                +
              </Button>

              <Modal
                show={this.state.isOpen}
                onHide={this.closeModal}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Create Poll</Modal.Title>
                </Modal.Header>
                <form onSubmit={this.createPoll}>

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

                      <button type="button" onClick={this.addChoice} className="btn btn-outline-info">Add</button>


                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={this.closeModal}>
                      Close
                    </Button>
                    <Button type="submit" variant="primary">Understood</Button>
                  </Modal.Footer>

                </form>
              </Modal>

            </div>
              : ''
          }


        </>
      );
    }
  }
}

export default Home;
