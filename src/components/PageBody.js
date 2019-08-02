import React, {useState, useEffect, useRef} from 'react';

const PageBody = React.forwardRef((props, ref) => {
    const {children} = props;
    const bodyRef = useRef(null);
    const [minHeight, setMinHeight] = useState(0);
    useEffect(() => {
        setMinHeight(window.innerHeight - bodyRef.current.offsetTop);
        window.scroll(0,0);
        const listener = window.addEventListener('resize', () => {
            if (bodyRef.current) {
                setMinHeight(window.innerHeight - bodyRef.current.offsetTop);
            }
        });
        return () => window.removeEventListener('resize', listener);
    },[]);
    return (
        <div ref={bodyRef} style={{minHeight: minHeight === 0 ? '100vh' : minHeight}}>
            {children}
        </div>
    )
});

export default PageBody;