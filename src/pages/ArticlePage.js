import React, {useState, useEffect} from 'react';
import Container from "../components/Container";
import {Flex, Box} from 'reflexbox';
import Carousel from 'react-bootstrap/Carousel';
import Image from "../components/Image";
import PageBody from "../components/PageBody";
import {getArticle} from "../API";
import {domainURL} from "../variables";

export default function ArticlePage(props) {
    const [post, setPost] = useState({images: []});
    useEffect(() => {
        const id = props.match.params.id;
        getArticle(id).then(data => setPost(data[0]));
    }, []);

    const {title, subtitle, body, images, authorFirst, authorLast} = post;
    console.log(post);
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
                                                    src={`${domainURL}/articles/image/${src}`}
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
                            {authorFirst || authorLast ?
                                <div>
                                    <span>{authorFirst} {authorLast}</span>
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