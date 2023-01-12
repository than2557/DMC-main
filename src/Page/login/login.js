import React,{useState,SyntheticEvent} from'react';
import {Form,InputGroup,form} from 'react-bootstrap';
import logo from '../../img/icon.png';
import jwt_decode  from "jwt-decode";

import swal from 'sweetalert2';
import './login.css';
import jwtDecode from 'jwt-decode';

import Createlog from '../../package/createlog';
import axios from 'axios';


function Login() {
const [username, setUsername] = useState();
const [password, setPassword] = useState();
//http://192.168.33.142:9876/DmscAuthorization/api/v1/login

  const Login = async(e:SyntheticEvent) => {
    
  e.preventDefault();
    console.log({username,password,"appid":"01"})
    let data = JSON.stringify({
      username,
      password,
      "appid":"01"
    });
   let parseJSON =  JSON.parse(data)
    

 const datares = await postData(process.env.REACT_APP_LGIN_APP, data);
 console.log("status"+datares.status);

 if(datares.status){   

let JWtTokenDecode = jwt_decode(datares.token);
console.log(JWtTokenDecode);
    localStorage.setItem('accessToken',datares.token);
  let dateToken = new Date(JWtTokenDecode.exp);
  // console.log(dateToken);
  if(new Date(dateToken) < new Date()){
    new swal("Failed","Token error");
    console.log("Error Token");
  
  }
  else{
    console.log("else create log")
    // const response = await axios({
    //   method: 'post',
    //   url: process.env.REACT_APP_URL_CREATE_LOG_LOGIN,
    //     headers:{ 
    //     'content-type': 'application/json;UTF-8',
    //     'Authorization':datares.token
    //   },
    //   params: data
    // });
    const response = await CreateLoglogin(process.env.REACT_APP_URL_CREATE_LOG_LOGIN,{
      username,
      password,
      "appid":"01"
    },datares.token)

    if(response.status){
      window.location.href = "/chartReport"
    }
  }
 }
 else{
    new swal("Failed", datares.message, "error");
  console.log("Error");
 }
  }
  return (
<div className="Login-background"> 
    <div className="Login ">

    

      <div class="container mt-nta ">
      <div class="card center resize backgourndLogin">

<div class="jumbotron-fluid ">

  <img  class="resize" src={logo} alt="Logo" />


  <div class="container">
  <br/>
    <text class="display-6">เข้าสู่ระบบ</text>
    <br/>
    <br/>
  </div>
</div>
<form onSubmit={Login}>



  <div class="form-group">
    <div className="inputsize justify-content-center">
  <InputGroup className="mb-3 inputsize">
        <InputGroup.Text id="inputGroup-sizing-default" style={{'background-color': "#ebe8e8"}}>
          USERNAME
        </InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          id="username" name="username" onChange={e=>setUsername(e.target.value)}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default" style={{'background-color': "#ebe8e8"}}>
          PASSWORD
        </InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        id="password" type="password" onChange={e=>setPassword(e.target.value)}/>
      </InputGroup>

      <InputGroup className="mb-3">
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          value="01" id="appid" type="appid"  hidden/>
      </InputGroup>

      </div>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</div>
      </div>
    </div>
    </div>
  );

  async function postData(url = '',data) {

    const response = await fetch(url, {
      method: 'POST', 
      mode: 'cors',
      headers:{ 
        'Access-Control-Allow-Origin': '*',
      'content-type': 'application/json;UTF-8' 
      }, 
      body: data 
    });
    return response.json(); 
  }
}

async function CreateLoglogin(url,data,Authorization){
  const response = await axios({
    method: 'post',
    url: url,
      headers:{ 
      'content-type': 'application/json;UTF-8',
      'Authorization':Authorization
    },
    params: data
  });
  if(response.data.message){
    return {"status":true}
  }
  else{
    return {"status":false}
  }
}

export default Login;
