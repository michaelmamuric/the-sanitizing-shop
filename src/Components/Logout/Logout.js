import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const Logout = (props) => {
    const { logout } = props;

    useEffect(() => {
        logout();
    }, [logout]);

    return (
        <Typography>
            Thank you for visiting! We hope that you enjoyed your shopping experience.
        </Typography>        
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(actions.logoutUser())
    }
}

export default connect(null, mapDispatchToProps)(Logout);