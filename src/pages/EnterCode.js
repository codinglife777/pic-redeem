import React, { useState } from "react";
import { Container, Form, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import { getNewImage } from "../utils/http_helpers";

function EnterCode() {
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const navigator = useNavigate();

    function checkCode() {
        setLoading(true);
        getNewImage(code).then((url) => {
            //To-do with real url
            setLoading(false);
            navigator('/confirm-image?ride_id= 3d982072-2e5f-4a09-8219-7888baf6ca61&watermark=true&pass_id=NX5180325366');
        })
    }

    return (
        <Container className="vh-100">
            <div className="d-flex flex-column align-content-center align-items-center justify-content-center vh-100">
                <p className="fs-2"><strong>Enter Your Image Code</strong></p>
                <Form.Control type="text" value={code} className="fs-3" onChange={(e)=>setCode(e.target.value)} />
                <Button variant="primary" size="lg" xs="12" className="mt-5 xs-12" onClick={checkCode} disabled={!code}>
                    {loading && <Spinner animation="border" variant="info" />}
                    Submit
                </Button>
            </div>
        </Container>
    )
}

export default EnterCode;