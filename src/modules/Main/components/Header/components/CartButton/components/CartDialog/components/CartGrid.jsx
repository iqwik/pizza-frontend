import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { cn } from '@bem-react/classname'
import TrashBasketIcon from '../../../../../../../../../common/TrashBasketIcon'
import InputNumber from '../../../../../../../../../common/InputNumber'
import { formatCurrency } from '../../../../../../../../../common/constans'
import * as selectors from '../../../../../../../model/selectors'
import * as selectorsCart from '../../../../../../../../Cart/model/selectors'
import * as actionsCart from '../../../../../../../../Cart/model/actions'
import './CartGrid.scss'

const className = cn('Cart-Grid')

const CartGrid = ({
    cart,
    currency,
    updateCart,
}) => {
    const renderItems = useMemo(() => Object.entries(cart?.items || {}).map(([id, item]) => (
        <article className={[className('Flex'), className('Item')].join(' ')} key={`pizza-cart-${id}`}>
            <figure>
                <img className={className('Thumb')} src={item.img} alt={item.title} />
            </figure>
            <div className={className('Col-2')}>
                <div className={[className('Flex'), className('W-100')].join(' ')}>
                    <h5 className={className('Item-Title')}>{item.title}</h5>
                    <TrashBasketIcon onClick={() => updateCart('remove', item)} />
                </div>
                <div className={className('Item-Cost')}>
                    <InputNumber
                        value={item.qty}
                        onValueChange={({ value }) => updateCart('update', item, value)}
                        />
                    <span className={className('Price')}>
                        {formatCurrency((item.cost[currency] * item.qty), currency)}
                    </span>
                </div>
            </div>
        </article>
    )), [cart.items, currency, updateCart])

    const renderCartData = useCallback(() => (
        cart?.items && cart?.quantity > 0 ? (
            <>
                <div className={className('Articles')}>{renderItems}</div>
                <NavLink className="Pizza-Grid-Button" to="cart">Go to Cart</NavLink>
            </>
        ) : (
            <p>
                Your cart is currently empty, but your stomach doesn&apos;t have to be.
                Add some items and come back here to checkout.
            </p>
        )
        // eslint-disable-next-line
    ), [cart])

    return (
        <div className={className()}>
            <h3>Your cart</h3>
            <div>{renderCartData()}</div>
        </div>
    )
}

CartGrid.propTypes = {
    cart: PropTypes.shape({
        items: PropTypes.shape({}),
        quantity: PropTypes.number,
    }).isRequired,
    updateCart: PropTypes.func.isRequired,
    currency: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
    cart: selectorsCart.getCart(state),
    currency: selectors.getCurrency(state),
})

const mapDispatchToProps = ({
    updateCart: actionsCart.updateCart,
})

export default connect(mapStateToProps, mapDispatchToProps)(CartGrid)
