import React, { useCallback, useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { cn } from '@bem-react/classname'
import { Button } from 'primereact/button'
import { deliveryCost, formatCurrency } from '../../../../common/constans'
import TrashBasketIcon from '../../../../common/TrashBasketIcon'
import InputNumber from '../../../../common/InputNumber'
import * as selectors from '../../model/selectors'
import * as selectorsMain from '../../../Main/model/selectors'
import * as actions from '../../model/actions'
import './OrderCart.scss'

const className = cn('Order-Cart')

const OrderCart = ({
    cart,
    currency,
    updateCart,
    setShowCheckoutDialog,
}) => {
    const [totalSum, setTotalSum] = useState(0)

    const renderItems = useMemo(() => {
        let sum = 0
        const result = cart?.items ? Object.entries(cart.items).map(([id, item]) => {
            sum += (item.cost[currency] * item.qty)
            return (
                <article key={`pizza-cart-${id}`}>
                    <img src={item.img} alt={item.title} />
                    <div className={className('Details')}>
                        <h3>{item.title}</h3>
                    </div>
                    <div className={className('Number-Counter')}>
                        <InputNumber
                            value={item.qty}
                            onValueChange={({ value }) => updateCart('update', item, value)}
                            />
                    </div>
                    <div className={className('Price')}>
                        {formatCurrency((item.cost[currency] * item.qty), currency)}
                    </div>
                    <div className={className('Counter')}>
                        <TrashBasketIcon onClick={() => updateCart('remove', item)} />
                    </div>
                </article>
            )
        }) : []
        setTotalSum(sum)
        return result
    }, [cart.items, currency, updateCart])

    const renderCartItems = useCallback(() => (
        cart?.quantity > 0 ? (
            <div>
                {renderItems}
            </div>
        ) : (
            <>
                <p>
                    Your cart is currently empty, but your stomach doesn&apos;t have to be.<br />
                    Add some items and come back here to checkout.
                </p>
            </>
        )
        // eslint-disable-next-line
    ), [cart, currency])

    return (
        <main className={className()}>
            <h2>Cart</h2>
            <section className={className('Grid')}>
                {renderCartItems()}
            </section>
            <section className={className('Grid-Footer')}>
                <div className={className('Totals')}>
                    {cart?.quantity > 0 && (
                        <>
                            <div>
                                <h5>Subtotal:</h5>
                                <span>{formatCurrency(totalSum, currency)}</span>
                            </div>
                            <div>
                                <h5>Delivery:</h5>
                                <span>{formatCurrency(deliveryCost[currency], currency)}</span>
                            </div>
                        </>
                    )}
                    <div>
                        <h4>Total:</h4>
                        <span className={className('Total-Sum')}>
                            {formatCurrency(totalSum + (cart?.quantity > 0 && deliveryCost[currency]), currency)}
                        </span>
                    </div>
                </div>
            </section>
            <section className={className('Nav-Buttons')}>
                <NavLink className={className('Home-Link')} to="/">
                    Choose Pizza
                </NavLink>
                <Button
                    className="Cart-Button"
                    label="Checkout"
                    disabled={!cart?.quantity}
                    onClick={() => setShowCheckoutDialog(true)}
                    />
            </section>
        </main>
    )
}

OrderCart.propTypes = {
    cart: PropTypes.shape({
        items: PropTypes.shape({}),
        quantity: PropTypes.number,
    }).isRequired,
    updateCart: PropTypes.func.isRequired,
    currency: PropTypes.string.isRequired,
    setShowCheckoutDialog: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    cart: selectors.getCart(state),
    currency: selectorsMain.getCurrency(state),
})

const mapDispatchToProps = ({
    updateCart: actions.updateCart,
    setShowCheckoutDialog: actions.setShowCheckoutDialog,
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderCart)
