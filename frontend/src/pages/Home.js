import {React, useState} from 'react';
import ChatGPT from '../img/chatGPT.jpg'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { AuthenticationService } from '../services/AuthenticationService';

function Home() {
    const [credentials, setCredentials] = useState({
    username : '',
    password : ''
    })

    const handleFormInputChange = (name) => (event) => {
    const val = event.target.value;
    setCredentials({...credentials, [name] : val})
    }

    const login = async () => {
    await AuthenticationService.login(credentials);
    }
  
  return (
    <div>
      <div className='row'>
        <div className='col-8' > 
            <img src = {ChatGPT} />
        </div>  
      <div className='col-3' style={{paddingTop: '200px', paddingLeft: '100px'}} >
        <div style = {{textAlign: 'center'}}>
            <h1>Log in</h1>
        </div> 
         <div >
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="text" placeholder="Enter email" name="username" value={credentials.username} onChange={handleFormInputChange("username")}/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" onChange={handleFormInputChange("password")}/>
                </Form.Group>
                <Button variant="primary" onClick={login}>
                    Submit
                </Button>
             </Form>
         </div>
        </div>
        </div>
    </div>                       
  )
}

export default Home