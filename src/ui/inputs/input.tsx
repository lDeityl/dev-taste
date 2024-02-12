import React, { CSSProperties, Dispatch, ForwardedRef, HTMLAttributes, MouseEventHandler, SetStateAction, ChangeEvent, HTMLInputTypeAttribute } from 'react';
import styles from './inputs.module.scss'
import { FieldError, FieldErrors, FieldValues, RegisterOptions } from "react-hook-form";
import { Error } from '../error/index';
import { CiSearch } from "react-icons/ci";
import { MdOutlineLocationOn } from "react-icons/md";

interface Input extends React.HTMLAttributes<HTMLInputElement> {
    value?: any
    type: "password" | "text" | "email" | 'date' | 'number'
    name?: string
    register?: any
    error?: FieldError | undefined
    autoComplete?: string
    label?: string
    currency?: string
    search?: boolean
}

interface InputCurrency extends React.HTMLAttributes<HTMLInputElement> {
    type: "password" | "text" | "email" | 'date' | 'number'
    name?: string
    register?: any
    error?: FieldError | undefined
    label: string
    currency: string
    value?: any
}

const withStyle = (styleName: string) => {
    return ({ search, value, register, name, error, label, type, className, ...rest }: Input) => {
        return (
            <div className={`${styles.basis} ${styles[styleName]} ${className}`}>
                {label &&
                    <label className={styles.label}>
                        {label}
                    </label>
                }
                {search ?
                    <div className={styles.inputBox}>
                        <MdOutlineLocationOn />
                        <input {...register?.(name, {
                            valueAsNumber: type === "number"
                        })} value={value} type={type} {...rest} className={error?.message && styles.error} />
                        <CiSearch />
                    </div>
                    :
                    <input {...register?.(name, {
                        valueAsNumber: type === "number"
                    })} value={value} type={type} {...rest} className={error?.message && styles.error} />
                }

                <Error isVisible={!!error?.message}>{error?.message}</Error>
            </div>
        );
    };
};

export const Input = withStyle("wrapperInput")
export const InputSearch = withStyle("InputSearch")