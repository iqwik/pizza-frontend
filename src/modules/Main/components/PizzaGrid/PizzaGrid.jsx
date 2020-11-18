import React, { useMemo, useRef } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { cn } from '@bem-react/classname'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { formatCurrency } from '../../../../common/constans'
import * as selectors from '../../model/selectors'
import * as actionsCart from '../../../Cart/model/actions'
import 'primereact/components/toast/Toast.css'
import './PizzaGrid.scss'

const className = cn('Pizza-Grid')

const PizzaGrid = ({
    currency,
    pizzas,
    updateCart,
}) => {
    const successDialog = useRef(null)

    const addToCart = (item) => {
        updateCart('add', item)
        successDialog.current.show({
            severity: 'success',
            summary: 'Added to Cart:',
            detail: `1 x ${item.title} (${formatCurrency(item.cost[currency], currency)})`,
        })
    }

    const renderPizzas = useMemo(() => (
        pizzas.map(({
            id,
            title,
            description,
            image,
            prices,
        }) => {
            const img = `/assets/img/${image}`
            const cost = JSON.parse(prices)
            const pizza = {
                id,
                title,
                img,
                cost,
            }
            return (
                <article key={`pizza-${id}`}>
                    <main>
                        <figure>
                            <img src={img} alt={title} />
                        </figure>
                        <h2>{title}</h2>
                        <p>{description}</p>
                    </main>
                    <footer>
                        {cost?.[currency] > 0 ? (
                            <>
                                <div className={className('MoneyWrapper')}>
                                    <span className={className('Money')}>
                                        <span className={className('Money-Value')}>
                                            {formatCurrency(cost[currency], currency)}
                                        </span>
                                    </span>
                                </div>
                                <div className={className('ButtonWrapper')}>
                                    <Button
                                        className={className('Button')}
                                        label="Order Now"
                                        onClick={() => addToCart(pizza)}
                                        />
                                </div>
                            </>
                        ) : (
                            <div className={className('NotAvailable')}>
                                Not Available
                            </div>
                        )}
                    </footer>
                </article>
            )
        })
        // eslint-disable-next-line
    ), [pizzas, currency])

    return (
        <>
            <main className={className('')}>
                {renderPizzas}
            </main>
            <Toast
                className={className('Toast-Success')}
                ref={successDialog}
                style={{ maxWidth: '25rem', width: '100%' }}
                />
        </>
    )
}

PizzaGrid.propTypes = {
    currency: PropTypes.string.isRequired,
    pizzas: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    updateCart: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    currency: selectors.getCurrency(state),
    pizzas: selectors.getPizzaItems(state),
})

const mapDispatchToProps = ({
    updateCart: actionsCart.updateCart,
})

export default connect(mapStateToProps, mapDispatchToProps)(PizzaGrid)
