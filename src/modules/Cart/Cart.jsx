import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../../common/Spinner'
import Header from '../Main/components/Header'
import OrderCart from './components/OrderCart'
import CheckoutDialog from './components/CheckoutDialog'
import SuccessDialog from '../../common/SuccessDialog'
import * as selectorsMain from '../Main/model/selectors'
import * as selectors from './model/selectors'
import * as actions from './model/actions'

const Cart = ({
    isCartLoaded,
    isLoading,
    successOrder,
    setSuccessOrder,
}) => (
    isCartLoaded && !isLoading ? (
        <>
            <Header cartButton={false} />
            <OrderCart />
            <CheckoutDialog />
            <SuccessDialog visible={successOrder} onHide={() => setSuccessOrder(false)}>
                <h1>We are already preparing your order...</h1>
            </SuccessDialog>
        </>
    ) : (
        <Spinner visible />
    )
)

Cart.propTypes = {
    isCartLoaded: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    successOrder: PropTypes.bool.isRequired,
    setSuccessOrder: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    isCartLoaded: selectors.getIsCartLoaded(state),
    isLoading: selectorsMain.getIsLoading(state),
    successOrder: selectors.getSuccessOrder(state),
})

const mapDispatchToProps = {
    setSuccessOrder: actions.setSuccessOrder,
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
