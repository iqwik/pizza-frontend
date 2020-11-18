import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as selectorsAuth from './modules/Auth/model/selectors'
import * as actionsAuth from './modules/Auth/model/actions'
import * as selectorsCart from './modules/Cart/model/selectors'
import * as actionsCart from './modules/Cart/model/actions'
import * as selectorsMain from './modules/Main/model/selectors'
import * as actionsMain from './modules/Main/model/actions'

const SubApp = ({
    children,
    checkToken,
    isAuthChecked,
    isCartLoaded,
    isPizzasLoaded,
    loadCart,
    loadPizzas,
    module,
}) => {
    useEffect(() => {
        if (module !== 'main' && !isAuthChecked) {
            checkToken()
        } else if (module === 'main' && !isPizzasLoaded) {
            loadPizzas()
        }
        // eslint-disable-next-line
    }, [isAuthChecked, isPizzasLoaded, module])

    useEffect(() => {
        if (!isCartLoaded) {
            loadCart()
        }
        // eslint-disable-next-line
    }, [isCartLoaded])

    return children
}

SubApp.propTypes = {
    checkToken: PropTypes.func.isRequired,
    children: PropTypes.node,
    isAuthChecked: PropTypes.bool.isRequired,
    isCartLoaded: PropTypes.bool.isRequired,
    isPizzasLoaded: PropTypes.bool.isRequired,
    loadCart: PropTypes.func.isRequired,
    loadPizzas: PropTypes.func.isRequired,
    module: PropTypes.string,
}

SubApp.defaultProps = {
    children: null,
    module: null,
}

const mapStateToProps = (state) => ({
    isAuthChecked: selectorsAuth.getIsAuthChecked(state),
    isCartLoaded: selectorsCart.getIsCartLoaded(state),
    isPizzasLoaded: selectorsMain.getIsPizzasLoaded(state),
})

const mapDispatchToProps = ({
    checkToken: actionsAuth.checkToken,
    loadCart: actionsCart.loadCart,
    loadPizzas: actionsMain.loadPizzas,
})

export default connect(mapStateToProps, mapDispatchToProps)(SubApp)
