import React, { CSSProperties, Dispatch, ForwardedRef, HTMLAttributes, MouseEventHandler, SetStateAction, ChangeEvent, HTMLInputTypeAttribute, useState } from 'react';
import styles from './inputs.module.scss'
import { FieldError, FieldErrors, FieldValues, RegisterOptions } from "react-hook-form";
import { Error } from '../error/index';
import { CiSearch } from "react-icons/ci";
import { MdOutlineLocationOn } from "react-icons/md";
import { LuCross, LuEyeOff } from "react-icons/lu"; import { LuEye } from "react-icons/lu";
import { RxCross1 } from "react-icons/rx";
import { Link } from 'react-router-dom';
import { Fs18Fw400Gray } from '../../components/typography';

interface Input extends React.HTMLAttributes<HTMLInputElement> {
    value?: any
    type: "password" | "text" | "email" | 'date' | 'number'
    name?: string
    register?: any
    error?: FieldError | undefined
    autoComplete?: string
    label?: string
    reg?: boolean
    currency?: string
    search?: boolean
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


const withStylePassword = (styleName: string) => {

    return ({ value, register, name, error, label, placeholder, type, reg, className, ...rest }: Input) => {

        const [eye, setEye] = useState<boolean>(false);
        const inputType = eye ? 'text' : 'password';

        return (
            <div className={`${styles.basis} ${styles[styleName]} ${className}`}>
                {reg ?
                    <div className={styles.labels}>
                        <label>
                            {label}
                        </label>
                        <Link to={'/'}>
                            <Fs18Fw400Gray.span>Восстановить пароль</Fs18Fw400Gray.span>
                        </Link>
                    </div>
                    :
                    <label>
                        {label}
                    </label>}
                <input
                    {...register?.(name, {
                        valueAsNumber: type === 'number',
                    })}
                    value={value}
                    type={inputType}
                    {...rest}
                    className={error?.message && styles.error}
                    placeholder={placeholder}
                />
                {eye ?
                    <LuEye className={styles.svg} onClick={() => setEye((el) => !el)} />
                    :
                    <LuEyeOff className={styles.svg} onClick={() => setEye((el) => !el)} />
                }
                <Error isVisible={!!error?.message}>{error?.message}</Error>
            </div>
        );
    };
};

const withStyleClearableInput = (styleName: string) => {
    return ({
        value,
        register,
        name,
        error,
        label,
        placeholder,
        className,
        ...rest
    }: Input) => {
        const [inputValue, setInputValue] = useState<string>(value);

        const handleClearInput = () => {
            setInputValue('');
        };

        return (
            <div className={`${styles.basis} ${styles[styleName]} ${className}`}>
                <label>
                    {label}
                </label>
                <input
                    {...register?.(name)}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    {...rest}
                    className={error?.message ? styles.error : ''}
                    placeholder={placeholder}
                />
                {inputValue && (
                    <RxCross1 className={styles.svg} onClick={handleClearInput} />

                )}
                <Error isVisible={!!error?.message}>{error?.message}</Error>
            </div>
        );
    };
};

export const Input = withStyle("wrapperInput")
export const InputSearch = withStyle("InputSearch")
export const InputDark = withStyle("InputDark")
export const InputPassword = withStylePassword("InputPassword")
export const InputEmail = withStyleClearableInput("InputEmail")
export const InputPassword_1 = withStylePassword("InputPassword_1")