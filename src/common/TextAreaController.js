import { useField } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'

const TextAreaController = ({ label, require, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    //   which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props)
    return (
        <>
            <label htmlFor={props.id || props.name}>
                <strong>{label}</strong>
                {require ? <span className="input-error">*</span> : ''}
            </label>
            <textarea className="text-area" {...field} {...props} />
            {meta.touched && meta.error ? <div className="text-danger">{meta.error}</div> : null}
        </>
    )
}

export default TextAreaController

TextAreaController.propTypes = {
    label: PropTypes.string,
}
