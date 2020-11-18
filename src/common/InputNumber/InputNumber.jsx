import React from 'react'
import PropTypes from 'prop-types'
import { cn } from '@bem-react/classname'
import { InputNumber as PrimeReactInputNumber } from 'primereact/inputnumber'
import 'primereact/components/inputnumber/InputNumber.css'
import './InputNumber.scss'

const className = cn('Counter')

const InputNumber = ({ value, onValueChange }) => (
    <PrimeReactInputNumber
        readonly
        className={className()}
        value={value}
        onValueChange={onValueChange}
        showButtons
        buttonLayout="horizontal"
        decrementButtonClassName="p-counter-button"
        incrementButtonClassName="p-counter-button"
        incrementButtonIcon="pi pi-plus"
        decrementButtonIcon="pi pi-minus"
        min={1}
        max={30}
        />
)

InputNumber.propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onValueChange: PropTypes.func,
}

InputNumber.defaultProps = {
    value: null,
    onValueChange: () => {},
}

export default InputNumber
