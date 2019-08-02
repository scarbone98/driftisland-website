import Container from "./Container";
import Image from "./Image";
import React, {useState, useRef, useEffect} from "react";
import {Flex, Box} from 'reflexbox';
import './_header.scss';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
export default function Header() {
    const ref = useRef(null);
    const [expanded, setExpanded] = useState(false);
    function checkScroll(e) {
        if (window.scrollY >= ref.current.offsetTop && !expanded) {
            setExpanded(true);
        } else if(window.scrollY < ref.current.offsetTop) {
            setExpanded(false);
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', checkScroll);
        return () => {
            window.removeEventListener('scroll');
        }
    }, []);
    const expandedClass = expanded ? 'expanded' : '';
    return (
        <div className={classNames('top-bar-container', {expanded: expanded})}>
            <Container>
                <Flex className={classNames('inner-container', {expanded: expanded})} align="center" justify="space-between" column={!expanded}>
                    <Link to="/">
                        <div className="header-logo" style={{width: expandedClass ? 50 : 100, height: expandedClass ? 50 : 100}}>
                            <Image
                                src="/LogoGrande.png"/>
                        </div>
                    </Link>
                    <div ref={ref} className={classNames('header-nav-links', {expanded: expanded})} style={{width: '100%'}}>
                        <a href="#">About</a>
                        <a href="#">Store</a>
                        <a href="#">Search</a>
                        <a href="#">Join</a>
                    </div>
                </Flex>
            </Container>
        </div>
    )
}