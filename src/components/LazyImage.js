import React, { useState } from "react";
import { Card, Spinner } from 'react-bootstrap';

function LazyImage(props) {
    const [loading, setLoading] = useState(true)
    return (
        <div className="position-relative p-2">
            {loading && 
                <div className="position-absolute" style={{top:"50%",left:"50%",transform:"translate(-50%, -50%)"}}>
                    <Spinner animation="border" variant="primary" className="position-fixed text-center"  />
                </div>
            }
            <Card.Img variant="top" src={props.imgSrc} alt={props.imageAlt} onLoad={()=>setLoading(false)} />
            {props.children}
        </div>
    )
}

export default LazyImage;