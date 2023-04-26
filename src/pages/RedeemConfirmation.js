import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { ImageContext } from "../ImageProvider";
import { GiCheckMark } from "react-icons/gi";
import { GrFormClose } from "react-icons/gr";
import { Container, Row, Button, Card } from "react-bootstrap";
import { CSSTransition } from 'react-transition-group';
import WATERMAK_IMAGES from "../images";
import { testParks } from "../utils/test_data";

import '../css/Modal.css';
import Watermark from "../components/Watermark";
import LazyImage from "../components/LazyImage";

function RedeemConfirmation (props) {

    const [ showModal, setShowModal ] = useState(false);
    const { imgInfo } = useContext(ImageContext);
    const downloadRef = useRef(null);

    console.log(imgInfo);
    const navigator = useNavigate();
    
    useEffect(()=>{
        setTimeout(()=>{
            setShowModal(true);
        }, 1000)
    }, []);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    function handleDownloadClick(imageUrl, downloadRef) {
        downloadRef.current.href = imageUrl;
        downloadRef.current.click();
    }

    const handleDownload = () => {
        handleDownloadClick(imgInfo?.imgUrl, downloadRef);
      };

    return (
        <Container className="p-5">    
            <Row className="justify-content-md-center">
                <div className="text-center">
                    <h2>IMAGE SAVED</h2>
                    <GiCheckMark size="60" color="green" />
                </div>
                <CSSTransition
                    in={showModal}
                    timeout={500}
                    classNames="modal"
                    unmountOnExit
                >
                    <div className="modal">
                        <div className="modal-cover" onClick={handleCloseModal} />
                        <div className="modal-content">
                            <label onClick={handleCloseModal} className="text-red"><GrFormClose size={30} color="red" style={{position:"fixed", right:"30px"}} /></label>
                            <Card className="image-card mt-4">
                                <Card.Title className="text-center p-3">Would you like to view special print offerings available only today?</Card.Title>
                                {imgInfo?.watermark ?
                                    <Watermark imgHeight="65vw" imgUrl={imgInfo?.imgUrl} imgWatermark={WATERMAK_IMAGES[testParks[0]['rides'][0]['watermark']]} />
                                    : 
                                    <LazyImage imgSrc={imgInfo?.imgUrl} />
                                }
                                
                                <Card.Body>
                                    <div className="button-container d-flex justify-content-between mt-2 p-3">
                                        <Button variant="primary" className="mr-2 btn-lg" onClick={()=>{
                                            navigator('/package-list');
                                        }}>Yes</Button>
                                        <Button variant="danger" className="btn-lg" onClick={()=>{
                                          setShowModal(false);  
                                        }}>No</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </CSSTransition>
                <div className="text-center mt-5">
                    <Button variant="warning" className="col-12 fs-1 mt-5 mb-3 text-white">Discounted Prints</Button>
                    <Button variant="primary" className="col-12 fs-1 mt-4" onClick={handleDownload}>Download Image</Button>
                    <Button variant="primary" className="col-12 fs-1 mt-4" onClick={()=>{
                        //To-do redirect
                    }}>View Album</Button>
                    <Button variant="primary" className="col-12 fs-1 mt-4" onClick={()=>{
                        navigator('/enter-code');
                    }} >Add New Image</Button>
                </div>
                <a href="#" ref={downloadRef} style={{ display: 'none' }} download="image.jpg">Download</a>
            </Row>
        </Container>
    )
}

export default RedeemConfirmation;
