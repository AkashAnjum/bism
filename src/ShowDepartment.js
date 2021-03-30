import React, { useEffect, useState } from 'react';
import './App.css';
import Popup from 'reactjs-popup';
import { Form, Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { db } from './Firebase'
import { Table } from "react-bootstrap";
import { auth } from './Firebase'
import DeleteIcon from '@material-ui/icons/Delete';
import BorderColorSharpIcon from '@material-ui/icons/BorderColorSharp';
 function ShowDepartment(props) {
    let [view, setView] = useState([]);
    let [name, setName] = useState();
    auth.onAuthStateChanged((user)=>{
        if(!user){
            props.history.push("/login");
        }
    })
    
    
    const getData = async () => {
        setView([]);
        const snapshot = await db.collection('departments').get();
        snapshot.forEach((doc) => {
            let data = {
                id: doc.id,
                name: doc.data().name,
            }
            console.log(data);
            setView(pre => [...pre, data]);

        });
    }

    const handleUpdate = async (_id) => {
        console.log(_id);
        const cityRef = db.collection('departments').doc(_id);
        await cityRef.update({
            name: name

        });
        getData()

    }
    // delete
    const handleDelete = async (_id) => {
        console.log(_id)
        await db.collection('departments').doc(_id).delete();
        getData()
    }
   


    console.log(view);
    useEffect(() => {
        // CheckUser()
      
        getData()
    }, []);
    return (
        <div className='Adddepart'>
            <div className='Adddepart2'>
                <Table striped bordered hover responsive variant="dark">
                    <thead className="thead">
                        <tr>
                            <th>#</th>
                            <th>Department_Name</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {view.map((el, a) => {

                            console.log(el.name)

                            return (
                                <tr>
                                    <td>{a + 1}</td>
                                    <td>{el.name}</td>
                                    
                                    <td className="TDwidth"><div className="editIcon"><Popup trigger={<Link ><BorderColorSharpIcon className="icon1" onClick={e => setName(el.name)} /></Link>} position="left center">
                                        <div><Card style={{ width: '14rem' },{borderWidth:3},{borderColor:'rgb(238, 91, 46)'}} >
                                            <Card.Body>
                                                <Form onSubmit={(e) => {
                                                    e.preventDefault();
                                                    console.log(el.id);
                                                    handleUpdate(el.id);
                                                }}>
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="formGridCity">
                                                            <Form.Label>Department</Form.Label>
                                                            <Form.Control type="text" placeholder="Enter Department Name" defaultValue={el.name} required onChange={e => setName(e.target.value)} />
                                                        </Form.Group>
                                                    </Form.Row>
                                                    <Button variant="primary" type="submit">
                                                        Update
                                                   </Button>
                                                </Form>
                                            </Card.Body>
                                        </Card></div>
                                    </Popup></div>
                                    <div className="deleteIcon" >
                                            <form onClick={(e) => {
                                                e.preventDefault();
                                                console.log(el.id)
                                                handleDelete(el.id);
                                            }}>
                                                <Link ><DeleteIcon className="icon"/></Link>
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
export default ShowDepartment;