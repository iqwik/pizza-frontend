import React, {
    useCallback,
    useEffect,
    useState,
} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import {
    validName,
    validEmail,
    validPassword,
} from '../../../../common/constans'
import * as actions from '../../model/actions'
import 'primereact/components/password/Password.css'
import '../../../Cart/components/CheckoutDialog/components/OrderForm/OrderForm.scss'
import '../../Auth.scss'

const labelList = {
    'Sign up': 'Sign in',
    'Sign in': 'Sign up',
}

const Auth = ({ createUser, loginUser }) => {
    const [currentForm, setCurrentForm] = useState('Sign in')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if (name !== '') {
            setName('')
        }
        if (email !== '') {
            setEmail('')
        }
        if (password !== '') {
            setPassword('')
        }
        // eslint-disable-next-line
    }, [currentForm])

    const checkName = useCallback(() => (!validName(name) && 'invalid'), [name])
    const checkEmail = useCallback(() => (!validEmail(email) && 'invalid'), [email])
    const checkPass = useCallback(() => (!validPassword(password) && 'invalid'), [password])
    const disabledButton = useCallback(() => {
        let result = true
        if (validName(name) && validEmail(email) && validPassword(password)) {
            result = false
        }
        return currentForm === 'Sign up' ? result : false
    }, [currentForm, name, email, password])

    const onClickActionButton = () => (
        currentForm === 'Sign in' ? loginUser({ email, password }) : createUser({ name, email, password })
    )

    return (
        <div className="Auth">
            <div className="Order-Form">
                <h1>{currentForm === 'Sign up' ? 'Create your account' : currentForm}</h1>
                {currentForm === 'Sign up' ? (
                    <div className="field-grid">
                        <div className="field p-float-label">
                            <InputText
                                type="name"
                                id="name"
                                className={currentForm === 'Sign up' && checkName()}
                                value={name}
                                onChange={({ target }) => setName(target.value)}
                                />
                            <label htmlFor="name">
                                Name
                                {currentForm === 'Sign up' && <span className="req-star">*</span>}
                            </label>
                        </div>
                    </div>
                ) : null}
                <div className="field-grid">
                    <div className="field p-float-label">
                        <InputText
                            type="email"
                            id="email"
                            className={checkEmail()}
                            value={email}
                            onChange={({ target }) => setEmail(target.value)}
                            />
                        <label htmlFor="email">
                            Email
                            {currentForm === 'Sign up' && <span className="req-star">*</span>}
                        </label>
                    </div>
                </div>
                <div className="field-grid">
                    <div className="field">
                        <div className="p-float-label">
                            <Password
                                feedback={false}
                                id="password"
                                className={checkPass()}
                                value={password}
                                onChange={({ target }) => setPassword(target.value)}
                                />
                            <label htmlFor="password">
                                Password
                                {currentForm === 'Sign up' && <span className="req-star">*</span>}
                            </label>
                        </div>
                        {currentForm === 'Sign up' && (
                            <span className="p-small">Make sure {'it\'s'} at least 6 characters</span>
                        )}
                    </div>
                </div>
                <div className="field-grid f-col-2">
                    <div className="field">
                        <Button
                            className="Auth-Button"
                            label={labelList[currentForm]}
                            onClick={() => setCurrentForm(labelList[currentForm])}
                            />
                    </div>
                    <div className="field">
                        <Button
                            className="Cart-Button"
                            label={currentForm === 'Sign up' ? 'Create account' : currentForm}
                            disabled={disabledButton()}
                            onClick={() => (onClickActionButton())}
                            />
                    </div>
                </div>
            </div>
        </div>
    )
}

Auth.propTypes = {
    createUser: PropTypes.func.isRequired,
    loginUser: PropTypes.func.isRequired,
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
    createUser: actions.createUser,
    loginUser: actions.loginUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
