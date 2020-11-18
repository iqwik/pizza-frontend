import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Header from '../Main/components/Header'
import Spinner from '../../common/Spinner'
import AuthForm from './components/AuthForm'
import History from './components/History'
import * as selectors from './model/selectors'
import * as selectorsMain from '../Main/model/selectors'
import './Auth.scss'

const Auth = ({
    isLoading,
    isLoggedIn,
}) => (
    !isLoading ? (
        <>
            <Header
                authButton={isLoggedIn}
                currencyButton={false}
                cartButton={isLoggedIn}
                />
            {isLoggedIn ? <History /> : <AuthForm /> }
        </>
    ) : <Spinner visible />
)

Auth.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
    isLoading: selectorsMain.getIsLoading(state),
    isLoggedIn: selectors.getIsLoggedIn(state),
})

export default connect(mapStateToProps)(Auth)
