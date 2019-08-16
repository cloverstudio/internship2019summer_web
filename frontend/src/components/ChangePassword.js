import React, { Component } from 'react'
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";


export default class ChangePassword extends Component {
    render() {
        return (
            <div className="change-password" style={{maxWidth:"500px"}}>
                <form>
                    <FormGroup controlId="password" bsSize="large">
                            <FormLabel>Lozinka</FormLabel>
                            <FormControl
                            autoFocus
                            type="password"
                            required
                            />
                    </FormGroup>
                    
                    <FormGroup controlId="new-password" bsSize="large">
                        <FormLabel>Nova loznika</FormLabel>
                        <FormControl
                        required
                        type="password"
                        />
                    </FormGroup>

                    <FormGroup controlId="repeat-password" bsSize="large">
                        <FormLabel>Ponovite novu lozinku</FormLabel>
                        <FormControl
                        required
                        type="password"
                        />
                    </FormGroup>

                        <Button
                        className="btn-change"
                        block
                        bsSize="large"
                        type="submit"
                        >
                        Promijeni                             
                        </Button>
                </form>
            </div>
        )
    }
}

