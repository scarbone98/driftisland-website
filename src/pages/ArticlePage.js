import React, {useState, useEffect, useMemo} from 'react';
import Container from "../components/Container";
import {Flex, Box} from 'reflexbox';
import Carousel from 'react-bootstrap/Carousel';
import CustomImage from "../components/Image";
import Image from "react-bootstrap/Image";
import PageBody from "../components/PageBody";
import {getArticle} from "../API";
import {domainURL} from "../variables";
import moment from 'moment';
import Dropdown from "react-bootstrap/Dropdown";
import classNames from 'classnames';
import './ArticlePage.scss';
import parse from 'html-react-parser';
export default function ArticlePage(props) {
    const [post, setPost] = useState({images: []});
    useEffect(() => {
        const id = props.match.params.id;
        getArticle(id).then(data => setPost(data[0]));
    }, []);

    const {title, subtitle, body, images, authorFirst, authorLast, createdAt} = post;
    const numberOfWords = useMemo(() => {
        if (body) {
            return Math.round(body.split(' ').length / 225);
        }
        return null;
    }, [body]);

    return (
        <PageBody>
            <Container style={{maxWidth: 750}}>
                <Flex column>
                    <Flex justify="flex-end" column style={{paddingBottom: '1rem'}}>
                        <h1>{title}</h1>
                        <h5>{subtitle}</h5>
                        <Flex align="center" className={classNames('post-meta-data')}>
                            <Box style={{width: 75, marginRight:'0.5rem'}}>
                                <Image
                                    roundedCircle
                                    fluid
                                    src="https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fdam%2Fimageserve%2F42977075%2F960x0.jpg%3Ffit%3Dscale"/>
                            </Box>
                            <Box>
                                <div>
                                    {authorFirst || authorLast ?
                                        <span>{authorFirst} {authorLast}</span>
                                        :
                                        <span>Anonymous</span>
                                    }
                                </div>
                                <div>
                                    {moment(createdAt).format('MMM Do, YYYY')} &middot; {numberOfWords &&
                                <span>{numberOfWords} min read</span>}
                                </div>
                            </Box>
                        </Flex>
                    </Flex>
                    <Dropdown.Divider/>
                    <Flex style={{paddingTop: '1rem', paddingBottom: '1rem'}} w={1}>
                        <Box w={1}>
                            <Carousel style={{width: '100%'}}>
                                {
                                    images.map(src => {
                                        return (
                                            <Carousel.Item id={src} style={{width: '100%'}}>
                                                <CustomImage
                                                    src={`${domainURL}/articles/image/${src}`}
                                                    alt="First slide"
                                                />
                                            </Carousel.Item>
                                        )
                                    })
                                }
                            </Carousel>
                        </Box>
                    </Flex>
                    {body && <p style={{whiteSpace: 'pre-line'}}>{parse(body.replace(/(?:\r\n|\r|\n)/g, '<br>'))}</p>}
                </Flex>
            </Container>
        </PageBody>
    )
}