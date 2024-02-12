import React, { HTMLAttributes } from 'react'
import styles from './index.module.scss'
import { AnimatePresence, motion } from 'framer-motion'

interface Props extends HTMLAttributes<HTMLDivElement> {
    isVisible: boolean
}

export const Error: React.FC<Props> = ({ children, isVisible, className, ...rest }) => {
    return (
        <AnimatePresence>
            {isVisible && <motion.div initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}>
                <span className={`${styles.error} ${className}`} {...rest}>{children}</span>
            </motion.div>}
        </AnimatePresence>
    )
}

export const Error2: React.FC<Props> = ({ children, isVisible, className, ...rest }) => {
    return (
        <AnimatePresence>
            {isVisible && <motion.div initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}>
                <span className={`${styles.error2} ${className}`} {...rest}>{children}</span>
            </motion.div>}
        </AnimatePresence>
    )
}

