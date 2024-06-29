import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Card1.css';

function Card1({ event, image, topic, description, buttonText, sendResponse }) {
  
  const registerHandle = () => {
    sendResponse(event);
  };

  return (
    <Card className='customCard'>
      <Card.Img variant="top" src={image} className='cardImage' />
      <Card.Body className='cardbody'>
        <Card.Title className='cardtopic'>{topic}</Card.Title>
        <Card.Text className='description'>{description}</Card.Text>
        <Button variant="light" onClick={registerHandle}>
          {buttonText}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Card1;
