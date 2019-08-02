import React, {useState} from 'react';
import './_fileInput.scss';
import {Flex, Box} from 'reflexbox';
import _ from 'lodash';
import uuidv4 from 'uuid/v4';
import Image from "./Image";

export default function FileInput(props) {
    const [onDrag, setOnDrag] = useState(false);
    const [images, setImages] = useState([]);

    function handleDrop(e) {
        e.preventDefault();
        setOnDrag(false);
        let dt = e.dataTransfer;
        let files = dt.files;
        if (!files) return;
        for (let i = 0; i < files.length; i++) {
            const fileReader = new FileReader();
            const id = uuidv4();
            props.onFile({file: files[i], id});
            fileReader.onload = function (e) {
                setImages([...images, {file: e.target.result, id}]);
            };
            fileReader.readAsDataURL(files[i]);
        }
    }

    function onChange(e) {
        e.preventDefault();
        setOnDrag(false);
        let file = e.target.files[0];
        if (!file) return;
        const fileReader = new FileReader();
        const id = uuidv4();
        props.onFile({file, id});
        fileReader.onload = function (e) {
            setImages([...images, {file: e.target.result, id: id}]);
        };
        fileReader.readAsDataURL(file);
    }

    return (
        <div className={`file-input-container ${onDrag ? 'highlight' : ''}`}>
            <Flex
                justify="center"
                align="center"
                style={{
                    height: '100%',
                    position: 'relative',
                    flexWrap: 'wrap'
                }}
                onDragEnter={() => setOnDrag(true)}
                onDragLeave={() => setOnDrag(false)}
                onDrop={handleDrop}
                onChange={onChange}
            >
                {!images.length && <div>Drop file(s)</div>}
                <input type="file" accept="image/*"/>
                {
                    images.map((image) => {
                        const {id, file} = image;
                        return (
                            <div key={image.id} style={{position: 'relative'}}>
                                <div style={{position: 'absolute', right: 0, top: -25, color: 'black'}}>
                                    <h4
                                        onClick={(e) => {
                                            e.preventDefault();
                                            props.onFileDelete(id);
                                            let imageCopy = images.filter(image => image.id !== id);
                                            setImages(imageCopy);
                                        }}
                                        style={{cursor: 'pointer'}}
                                    >X</h4>
                                </div>
                                <div style={{width: 200}}>
                                    <Image key={id} src={file} alt="Car"/>
                                </div>
                            </div>
                        )
                    })
                }
            </Flex>
        </div>
    )
}

