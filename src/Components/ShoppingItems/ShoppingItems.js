import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const ShoppingItems = (props) => {
    
    // Destructure for easier referencing
    const { loadProducts } = props;

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    return (
        <div>
            Shopping Items Will Go Here!
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadProducts: () => dispatch(actions.fetchProducts())
    }
}

export default connect(null, mapDispatchToProps)(ShoppingItems);