import React, { useState } from 'react'
import styles from './index.module.scss'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { ButtonArrow } from '../../ui/buttons';

interface PaginationProps {
    page: number;
    totalItems: number;
    onChange: (page: number) => void;
    setOption: React.Dispatch<React.SetStateAction<number>>;
    itemsPerPage: number;
}

interface Option {
    value: string
    label: string
}

const options: Option[] = [
    {
        value: '10',
        label: '10'
    },
    {
        value: '15',
        label: '15'
    },
    {
        value: '20',
        label: '20'
    },
    {
        value: '50',
        label: '50'
    },
    {
        value: '100',
        label: '100'
    },
]

export const PaginationBitCore = ({ totalItems, page, onChange, setOption, itemsPerPage }: PaginationProps) => {
    const totalPageCount = Math.ceil(totalItems / Number(itemsPerPage));

    const handlePageClick = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPageCount) {
            onChange(pageNumber);
        }
    };

    return (
        <div className={styles.pagination}>
            <span>Всего: {totalItems}</span>

            <span>
                {page} из {totalPageCount}
            </span>
            <div className={styles.pagesButtons}>
                <ButtonArrow className={styles.arrow} onClick={() => handlePageClick(1)}>
                    <MdKeyboardDoubleArrowLeft />
                </ButtonArrow>
                <ButtonArrow className={styles.arrow} onClick={() => handlePageClick(page - 1)}>
                    <MdKeyboardArrowLeft />
                </ButtonArrow>
                <ButtonArrow className={styles.arrow} onClick={() => handlePageClick(page + 1)}>
                    <MdKeyboardArrowRight />
                </ButtonArrow>
                <ButtonArrow className={styles.arrow} onClick={() => handlePageClick(totalPageCount)} >
                    <MdKeyboardDoubleArrowRight />
                </ButtonArrow>
            </div>
        </div>
    );
};
