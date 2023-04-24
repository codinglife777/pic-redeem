import React from 'react';
import { Card } from 'react-bootstrap';

function Watermark(props) {
    return (
        <div>
            <Card.Img variant="top" className="p-2 position-fixed" src={props.originalImg} alt={props.imageAlt} />
            <Card.Img variant="top" className="p-2 position-fixed" src={props.wartermakImage} alt={props.imageAlt} />
        </div>
    )
}

export default Watermark;