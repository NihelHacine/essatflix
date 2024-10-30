import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { userEdit, userRegister } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
import { addfilm } from '../redux/filmSlice';

function AddFilm() {
    const dispatch=useDispatch();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [film, setfilm] = useState({
      'film' : "",
      'gender' : "",
      'year' : "",
      'description' :'',
      'photo' : '',
      'video': '',
      'add_date': new Date (),
      'rating':''
    })
    
  return (
    <>
    <Button variant="primary" onClick={handleShow}>
        Ajouter un nouveau film
    </Button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ajouter un film </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form.Label htmlFor="inputPassword5">Film </Form.Label>
    <Form.Control
      type="text"
      aria-describedby="passwordHelpBlock"
      onChange={(e)=>setfilm({...film, film:e.target.value})}
    />
    <Form.Label htmlFor="inputPassword5">Genre </Form.Label>
    <Form.Control
      type="text"
      id="inputPassword5"
      aria-describedby="passwordHelpBlock"
      onChange={(e)=>setfilm({...film, gender:e.target.value})}
    />
    <Form.Label htmlFor="inputPassword5">Année </Form.Label>
    <Form.Control
      type="text"
      id="inputPassword5"
      aria-describedby="passwordHelpBlock"
      onChange={(e)=>setfilm({...film, year:e.target.value})}
    />
     <Form.Label htmlFor="inputPassword5">Description </Form.Label>
    <Form.Control
      type="text"
      id="inputPassword5"
      aria-describedby="passwordHelpBlock"
      onChange={(e)=>setfilm({...film, description:e.target.value})}
    /> 
      <Form.Label htmlFor="inputPassword5">Photo </Form.Label>
    <Form.Control
      type="text"
      id="inputPassword5"
      aria-describedby="passwordHelpBlock"
      onChange={(e)=>setfilm({...film, photo:e.target.value})}
    />
      <Form.Label htmlFor="inputPassword5">Video </Form.Label>
    <Form.Control
      type="text"
      id="inputPassword5"
      aria-describedby="passwordHelpBlock"
      onChange={(e)=>setfilm({...film, video:e.target.value})}
    />
    <Form.Label htmlFor="inputPassword5">Nombre d'étoiles de 1 a 5 </Form.Label>
    <Form.Control
      type="number"
      id="inputPassword5"
      aria-describedby="passwordHelpBlock"
      onChange={(e)=>setfilm({...film, rating:e.target.value})}
    />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" 
        onClick={() => {dispatch(addfilm(film)); 
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

export default AddFilm