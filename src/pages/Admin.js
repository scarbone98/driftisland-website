import React, {useEffect, useState} from 'react';
import './App.scss';
import {Flex, Box} from 'reflexbox';
import Form from "react-bootstrap/Form";
import Input from '../components/Input';
import FileInput from '../components/FileInput';
import Button from "react-bootstrap/Button";
import axios from 'axios';
import FormLabel from "react-bootstrap/FormLabel";
import {Row, Col} from "react-bootstrap";
import {Redirect} from 'react-router-dom';
import PageBody from "../components/PageBody";
function Admin() {
    const [formData, setFormData] = useState({});
    const [redirect, setRedirect] = useState(false);

    function handleOnChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        return e.target.value;
    }

    function onFile(e) {
        let newFiles = [];
        if (formData.files) {
            newFiles = [...formData.files];
        }
        setFormData({...formData, files: [...newFiles, e]});
    }

    function onFileDelete(id) {
        let {files} = formData;
        setFormData({...formData, files: [...files]});
    }

    async function onSubmit() {
        const filesForm = new FormData();
        for (let i = 0; i < formData.files.length; i++) {
            filesForm.append(`photos`, formData.files[i].file);
        }
        try {
            const filesResponse = await axios.post(
                'http://localhost:5000/articles/upload',
                filesForm,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            console.log('FILES RESPONSE', filesResponse);
            const postData = {...formData, images: filesResponse.data};
            delete postData.files;
            console.log('POST DATA', postData);
            const response = await axios.post('http://localhost:5000/articles/createArticle', postData);
            console.log(response);
            console.log('Success on adding post');
            setRedirect(true);
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <PageBody>
            <Flex justify="center">
                <Form style={{width: 800}}>
                    <Flex column>
                        <Box>
                            <h3>Cover Photo(s)</h3>
                        </Box>
                        <Box style={{width: '100%', height: 200}}>
                            <FileInput onFile={onFile} onFileDelete={onFileDelete}/>
                        </Box>
                    </Flex>
                    <Input onChange={handleOnChange} label={<h3>Title</h3>} name='title'/>
                    <Input onChange={handleOnChange} label={<h3>Subtitle</h3>} name='subtitle'/>
                    <Input onChange={handleOnChange} label={<h3>Body</h3>} name='body' as='textarea'/>
                    <FormLabel>
                        <h3>Author Name</h3>
                    </FormLabel>
                    <Row>
                        <Col>
                            <Input onChange={handleOnChange} label='First' name='authorFirst'/>
                        </Col>
                        <Col>
                            <Input onChange={handleOnChange} label='Last' name='authorLast'/>
                        </Col>
                    </Row>
                    <Flex justify="flex-end">
                        <Button onClick={onSubmit}>Submit</Button>
                    </Flex>
                </Form>
            </Flex>
            {redirect && <Redirect to="/"/>}
        </PageBody>
    )
}

export default Admin;
