import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { db } from './Firebase'
import { Form, Button, Card, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { auth } from './Firebase'
function Wallet(props) {
    auth.onAuthStateChanged((user)=>{
        if(!user){
            props.history.push("/login");
        }
    })
    let [view1, setView1] = useState([]);
   
    const ID = props.match.params.id;
    console.log(ID);
    const name = props.match.params.name;
    console.log(name);

    const getData = async () => {
        setView1([]);
        const snapshot = await db.collection('wallets').get();
        snapshot.forEach((doc) => {
            let data = {
                id:doc.id,
                Id: doc.data().Id,
                Pamount: doc.data().Pamount,
                Fee: doc.data().Fee,
                total: doc.data().total,
                record:doc.data().record
            }

            setView1(pre => [...pre, data]);

        });
    }
    
    useEffect(() => {
        getData()
    }, []);
    console.log(view1.record)
    return (
        <div className="Adddepart">
            {view1 && view1.map((el) => { 
                if (el.Id == ID) {
                 let history=el.record
                 console.log(history)   
                    return (
                        <Card border="info" style={{ width: '20rem' }} className="maincard" >
                            <Card.Header><h6 className="cardHead">{name}</h6></Card.Header>
                            <Card.Body>
                            <Card.Header ><div className="His">History</div></Card.Header>
                            {history.map((dl) => {
                                  console.log("dl.amu")
                               return( 
                                <Card.Header><div className="his" ><div className="his0">{dl.date}</div><div className="his1">{dl.type}</div><div className="his2">{dl.amu}</div></div></Card.Header>
                                    )})}
                            </Card.Body>
                            <Card.Header><div className="fee"><div className="fee1">Total Fee</div><div>{el.Fee}</div>.RS</div></Card.Header>
                            <Card.Header><div className="fee"><div className="fee1">Total Income</div><div>{el.Pamount}.Rs</div></div></Card.Header>
                            <Card.Header><div className="fee"><div className="fee1">Total Balance</div><div>{el.total}.Rs</div></div></Card.Header>
                        </Card>);
                }
            })}
        </div>
    );
}

export default Wallet;
