import React from 'react';
import './_container.scss';
const Container = React.forwardRef((props, ref) => {
    const {children} = props;
    return (
        <div ref={ref} className="container-outer" {...props}>
            <div className="container-inner">
                {children}
            </div>
        </div>
    )
});

export default Container;
