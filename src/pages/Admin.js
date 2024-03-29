import React, {useState} from 'react';
import './App.scss';
import {Flex, Box} from 'reflexbox';
import Form from "react-bootstrap/Form";
import Input from '../components/Input';
import FileInput from '../components/FileInput';
import Button from "react-bootstrap/Button";
import FormLabel from "react-bootstrap/FormLabel";
import {Row, Col} from "react-bootstrap";
import {Redirect} from 'react-router-dom';
import PageBody from "../components/PageBody";
import {uploadFiles, uploadArticle} from "../API";
import ProgressBar from "react-bootstrap/ProgressBar";
import CustomBody from "../components/CustomPostBody";
import EditableInputText from "../components/EditableInputText";

function Admin() {
    const [formData, setFormData] = useState({});
    const [redirect, setRedirect] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState({uploading: false, progress: 0});
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

    function progressHandler(progress) {
        let percentCompleted = Math.floor((progress.loaded * 100) / progress.total);
        setUploadProgress({uploading: true, progress: percentCompleted});
    }

    async function addFiles() {
        if (!formData.files || !formData.files.length) {
            return null;
        }
        const filesForm = new FormData();
        for (let i = 0; i < formData.files.length; i++) {
            filesForm.append(`photos`, formData.files[i].file);
        }
        try {
            return await uploadFiles(filesForm, progressHandler);
        } catch (e) {
            return null;
        }
    }

    async function onSubmit() {
        setLoading(true);
        try {
            let fileResponse = await addFiles() || [];
            console.log('FILES RESPONSE', fileResponse);
            const postData = {...formData, images: fileResponse.data};
            delete postData.files;
            const response = await uploadArticle(postData);
            setRedirect(true);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }
    console.log(formData);
    return (
        <PageBody>
            <Flex justify="center">
                <Form style={{width: 800}}>
                    {uploadProgress.uploading && <ProgressBar now={uploadProgress.progress} label={`${uploadProgress.progress}%`} />}
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
                    {/*<CustomBody/>*/}
                    {/*<EditableInputText onChange={handleOnChange} name='body'/>*/}
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
                        <Button onClick={onSubmit} disabled={isLoading}>Submit</Button>
                    </Flex>
                </Form>
            </Flex>
            {redirect && <Redirect to="/"/>}
        </PageBody>
    )
}

export default Admin;
