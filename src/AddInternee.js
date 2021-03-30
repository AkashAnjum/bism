import React, { useEffect, useState } from 'react';
import './App.css';
import {Link } from 'react-router-dom'
import { Form, Button, Card, Col, Row } from 'react-bootstrap';
import { db } from './Firebase'
import 'bootstrap/dist/css/bootstrap.min.css';
import { auth } from './Firebase'
function AddInternee(props) {
    let[id,setID]=useState();
    let [view, setView] = useState([]);
    let[name,setName]=useState();
    let[fname,setFname]=useState();
    let[email,setEmail]=useState();
    let[number,setNumber]=useState();
    let[gender,setGender]=useState();
    let[address,setAddress]=useState();
    let[cnic,setCnic]=useState();
    let[qualification,setQualification]=useState();
    let[dept,setDept]=useState();
    let[amount,setAmount]=useState();
    auth.onAuthStateChanged((user)=>{
        if(!user){
            props.history.push("/login");
        }
    })
    const getData = async () => {
        setView([]);
        const snapshot = await db.collection('departments').get();
       snapshot.forEach((doc) => {
           let  data={
                 id:doc.id,
                 name:doc.data().name
             }
             console.log(data);
             setView(pre=>[...pre,data]);
            
        });     
    }
    console.log(view);
    useEffect(() => {
        getData()
    }, []);

    //send
    console.log(dept);
    console.log(gender);
    const handleSave = async (e) => {
        e.preventDefault();
        // let ID=new Date().getTime();
        const docRef = db.collection('internees');
        let ID = await docRef.add({
            'name':name,
            'father_name':fname,
            'email':email,
             number:number,
             'gender':gender,
            'address':address,
            'cnic':cnic,
            'qualification':qualification,
            'department':dept,
             amount:amount,
            'status':false,
             'date':new Date(),
             'month':new Date().getMonth()
            
        })
        
        const docref = db.collection('wallets');
        let ID1 = await docref.add({
            'Id':ID.id,
            Fee:0,
            Pamount:0,
            'record':[],
            total:0,
            'date':new Date(),
        })

        props.history.push("/viewinternee");

    }

    
    return (
        <div className="Adddepart" >
            <Card style={{ width: '24rem' },{borderWidth:3},{borderColor:'rgb(238, 91, 46)'}}  >
                <Card.Body>
                    <Form onSubmit={handleSave} >
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Name" required onChange={e => setName(e.target.value)} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Father Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Father Name" required onChange={e => setFname(e.target.value)}/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter Email" required onChange={e => setEmail(e.target.value)}/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Phone.no</Form.Label>
                                <Form.Control type="number" placeholder="Enter Number" required onChange={e => setNumber(parseInt(e.target.value))}/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>Gender:</Form.Label>
                                
                                <input value="Male" className="gender" name="gender" type="radio"   onChange={e => setGender(e.target.value)} />
                                <label>Male</label>
                                <input value="FMale" name="gender" type="radio" className="gender1" onChange={e => setGender(e.target.value)}/>
                                <label>F.Male</label>
                           
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="formGridAddress1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control placeholder="1234 Main St" required onChange={e => setAddress(e.target.value)}/>
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>CNIC</Form.Label>
                                <Form.Control type="text" placeholder="Enter CNIC" required onChange={e => setCnic(e.target.value)}/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Qualification</Form.Label>
                                <Form.Control type="text" placeholder="Enter Qualification" required onChange={e => setQualification(e.target.value)}/>
                            </Form.Group>

                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Department</Form.Label>
                                <Form.Control as="select" defaultValue="Choose..." required  onLoad={e => setDept(e.target.value)} onChange={e => setDept(e.target.value)}>
                                <option className="opt"  selected='true' disabled='disabled' >Select Department</option>
                                {view.map((el) => {
                                console.log(el.name)

                             return (
                                    <option className="opt" value={el.name} >{el.name}</option>
                                 )})}
                                </Form.Control>
                            </Form.Group>

                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>Amount</Form.Label>
                                <Form.Control type="text" placeholder="Enter Fee Amount" required onChange={e => setAmount(parseInt(e.target.value))}/>
                            </Form.Group>
                            
                        </Form.Row>
                        
                        
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}
export default AddInternee;