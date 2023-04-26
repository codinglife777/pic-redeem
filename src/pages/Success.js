import React, { useContext, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { ImageContext } from "../ImageProvider";
import { GiCheckMark } from "react-icons/gi";
import { Container, Row, Button } from "react-bootstrap";


function Success (props) {

    const { imgInfo } = useContext(ImageContext);
    const downloadRef = useRef(null);
    const navigator = useNavigate();

    function handleDownloadClick(imageUrl, downloadRef) {
        downloadRef.current.href = imageUrl;
        downloadRef.current.click();
    }

    const handleDownload = () => {
        handleDownloadClick(imgInfo?.imgUrl, downloadRef);
    };

    const packageObj = JSON.parse(sessionStorage.getItem('package'));
    console.log(packageObj);
    return (
        <Container className="p-5">    
            <Row className="justify-content-md-center">
                <div className="text-center">
                    <h2>Payment Successful</h2>
                    <GiCheckMark size="60" color="green" />
                </div>
                <p className="fs-4 text-warning mt-4 text-center">{packageObj?.delivery_method === "pickup" ? packageObj?.pickup_detail : packageObj?.ship_detail}</p>
                <div className="text-center mt-5">
                    {!imgInfo?.watermark && <Button variant="primary" className="col-12 fs-1 mt-4" onClick={handleDownload}>Download Image</Button>}
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

export default Success;
