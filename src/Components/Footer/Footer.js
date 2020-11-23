import React from 'react';
import classes from './Footer.module.css';

const Footer = (props) => {
    return (
        <footer className={classes.Footer}>
            &#169; Michael Mamuric.
            Questions? &nbsp;<a href="mailto:michael.mamuric@gmail.com">Send me an e-mail!</a>
        </footer>
    );
}

export default Footer;