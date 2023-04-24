import React, { useContext, useEffect } from "react";

import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { ImageContext } from '../ImageProvider';

function ConfirmImage (props) {

    const [searchParams] = useSearchParams();
    const { imgInfo, updateImgInfo } = useContext(ImageContext);
    const navigator = useNavigate();

    useEffect(()=>{
        updateImgInfo({
            rideId: searchParams.get('ride_id'),
            watermark: searchParams.get('watermark'),
            passId: searchParams.get('pass_id'),
        })
    }, []);

    console.log(imgInfo);

    return (
        <Card className="image-card">
            <Card.Title className="text-center p-3">Please Confirm This Is Your Image</Card.Title>
            <Card.Img variant="top" className="p-2" src="https://nxdv.s3.amazonaws.com/rocket-coaster/04-10-2023/edited/img00002.jpg?AWSAccessKeyId=ASIAR7MZ7WWO5LZGPVNC&Expires=1682237583&Signature=%2BZi3XHVzw4KW5fSM5x%2FRDgvtQs4%3D&x-amz-security-token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQDjr6cFOpx%2FTSBMyTkVoMEgZjaq7i%2BNGwU5ypS42bmijQIhALKPHkriKZHiqFgWrXWACt3OSi6LsFDeO878l3HziOGNKo8DCNH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMMTM2MTUxMjgzMTAxIgyTexAuCjwXytE5LI4q4wLjiCkuh9wuk7jVJjQpSgrZavpgY7viRVkUB1Brd%2BR5C2rczg%2BJzcf7HuW7M0UXrucGwg9M%2FhBFhH9x8CoD927XsyyeZvXl6J95LrleSPCNjGdlzbZlatDoZ%2BbK3T71N2lMkIPr7An2DVINZhmp9xLCBKVJLvl8v%2Fs27BPjYhDVVVOImFGcGHYEp503rFz4ERnZBNx%2F%2Ff6qfS6TObvHP4IbP1Ml1JeiwJ8xHLUwFMEWIHeIjfm3QtHeVwtil%2BsNopY%2BcHldFPjhzAo9LcsqpAMBOmgBVp%2BsLelzkIGUhGh37iBt3Ej2n9WAX0j%2FM%2BjI4vyaLwL6aPmSUDeWRQ90B%2FJVFWPut0GG8QZd2CfjHxXeDUue8vnyjz3oE%2FcdQmOutiubUUJEom1yg1065fL%2BExrlMevutpBh%2BcdsPV6DC3rBi6744pz3OCVMZ1G6oLNqU%2BjV9ewMlj%2FoDTmjsKWFxZaSrOBNMOLOk6IGOp0BSjmlad0%2BIYiQIsdqUgIu8O0WQEYgQ%2F7yyc6TqQaEgblpZD2%2Fd%2FRm0NusEyvajkas6b40YfKY%2BnpU%2B%2B5aEAaGyJ%2BOjAtRAV1fvk4pk9GPlALUx1R%2FfQkVE6FBUluEOX4BT%2FVRZqhzlHrp22OuIy5mxxQ4VQqHzu1rZ2QoOAO7xXbq8i2d85xXIK4%2FjaD6g2zD%2FTDsM7MGn%2FkFpvKDMA%3D%3D" alt={props.imageAlt} />
            <Card.Body>
                <div className="button-container d-flex justify-content-between mt-2 p-3">
                    <Button variant="primary" className="mr-2 btn-lg" onClick={()=>{
                        navigator('/redeem-confirm');
                    }}>Yes</Button>
                    <Button variant="danger" className="btn-lg">No</Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default ConfirmImage;