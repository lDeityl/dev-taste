import React from 'react'
import styles from './index.module.scss'
import * as RadioGroup from '@radix-ui/react-radio-group';
import { coldDishes, dishes, hotDishes } from '../../../../arraysOfObjects';
import { Card } from '../../../../components/card';
import { Wrapper } from '../../../../components/wrapper';
import { Fs20Fw400Gray } from '../../../../components/typography';
import * as Accordion from '@radix-ui/react-accordion';

export const allProducts = [...coldDishes, ...hotDishes, ...dishes];

export const AllProducts = () => {
    return (
        <Wrapper className={styles.wrapper}>
            <div className={styles.shopBox}>
                <Accordion.Root type="multiple" className={styles.AccordionRoot}>
                    <Accordion.Item value="item-1" className={styles.AccordionItem}>
                        <Accordion.Header className={styles.AccordionHeader}>
                            <Accordion.Trigger className={styles.AccordionTrigger}>Фильтр 1</Accordion.Trigger>
                        </Accordion.Header>
                        <Accordion.Content className={styles.AccordionContent}>
                            <form>
                                <RadioGroup.Root className={styles.RadioGroupRoot} defaultValue="default" aria-label="View density">
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <RadioGroup.Item className={styles.RadioGroupItem} value="default" id="r1">
                                            <RadioGroup.Indicator className={styles.RadioGroupIndicator} />
                                        </RadioGroup.Item>
                                        <label className={styles.Label} htmlFor="r1">
                                            Default
                                        </label>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <RadioGroup.Item className={styles.RadioGroupItem} value="comfortable" id="r2">
                                            <RadioGroup.Indicator className={styles.RadioGroupIndicator} />
                                        </RadioGroup.Item>
                                        <label className={styles.Label} htmlFor="r2">
                                            Comfortable
                                        </label>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <RadioGroup.Item className={styles.RadioGroupItem} value="compact" id="r3">
                                            <RadioGroup.Indicator className={styles.RadioGroupIndicator} />
                                        </RadioGroup.Item>
                                        <label className={styles.Label} htmlFor="r3">
                                            Compact
                                        </label>
                                    </div>
                                </RadioGroup.Root>
                            </form>
                        </Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item value="item-2" className={styles.AccordionItem}>
                        <Accordion.Header className={styles.AccordionHeader}>
                            <Accordion.Trigger className={styles.AccordionTrigger}>Фильтр 2</Accordion.Trigger>
                        </Accordion.Header>
                        <Accordion.Content className={styles.AccordionContent}>
                            <form>
                                <RadioGroup.Root className={styles.RadioGroupRoot} defaultValue="default" aria-label="View density">
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <RadioGroup.Item className={styles.RadioGroupItem} value="default" id="r4">
                                            <RadioGroup.Indicator className={styles.RadioGroupIndicator} />
                                        </RadioGroup.Item>
                                        <label className={styles.Label} htmlFor="r4">
                                            Default
                                        </label>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <RadioGroup.Item className={styles.RadioGroupItem} value="comfortable" id="r5">
                                            <RadioGroup.Indicator className={styles.RadioGroupIndicator} />
                                        </RadioGroup.Item>
                                        <label className={styles.Label} htmlFor="r5">
                                            Comfortable
                                        </label>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <RadioGroup.Item className={styles.RadioGroupItem} value="compact" id="r6">
                                            <RadioGroup.Indicator className={styles.RadioGroupIndicator} />
                                        </RadioGroup.Item>
                                        <label className={styles.Label} htmlFor="r6">
                                            Compact
                                        </label>
                                    </div>
                                </RadioGroup.Root>
                            </form>
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion.Root>
            </div>
            <div className={styles.box}>
                {allProducts.map((product) => (
                    <Card
                        key={product.link}
                        title={product.title}
                        description={product.description}
                        weight={product.weight}
                        price={product.price}
                        link={product.link}
                        image={product.image}
                    />
                ))}
            </div>
        </Wrapper>
    )
}
