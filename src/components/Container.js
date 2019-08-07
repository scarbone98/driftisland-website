import React from 'react';
import './_container.scss';
const Container = React.forwardRef((props, ref) => {
    const {children} = props;
    return (
        <div ref={ref} className="container-outer">
            <div className="container-inner" {...props}>
                {children}
            </div>
        </div>
    )
});

export default Container;
