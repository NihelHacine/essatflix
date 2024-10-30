import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { editfilmdirect } from '../redux/filmdirectSlice';


function EditFilmDirect({film_direct}) {
    const dispatch=useDispatch();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [editedfilmdirect, seteditedfilmdirect] = useState({
      'film' : film_direct?.film,
      'video_id' : film_direct?.video_id,
      'description' : film_direct?.description,
      'start_hour' : film_direct?.start_hour,
      'start_minute' : film_direct?.start_minute,
      'year':film_direct?.year,
      'month' : film_direct?.month,
      'day': film_direct?.day
  
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
      <Form.Label htmlFor="inputPassword5">Film </Form.Label>
    <Form.Control
      type="text"
      aria-describedby="passwordHelpBlock"
      placeholder={film_direct?.film}
      onChange={(e)=>seteditedfilmdirect({...editedfilmdirect, film:e.target.value})}
    />
    <Form.Label htmlFor="inputPassword5">Video </Form.Label>
    <Form.Control
      type="text"
      id="inputPassword5"
      aria-describedby="passwordHelpBlock"
      placeholder={film_direct?.video_id}
      onChange={(e)=>seteditedfilmdirect({...editedfilmdirect, vidoeo_id:e.target.value})}
    />
    <Form.Label htmlFor="inputPassword5">Description </Form.Label>
    <Form.Control
      type="text"
      id="inputPassword5"
      aria-describedby="passwordHelpBlock"
      placeholder={film_direct?.description}
      onChange={(e)=>seteditedfilmdirect({...editedfilmdirect, description:e.target.value})}
    />
       <Form.Label htmlFor="inputPassword5">Debut_heure </Form.Label>
    <Form.Control
      type="text"
      id="inputPassword5"
      aria-describedby="passwordHelpBlock"
      placeholder={film_direct?.start_hour}
      onChange={(e)=>seteditedfilmdirect({...editedfilmdirect, start_hour:e.target.value})}
    />
       <Form.Label htmlFor="inputPassword5">Debut_minute </Form.Label>
    <Form.Control
      type="text"
      id="inputPassword5"
      aria-describedby="passwordHelpBlock"
      placeholder={film_direct?.start_minute}
      onChange={(e)=>seteditedfilmdirect({...editedfilmdirect, start_minute:e.target.value})}
    />
       <Form.Label htmlFor="inputPassword5">année </Form.Label>
    <Form.Control
      type="text"
      id="inputPassword5"
      aria-describedby="passwordHelpBlock"
      placeholder={film_direct?.year}
      onChange={(e)=>seteditedfilmdirect({...editedfilmdirect, year:e.target.value})}
    />
     <Form.Label htmlFor="inputPassword5">mois </Form.Label>
    <Form.Control
      type="text"
      id="inputPassword5"
      aria-describedby="passwordHelpBlock"
      placeholder={film_direct?.month}
      onChange={(e)=>seteditedfilmdirect({...editedfilmdirect, month:e.target.value})}
    />
     <Form.Label htmlFor="inputPassword5">Jour </Form.Label>
    <Form.Control
      type="text"
      id="inputPassword5"
      aria-describedby="passwordHelpBlock"
      placeholder={film_direct?.day}
      onChange={(e)=>seteditedfilmdirect({...editedfilmdirect, day:e.target.value})}
    />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" 
        onClick={() => {dispatch(editfilmdirect({id:film_direct?._id,editedfilmdirect})); 
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

export default EditFilmDirect