import React from 'react';
import { Redirect } from 'react-router-dom';

const Redirector = (props) => {
    return (
        <Redirect to={props.location} />
    )
}

export default Redirector;