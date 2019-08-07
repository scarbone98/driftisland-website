import React from 'react';
import Container from './Container';
import './_footer.scss';
import {Link} from 'react-router-dom';
export default function Footer() {
    return (
        <div className="footer-container">
            <Container>
                <div>
                    <Link to="/terms">Terms & Conditions</Link>
                </div>
            </Container>
        </div>
    )
}