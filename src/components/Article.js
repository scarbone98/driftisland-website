import React from 'react';
import Image from "./Image";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

export default function Article({title, subtitle, body, image, id, author}) {
    return (
        <div>
            <h2>
                {title}
            </h2>
            <h5>{subtitle}</h5>
            {image ?
                <Image
                    src={`http://localhost:5000/articles/image/${image}`}/>
                :
                <div>PLACEHOLDER</div>
            }
            <div>
                {body}
            </div>
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
                        {/*<Image*/}
                        {/*    src={`https://localhost:5000/articles/image/${article.images[0]}`}/>*/}
                    </div>
                    <span>{author.first} {author.last}</span>
                    <span>Samuel Carbone</span>
                </div>
                <Link to={`/articles/${id}`} style={{color: 'black'}}>Read more
                    >></Link>
            </div>
        </div>
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

Article.defaultProps = {

};