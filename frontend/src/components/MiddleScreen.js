import React, { Component } from 'react';
import Header from './layout/Header';
import Footer from './layout/Footer';
import icon_checkmark from '../assets/log_in_checkmark_icon.svg';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';




class MiddleScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
        redirect: false

    }
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/MainScreen' />
    }
  }  

  
  // setTimeout(setRedirect = () => {
  //   this.setState({
  //     redirect: true
  //   }), 3000);
  // }

    render() {
      if (this.state.redirect) {
        return <Redirect to='/MainScreen' />
      }


      // setTimeout(this.renderRedirect(), 3000);

      

  //  SETTIMEOUT() ??

  //loginsucceed name


      return (
       
        <Router>
          <div className="middle-screen-container gray-container">
            <div className="white-container">
              <div className="info-text" style={{textAlign: 'center'}}>

                <Header style={{margin: '15px'}}/>
                <p style={{margin: '15px', fontSize: '23px'}}>
                  Čestitamo, uspješno ste <br></br> 
                  se prijavili na sustav MojGrad!
                </p>
                <p style={{marginTop: '15px', marginBottom: '35px'}}>
                  Kako bi vam omogućili najbolje iskustvo <br></br> 
                  korištenja aplikacije, spajamo vaše <br></br> 
                  podatke s aplikacijom.
                </p>
                <img style= {{maxWidth: "200px"}} alt= "checkmark icon" src = {icon_checkmark}/>
                <p style={{marginTop: '35px'}}>
                  3 sec...
                </p>
              </div>
            </div>
            <Footer style={{textAlign: 'center'}}/>
          </div>
        </Router>
        )
    }
    
  }


export default MiddleScreen;