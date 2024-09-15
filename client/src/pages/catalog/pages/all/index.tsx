import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import * as RadioGroup from '@radix-ui/react-radio-group';
import { coldDishes, dishes, hotDishes } from '../../../../arraysOfObjects';
import { Card } from '../../../../components/card';
import { Wrapper } from '../../../../components/wrapper';
import { Fs20Fw400Gray } from '../../../../components/typography';
import * as Accordion from '@radix-ui/react-accordion';
import { useQuery } from 'react-query';
import { getProduct } from '../../../../api';
import { IProduct } from '../../../../interfaces';

export const allProducts = [...coldDishes, ...hotDishes, ...dishes];

interface Props {
    title: string
    weight: number
    description: string
    price: number
    image: string
    link: string
}



export const AllProducts = () => {

    const { data } = useQuery({
        queryFn: getProduct,
        queryKey: ['catalog-products-menu'],
        keepPreviousData: true,
    });

    return (
        <Wrapper className={styles.wrapper}>
            <div className={styles.shopBox}>
                <Accordion.Root type="multiple" className={styles.AccordionRoot}>
                    <Accordion.Item value="item-1" className={styles.AccordionItem}>
                        <Accordion.Header className={styles.AccordionHeader}>
                            <Accordion.Trigger className={styles.AccordionTrigger}>Цена</Accordion.Trigger>
                        </Accordion.Header>
                        <Accordion.Content className={styles.AccordionContent}>
                            <form>
                                <RadioGroup.Root className={styles.RadioGroupRoot} defaultValue="default" aria-label="View density">
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <RadioGroup.Item className={styles.RadioGroupItem} value="default" id="r1">
                                            <RadioGroup.Indicator className={styles.RadioGroupIndicator} />
                                        </RadioGroup.Item>
                                        <label className={styles.Label} htmlFor="r1">
                                            Мясо
                                        </label>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <RadioGroup.Item className={styles.RadioGroupItem} value="comfortable" id="r2">
                                            <RadioGroup.Indicator className={styles.RadioGroupIndicator} />
                                        </RadioGroup.Item>
                                        <label className={styles.Label} htmlFor="r2">
                                            Закуски
                                        </label>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <RadioGroup.Item className={styles.RadioGroupItem} value="compact" id="r3">
                                            <RadioGroup.Indicator className={styles.RadioGroupIndicator} />
                                        </RadioGroup.Item>
                                        <label className={styles.Label} htmlFor="r3">
                                            Салаты
                                        </label>
                                    </div>
                                </RadioGroup.Root>
                            </form>
                        </Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item value="item-2" className={styles.AccordionItem}>
                        <Accordion.Header className={styles.AccordionHeader}>
                            <Accordion.Trigger className={styles.AccordionTrigger}>Сортировка</Accordion.Trigger>
                        </Accordion.Header>
                        <Accordion.Content className={styles.AccordionContent}>
                            <form>
                                <RadioGroup.Root className={styles.RadioGroupRoot} defaultValue="default" aria-label="View density">
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <RadioGroup.Item className={styles.RadioGroupItem} value="default" id="r4">
                                            <RadioGroup.Indicator className={styles.RadioGroupIndicator} />
                                        </RadioGroup.Item>
                                        <label className={styles.Label} htmlFor="r4">
                                            По убыванию
                                        </label>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <RadioGroup.Item className={styles.RadioGroupItem} value="comfortable" id="r5">
                                            <RadioGroup.Indicator className={styles.RadioGroupIndicator} />
                                        </RadioGroup.Item>
                                        <label className={styles.Label} htmlFor="r5">
                                            По возрастанию
                                        </label>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <RadioGroup.Item className={styles.RadioGroupItem} value="compact" id="r6">
                                            <RadioGroup.Indicator className={styles.RadioGroupIndicator} />
                                        </RadioGroup.Item>
                                        <label className={styles.Label} htmlFor="r6">
                                            Популярные
                                        </label>
                                    </div>
                                </RadioGroup.Root>
                            </form>
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion.Root>
            </div>
            <div className={styles.box}>
                {data?.map((product: IProduct) => (
                    <Card
                        key={product.id}
                        item={product}
                    />
                ))}
            </div>
        </Wrapper>
    )
}
