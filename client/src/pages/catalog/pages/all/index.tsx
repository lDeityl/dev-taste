import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import * as RadioGroup from '@radix-ui/react-radio-group';
import { coldDishes, dishes, hotDishes } from '../../../../arraysOfObjects';
import { Card } from '../../../../components/card';
import { Wrapper } from '../../../../components/wrapper';
import { Fs20Fw400Gray } from '../../../../components/typography';
import * as Accordion from '@radix-ui/react-accordion';

export const allProducts = [...coldDishes, ...hotDishes, ...dishes];

interface Props {
    title: string
    weight: number
    description: string
    price: number
    image: string
    link: string
}

const shuffleArray = (array: any) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

export const AllProducts = () => {

    const [shuffledProducts, setShuffledProducts] = useState([]);

    useEffect(() => {
        setShuffledProducts(shuffleArray(allProducts));
    }, [allProducts]);

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
                {shuffleArray(allProducts).map((product: Props) => (
                    // <Card
                    //     key={product.link}
                    //     title={product.title}
                    //     description={product.description}
                    //     weight={product.weight}
                    //     price={product.price}
                    //     link={product.link}
                    //     image={product.image}
                    // />
                    <>админка</>
                ))}
            </div>
        </Wrapper>
    )
}
