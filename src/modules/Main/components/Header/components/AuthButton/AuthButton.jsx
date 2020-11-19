import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom'
import Dropdown from '../../../../../../common/Dropdown'
import * as selectors from '../../../../../Auth/model/selectors'
import * as actions from '../../../../../Auth/model/actions'
import './AuthButton.scss'

const authMenu = [
    { id: 1, value: 'History' },
    { id: 2, value: 'Log out' },
]

const AuthButton = ({ logoutUser, userData }) => {
    const [dropdownValue, setDropdownValue] = useState(null)
    const [doRedirect, setDoRedirect] = useState(false)

    useEffect(() => {
        if (dropdownValue === 'History') {
            setDoRedirect(dropdownValue)
        } else if (dropdownValue === 'Log out') {
            logoutUser()
        }
    }, [dropdownValue])

    return (
        userData?.id ? (
            <>
                <Dropdown
                    className="Dropdown Auth-Button"
                    optionLabel="value"
                    optionValue="value"
                    options={authMenu}
                    placeholder={userData.name}
                    onChange={({ value }) => setDropdownValue(value)}
                    style={{ marginRight: '10px' }}
                    />
                {doRedirect ? <Redirect to="/auth" /> : null}
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
