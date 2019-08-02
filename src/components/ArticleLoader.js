import React from 'react';
import ContentLoader from "react-content-loader"

const MyLoader = () => {
    return (
        <ContentLoader
        height={400}
        width={600}
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
    >
        <rect x="45" y="62" rx="0" ry="0" width="503" height="225"/>
        <rect x="46" y="25" rx="0" ry="0" width="194" height="22"/>
        <rect x="49" y="299" rx="0" ry="0" width="483" height="8"/>
        <rect x="49" y="318" rx="0" ry="0" width="483" height="8"/>
        <rect x="49" y="336" rx="0" ry="0" width="483" height="8"/>
    </ContentLoader>
    )
};

export default MyLoader;