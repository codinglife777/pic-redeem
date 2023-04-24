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
                    <Card.Img variant="top" className="p-2" src="https://nxdv.s3.amazonaws.com/rocket-coaster/04-10-2023/edited/img00002.jpg?AWSAccessKeyId=ASIAR7MZ7WWO5LZGPVNC&Expires=1682237583&Signature=%2BZi3XHVzw4KW5fSM5x%2FRDgvtQs4%3D&x-amz-security-token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQDjr6cFOpx%2FTSBMyTkVoMEgZjaq7i%2BNGwU5ypS42bmijQIhALKPHkriKZHiqFgWrXWACt3OSi6LsFDeO878l3HziOGNKo8DCNH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMMTM2MTUxMjgzMTAxIgyTexAuCjwXytE5LI4q4wLjiCkuh9wuk7jVJjQpSgrZavpgY7viRVkUB1Brd%2BR5C2rczg%2BJzcf7HuW7M0UXrucGwg9M%2FhBFhH9x8CoD927XsyyeZvXl6J95LrleSPCNjGdlzbZlatDoZ%2BbK3T71N2lMkIPr7An2DVINZhmp9xLCBKVJLvl8v%2Fs27BPjYhDVVVOImFGcGHYEp503rFz4ERnZBNx%2F%2Ff6qfS6TObvHP4IbP1Ml1JeiwJ8xHLUwFMEWIHeIjfm3QtHeVwtil%2BsNopY%2BcHldFPjhzAo9LcsqpAMBOmgBVp%2BsLelzkIGUhGh37iBt3Ej2n9WAX0j%2FM%2BjI4vyaLwL6aPmSUDeWRQ90B%2FJVFWPut0GG8QZd2CfjHxXeDUue8vnyjz3oE%2FcdQmOutiubUUJEom1yg1065fL%2BExrlMevutpBh%2BcdsPV6DC3rBi6744pz3OCVMZ1G6oLNqU%2BjV9ewMlj%2FoDTmjsKWFxZaSrOBNMOLOk6IGOp0BSjmlad0%2BIYiQIsdqUgIu8O0WQEYgQ%2F7yyc6TqQaEgblpZD2%2Fd%2FRm0NusEyvajkas6b40YfKY%2BnpU%2B%2B5aEAaGyJ%2BOjAtRAV1fvk4pk9GPlALUx1R%2FfQkVE6FBUluEOX4BT%2FVRZqhzlHrp22OuIy5mxxQ4VQqHzu1rZ2QoOAO7xXbq8i2d85xXIK4%2FjaD6g2zD%2FTDsM7MGn%2FkFpvKDMA%3D%3D" alt={props.imageAlt} />
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