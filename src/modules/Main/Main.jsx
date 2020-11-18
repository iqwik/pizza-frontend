import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../../common/Spinner'
import Header from './components/Header'
import PizzaGrid from './components/PizzaGrid'
import * as selectors from './model/selectors'

const Main = ({ isLoading }) => (
    isLoading ? (
        <Spinner visible={isLoading} />
    ) : (
        <>
            <Header logoLink={false} />
            <PizzaGrid />
        </>
    )
)

Main.propTypes = {
    isLoading: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
    isLoading: selectors.getIsLoading(state),
})

export default connect(mapStateToProps)(Main)
