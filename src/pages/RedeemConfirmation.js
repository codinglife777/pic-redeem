import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ImageContext } from "../ImageProvider";
import { GiCheckMark } from "react-icons/gi";
import { GrFormClose } from "react-icons/gr";
import { Container, Row, Button, Card } from "react-bootstrap";
import { CSSTransition } from 'react-transition-group';

import '../css/Modal.css';

function RedeemConfirmation (props) {

    const [showModal, setShowModal] = useState(false);
    const {imgInfo, updateImgInfo} = useContext(ImageContext);
    const navigator = useNavigate();
    
    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <Container className="p-5">    
            <Row className="justify-content-md-center">
                <div className="text-center">
                    <h2>IMAGE SAVED</h2>
                    <GiCheckMark size="60" color="green" />
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
                            <label onClick={handleCloseModal} className="text-red"><GrFormClose size={30} color="red" style={{position:"fixed", right:"30px"}} /></label>
                            <Card className="image-card mt-4">
                                <Card.Title className="text-center p-3">Would you like to view special print offerings available only today?</Card.Title>
                                <Card.Img variant="top" className="p-2" src="https://nxdv.s3.amazonaws.com/rocket-coaster/04-10-2023/edited/img00002.jpg?AWSAccessKeyId=ASIAR7MZ7WWOQOLWWDXU&Expires=1682255182&Signature=ZSKZLOv%2F7eNZywHnt6zUIV1B%2FmM%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEN3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIEggyhcrPkX3EFh7n5jZPmCROF%2BeHb2QBXB5dHnV4JXHAiEAvF0lCPs2ABiAtjM3L3RmJ8CDEN1H5%2FKb2FXe%2BFwNfg0qjwMI1v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxMzYxNTEyODMxMDEiDE31LBW3JFDjQidJAirjAg95nRMJ7wAnV4ai5MGL%2FJ7%2ByPiHoe6BksOs5Pu5mWxdk9kAF7yLdisOhd24MG8ySZ9R4ypoudCxXwQJITlg1%2BR9ieysgdsHBh6Yrk1YgNg8F%2FyUvjvbENEpIWgU5P%2BKRlhc4Pt6IblXG9kk1UPzVhNBuMgNdWi7YeQSDFG1qrlWOaKV6fSZT1zV%2BHNyBK7jzUnoJlbFbGYboKVKAkrttHBEI5JfP0DwFM8k25Dk4R%2B7LtrUSW3TvmVBPexvlSXAuCM0liDOilAqboOP1%2FCBJwaxG%2F12Be6TWkd1uee%2B2JmTQQd9szji9u1qbQdJiG5Isx53Cbq0FDZg%2F%2BrUkMXCTluQKTkuWBr9VvSxvvUMOtgzUeChwRx4te5VoZTOGk4bKlkCxjeDoXxRPVaI6%2F08w5zk72P4SfY2bKN3lEqWbK1t705Hn%2FGxvBf9VHqaLl7mD3OjY2ZZQZc9hg5mGy%2F6F2ElfCMwiNaUogY6ngED7hkpTTjwHoJANhvMa%2FZNO9ljhb9%2FlOovrCbEX0BZpTaCOzJowmvJE1WkCxWlozSiMDwfRduPkOozHw7vWKaxryfVG1s7gtmboccK1ncwus05JCaqRU9M40J%2F4ZZUztAiHP4nQkFf4LHQSJtwvFjaaVG1OjqUCAWd7KNe88FgO%2FDOIgE5ws49MdwVR9VbCyezGndeGxTgBrQrlJ%2FTxQ%3D%3D" alt={props.imageAlt} />
                                <Card.Body>
                                    <div className="button-container d-flex justify-content-between mt-2 p-3">
                                        <Button variant="primary" className="mr-2 btn-lg" onClick={()=>{
                                            navigator('/package-list');
                                        }}>Yes</Button>
                                        <Button variant="danger" className="btn-lg" onClick={()=>{
                                          setShowModal(false);  
                                        }}>No</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </CSSTransition>
                <div className="text-center mt-5">
                    <Button variant="warning" className="col-12 fs-1 mt-5 mb-3 text-white" onClick={()=>{setShowModal(true)}}>Discounted Prints</Button>
                    <Button variant="primary" className="col-12 fs-1 mt-4">Download Image</Button>
                    <Button variant="primary" className="col-12 fs-1 mt-4">View Album</Button>
                    <Button variant="primary" className="col-12 fs-1 mt-4">Add New Image</Button>
                </div>
            </Row>
        </Container>
    )
}

export default RedeemConfirmation;
