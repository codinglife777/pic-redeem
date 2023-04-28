import React, { useContext, useEffect, useState } from "react";
import { ImageContext } from "../ImageProvider";
import { Container, Card, ListGroup, ListGroupItem, Button} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import PackageItem from "../components/PackageItem";
import { testParks } from "../utils/test_data";
import WATERMAK_IMAGES from "../images";
import Watermark from "../components/Watermark";
import LazyImage from "../components/LazyImage";

function PackageList (props) {
    const {imgInfo} = useContext(ImageContext);
    const [checkBtnState, setCheckBtnState] = useState(true);
    const navigator = useNavigate();
    const [packageList, setPackageList] = useState([]);

     const _originPackageList = imgInfo.watermark ? testParks[0]['sale_packages'] : testParks[0]['redeem_packages'];
     const originPackageList = [];
     for (let i = 0; i < _originPackageList.length; i++)
        originPackageList[i] = {..._originPackageList[i]};

    useEffect(() => {
        const checkedOutPackage = JSON.parse(sessionStorage.getItem('checkout-package')) || [];
        if (checkedOutPackage === null || checkedOutPackage.length === 0) {
            sessionStorage.setItem('checkout-package', JSON.stringify([]));
            const _packageList = originPackageList.map((item, index) => {
                if (index === 0)
                    item['quantity'] = 1;
                else
                    item['quantity'] = 0;
                return item;
            });
            sessionStorage.setItem('checkout-package', JSON.stringify(_packageList));
            setPackageList(_packageList);
        }
        else 
        {
            let _packageList = [...originPackageList];
            if (checkedOutPackage.length < 1) {
                setCheckBtnState(false);
            }
            else {
                _packageList = _packageList.map((item, index) => {
                    let isExist = false;
                    checkedOutPackage.forEach(element => {
                        if (item['name'] === element['name'] && item['price'] === element['price']) {
                            item['quantity'] = element['quantity'];
                            isExist = true;
                        }
                    });
                    if (!isExist) item['quantity'] = 0;
                    return item;
                });
            }

            setPackageList(_packageList);
        }
    }, [imgInfo.watermark])
    

    function checkOut() {
        navigator('/checkout-delivery');
    }

    return (
       <Container className="">
            <div className="d-flex flex-column vh-100 pt-3">
                <Card className="image-card pb-2">
                    <Card.Title className="text-center p-3 fs-1">Packages</Card.Title>
                    {imgInfo?.watermark ?
                        <Watermark imgHeight="70vw" imgUrl={imgInfo?.imgUrl} imgWatermark={WATERMAK_IMAGES[testParks[0]['rides'][0]['watermark']]} />
                        : 
                        <LazyImage imgSrc={imgInfo?.imgUrl} />
                    }
                </Card>
                <div className="list-container flex-1 p-2 mt-3" style={{overflow:"scroll",minHeight:"200px"}}>
                    <ListGroup>
                        {packageList.map((item, index)=> 
                             <ListGroupItem key={index}><PackageItem name={item['name']} price={item['price']} defaultVal={item['quantity']} setCheckBtnState={setCheckBtnState}/></ListGroupItem>
                        )}
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