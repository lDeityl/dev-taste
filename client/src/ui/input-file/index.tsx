import React, { HTMLAttributes, useState } from 'react'
import styles from './index.module.scss'
import { FieldError } from 'react-hook-form'
import { Error } from '../error'
import { FontSizeIcon } from '@radix-ui/react-icons'
import { IoMdAdd } from 'react-icons/io'

interface Props extends HTMLAttributes<HTMLInputElement> {
    name?: string
    register?: any
    error?: FieldError | undefined
}

interface Props extends HTMLAttributes<HTMLInputElement> {
    name?: string
    register?: any
    error?: FieldError | undefined
    image?: string
}

export const InputFileLight = ({ register, name, error, children, className, image, ...rest }: Props) => {

    return (
        <>
            <label className={`${styles.base} ${styles.customFileUploadLight} ${className}`}>
                {image ? (
                    <img src={image} />
                ) : (
                    <>
                        <div className={styles.container}>
                            <div className={styles.circleContainer}>
                                <IoMdAdd />
                            </div>
                            {/* {children ? children : 'Upload'} */}
                        </div>
                    </>
                )}
                <input type="file" accept="image/png, image/jpeg, image/svg+xml, image/webp, image/avif"  {...register?.(name)} {...rest} className={error?.message && styles.error} />
            </label>
            <Error isVisible={!!error?.message}>{error?.message}</Error>
        </>
    )
}

export const InputFileLightVideo = ({ register, name, error, children, className, image, ...rest }: Props) => {

    return (
        <>
            <label className={`${styles.base} ${styles.customFileUploadLight} ${className}`}>
                {image ? (
                    <video width="364" height="145">
                        <source src={image} type="video/mp4" />
                    </video>
                ) : (
                    <>
                        <div className={styles.container}>
                            <div className={styles.circleContainer}>
                                <IoMdAdd />
                            </div>
                            {/* {children ? children : 'Upload'} */}
                        </div>
                    </>
                )}
                <input type="file" accept="video/mp4,video/x-m4v,video/*"  {...register?.(name)} {...rest} className={error?.message && styles.error} />
            </label>
            <Error isVisible={!!error?.message}>{error?.message}</Error>
        </>
    )
}

interface PropsDocuments extends HTMLAttributes<HTMLInputElement> {
    name?: string
    register?: any
    error?: FieldError | undefined
    fileName?: string
}

export const InputFileDocumentsLight = ({ register, name, error, children, className, fileName, ...rest }: PropsDocuments) => {

    return (
        <>
            <label className={`${styles.base} ${styles.customFileUploadLightDocument} ${className}`}>
                {fileName ? (
                    <span>{fileName}</span>
                ) : (
                    <>
                        <div className={styles.container}>
                            <div className={styles.circleContainer}>
                                <IoMdAdd />
                            </div>
                            {/* {children ? children : 'Upload'} */}
                        </div>
                    </>
                )}
                <input type="file" accept="application/pdf, application/msword, 
                              application/vnd.openxmlformats-officedocument.wordprocessingml.document, 
                              application/vnd.ms-excel, 
                              application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, 
                              application/vnd.ms-powerpoint, 
                              application/vnd.openxmlformats-officedocument.presentationml.presentation, 
                              text/plain, text/rtf"   {...register?.(name)} {...rest} className={error?.message && styles.error} />
            </label>
            <Error isVisible={!!error?.message}>{error?.message}</Error>
        </>
    )
}

export const InputFileLight3 = ({ register, name, error, children, className, image, ...rest }: Props) => {
    return (
        <>
            <label className={`${styles.base} ${styles.customFileUploadLight3} ${className}`} >
                {image ? <img src={image} /> :
                    <div>
                        {children ? children : 'Upload'}
                    </div>
                }
                <input type="file" accept="image/png, image/jpeg, image/svg+xml"  {...register?.(name)} {...rest} className={error?.message && styles.error} />
            </label>
            <Error isVisible={!!error?.message}>{error?.message}</Error>
        </>
    )
}

interface PropsFileMultiple extends HTMLAttributes<HTMLInputElement> {
    name?: string
    register?: any
    error?: FieldError | undefined
}

export const InputFileLight2Multiple = ({ register, name, error, children, className, ...rest }: PropsFileMultiple) => {
    return (
        <>
            <label className={`${styles.base} ${styles.customFileUploadLightDocument} ${className}`} >
                <>
                    <div className={styles.container}>
                        <div className={styles.circleContainer}>
                            <IoMdAdd />
                        </div>
                        {/* {children ? children : 'Upload'} */}
                    </div>
                </>
                <input type="file" accept="image/png, image/jpeg, image/svg+xml" multiple {...register?.(name)} {...rest} className={error?.message && styles.error} />
            </label>
            <Error isVisible={!!error?.message}>{error?.message}</Error>
        </>
    )
}