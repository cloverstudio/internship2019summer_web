import React, { Component } from 'react';
import SideBar from './SideBar';
import { Button, FormGroup, FormLabel, Row, Col, FormControl, Image } from 'react-bootstrap';
import upload_photo_icon from '../assets/upload_photo_icon.svg';
import upload_document_icon from '../assets/upload_document_icon.svg';
import GoogleApiWraper from './NewsMapContainer';


export default class CreateNews extends Component {

 
    render() {
        
        return (
            <div style={{display:'flex'}}>
                <SideBar/>
            <div className="create-news">
                <Row className="justify-content-md-left">
                    <Col sm={3}>
                        <Button
                            className="return sm=4"
                            onClick>
                            Vrati se
                        </Button>
                    </Col>
                    <Col sm={8}>
                        <h3 className="heading-create-news">Nova vijest</h3>
                    </Col>
                </Row>


                <form>
                    <div className="add-news">
                        <div className="news-add-photos">
                            <FormGroup controlId="newsphotos" bsSize="large">
                                <FormLabel bsClass="custom-label">Fotografije:</FormLabel>
                                <Image src={upload_photo_icon} onClick style={{ display: "flex", background:"#e7e7e7" }} />
                            </FormGroup>
                        </div>

                        <FormGroup controlId="title">
                            <FormLabel>Naslov</FormLabel>
                            <FormControl
                                className="border-none"
                            />
                        </FormGroup>

                        <FormGroup controlId="text">
                            <FormLabel>Tekst</FormLabel>
                            <FormControl
                                style={{height:'100px'}}
                                className="border-none"
                            />
                        </FormGroup>

                        <Row style={{height:"100px"}}>
                            <Col sm={5} >
                            <FormGroup controlId="location" className="location-form">
                                <FormLabel style={{height:"20px"}}>Lokacija</FormLabel>
                                    <GoogleApiWraper style={{marginTop:'20px', position:'static'}}/>
                            </FormGroup>
                            <FormGroup controlId="location-input">
                                <FormControl
                                className="border-none"
                                style={{marginTop:"10px"}}/>
                            </FormGroup>
                            </Col>
                            
                            <Col sm={5}>
                            <FormGroup controlId="documents" className="document-form">
                                <FormLabel>Dokumenti</FormLabel>
                                <Image src = {upload_document_icon} style={{ display: "flex", background:"#e7e7e7" }}/>

                            </FormGroup>
                            </Col>

                        </Row>
                        <Row className="justify-content-md-center" style={{paddingTop:"300px"}}>
                            <Button
                                className="btn-submit sm=4"
                                onClick>
                                Objavi vijest
                        </Button>
                            <Button
                                className="btn-cancel sm=4"
                                onClick>
                                Poništi
                        </Button>
                        </Row>

                    </div>
                </form>

            </div>
            </div>
        )
    }
}



