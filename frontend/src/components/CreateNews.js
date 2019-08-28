import React, { Component } from 'react';
import SideBar from './SideBar';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import { Button, FormGroup, FormLabel, Row, Col, FormControl, Image } from 'react-bootstrap';
import AddedDocument from './layout/AddedDocument';
import upload_photo_icon from '../assets/upload_photo_icon.svg';
import upload_document_icon from '../assets/upload_document_icon.svg';
import GoogleApiWraper from './NewsMapContainer';


export default class CreateNews extends Component {

    constructor(props) {
        super(props)

        this.state = {
            redirectToNews: false,
            images: null,
            file: null,
            title: '',
            message: '',
            address: '',
            location_latitude: '',
            location_longitude: '',
        }
    }

    setRedirectToNews = () => {
        this.setState({
            redirectToNews: true,
        })
    }

    uploadDocument = () => {
        this.setState({
            // eslint-disable-next-line no-restricted-globals
            file: URL.createObjectURL(event.target.files[0])
        })
    }

    uploadImages = () => {
        this.setState({
            // eslint-disable-next-line no-restricted-globals
            images: URL.createObjectURL(event.target.files[0])
        })
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        await fetch('https://intern2019dev.clover.studio/news/new', {
            method: 'POST',
            headers: {
                'Accept': 'multipart/form-data',
                'Content-Type': 'multipart/form-data',
                'token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                //Images: this.state.images,
                //Documents: this.state.documents,
                Title: this.state.title,
                Message: this.state.message,
                Address: 'Ilica',
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                }
            })
        }).then(async (response) => {
            const json = await response.json();
            console.log(json);
            swal("Uspješno!", "Vijest uspješno objavljena na portal Moj Grad", "success");
            //dodat redirect
        }
        ).catch(e => {
            console.log(e);
            swal("Greška!", "Vijest nije objavljena!", "error");
        })

    }


    render() {

        if (this.state.redirectToNews) {
            return <Redirect to='/News' />
        }

        return (
            <div style={{ display: 'flex', background: '#e7e7e7' }}>
                <SideBar />
                <div className="create-news" style={{ minWidth: '80%', padding: '20px' }}>
                    <Row className="justify-content-md-center">
                        <Col sm={3}>
                            <Button
                                className="return sm=4"
                                onClick={this.redirectToNews}>
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
                                <FormGroup controlId="newsphotos" bsSize="large" style={{ paddingTop: '5px' }}>
                                    <FormLabel bsClass="custom-label">Fotografije:</FormLabel>
                                    <Row>
                                    <input
                                    type='file'
                                    onChange={this.uploadImages}
                                    style={{display:'none'}}
                                    ref= {fileInput => this.fileInput = fileInput} />
                                        <Image 
                                        src={upload_photo_icon} 
                                        style={{ display: "flex", background: "#e7e7e7", padding: '20px', width: '100px', height: '120px', marginLeft:'10px' }} 
                                        rounded
                                        onClick={() => this.fileInput.click()} />
                                        <Image src={this.state.images} style={{ width: '100px', height: '120px', marginLeft:'5px' }} rounded />
                                    </Row>
                                </FormGroup>
                            </div>

                            <FormGroup controlId="title">
                                <FormLabel>Naslov</FormLabel>
                                <FormControl
                                    onChange={this.handleChange}
                                    className="border-none"
                                />
                            </FormGroup>

                            <FormGroup controlId="message">
                                <FormLabel>Tekst</FormLabel>
                                <FormControl
                                    onChange={this.handleChange}
                                    className="border-none"
                                />
                            </FormGroup>

                            <Row >
                                <Col sm={5} >
                                    <FormGroup controlId="Address" className="location-form">
                                        <FormLabel >Lokacija</FormLabel>
                                        <GoogleApiWraper style={{ marginTop: '20px', position: 'static' }} />
                                        <FormControl
                                            onChange={this.handleChange}
                                            className="border-none"
                                            style={{ paddingTop: "60px" }} />
                                    </FormGroup>
                                </Col>

                                <Col sm={5}>
                                    <FormGroup controlId="documents" className="document-form">
                                        <FormLabel>Dokumenti</FormLabel>
                                        <input 
                                        type='file' 
                                        onChange={this.uploadDocument}
                                        ref={fileInput => this.fileInput = fileInput}
                                        style={{display:'none'}} />
                                        <Image 
                                        src={upload_document_icon} 
                                        style={{ display: "flex", background: "#e7e7e7", height:'120px', width:'100px', padding:'20px' }}
                                        onClick = {() => this.fileInput.click()}
                                        rounded />
                                        <div>
                                            <AddedDocument/>
                                        </div>
                                    </FormGroup>
                                </Col>

                            </Row>
                            <Row className="justify-content-md-center" style={{ paddingTop: "300px" }}>
                                <Button
                                    className="btn-submit sm=4"
                                    onClick={this.handleSubmit}>
                                    Objavi vijest
                        </Button>
                                <Button
                                    className="btn-cancel sm=4"
                                    href='/News'>
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



