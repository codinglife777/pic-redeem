import React, { useContext, useEffect, useState } from "react";

import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { ImageContext } from '../ImageProvider';
import { retrieveSignedUrl } from "../utils/http_helpers";
import { testParks, testRetrieveUrl } from "../utils/test_data";
import WATERMAK_IMAGES from "../images";
import '../css/Watermark.css';

function ConfirmImage (props) {

    const [searchParams] = useSearchParams();
    const { updateImgInfo } = useContext(ImageContext);
    const navigator = useNavigate();
    const [imgUrl, setImgUrl] = useState('');
    const [watermark, setWatermark] = useState(false);

    useEffect(() => {
        retrieveSignedUrl(testRetrieveUrl).then((retrieveUrl)=>{
            setImgUrl(retrieveUrl);
            updateImgInfo({
                rideId: searchParams.get('ride_id'),
                watermark: searchParams.get('watermark') === 'true' ? true : false,
                passId: searchParams.get('pass_id'),
                imgUrl: retrieveUrl
            });
            setWatermark(searchParams.get('watermark') === 'true' ? true : false);
        });
    }, []);

    return (
        <Card className="image-card">
            <Card.Title className="text-center p-3">Please Confirm This Is Your Image</Card.Title>
            {watermark ?
                <div style={{height:"90vw"}}>
                    <Card.Img variant="top" className="p-2 position-fixed" src={imgUrl} alt={props.imageAlt} />
                    <Card.Img variant="top" className="p-2 position-fixed" src={WATERMAK_IMAGES[testParks[0]['rides'][0]['watermark']]} alt={props.imageAlt} />
                </div>
            : 
            <Card.Img variant="top" className="p-2" src={imgUrl} alt={props.imageAlt} />
            }
            <Card.Body>
                <div className="button-container d-flex justify-content-between mt-2 p-3">
                    <Button variant="primary" className="mr-2 btn-lg" onClick={()=>{
                        navigator('/redeem-confirm');
                    }}>Yes</Button>
                    <Button variant="danger" className="btn-lg" onClick={()=>{
                        navigator('/enter-code');
                    }}>No</Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default ConfirmImage;