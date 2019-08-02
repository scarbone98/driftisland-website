import React from 'react';
import Form from "react-bootstrap/Form";
import revalidation from 'revalidation';
function Input({revalidation : {form, updateState, valid, errors = {}}, label, onChange, name, as}) {
    return (
        <Form.Group controlId="formBasicEmail">
            <Form.Label>{label}</Form.Label>
            <Form.Control type="email" size="lg" onChange={onChange} name={name} as={as}/>
        </Form.Group>
    );
}

export default revalidation(Input);