import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const Logout = (props) => {
    const { logout } = props;

    useEffect(() => {
        logout();
    }, [logout])

    return (
        <div>
            Thank you for visiting!
        </div>
    );
}


const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(actions.logoutUser())
    }
}

export default connect(null, mapDispatchToProps)(Logout);