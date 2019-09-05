import React, {Component} from 'react'
import { Modal, Image, Card, Button } from 'react-bootstrap';
import SideBar from '../layout/SideBar';

export default class OpenNews extends Component {

    constructor(props){
        super(props);
        this.state = {
            passedProps: this.props.location.state.openNewsProps.newsData
        }
    }

    render(){

        console.log(this.state.passedProps)
        return (
            <div style={{display:'flex', background:'#e7e7e7'}}>
                <SideBar/>
            
                    <Card style={{ background: "white", width: "80%", color: 'black', margin: '20px' }}>
                        <Button 
                        style={{position: 'absolute', zIndex:'3', top:'20px'}}
                        className='return'
                        href='/NewsUser'>
                            Vrati se
                        </Button>
                        <Image src={this.state.passedProps.Image} style={{width:'100%', height:'500px'}}/>
                        <p className="open-title">{this.state.passedProps.Title}</p>
                        <p className="open-text">{this.state.passedProps.Message}</p>
                        <div className='open-author-date' style={{display:'flex'}}>
                        <p className="open-author">Autor: {this.state.passedProps.firstName} {this.state.passedProps.lastName}</p>
                        <p className="open-date">{this.state.passedProps.CreatedAt}</p>
                        </div>
                    </Card>
            </div>
        )
    }
}
