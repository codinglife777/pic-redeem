import React, { useContext, useEffect, useState } from "react";
import { ImageContext } from "../ImageProvider";
import { Container, Card, ListGroup, ListGroupItem, Button} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import PackageItem from "../components/PackageItem";
import { testParks } from "../utils/test_data";

function PackageList (props) {
    const {imgInfo, updateImgInfo} = useContext(ImageContext);
    const [checkBtnState, setCheckBtnState] = useState(true);
    const navigator = useNavigate();

    const packageList = imgInfo.watermark ? testParks[0]['sale_packages'] : testParks[0]['redeem_packages'];

    useEffect(() => {
        const checkedOutPackage = JSON.parse(sessionStorage.getItem('checkout-package'));
        if (checkedOutPackage === null)
            sessionStorage.setItem('checkout-package', JSON.stringify([]));
        else 
        {
            if (checkedOutPackage.length < 1)
                setCheckBtnState(false);
        }
    }, [])
    

    function checkOut() {
        const checkedOutPackage = sessionStorage.getItem('checkout-package');
        console.log(checkedOutPackage);
        navigator('/checkout-delivery');
    }
    console.log("Checkbtnstate: ", checkBtnState);
    return (
       <Container className="">
            <div className="d-flex flex-column vh-100">
                <Card className="image-card">
                    <Card.Title className="text-center p-3 fs-1">Packages</Card.Title>
                    <Card.Img variant="top" className="p-2" src={imgInfo?.imgUrl} alt={props.imageAlt} />
                </Card>
                <div className="list-container flex-1" style={{overflow:"scroll"}}>
                    <ListGroup>
                        {packageList.map((item, index)=> {
                            if (index === 0) {
                                //save to session stroage
                                const data = {name: item['name'], price: item['price'], quantity: 1};
                                const checkedOutPackage = JSON.parse(sessionStorage.getItem('checkout-package'));
                                let isExist = false;
                                const newVal = checkedOutPackage ? checkedOutPackage.map((it, idx) =>{

                                    if (item['name'] === it['name'] && item['price'] === it['price']) {
                                        isExist = true;
                                        if (it['quantity'] < 1) {
                                            it['quantity'] = 1
                                        }
                                    }
                                    return it;
                                }) : [];
                                if (!isExist) {
                                    newVal.push(data);
                                }
                                sessionStorage.setItem('checkout-package', JSON.stringify(newVal));
                            }
                           return <ListGroupItem key={index}><PackageItem name={item['name']} price={item['price']} defaultVal={index === 0 ? 1 : 0} setCheckBtnState={setCheckBtnState}/></ListGroupItem>
                        })}
                    </ListGroup>
                </div>
                <div>
                    {checkBtnState ?
                        <Button variant="primary" className="col-12 fs-1 mt-5 mb-3 text-white" onClick={checkOut}>Checkout</Button> :
                        <Button variant="primary" className="col-12 fs-1 mt-5 mb-3 text-white" onClick={checkOut} disabled>Checkout</Button>}
                    
                </div>
            </div>
       </Container>
    )
}

export default PackageList;