import React, { useState } from 'react';
import './App.css';
import { Form, Button, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { db } from './Firebase'
import { auth } from './Firebase'
function AddDepartment(props) {
    auth.onAuthStateChanged((user)=>{
        if(!user){
            props.history.push("/login");
        }
    })
    let [depart, setDepart] = useState();
    const handleSave = async (e) => {
        e.preventDefault();
        console.log(depart);
        const docRef = db.collection('departments');
        await docRef.add({
            'name':depart
        })
        props.history.push("/viewdepartment");
 
    }
  return (
        <div className="Adddepart">
            <Card style={{ width: '18rem' },{borderWidth:3},{borderColor:'rgb(238, 91, 46)'}} >
                <Card.Body>
                    <Form onSubmit={handleSave}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Department</Form.Label>
                            <Form.Control type="text" placeholder="Enter department" required onChange={e => setDepart(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" type="submit" >
                            Submit
                 </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}
export default AddDepartment;