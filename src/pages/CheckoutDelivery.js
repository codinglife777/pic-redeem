import React, { useContext, useEffect, useState } from "react";
import { Container, Form, Button, Row, Col, Card} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { GrFormClose } from "react-icons/gr";

import { ImageContext } from "../ImageProvider";
import { testParks } from "../utils/test_data";
import '../css/Modal.css';
import Payment from "./Payment";
import WATERMAK_IMAGES from "../images";

function CheckoutDelivery (props) {
    const {imgInfo} = useContext(ImageContext);
    const [pickUp, setPickUp] = useState(true);
    const [shipTo, setShipTo] = useState(false);
    const [shipInfo, setShipInfo] = useState({
        name: "",
        street1: "",
        street2: "",
        city: "",
        zipCode: ""
    });
    const [showModal, setShowModal] = useState(false);
    const navigator = useNavigate();
    
    useEffect(() => {
        
    }, [])
    
    const handleCloseModal = () => {
        setShowModal(false);
    };

    function checkOut() {
        const checkedOutPackage = JSON.parse(sessionStorage.getItem('checkout-package'));
        
        const packageObj = {};
        packageObj['checkedout_package'] = checkedOutPackage;
        packageObj['delivery_method'] = pickUp ? 'pickup' : 'ship';
        packageObj['ship_info'] = shipInfo;
        packageObj['shipping'] = testParks[0]['ship_cost'];
        packageObj['total_cost'] = subTotal + testParks[0]['tax_rate'] + testParks[0]['ship_cost'];
        packageObj['tax_rate'] = testParks[0]['tax_rate'];
        packageObj['pickup_detail'] = testParks[0]['pickup_detail'];
        packageObj['ship_detail'] = testParks[0]['ship_detail'];

        sessionStorage.setItem('package', JSON.stringify(packageObj));
        setShowModal(true);
    }

    const checkedOutPackage = JSON.parse(sessionStorage.getItem('checkout-package'));
    let subTotal = 0.00;
    checkedOutPackage.forEach(element => {
        subTotal += element?.price * element?.quantity;
    });
    return (
       <Container className="">
            <div className="d-flex flex-column vh-100">
                <div className="d-flex flex-row justify-content-between align-items-center">
                    <div className="fs-2 pe-3"><strong>CHECKOUT</strong></div>
                    <div style={{width:"40vw",height:"24vw"}}>
                        <img className="img-thumbnail overflow-hidden position-fixed" style={{maxHeight:"100px",top:"3px",right:"5px",background:"none"}} src={imgInfo?.imgUrl} alt='...' />
                        <img className="img-thumbnail overflow-hidden position-fixed" style={{maxHeight:"100px",top:"3px",right:"5px",background:"none"}} src={WATERMAK_IMAGES[testParks[0]['rides'][0]['watermark']]} alt='...' />
                    </div>
                </div>
                <hr />
                <div className="main-container flex-1 p-3" style={{overflow:"scroll"}}>
                    <p className="fs-4  "><strong>Delivery Options</strong></p>
                    <div className="d-flex flex-row justify-content-between align-items-center">
                        {<>
                            <p className={pickUp?"":"text-secondary"}>I'll pick them up in park</p>
                            <input type="checkbox" onChange={()=>{setPickUp(!pickUp);setShipTo(pickUp)}} checked={pickUp}/>
                        </>
                        }
                    </div>
                    <div className="d-flex flex-row justify-content-between align-items-center">
                        {<>
                            <p className={shipTo?"":"text-secondary"}>Ship it to me</p>
                            <input type="checkbox" checked={shipTo} onChange={()=>{setShipTo(!shipTo);setPickUp(shipTo);}}/>
                        </>}
                    </div>
                    {shipTo && <Form>
                        <Form.Group as={Row} controlId="formName" className="mb-3">
                            <Form.Label column xs={2}>
                                Name:
                            </Form.Label>
                            <Col xs={9}>
                                <Form.Control type="text" value={shipInfo?.name} onChange={(e) => {
                                    setShipInfo(p => ({...p, name: e.target.value}))
                                }} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formStree1" className="mb-3">
                            <Form.Label column xs={2}>
                                Street1:
                            </Form.Label>
                            <Col xs={9}>
                                <Form.Control type="text" value={shipInfo?.street1} onChange={(e) => {
                                    setShipInfo(p => ({...p, street1: e.target.value}))
                                }} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formStree2" className="mb-3">
                            <Form.Label column xs={2}>
                                Street2:
                            </Form.Label>
                            <Col xs={9}>
                                <Form.Control type="text" value={shipInfo?.street2} onChange={(e) => {
                                    setShipInfo(p => ({...p, street2: e.target.value}))
                                }} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formCity" className="mb-3">
                            <Form.Label column xs={2}>
                                City:
                            </Form.Label>
                            <Col xs={9}>
                                <Form.Control type="text" value={shipInfo?.city} onChange={(e) => {
                                    setShipInfo(p => ({...p, city: e.target.value}))
                                }} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formZipCode" className="mb-3">
                            <Form.Label column xs={3}>
                                ZipCode:
                            </Form.Label>
                            <Col xs={5}>
                                <Form.Control type="number" value={shipInfo?.zipCode} onChange={(e) => {
                                    setShipInfo(p => ({...p, zipCode: e.target.value}))
                                }} />
                            </Col>
                        </Form.Group>
                    </Form>}
                    <hr />
                    <div className="d-flex flex-row justify-content-between align-items-center">
                        <p>Subtotal</p>
                        <p>${subTotal}</p>
                    </div>
                    <div className="d-flex flex-row justify-content-between align-items-center">
                        <p>Shipping</p>
                        <p>${testParks[0]['ship_cost']}</p>
                    </div>
                    <div className="d-flex flex-row justify-content-between align-items-center">
                        <p>Tax</p>
                        <p>${testParks[0]['tax_rate']}</p>
                    </div>
                    <hr />
                    <div className="d-flex flex-row justify-content-between align-items-center">
                        <p><strong>Total</strong></p>
                        <p><strong>${subTotal + testParks[0]['tax_rate'] + testParks[0]['ship_cost']}</strong></p>
                    </div>
                </div>
                <p className="text-primary text-center" onClick={()=>navigator(-1)}>Back to Packages</p>
                <div>
                    <Button variant="primary" className="col-12 fs-1 mt-5 mb-3 text-white" onClick={checkOut}>Pay Now</Button>
                </div>
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
                            <label onClick={handleCloseModal} className="text-red" style={{position:"fixed", right:"20px",zIndex:"99"}}><GrFormClose size={30} color="red"  /></label>
                            <Payment />
                        </div>
                    </div>
                </CSSTransition>
       </Container>
    )
}

export default CheckoutDelivery;