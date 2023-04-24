import React, { useContext, useEffect, useState } from "react";
import { Container, Form, Button, Row, Col, Card} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { GrFormClose } from "react-icons/gr";

import { ImageContext } from "../ImageProvider";
import PackageItem from "../components/PackageItem";
import { testParks } from "../utils/test_data";
import '../css/Modal.css';
import Payment from "./Payment";

function CheckoutDelivery (props) {
    const {imgInfo, updateImgInfo} = useContext(ImageContext);
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
        packageObj['delivery_method'] = [pickUp ? 'pick' : '', shipTo ? 'Ship' : ''];
        packageObj['ship_info'] = shipInfo;
        packageObj['shipping'] = testParks[0]['ship_cost'];
        packageObj['total_cost'] = subTotal + testParks[0]['tax_rate'] + testParks[0]['ship_cost'];
        packageObj['tax_rate'] = testParks[0]['tax_rate'];


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
                    <img className="img-thumbnail overflow-hidden" style={{maxHeight:"100px"}} src='https://mdbootstrap.com/img/new/slides/041.webp' alt='...' />
                </div>
                <hr />
                <div className="main-container flex-1" style={{overflow:"scroll"}}>
                    <p className="fs-4  "><strong>Delivery Options</strong></p>
                    <div className="d-flex flex-row justify-content-between align-items-center">
                        {pickUp ? (<><p>I'll pick them up in park</p>
                        <input type="checkbox" onChange={()=>setPickUp(!pickUp)} checked/></>) : (<><p className="text-secondary">I'll pick them up in park</p>
                        <input type="checkbox" onChange={()=>setPickUp(!pickUp)} /></>)}
                    </div>
                    <div className="d-flex flex-row justify-content-between align-items-center">
                        {shipTo ? (<><p>Ship it to me</p>
                        <input type="checkbox" checked onChange={()=>setShipTo(!shipTo)}/></>) : (<><p className="text-secondary">Ship it to me</p>
                        <input type="checkbox" onChange={()=>setShipTo(!shipTo)} /></>)}
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