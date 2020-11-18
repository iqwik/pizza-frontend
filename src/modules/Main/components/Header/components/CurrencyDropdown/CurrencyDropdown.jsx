import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Dropdown from '../../../../../../common/Dropdown'
import { currencyList } from '../../../../../../common/constans'
import * as selectors from '../../../../model/selectors'
import * as actions from '../../../../model/actions'

const CurrencyDropdown = ({
    currency,
    setCurrency,
}) => (
    <Dropdown
        optionLabel="value"
        optionValue="value"
        options={currencyList}
        value={currency}
        onChange={({ value }) => setCurrency(value)}
        style={{ marginRight: '10px' }}
        />
)

CurrencyDropdown.propTypes = {
    currency: PropTypes.string.isRequired,
    setCurrency: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    currency: selectors.getCurrency(state),
})

const mapDispatchToProps = ({
    setCurrency: actions.setCurrency,
})

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyDropdown)
