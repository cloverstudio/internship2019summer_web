import React, { Component } from 'react';
import SideBar from '../layout/SideBar';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import { Button, FormGroup, FormLabel, Row, Col, FormControl, Image } from 'react-bootstrap';
import AddedDocument from '../layout/AddedDocument';
import upload_photo_icon from '../../assets/upload_photo_icon.svg';
import upload_document_icon from '../../assets/upload_document_icon.svg';
//import GoogleApiWraper from './NewsMapContainer';
import Map from './Map';



export default class EditNews extends Component {

    constructor(props) {
        super(props)

        this.state = {
            redirectToNews: false,
            images: null,
            file: null,
            title: '',
            message: '',
            address: 'ilica',
            location_latitude: '',
            location_longitude: '',
        }
    }

    setRedirectToNews = () => {
        this.setState({
            redirectToNews: true,
        })
    }

    uploadFiles = (event) => {
        this.setState({
          file: event.target.files[0]
        })
      }

    uploadImages = (event) => {
        this.setState({
          images: event.target.files[0]
        })
      }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async (event) => {
        const data = new FormData
        data.append('photo',this.state.images)
        data.append('file',this.state.file)
        data.append('Title', this.state.title)
        data.append('Message', this.state.message)
        data.append('Address', this.state.address)
        for(var pair of data.entries()) {
            console.log(pair[0]+ ', '+ pair[1]); 
          }
        event.preventDefault();
        await fetch('https://intern2019dev.clover.studio/news/new', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'token': localStorage.getItem('token')
            },
            body: data
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
                <div className="create-news" style={{ width: '60%', padding: '20px' }}>
                    <Row style={{display:'flex', justifyContent:'center'}}>
                        <Col sm={3}>
                            <Button
                                style={{marginLeft:'-40px'}}
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
                                    <Row style={{display:'flex', justifyContent:'left'}}>
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
                                    required
                                />
                            </FormGroup>

                            <FormGroup controlId="message">
                                <FormLabel>Tekst</FormLabel>
                                <FormControl
                                    onChange={this.handleChange}
                                    className="border-none"
                                    required
                                />
                            </FormGroup>

                            <div style={{display:'flex'}}>
                                    <FormGroup controlId="address" className="location-form">
                                        <Map
                                        handleChange={this.handleChange}
                                        google={ this.props.google }
                                        center={{ lat: 45.815399, lng: 15.966568}}
                                        height='200px'
                                        zoom={10}/>
                                    </FormGroup>
                                

                                
                                    <FormGroup controlId="documents" className="document-form">
                                        <FormLabel style={{height:'20px', display:'block'}}>Dokumenti</FormLabel>
                                        <div style={{display:'flex', justifyContent:'left'}}>
                                        <input 
                                        type='file' 
                                        onChange={this.uploadFiles}
                                        ref={fileInput => this.fileInput = fileInput}
                                        style={{display:'none'}} />
                                        <Image 
                                        src={upload_document_icon} 
                                        style={{ display: "flex", background: "#e7e7e7", height:'120px', width:'100px', padding:'20px', margin:'0' }}
                                        onClick = {() => this.fileInput.click()}
                                        rounded />
                                        <div>
                                            <AddedDocument
                                            file={this.state.file}/>
                                        </div>
                                        </div>
                                    </FormGroup>
                            </div>

                            


                            <div style={{ paddingTop: "300px", display:'flex', justifyContent:'center'}}>
                            
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
                        
                            </div>

                        </div>
                    </form>

                </div>
            </div>
        )
    }
}





