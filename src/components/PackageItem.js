import React, { useEffect, useState } from "react";
import { Row, Col } from 'react-bootstrap';
import { FaMinus, FaPlus } from "react-icons/fa";

function PackageItem(props) {
 
    const [quantity, setQuantity] = useState(props.defaultVal);

    function changeQuantity(isPlus) {
        const val = isPlus ? quantity + 1 : quantity - 1;
        if (val < 1)
            setQuantity(0);
        else
            setQuantity(val);

        const checkoutPackage = JSON.parse(sessionStorage.getItem('checkout-package'));
        let isExist = false;
        const newVal = checkoutPackage.map((item, index) =>{

            if (item['name'] === props.name && item['price'] === props.price) {
                isExist = true;
                item['quantity'] = val;
            }

            return item;
        });
        if (!isExist)
            newVal.push({name: props.name, price: props.price, quantity: val});
        const filterData = newVal.filter((item) => item['quantity'] > 0); 
        props.setCheckBtnState(filterData.length > 0);
        sessionStorage.setItem('checkout-package', JSON.stringify(filterData));
    }

    return (
        <Row>
            <Col xs={6} className="border border-secondary d-flex justify-content-center align-items-center">
                <strong style={{fontFamily:"Helvetica Neue"}}>{props.name}</strong>
            </Col>
            <Col xs={6}>
                <Row>
                    <p className="text-end fs-3 text-warning pe-4">
                        ${props.price * quantity}
                    </p>
                </Row>
                <Row className="d-flex justify-content-center align-items-center">
                    <Col xs={2} />
                    <Col xs={3} onClick={()=>{changeQuantity(false)}}><div className="text-center" style={{border:"1px solid #B8BBBE",borderRadius:"16px"}}><FaMinus color="#0dcaf0" /></div></Col>
                    <Col xs={3}><p className="fs-3 text-primary text-center"><strong>{quantity}</strong></p></Col>
                    <Col xs={3} onClick={()=>{changeQuantity(true)}}><div className="text-center" style={{border:"1px solid #ffc107",borderRadius:"16px"}}><FaPlus color="#0d6efd" /></div></Col>
                </Row>
            </Col>
        </Row>
    )
}

export default PackageItem;