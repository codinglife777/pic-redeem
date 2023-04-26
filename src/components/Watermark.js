import React from 'react';
import { Card } from 'react-bootstrap';
import LazyImage from './LazyImage';

function Watermark(props) {
    return (
        <div style={{height:props.imgHeight}}>
            <LazyImage imgSrc={props.imgUrl}>
                <Card.Img variant="top" className="p-2 position-absolute" style={{left:"0"}} src={props.imgWatermark} />
            </LazyImage>
        </div>
    )
}

export default Watermark;