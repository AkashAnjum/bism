import React,{ useState } from 'react';
import {Card, ListGroupItem,ListGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import PIC from './images/HomePic.jpg'
import './App.css';
export default function Home() {
    return (
        <div className="Adddepart" >
        <Card style={{ width: '50rem' }}>
  <Card.Img variant="top" src={PIC}  />
  <Card.Body>
    <Card.Title>BISM INCUBATORS</Card.Title>
    <Card.Text>
    We build powerful digital solutions and experiences.
    </Card.Text>
  </Card.Body>
</Card>
        </div>
    );
}