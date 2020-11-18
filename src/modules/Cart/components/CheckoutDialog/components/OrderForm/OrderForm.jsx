import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { cn } from '@bem-react/classname'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { InputTextarea } from 'primereact/inputtextarea'
import { Checkbox } from 'primereact/checkbox'
import { Button } from 'primereact/button'
import {
    validName,
    validEmail,
    validPassword,
} from '../../../../../../common/constans'
import * as actions from '../../../../model/actions'
import 'primereact/components/checkbox/Checkbox.css'
import 'primereact/components/password/Password.css'
import './OrderForm.scss'

const className = cn('Order-Form')

const OrderForm = ({ sendOrder, userData }) => {
    const [name, setName] = useState(userData?.name || '')
    const [email, setEmail] = useState(userData?.email || '')
    const [street, setStreet] = useState(userData?.address?.street || '')
    const [house, setHouse] = useState(userData?.address?.house || '')
    const [apartment, setApartment] = useState(userData?.address?.apartment || '')
    const [entrance, setEntrance] = useState(userData?.address?.entrance || '')
    const [floor, setFloor] = useState(userData?.address?.floor || '')
    const [comment, setComment] = useState('')
    const [createAcc, setCreateAcc] = useState(!userData?.id)
    const [password, setPassword] = useState('')

    const checkName = useCallback(() => (!validName(name) && 'invalid'), [name])
    const checkEmail = useCallback(() => (!validEmail(email) && 'invalid'), [email])
    const checkPass = useCallback(() => (
        createAcc && !validPassword(password) && 'invalid'
        // eslint-disable-next-line
    ), [password])

    const disabledButton = useCallback(() => {
        let result = false
        if (createAcc && validName(name) && validEmail(email) && validPassword(password)) {
            result = true
        } else if (!createAcc && validName(name) && validEmail(email)) {
            result = true
        }
        return !(result)
    }, [createAcc, email, name, password])

    const sendForm = () => {
        const order = {
            data: {
                name,
                email,
                comment,
                address: {
                    street,
                    house,
                    apartment,
                    entrance,
                    floor,
                },
            },
        }
        if (createAcc) {
            order.data.password = password
        }
        if (userData?.id) {
            order.userId = userData.id
        }
        sendOrder(order)
    }

    return (
        <div className={className()}>
            <div className="field-grid f-col-2">
                <div className="field p-float-label">
                    <InputText
                        id="name"
                        value={name}
                        className={checkName()}
                        onChange={({ target }) => setName(target.value)}
                        />
                    <label htmlFor="name">Name<span className="req-star">*</span></label>
                </div>
                <div className="field p-float-label">
                    <InputText
                        type="email"
                        id="email"
                        className={checkEmail()}
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                        />
                    <label htmlFor="email">Email<span className="req-star">*</span></label>
                </div>
            </div>
            {!userData?.id ? (
                <>
                    <div className="field-grid">
                        <div className="field">
                            <Checkbox
                                inputId="createAcc"
                                checked={createAcc}
                                onChange={(e) => setCreateAcc(e.checked)}
                                />
                            <label className="checkbox-label" htmlFor="createAcc">Create an account</label>
                        </div>
                    </div>
                    {createAcc ? (
                        <div className="field-grid f-col-2">
                            <div className="field">
                                <div className="p-float-label">
                                    <Password
                                        feedback={false}
                                        id="password"
                                        className={checkPass()}
                                        value={password}
                                        onChange={({ target }) => setPassword(target.value)}
                                        />
                                    <label htmlFor="password">Password<span className="req-star">*</span></label>
                                </div>
                                <span className="p-small">Make sure {'it\'s'} at least 6 characters</span>
                            </div>
                            <div className="field">&nbsp;</div>
                        </div>
                    ) : null}
                </>
            ) : null}
            <div className="field-grid f-col-2">
                <div className="field maxi p-float-label">
                    <InputText
                        id="street"
                        value={street}
                        onChange={({ target }) => setStreet(target.value)}
                        />
                    <label htmlFor="street">Street</label>
                </div>
                <div className="field p-float-label">
                    <InputText
                        id="house"
                        value={house}
                        onChange={({ target }) => setHouse(target.value)}
                        />
                    <label htmlFor="house">House/Office</label>
                </div>
            </div>
            <div className="field-grid f-col-3">
                <div className="field p-float-label">
                    <InputText
                        id="apartment"
                        value={apartment}
                        onChange={({ target }) => setApartment(target.value)}
                        />
                    <label htmlFor="apartment">Apartment</label>
                </div>
                <div className="field p-float-label">
                    <InputText
                        id="entrance"
                        value={entrance}
                        onChange={({ target }) => setEntrance(target.value)}
                        />
                    <label htmlFor="entrance">Entrance</label>
                </div>
                <div className="field p-float-label">
                    <InputText
                        id="floor"
                        value={floor}
                        onChange={({ target }) => setFloor(target.value)}
                        />
                    <label htmlFor="floor">Floor</label>
                </div>
            </div>
            <div className="field-grid">
                <div className="field p-float-label">
                    <InputTextarea
                        id="comment"
                        value={comment}
                        onChange={({ target }) => setComment(target.value)}
                        />
                    <label htmlFor="comment">Order comment</label>
                </div>
            </div>
            <div className="field-grid">
                <div className="field">
                    <Button
                        className="Cart-Button"
                        label="Confirm"
                        disabled={disabledButton()}
                        onClick={() => sendForm()}
                        />
                </div>
            </div>
        </div>
    )
}

OrderForm.propTypes = {
    sendOrder: PropTypes.func.isRequired,
    userData: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        name: PropTypes.string,
        email: PropTypes.string,
        address: PropTypes.shape({
            street: PropTypes.string,
            house: PropTypes.string,
            apartment: PropTypes.string,
            entrance: PropTypes.string,
            floor: PropTypes.string,
        }),
    }),
}

OrderForm.defaultProps = {
    userData: {},
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
    sendOrder: actions.sendOrder,
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm)
