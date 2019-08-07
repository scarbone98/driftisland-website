import React from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {domainURL} from "../variables";
import Img from 'react-image';
import Card from "react-bootstrap/Card";
import moment from 'moment';
import './_article.scss';
import LinesEllipsis from 'react-lines-ellipsis';
import {Flex, Box} from 'reflexbox';

export default function Article({title, subtitle, body, image, id, author, createdAt}) {
    return (
        <Card style={{margin: '1rem'}}>
            {image &&
            <Card.Img
                variant="top"
                src={`${domainURL}/articles/image/${image}`}/>
            }
            <Card.Body>
                <div style={{paddingBottom: '1rem'}}>
                    <Card.Title>
                        {title}
                    </Card.Title>
                    <Card.Subtitle style={{color: 'gray'}}>{subtitle}</Card.Subtitle>
                </div>
                <Card.Text style={{lineHeight: '1.8rem'}}>
                    <LinesEllipsis
                        text={body}
                        maxLine='3'
                        ellipsis='...'
                        trimRight
                        basedOn='letters'
                    />
                </Card.Text>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    flex: 1,
                    justifyItems: 'center',
                    flexDirection: 'column',
                    alignItems: 'flex-end'
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <div style={{width: 25, height: 25, marginRight: '0.5rem'}}>
                            <Img
                                src={''}
                            />
                        </div>
                        <small className="text-muted">
                            - {author.first} {author.last}
                        </small>
                    </div>
                    <Flex justify="space-between" w={1}>
                        <Box>
                            <LinesEllipsis
                                text={`Created ${moment(createdAt).fromNow()} ago`}
                                maxLine='0'
                                ellipsis=''
                                trimRight
                                basedOn='letters'
                            />
                        </Box>
                        <Box>
                            <small className="text-muted">
                                <Link to={`/articles/${id}`} style={{color: 'black'}}>Read more >></Link>
                            </small>
                        </Box>
                    </Flex>
                </div>
            </Card.Body>
        </Card>
    );
}

Article.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    author: PropTypes.shape({
        first: PropTypes.string,
        last: PropTypes.string
    }),
    image: PropTypes.string,
    id: PropTypes.string.isRequired
};

Article.defaultProps = {};