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
                <strong>{props.name}</strong>
            </Col>
            <Col xs={6}>
                <Row>
                    <p className="text-end fs-3 text-warning">
                        ${props.price}
                    </p>
                </Row>
                <Row className="d-flex justify-content-center align-items-center">
                    <Col xs={4} onClick={()=>{changeQuantity(false)}}><FaMinus /></Col>
                    <Col xs={4}><p className="fs-4">{quantity}</p></Col>
                    <Col xs={4} onClick={()=>{changeQuantity(true)}}><FaPlus /></Col>
                </Row>
            </Col>
        </Row>
    )
}

export default PackageItem;