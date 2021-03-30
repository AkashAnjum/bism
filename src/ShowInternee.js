import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import firebase from "firebase/app";
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import { Form, Button, Card, Col, Row } from 'react-bootstrap';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBoxIcon from '@material-ui/icons/AddBox';
import BorderColorSharpIcon from '@material-ui/icons/BorderColorSharp';
import './App.css'
import { db } from './Firebase'
import { auth } from './Firebase'
import { Table } from "react-bootstrap";
function ShowInternee(props) {
    let [title, setTitle] = useState();
    let [pamount, setPamount] = useState();
    let [value, setValue] = useState();
    let [view, setView] = useState([]);
    let [view1, setView1] = useState([]);
    let [status1, setStatus1] = useState();
    let [name, setName] = useState();
    let [father_name, setFname] = useState();
    let [email, setEmail] = useState();
    let [number, setNumber] = useState();
    let [gender, setGender] = useState();
    let [address, setAddress] = useState();
    let [cnic, setCnic] = useState();
    let [qualification, setQualification] = useState();
    let [dept, setDept] = useState();
    let [amount, setAmount] = useState();
    let [status, setStatus] = useState(false);
    auth.onAuthStateChanged((user)=>{
        if(!user){
            props.history.push("/login");
        }
    }) 
    const getDataDept = async () => {
        setView1([]);
        const snapshot = await db.collection('departments').get();
        snapshot.forEach((doc) => {
            let data = {
                Id_1: doc.id,
                name: doc.data().name,
            }

            setView1(pre => [...pre, data]);

        });
    }
    const getData = async () => {
        setView([]);
        const snapshot = await db.collection('internees').get();
        snapshot.forEach((doc) => {
            let data = {
                id_2: doc.id,
                name: doc.data().name,
                f_name: doc.data().father_name,
                email: doc.data().email,
                number: doc.data().number,
                gender: doc.data().gender,
                address: doc.data().address,
                cnic: doc.data().cnic,
                qualification: doc.data().qualification,
                department: doc.data().department,
                amount: doc.data().amount,
                status: doc.data().status,
                date: doc.data().date,
                month: doc.data().month,
            }
            setView(pre => [...pre, data]);
            setStatus1(false)
        });
    }
    const handleStatus = async (_id) => {
        console.log(_id)
        const cityRef = db.collection('internees').doc(_id);
        await cityRef.update({
            status: true
        });
    }
    const handleStatus2 = async (_id) => {
        console.log(_id)
        const cityRef = db.collection('internees').doc(_id);
        await cityRef.update({
            status: false
        });
    }
    useEffect(() => {
        getData()
        getDataDept()
    }, []);
    console.log(name);
    console.log(number);
    const handleUpdate = async (_id) => {
        console.log(_id);
        const cityRef = db.collection('internees').doc(_id);
        await cityRef.update({
            name: name,
            father_name: father_name,
            email: email,
            number: number,
            gender: gender,
            address: address,
            cnic: cnic,
            qualification: qualification,
            department: dept,
        });
        getData()
        getDataDept()
    }
    //    console.log(status)
    console.log(amount)
    const handleUpdateStatus = async (_id) => {
        console.log(_id);
        const cityRef = db.collection('internees').doc(_id);
        await cityRef.update({
            amount: amount,
            status: status,
            month:new Date().getMonth()
        });
        const citiesRef = db.collection('wallets');
        const queryRef = citiesRef.where('Id', '==', _id).get();
        let Document=(await queryRef).docs[0].id
        let fee=(await queryRef).docs[0].data().Fee;
        let Total=(await queryRef).docs[0].data().total;
        console.log(Total)
        let d=new Date();
        let date = d.getDate();
         let month = d.getMonth() + 1; 
          let year = d.getFullYear();
           let dateStr = date + "/" + month + "/" + year; 
        

        console.log(Document)
        const walletsRef = db.collection('wallets').doc(Document);
        await walletsRef.update({
            Fee: fee+amount,
            total:Total-amount
        });
        walletsRef.update({
            record: firebase.firestore.FieldValue.arrayUnion(...[{'type':'Internee Fee',amu:amount,'date':dateStr}]) });
        getData()
        getDataDept() 
    }
    //update project price
    const handleUpdateProject = async (_id) => {
        console.log(_id);
        const citiesRef = db.collection('wallets');
        const queryRef = citiesRef.where('Id', '==', _id).get();
        let Document=(await queryRef).docs[0].id
        let project=(await queryRef).docs[0].data().Pamount;
        let Total=(await queryRef).docs[0].data().total;
        console.log(Total)
        console.log(Document)
        let d=new Date();
        let date = d.getDate();
         let month = d.getMonth() + 1; 
          let year = d.getFullYear();
           let dateStr = date + "/" + month + "/" + year;  
        const walletsRef = db.collection('wallets').doc(Document);
        if(value==true){
        await walletsRef.update({
            Pamount: project+pamount,
            total:Total+pamount
        });
        walletsRef.update({
            record: firebase.firestore.FieldValue.arrayUnion(...[{'type':title,amu:pamount,'date':dateStr}]) });
        }
        else{
            await walletsRef.update({
                Pamount: project-pamount,
                total:Total-pamount
            });
            let amuDetail= -pamount
            walletsRef.update({
                record: firebase.firestore.FieldValue.arrayUnion(...[{'type':title,amu:amuDetail,'date':dateStr}]) });
            }
        getData()
        getDataDept()
    }
    // delete
    const handleDelete = async (_id) => {
        console.log(_id)
        await db.collection('internees').doc(_id).delete();
        getData()
        getDataDept()
    }
    return (
        <div className='Adddepart'>
            <div className='Adddepart2'>
                <Table striped bordered hover responsive variant="dark">
                    <thead className="thead">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Father_Name</th>
                            <th>Email</th>
                            <th>Phone.no</th>
                            <th>Gender</th>
                            <th >Enternee_Address</th>
                            <th>CNIC</th>
                            <th>Qualification</th>
                            <th>Department</th>
                            <th>Fee_Status</th>
                            <th>Project</th>
                            <th>Wallets</th>
                        </tr>
                    </thead>
                    <tbody>
                        {view && view.map((el, a) => {
                          if(el.status==true){
                                const CurrentMonth = new Date().getMonth();
                                const OldMonth = el.month
                                console.log(CurrentMonth)
                                console.log(OldMonth)
                                if (OldMonth==CurrentMonth) {
                                    console.log(el.status);
                                    handleStatus(el.id_2);
                                }
                                else{
                                    handleStatus2(el.id_2);
                                }                          
                            }
                            return (
                                <tr>
                                    <td>{a + 1}</td>
                                    <td>{el.name}</td>
                                    <td>{el.f_name}</td>
                                    <td>{el.email}</td>
                                    <td>{el.number}</td>
                                    <td>{el.gender}</td>
                                    <td >{el.address}</td>
                                    <td >{el.cnic}</td>
                                    <td>{el.qualification}</td>
                                    <td>{el.department}</td>
                                    
                                    <td>{el.status ? (<div><h10>Paid</h10></div>) : (<Popup trigger={<Link ><input className='button' type="button" value="Submit Fee" onClick={e => setAmount(parseInt(el.amount))} /></Link>} position="left top">
                                        <Card style={{ width: '14rem' },{borderWidth:3},{borderColor:'rgb(238, 91, 46)'}} >
                                            <Card.Body>
                                                <Form onSubmit={(e) => {
                                                    e.preventDefault();
                                                    console.log(el.id_2);
                                                    handleUpdateStatus(el.id_2);
                                                }}>
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="formGridCity">
                                                            <Form.Label>Amount</Form.Label>
                                                            <Form.Control type="number" placeholder="Enter Fee Amount" required onChange={e => setAmount(parseInt(e.target.value))} />
                                                        </Form.Group>

                                                    </Form.Row>
                                                    <Button variant="primary" type="submit" onClick={e => setStatus(prev => !prev)}>
                                                        Submit
                                                   </Button>
                                                   
                                                </Form>
                                            </Card.Body>
                                        </Card>
                                    </Popup>)}</td>          
                                    <td><Popup trigger={<Link ><input className='button' type="button" value="Project price" /></Link>} position="left top">
                                        <Card style={{ width: '14rem' },{borderWidth:3},{borderColor:'rgb(238, 91, 46)'}} >
                                            <Card.Body>
                                                <Form onSubmit={(e) => {
                                                    e.preventDefault();
                                                    console.log(el.id_2);
                                                    handleUpdateProject(el.id_2);
                                                }}> <Form.Row>
                                                <Form.Group as={Col} controlId="formGridCity">
                                                    <Form.Label>Project Title</Form.Label>
                                                    <Form.Control type="text" placeholder="Enter Title" required onChange={e => setTitle(e.target.value)} />
                                                </Form.Group>
                                                 </Form.Row>
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="formGridCity">
                                                            <Form.Label>Amount</Form.Label>
                                                            <Form.Control type="number" placeholder="Enter Amount" required onChange={e => setPamount(parseInt(e.target.value))} />
                                                        </Form.Group>
                                                    </Form.Row>
                                                    <Button variant="primary" className="AddIcon" type="submit" onClick={e => setValue(true)}>
                                                    <AddBoxIcon/>
                                                   </Button>
                                                   <Button variant="primary"   type="submit" onClick={e => setValue(false)}>
                                                    <IndeterminateCheckBoxIcon/>
                                                   </Button>
                                                </Form>
                                            </Card.Body>
                                        </Card>
                                    </Popup></td>
                                    <td><Link to={`/wallet/${el.id_2}/${el.name}`} className="decoration"><input type="button" className="openwallet" value="Open Wallet" onClick={e => setPamount(parseInt(el.amount))} /></Link></td>
                                    <td>
                                        <div className="editIcon">
                                            <Popup trigger={<Link><BorderColorSharpIcon className="icon1" onClick={e => (setName(el.name), setFname(el.f_name), setEmail(el.email), setNumber(parseInt(el.number)), setGender(el.gender), setAddress(el.address), setCnic(el.cnic), setQualification(el.qualification), setDept(el.department))} /></Link>} position="left top">
                                                <div>
                                                    <Card style={{ width: '18rem' },{borderWidth:3},{borderColor:'rgb(238, 91, 46)'}} >
                                                        <Card.Body>
                                                            <Form onSubmit={(e) => {
                                                                e.preventDefault();
                                                                console.log(el.id_2);
                                                                handleUpdate(el.id_2);
                                                            }}>

                                                                <Form.Row>
                                                                    <Form.Group as={Col} controlId="formGridEmail">
                                                                        <Form.Label>Name</Form.Label>
                                                                        <Form.Control type="text" placeholder="Name" defaultValue={el.name} required onChange={e => setName(e.target.value)} />                                                                    </Form.Group>

                                                                    <Form.Group as={Col} controlId="formGridPassword">
                                                                        <Form.Label>Father Name</Form.Label>
                                                                        <Form.Control type="text" placeholder="Enter Father Name" required defaultValue={el.f_name} onChange={e => setFname(e.target.value)} />
                                                                    </Form.Group>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Form.Group as={Col} controlId="formGridCity">
                                                                        <Form.Label>Email</Form.Label>
                                                                        <Form.Control type="email" placeholder="Enter Email" required defaultValue={el.email} onChange={e => setEmail(e.target.value)} />
                                                                    </Form.Group>
                                                                    <Form.Group as={Col} controlId="formGridState">
                                                                        <Form.Label>Phone.no</Form.Label>
                                                                        <Form.Control type="number" placeholder="Enter Number" required defaultValue={el.number} onChange={e => setNumber(parseInt(e.target.value))} />
                                                                    </Form.Group>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Form.Group as={Col} controlId="formGridCity">
                                                                        <Form.Label>Gender:</Form.Label>

                                                                        <input value="Male" className="gender" name="gender" type="radio" onChange={e => setGender(e.target.value)} />
                                                                        <label>Male</label>
                                                                        <input value="FMale" name="gender" type="radio" className="gender1" onChange={e => setGender(e.target.value)} />
                                                                        <label>F.Male</label>

                                                                    </Form.Group>
                                                                </Form.Row>

                                                                <Form.Group controlId="formGridAddress1">
                                                                    <Form.Label>Address</Form.Label>
                                                                    <Form.Control placeholder="1234 Main St" required defaultValue={el.address} onChange={e => setAddress(e.target.value)} />
                                                                </Form.Group>
                                                                <Form.Row>
                                                                    <Form.Group as={Col} controlId="formGridCity">
                                                                        <Form.Label>CNIC</Form.Label>
                                                                        <Form.Control type="text" placeholder="Enter CNIC" required defaultValue={el.cnic} onChange={e => setCnic(e.target.value)} />
                                                                    </Form.Group>
                                                                    <Form.Group as={Col} controlId="formGridState">
                                                                        <Form.Label>Qualification</Form.Label>
                                                                        <Form.Control type="text" placeholder="Enter Qualification" required defaultValue={el.qualification} onChange={e => setQualification(e.target.value)} />
                                                                    </Form.Group>

                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Form.Group as={Col} controlId="formGridState">
                                                                        <Form.Label>Department</Form.Label>
                                                                        <Form.Control as="select" defaultValue="Choose..." required defaultValue={el.department} onChange={e => setDept(e.target.value)}>
                                                                            <option className="opt" selected='true' disabled='disabled' >Select Department</option>
                                                                            {view1.map((dl) => {
                                                                                return (
                                                                                    <option className="opt" value={dl.name} >{dl.name}</option>
                                                                                )
                                                                            })}
                                                                        </Form.Control>
                                                                    </Form.Group>

                                                                </Form.Row>
                                                                <Button variant="primary" type="submit">
                                                                    Update
                                                                 </Button>
                                                            </Form>
                                                        </Card.Body>
                                                    </Card>


                                                </div>
                                            </Popup>
                                        </div>
                                        <div className="deleteIcon" >
                                            <form onClick={(e) => {
                                                e.preventDefault();
                                                console.log(el.id_2)
                                                handleDelete(el.id_2);
                                            }}>
                                                <Link ><DeleteIcon className="icon" /></Link>
                                            </form>
                                        </div>
                                    </td>

                                </tr>
                            )
                        })}

                    </tbody>
                </Table>
            </div>
        </div>
    );
}
export default ShowInternee;