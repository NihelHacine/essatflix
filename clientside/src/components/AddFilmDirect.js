import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { addfilmdirect } from '../redux/filmdirectSlice';

function AddFilmDirect() {
    const dispatch=useDispatch();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [filmdirect, setfilmdirect] = useState({
      'film' : "",
      'video_id' : "",
      'description' : "",
      'start_hour' :'',
      'start_minute' : '',
      'year': '',
      'day': '',
      'month':'',
    })
  return (
    <>
    <Button variant="primary" onClick={handleShow}>
        Ajouter un nouveau film direct
    </Button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ajouter un film direct </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form.Label htmlFor="inputPassword5">Film </Form.Label>
    <Form.Control
      type="text"
      aria-describedby="passwordHelpBlock"
      onChange={(e)=>setfilmdirect({...filmdirect, film:e.target.value})}
    />
    <Form.Label htmlFor="inputPassword5">Description </Form.Label>
    <Form.Control
      type="text"
      id="inputPassword5"
      aria-describedby="passwordHelpBlock"
      onChange={(e)=>setfilmdirect({...filmdirect, description:e.target.value})}
    />
    <Form.Label htmlFor="inputPassword5">Video ID </Form.Label>
    <Form.Control
      type="text"
      id="inputPassword5"
      aria-describedby="passwordHelpBlock"
      onChange={(e)=>setfilmdirect({...filmdirect, video_id:e.target.value})}
    />
     <Form.Label htmlFor="inputPassword5">Heure de lancement </Form.Label>
    <Form.Control
      type="number"
      id="inputPassword5"
      aria-describedby="passwordHelpBlock"
      onChange={(e)=>setfilmdirect({...filmdirect, start_hour:e.target.value})}
    /> 
      <Form.Label htmlFor="inputPassword5">Minutes </Form.Label>
    <Form.Control
      type="number"
      id="inputPassword5"
      aria-describedby="passwordHelpBlock"
      onChange={(e)=>setfilmdirect({...filmdirect, start_minute:e.target.value})}
    />
      <Form.Label htmlFor="inputPassword5">Date_année </Form.Label>
    <Form.Control
      type="number"
      id="inputPassword5"
      aria-describedby="passwordHelpBlock"
      onChange={(e)=>setfilmdirect({...filmdirect, year:e.target.value})}
    />
    <Form.Label htmlFor="inputPassword5">Date_mois </Form.Label>
    <Form.Control
      type="number"
      id="inputPassword5"
      aria-describedby="passwordHelpBlock"
      onChange={(e)=>setfilmdirect({...filmdirect, month:e.target.value})}
    />
    <Form.Label htmlFor="inputPassword5">Date_jour </Form.Label>
    <Form.Control
      type="text"
      id="inputPassword5"
      aria-describedby="passwordHelpBlock"
      onChange={(e)=>setfilmdirect({...filmdirect, day:e.target.value})}
    />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" 
        onClick={() => {dispatch(addfilmdirect(filmdirect)); 
        handleClose();
        window.location.reload();
        }}>
          Valider
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  )
}

export default AddFilmDirect