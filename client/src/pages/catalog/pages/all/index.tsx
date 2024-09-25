import React, { useEffect, useMemo, useState } from 'react'
import styles from './index.module.scss'
import * as RadioGroup from '@radix-ui/react-radio-group';
import * as Accordion from '@radix-ui/react-accordion';
import { Card } from '../../../../components/card';
import { Wrapper } from '../../../../components/wrapper';
import { Fs16Fw400White, Fs20Fw400Gray } from '../../../../components/typography';
import { useQuery } from 'react-query';
import { getCatalog, getCategories, getCategoriesMenu, getProduct } from '../../../../api';
import { IProduct } from '../../../../interfaces';
import { useFilterStore } from '../../../../stores';
import { ButtonGreen, ButtonGreenBorder } from '../../../../ui/buttons';
import { PaginationBitCore } from '../../../../components/pagination';
import debounce from 'lodash.debounce';

export const AllProducts = () => {

    const { search } = useFilterStore();
    const [limit, setLimit] = useState(8);
    const [page, setPage] = useState(1);

    const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined);
    const [selectedProductType, setSelectedProductType] = useState<number | undefined>(undefined);
    const [sortOption, setSortOption] = useState<'increase' | 'descrease' | undefined>(undefined);

    const [applyFilters, setApplyFilters] = useState(false);

    const { data, isLoading, error } = useQuery({
        queryFn: () => getCatalog(page, limit, search, selectedCategory, selectedProductType, sortOption),
        queryKey: ['catalog-products-menu', page, limit, search, selectedCategory, selectedProductType, sortOption],
        keepPreviousData: true,
        enabled: applyFilters || !applyFilters,
    });

    const { data: dataCompanies, isLoading: isLoadingCompanies } = useQuery({
        queryFn: () => getCategories(),
        queryKey: ['category-products-menu'],
        keepPreviousData: true,
    });

    const { data: dataProductType } = useQuery({
        queryFn: getCategoriesMenu,
        queryKey: ['user-categories-menu'],
        keepPreviousData: true,
    });

    const handleApplyFilters = () => setApplyFilters(true);

    const handleResetFilters = () => {
        setSelectedCategory(undefined);
        setSelectedProductType(undefined);
        setSortOption(undefined);
        setApplyFilters(false);
    };
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPage(1)
    };
    const debouncedChangeHandler = useMemo(
        () => debounce(changeHandler, 500)
        , []);

    useEffect(() => {
        return () => {
            debouncedChangeHandler.cancel();
        }
    }, []);

    const handleChangePage = (value: number) => {
        setPage(value);
    };

    return (
        <Wrapper className={styles.wrapper}>
            <div className={styles.blockShop}>
                <div className={styles.shopBox}>
                    <Accordion.Root type="multiple" className={styles.AccordionRoot}>
                        <Accordion.Item value="companies" className={styles.AccordionItem}>
                            <Accordion.Header className={styles.AccordionHeader}>
                                <Accordion.Trigger className={styles.AccordionTrigger}>Компания</Accordion.Trigger>
                            </Accordion.Header>
                            <Accordion.Content className={styles.AccordionContent}>
                                <form>
                                    <RadioGroup.Root
                                        className={styles.RadioGroupRoot}
                                        defaultValue="default"
                                        aria-label="View density"
                                        value={selectedCategory ? `${selectedCategory}` : 'default'} // Обновляем значение
                                        onValueChange={(value) => setSelectedCategory(Number(value))}
                                    >
                                        {dataCompanies?.map((el) => (
                                            <div style={{ display: 'flex', alignItems: 'center' }} key={el.id}>
                                                <RadioGroup.Item
                                                    className={styles.RadioGroupItem}
                                                    value={`${el.id}`}
                                                    id={`${el.id}`}
                                                >
                                                    <RadioGroup.Indicator className={styles.RadioGroupIndicator} />
                                                </RadioGroup.Item>
                                                <label className={styles.Label} htmlFor={`${el.id}`}>
                                                    {el.name}
                                                </label>
                                            </div>
                                        ))}
                                    </RadioGroup.Root>
                                </form>
                            </Accordion.Content>
                        </Accordion.Item>
                        <Accordion.Item value="item-2" className={styles.AccordionItem}>
                            <Accordion.Header className={styles.AccordionHeader}>
                                <Accordion.Trigger className={styles.AccordionTrigger}>Тип продукта</Accordion.Trigger>
                            </Accordion.Header>
                            <Accordion.Content className={styles.AccordionContent}>
                                <form>
                                    <RadioGroup.Root
                                        className={styles.RadioGroupRoot}
                                        defaultValue="defaultProduct"
                                        aria-label="product type by"
                                        value={selectedProductType ? `${selectedProductType}` : 'defaultProduct'}
                                        onValueChange={(value) => setSelectedProductType(Number(value))}
                                    >
                                        {dataProductType?.map((el, idx) => (
                                            <div style={{ display: 'flex', alignItems: 'center' }} key={idx}>
                                                <RadioGroup.Item className={styles.RadioGroupItem} value={`${el.id}`} id={`${el.id}`}>
                                                    <RadioGroup.Indicator className={styles.RadioGroupIndicator} />
                                                </RadioGroup.Item>
                                                <label className={styles.Label} htmlFor={`${el.id}`}>
                                                    {el.name}
                                                </label>
                                            </div>
                                        ))}
                                    </RadioGroup.Root>
                                </form>
                            </Accordion.Content>
                        </Accordion.Item>
                        <Accordion.Item value="item-3" className={styles.AccordionItem}>
                            <Accordion.Header className={styles.AccordionHeader}>
                                <Accordion.Trigger className={styles.AccordionTrigger}>Сортировка</Accordion.Trigger>
                            </Accordion.Header>
                            <Accordion.Content className={styles.AccordionContent}>
                                <form>
                                    <RadioGroup.Root
                                        className={styles.RadioGroupRoot}
                                        defaultValue="descrease"
                                        aria-label="Sort by"
                                        value={sortOption || 'descrease'} // Обновляем значение
                                        onValueChange={(value) => setSortOption(value as 'increase' | 'descrease')}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <RadioGroup.Item className={styles.RadioGroupItem} value="increase" id="r4">
                                                <RadioGroup.Indicator className={styles.RadioGroupIndicator} />
                                            </RadioGroup.Item>
                                            <label className={styles.Label} htmlFor="r4">
                                                По возрастанию цены
                                            </label>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <RadioGroup.Item className={styles.RadioGroupItem} value="descrease" id="r5">
                                                <RadioGroup.Indicator className={styles.RadioGroupIndicator} />
                                            </RadioGroup.Item>
                                            <label className={styles.Label} htmlFor="r5">
                                                По убыванию цены
                                            </label>
                                        </div>
                                    </RadioGroup.Root>
                                </form>
                            </Accordion.Content>
                        </Accordion.Item>
                    </Accordion.Root>
                    <div className={styles.boxBtns}>
                        <ButtonGreen onClick={handleApplyFilters} isLoading={isLoading} className={styles.applyButton}>Применить</ButtonGreen>
                        <ButtonGreenBorder onClick={handleResetFilters} className={styles.resetButton}>Сбросить фильтры</ButtonGreenBorder>
                    </div>
                </div>
                <div className={styles.col}>
                    <div className={styles.box}>
                        {isLoading ? (
                            <Fs16Fw400White.span>Ищем для Вас подходящие продукты 🧐</Fs16Fw400White.span>
                        ) : (
                            data && data.totalItems > 0 ? (
                                data.catalog.map((product: IProduct) => (
                                    <Card key={product.id} item={product} />
                                ))
                            ) : (
                                <Fs16Fw400White.span>По вашему запросу ничего не нашлось 😉</Fs16Fw400White.span>
                            )
                        )}
                    </div>
                    <div className={styles.pagination}>
                        {(data?.totalItems && data?.totalItems / limit > 1) ? <PaginationBitCore page={page} totalItems={data.totalItems} onChange={handleChangePage} setOption={setLimit} itemsPerPage={limit} /> : <></>}
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}
