import React,{ useState } from 'react';
import { auth } from './Firebase'
import { Form, Button, Card, Col, Row } from 'react-bootstrap';
import './App.css';
export default function Login(props) {
    const [error,setError]=useState(false);
    const [error1,setError1]=useState();
    const [password,setPassword]=useState();
    const [email,setEmail]=useState();
    const handleLogin=(e)=>{
        e.preventDefault();
        auth.signInWithEmailAndPassword(email,password)
        .then(res=>{
            console.log(res)
            props.history.push("/");

        })
        .catch(err=>{
            setError(true);
            setError1(err.message)   
        });
      }
       
                    
                



    

    return (
        <div className="Adddepart" >
            <Card style={{ width: '24rem' },{borderWidth:3},{borderColor:'rgb(238, 91, 46)'}}  >
                <Card.Body>
                    <Form onSubmit={handleLogin} >
                    <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail"> 
                            {error&&<div className="false"><h10>{error1}</h10></div>}
                            </Form.Group>
                            </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter Email" required onChange={e => setEmail(e.target.value)} />
                            </Form.Group>
                            </Form.Row>
                            <Form.Row>
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter Password" required onChange={e => setPassword(e.target.value)}/>
                            </Form.Group>
                        </Form.Row>
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}