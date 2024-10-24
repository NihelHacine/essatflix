import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { editfilm } from '../redux/filmSlice';


function FilmEditModal({film}) {
    const dispatch=useDispatch();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [editedfilm, seteditedfilm] = useState({
      'film' : film?.pseudo,
      'gender' : film?.cin,
      'year' : film?.email,
      'description' : film?.password,
      'photo' : film?.photo,
      'video':film?.video,
      'add_date' : film?.add_date,
  
    })

  return (
    <>
    <Button variant="primary" onClick={handleShow}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={'15px'} height={'15px'}><path fill="#ffffff" d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
    </Button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modifier ce film</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form.Label htmlFor="inputPassword5">Désignation </Form.Label>
    <Form.Control
      type="text"
      aria-describedby="passwordHelpBlock"
      placeholder={film?.film}
      onChange={(e)=>seteditedfilm({...editedfilm, film:e.target.value})}
    />
    <Form.Label htmlFor="inputPassword5">Gender </Form.Label>
    <Form.Control
      type="text"
      id="inputPassword5"
      aria-describedby="passwordHelpBlock"
      placeholder={film?.gender}
      onChange={(e)=>seteditedfilm({...editedfilm, gender:e.target.value})}
    />
    <Form.Label htmlFor="inputPassword5">Année </Form.Label>
    <Form.Control
      type="text"
      id="inputPassword5"
      aria-describedby="passwordHelpBlock"
      placeholder={film?.year}
      onChange={(e)=>seteditedfilm({...editedfilm, year:e.target.value})}
    />
       <Form.Label htmlFor="inputPassword5">Description </Form.Label>
    <Form.Control
      type="text"
      id="inputPassword5"
      aria-describedby="passwordHelpBlock"
      placeholder={film?.description}
      onChange={(e)=>seteditedfilm({...editedfilm, description:e.target.value})}
    />
       <Form.Label htmlFor="inputPassword5">Photo </Form.Label>
    <Form.Control
      type="text"
      id="inputPassword5"
      aria-describedby="passwordHelpBlock"
      placeholder={film?.photo}
      onChange={(e)=>seteditedfilm({...editedfilm, photo:e.target.value})}
    />
       <Form.Label htmlFor="inputPassword5">Video </Form.Label>
    <Form.Control
      type="text"
      id="inputPassword5"
      aria-describedby="passwordHelpBlock"
      placeholder={film?.video}
      onChange={(e)=>seteditedfilm({...editedfilm, video:e.target.value})}
    />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" 
        onClick={() => {dispatch(editfilm({id:film?._id,editedfilm})); 
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

export default FilmEditModal