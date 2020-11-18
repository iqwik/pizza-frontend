import React from 'react'
import { cn } from '@bem-react/classname'
import { Dropdown as PrimereactDropdown } from 'primereact/dropdown'
import 'primereact/components/dropdown/Dropdown.css'
import './Dropdown.scss'

const className = cn('Dropdown')

const Dropdown = ({ ...props }) => (
    <PrimereactDropdown className={className()} {...props} />
)

export default Dropdown
