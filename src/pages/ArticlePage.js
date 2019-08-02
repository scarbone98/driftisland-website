import React, {useState, useEffect} from 'react';
import Container from "../components/Container";
import axios from 'axios';
import queryString from 'query-string';
import {Flex, Box} from 'reflexbox';
import Carousel from 'react-bootstrap/Carousel';
import Image from "../components/Image";
import PageBody from "../components/PageBody";
import {getArticle} from "../API";

export default function ArticlePage(props) {
    const [post, setPost] = useState({images: []});
    useEffect(() => {
        const id = props.match.params.id;
        getArticle(id).then(data => setPost(data[0]));
    }, []);

    const {title, subtitle, body, images, author} = post;
    return (
        <PageBody>
            <Container>
                <Flex column>
                    <h1>{title}</h1>
                    <Flex>
                        <Box w={1}>
                            <Carousel style={{width: '100%'}}>
                                {
                                    images.map(src => {
                                        return (
                                            <Carousel.Item id={src} style={{width: '100%'}}>
                                                <Image
                                                    src={`http://localhost:5000/articles/image/${src}`}
                                                    alt="First slide"
                                                />
                                                <Carousel.Caption>
                                                    <h3>First slide label</h3>
                                                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                                </Carousel.Caption>
                                            </Carousel.Item>
                                        )
                                    })
                                }
                            </Carousel>
                        </Box>
                    </Flex>
                    <h5>{subtitle}</h5>
                    <span>{body}</span>
                    <Flex justify="flex-end">
                        <Box>
                            {!!author ?
                                <div>
                                    <span>{author.fisrtName}</span>
                                    <span>{author.lastName}</span>
                                </div>
                                :
                                <span>Anonymous</span>
                            }
                        </Box>
                    </Flex>
                </Flex>
            </Container>
        </PageBody>
    )
}