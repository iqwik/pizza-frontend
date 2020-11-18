import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from 'primereact/button'
import CartDialog from './components/CartDialog'
import * as selectorsCart from '../../../../../Cart/model/selectors'
import './CartButton.scss'

const CartButton = ({ cart }) => {
    const [count, setCount] = useState(null)
    useEffect(() => setCount(`${cart?.quantity || ''}`), [cart])
    const cartDialog = useRef(null)
    return (
        <>
            <Button
                aria-controls="cartDialog"
                badge={count}
                className="Cart-Button"
                label="Cart"
                onClick={(e) => cartDialog.current.toggle(e)}
                />
            <CartDialog
                id="cartDialog"
                ref={cartDialog}
                showCloseIcon
                style={{ width: '360px' }}
                />
        </>
    )
}

CartButton.propTypes = {
    cart: PropTypes.shape({
        quantity: PropTypes.number,
    }),
}

CartButton.defaultProps = {
    cart: {},
}

const mapStateToProps = (state) => ({
    cart: selectorsCart.getCart(state),
})

export default connect(mapStateToProps)(CartButton)
