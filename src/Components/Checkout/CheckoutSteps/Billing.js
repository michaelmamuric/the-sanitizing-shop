import React, { useRef } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import classes from '../Checkout.module.css';

const Billing = (props) => {

    // Destructure for easier referencing
    const { setActiveStep, billingFields, updateBillingField } = props;

    // Put checkout fields in an array
    const fields = [];
    for(let key in billingFields) {
        fields.push(
            {
                name: key,
                inputType: billingFields[key].inputType,
                label:  billingFields[key].label,
                value: billingFields[key].value,
                options: billingFields[key].options !== undefined ? billingFields[key].options : null
            }
        );
    }

    return (
        <Grid container spacing={2}>
        {
            fields.map((input, index) => {
                switch(input.inputType) {
                    case 'TextField': {
                        return (
                            <Grid key={index} item xs={12} sm={4} className={classes.BillingGrid}>
                                <TextField name={input.name} label={input.label} 
                                variant="outlined" className={classes.BillingInput} 
                                value={billingFields.[input.name].value}
                                onChange={(event) => updateBillingField(input.name, event.target.value)}
                                />
                            </Grid>                            
                        )
                    }
                    case 'Select': {
                        return (
                            <Grid key={index} item xs={12} sm={4} className={classes.BillingGrid}>
                                <FormControl variant="outlined" className={classes.BillingInput}>
                                <InputLabel>{input.label}</InputLabel>
                                <Select name={input.name} native 
                                    onChange={(event) => updateBillingField(input.name, event.target.value)}
                                >
                                    <option value=""></option>
                                    {
                                        input.options.map((option) => (
                                            <option key={option.key} value={option.key}>{option.value}</option>
                                        ))
                                    }    
                                </Select>
                                </FormControl>
                            </Grid>                            
                        )
                    }
                    default:
                        return null;
                }
            })
        }
            <Grid item xs={12} className={classes.BillingGrid}>
                <Button variant="contained" onClick={() => setActiveStep(1)}>
                    Proceed to Payment
                </Button>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = (state) => {
    return {
        billingFields: state.checkout.billingFields
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setActiveStep: (step) => dispatch(actions.setActiveStep(step)),
        updateBillingField: (field, value) => dispatch(actions.updateBillingField(field, value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Billing);