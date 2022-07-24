import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Principal } from '@dfinity/principal';

import { ic_user } from '../../declarations/ic_user';



const App = () => {

  const [user, setUser] = useState('');
  const [userData, setUserData] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');


  useEffect(() => {
    const checkLoggedIn = async () => {
      const connected = await window.ic.plug.isConnected();
      if (connected) {
        setUser(window.ic.plug.sessionManager.sessionData.principalId);
      } else {
        window.ic.plug.requestConnect();
      };
    };
    checkLoggedIn();
  });


  // Login user with Plug Wallet
  const loginUser = async () => {
    const connected = await window.ic.plug.isConnected(); // I think this doesnt execute so the if else block can't run...
    console.log(connected);
    if (!connected) {
      console.log('not connected');
      await window.ic.plug.requestConnect();
      setUser(window.ic.plug.sessionManager.sessionData.principalId);
    } else {
      alert('All is well. You are already logged in with Plug Wallet :)');
    };
  };


  const getUserData = async () => {
    // Should add a check to make sure user is logged in via Plug and add notification if not
    const response = await ic_user.getUserData(Principal.fromText(user));
    setUserData(response[0]);
  };


  const registerUser = async () => {
    // Backend canister handles existing and non-existing users. Will update if user already exists
    // The following is unsafe!! Use msg.caller in production to prevent anonymous calls and prevent people from manipulating other user's state
    const response = await ic_user.createUser(Principal.fromText(user), name, description);
    alert(`Successfully changed data for user ID ${response.toString()}`);
  };

  console.log(userData.id);


  return (
    <>
      <div className="container-fluid vh-100 d-flex align-items-center">
        <div className="container h-75">
          <div className="container">
            <div className="row m-3">
              <h2>Login With Plug Wallet</h2>
              <button className="btn btn-dark" onClick={loginUser}>Login with Plug</button>
            </div>
          </div>
          <div className="container mt-5">
            <div className="row m-3">
              <h2>Add or Change Your Data</h2>
              <form>
                <div className="row">
                  <div className="col">
                    <label>Name:&nbsp;</label>
                    <input
                    type="text"
                    onChange={e => setName(e.target.value)}
                    >
                    </input>
                  </div>
                  <div className="col">
                    <label>Description:&nbsp;</label>
                    <input
                    type="text"
                    onChange={e => setDescription(e.target.value)}
                    >
                    </input>
                  </div>
                </div>
                <Button className="btn btn-dark w-100 mt-2" onClick={registerUser}>
                  Submit Data
                </Button>
              </form>
            </div>
          </div>
          <div className="container mt-5">
            <div className="row m-3">
              <h2>Query Your Data</h2>
              <button className="btn btn-dark" onClick={getUserData}>Print Your Data</button>
            </div>
            <div className="row m-3">
              <h5>{userData.id}</h5>
              <h5>{userData.name}</h5>
              <h5>{userData.description}</h5>
              <h5>{userData.registeredAt}</h5>
            </div>
          </div>
        </div>
      </div>
    </>
  )};

export default App;