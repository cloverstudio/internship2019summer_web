import React, {Component} from 'react';

export default class EditUser extends Component{
    render() {
        if (this.state.redirectToUsers) {
          return <Redirect to='/Users' />
        }
     
          return (
              <div className="new-user-form">
                  <Row>
                    <Button 
                    className = "return"
                    onClick= {this.setRedirectUsers}>
                    Vrati se
                    </Button>
                  <h3 className="heading-new-user">Kreiraj korisnika</h3>
                  </Row>
  
                  <form>
                  <div className="new-user-form-container">
                  
                  <div className="add-user-photo">
                  <FormGroup controlId="profilePhoto" bsSize="large">
                  <FormLabel bsClass="custom-label">Profilna slika</FormLabel>
                  <img src={upload_photo_icon} style={{display:"flex"}}/>
                  </FormGroup>
                  </div>
  
                  <FormGroup controlId="name" bsSize="large">
                  <FormLabel>Ime i prezime</FormLabel>
                  <FormControl
                          autoFocus
                          type="text"
                          required
                          value={this.state.name}
                          onChange={this.handleChange}
                          />
                  </FormGroup>
  
                  <FormGroup controlId="oib" bsSize="large">
                  <FormLabel>OIB</FormLabel>
                  <FormControl
                          autoFocus
                          maxLength = "11"
                          type="text"
                          required
                          value={this.state.oib}
                          onChange={this.handleChange}
                          
                          />
                  </FormGroup>
  
                  <FormGroup controlId="email" bsSize="large">
                  <FormLabel>email</FormLabel>
                  <FormControl
                          autoFocus
                          type="email"
                          required
                          value={this.state.email}
                          onChange={this.handleChange}
                          />
                  </FormGroup>
  
                  <FormGroup controlId="password" bsSize="large">
                  <FormLabel>Password</FormLabel>
                  <FormControl
                          autoFocus
                          type="password"
                          required
                          value={this.state.password}
                          onChange={this.handleChange}
                          />
                  </FormGroup>
  
                  <Button
                  block
                  disabled = {!this.validateForm()}
                  type = "submit"
                  onClick = {this.handleSubmit}
                  >
                  Kreiraj korisnika
                  </Button>
                  </div>
                  
  
                  </form>
  
  
  
              </div>
          )
      }
  }
