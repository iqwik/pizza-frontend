import React, {
    useCallback,
    useEffect,
    useMemo,
} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { cn } from '@bem-react/classname'
import { formatCurrency } from '../../../../common/constans'
import * as selectors from '../../model/selectors'
import * as actions from '../../model/actions'
import '../../../Cart/components/OrderCart/OrderCart.scss'
import './History.scss'

const className = cn('History')

const History = ({
    isHistoryOrdersLoaded,
    loadUserHistoryOrders,
    userHistoryOrders,
}) => {
    useEffect(() => {
        if (!isHistoryOrdersLoaded) {
            loadUserHistoryOrders()
        }
        // eslint-disable-next-line
    }, [isHistoryOrdersLoaded])

    const renderOrders = useMemo(() => (
        // eslint-disable-next-line
        userHistoryOrders.map(({ comment, date, delivery, deliveryAddress, items, selectedCurrency }, i) => {
            let sum = 0
            return (
                <article key={`order-${i}`}>
                    <div className={[className('Col'), className('Items')].join(' ')}>
                        {Object.entries(items).map(([ix, { cost, title, qty }]) => {
                            sum += cost[selectedCurrency]
                            return (
                                <div key={`item-order-${ix}`}>
                                    <h3>{title}</h3>
                                    <p>{formatCurrency(cost[selectedCurrency], selectedCurrency)} x {qty}</p>
                                </div>
                            )
                        })}
                    </div>
                    <div className={[className('Col'), className('Totals')].join(' ')}>
                        <div>
                            <p><b>subtotal:</b></p>
                            <p>{formatCurrency(sum, selectedCurrency)}</p>
                        </div>
                        <div>
                            <p><b>delivery:</b></p>
                            <p>{formatCurrency(delivery[selectedCurrency], selectedCurrency)}</p>
                        </div>
                        <div>
                            <p><b>total:</b></p>
                            <p>{formatCurrency(sum + delivery[selectedCurrency], selectedCurrency)}</p>
                        </div>
                    </div>
                    <div className={[className('Col'), className('Delivery')].join(' ')}>
                        <p>{deliveryAddress}</p>
                    </div>
                    <div className={[className('Col'), className('Date')].join(' ')}>
                        <p>{date}</p>
                    </div>
                </article>
            )
        })
    ), [userHistoryOrders])

    const renderHistoryOrders = useCallback(() => (
        userHistoryOrders?.length ? renderOrders : <p>{'Doesn\'t'} have orders yet</p>
        // eslint-disable-next-line
    ), [userHistoryOrders])

    return (
        <main className={[className(), 'Order-Cart'].join(' ')}>
            <h2>Your history of orders</h2>
            <section className="Order-Cart-Grid">
                {renderHistoryOrders()}
            </section>
            <section className="Order-Cart-Nav-Buttons">
                <NavLink className="Order-Cart-Home-Link" to="/">
                    Choose Pizza
                </NavLink>
            </section>
        </main>
    )
}

History.propTypes = {
    isHistoryOrdersLoaded: PropTypes.bool.isRequired,
    loadUserHistoryOrders: PropTypes.func.isRequired,
    userHistoryOrders: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}

const mapStateToProps = (state) => ({
    isHistoryOrdersLoaded: selectors.getIsHistoryOrdersLoaded(state),
    userHistoryOrders: selectors.getUserHistoryOrders(state),
})

const mapDispatchToProps = {
    loadUserHistoryOrders: actions.loadUserHistoryOrders,
}

export default connect(mapStateToProps, mapDispatchToProps)(History)
