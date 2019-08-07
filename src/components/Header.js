import Container from "./Container";
import Image from "./Image";
import React, {useState, useRef, useEffect} from "react";
import {Flex, Box} from 'reflexbox';
import './_header.scss';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import {FaInstagram, FaYoutube, FaFacebookSquare} from 'react-icons/fa';

export default function Header() {
    const ref = useRef(null);
    const [expanded, setExpanded] = useState(false);
    const [selectedNavLink, setSelectedNavLink] = useState(1);
    function checkScroll() {
        if (window.scrollY >= ref.current.offsetTop && !expanded) {
            setExpanded(true);
        } else if (window.scrollY < ref.current.offsetTop) {
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
                <Flex className={classNames('socials-container', {expanded: expanded})}>
                    <Box>
                        <a data-name="youtube"
                           href="https://www.youtube.com/channel/UCH5mtixeGvhyPsZkZrp1T7w?view_as=public&fbclid=IwAR2tJMJp_LBX72Vw0mR1aiIwWvIa2QFOJ1_hdaNAR1eFSXFymAkhOO_pBn8"
                           target="_blank">
                            <FaYoutube/>
                        </a>
                    </Box>
                    <Box>
                        <a data-name="instagram" href="https://www.instagram.com/driftisland/" target="_blank">
                            <FaInstagram/>
                        </a>
                    </Box>
                    <Box>
                        <a data-name="facebook" href="https://www.facebook.com/DriftIsland/" target="_blank">
                            <FaFacebookSquare/>
                        </a>
                    </Box>
                </Flex>
                <Flex className={classNames('inner-container', {expanded: expanded})} align="center"
                      justify="space-between" column={!expanded}>
                    <Link to="/">
                        <div className="header-logo"
                             style={{width: expandedClass ? 50 : 75, height: expandedClass ? 50 : 75}}>
                            <Image
                                src="/LogoGrande.png"/>
                        </div>
                    </Link>
                    <div ref={ref} className={classNames('header-nav-links', {expanded: expanded})}
                         style={{width: '100%'}}>
                        <Flex w={1} justify="space-around">
                            <Box>
                                <Link to="/about" className={classNames({selected: selectedNavLink === 0})} onClick={() => setSelectedNavLink(0)}>About</Link>
                            </Box>
                            <Box>
                                <Link to="/" className={classNames({selected: selectedNavLink === 1})} onClick={() => setSelectedNavLink(1)}>Home</Link>
                            </Box>
                            <Box>
                                <Link to="/store" className={classNames({selected: selectedNavLink === 2})} onClick={() => setSelectedNavLink(2)}>Store</Link>
                            </Box>
                            <Box>
                                <a href="#" className={classNames({selected: selectedNavLink === 3})}>Join</a>
                            </Box>
                        </Flex>
                    </div>
                </Flex>
            </Container>
        </div>
    )
}