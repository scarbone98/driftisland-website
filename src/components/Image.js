import React from 'react';
import Img from 'react-image';
import ContentLoader from "react-content-loader";
import Image from "react-bootstrap/Image";
export default function r(props) {
    return (
        <Image
            fluid
            {...props}
            style={{width: '100%', objectFit: 'cover'}}
            loader={
                <ContentLoader
                    height={357}
                    width={600}
                    speed={2}
                    primaryColor="#f3f3f3"
                    secondaryColor="#ecebeb"
                >
                    <rect x="133" y="79" rx="0" ry="0" width="0" height="0" />
                    <rect x="3" y="2" rx="0" ry="0" width="559" height="357" />
                    <rect x="133" y="163" rx="0" ry="0" width="0" height="0" />
                </ContentLoader>
            }
        />
    )
}
