import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Dropdown from '../../../../../../common/Dropdown'
import * as selectors from '../../../../../Auth/model/selectors'
import * as actions from '../../../../../Auth/model/actions'
import './AuthButton.scss'

const authMenu = [
    { id: 1, value: 'History' },
    { id: 2, value: 'Log out' },
]

const AuthButton = ({ logoutUser, userData }) => {
    const historyLink = useRef()
    const onChange = (value) => {
        if (value === 'History') {
            historyLink.current.click()
        } else if (value === 'Log out') {
            logoutUser()
        }
    }
    return (
        userData?.id ? (
            <>
                <Dropdown
                    className="Dropdown Auth-Button"
                    optionLabel="value"
                    optionValue="value"
                    options={authMenu}
                    placeholder={userData.name}
                    onChange={({ value }) => onChange(value)}
                    style={{ marginRight: '10px' }}
                    />
                <NavLink style={{ display: 'none' }} innerRef={historyLink} to="auth" />
            </>
        ) : (
            <NavLink className="Auth-Button" to="auth">Login</NavLink>
        )
    )
}

AuthButton.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    userData: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string,
    }).isRequired,
}

const mapStateToProps = (state) => ({
    userData: selectors.getUserData(state),
})

const mapDispatchToProps = {
    logoutUser: actions.logoutUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthButton)
