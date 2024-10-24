import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { userEdit, userRegister } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

function generateRandomPassword(length = 12) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
    let password = '';
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    
    return password;
}

const newPassword = generateRandomPassword();  // Par défaut, 12 caractères

function AddStudent() {
    const dispatch=useDispatch();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [user, setuser] = useState({
      'pseudo' : "",
      'cin' : "",
      'email' : "",
      'password' :newPassword,
    })
  return (
    <>
    <Button variant="primary" onClick={handleShow}>
        Ajouter un nouveau compte étudiant
    </Button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ajouter un étudiant </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form.Label htmlFor="inputPassword5">Pseudo </Form.Label>
    <Form.Control
      type="text"
      aria-describedby="passwordHelpBlock"
      onChange={(e)=>setuser({...user, pseudo:e.target.value})}
    />
    <Form.Label htmlFor="inputPassword5">Cin </Form.Label>
    <Form.Control
      type="text"
      id="inputPassword5"
      aria-describedby="passwordHelpBlock"
      onChange={(e)=>setuser({...user, cin:e.target.value})}
    />
    <Form.Label htmlFor="inputPassword5">Email </Form.Label>
    <Form.Control
      type="text"
      id="inputPassword5"
      aria-describedby="passwordHelpBlock"
      onChange={(e)=>setuser({...user, email:e.target.value})}
    />
    <Form.Label htmlFor="inputPassword5">Password : {newPassword} </Form.Label>
    
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" 
        onClick={() => {dispatch(userRegister(user)); 
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

export default AddStudent