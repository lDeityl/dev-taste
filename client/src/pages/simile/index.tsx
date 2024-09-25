import React, { useEffect, useState } from 'react'
import { IProduct } from '../../interfaces';
import { Wrapper } from '../../components/wrapper';
import { HeadLine } from '../../components/headline';
import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom';
import { Fs13Fw500White } from '../../components/typography';
import { ButtonGreen } from '../../ui/buttons';

export const Simile = () => {

    const [comparisonItems, setComparisonItems] = useState<IProduct[]>([]);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('comparisonItems') || '[]');
        setComparisonItems(items);
    }, []);

    const nav = useNavigate()

    const removeFromComparison = (itemId: string) => {
        const updatedItems = comparisonItems.filter(item => item.id !== Number(itemId));
        setComparisonItems(updatedItems);
        localStorage.setItem('comparisonItems', JSON.stringify(updatedItems));
    };

    return (
        <Wrapper>
            <HeadLine title="Сравнение товаров" />
            {comparisonItems.length === 0 ? (
                <p>Нет товаров для сравнения 😢</p>
            ) : (
                <div className={styles.block}>
                    {comparisonItems.map(item => (
                        <div key={item.id} className={styles.item} onClick={() => nav(`/catalog/${item.id}`)}>
                            <img src={item.imageUrl} alt={item.name} />
                            <h3 style={{ maxHeight: '45px', minHeight: '45px' }}>{item.name}</h3>
                            <Fs13Fw500White.span>
                                Цена: <span style={{ fontSize: '16px', fontWeight: '600' }}>
                                    {item.price}
                                </span> ₽
                            </Fs13Fw500White.span>
                            <Fs13Fw500White.span>
                                Белки: <span style={{ fontSize: '16px', fontWeight: '600' }}>
                                    {item.squirrels}
                                </span> г
                            </Fs13Fw500White.span>
                            <Fs13Fw500White.span>
                                Жиры: <span style={{ fontSize: '16px', fontWeight: '600' }}>
                                    {item.fats}
                                </span> г
                            </Fs13Fw500White.span>
                            <Fs13Fw500White.span>
                                Углеводы: <span style={{ fontSize: '16px', fontWeight: '600' }}>
                                    {item.carbohydrates}
                                </span> г
                            </Fs13Fw500White.span>
                            <Fs13Fw500White.span>
                                Ккал: <span style={{ fontSize: '16px', fontWeight: '600' }}>
                                    {item.calories}
                                </span> ккал
                            </Fs13Fw500White.span>
                            <Fs13Fw500White.span>
                                Вес: <span style={{ fontSize: '16px', fontWeight: '600' }}>
                                    {item.weight}
                                </span> г
                            </Fs13Fw500White.span>
                            <ButtonGreen onClick={(e) => {
                                e.stopPropagation();
                                removeFromComparison(String(item.id));
                            }}>
                                Удалить из сравнения
                            </ButtonGreen>
                        </div>
                    ))}
                </div>
            )}
        </Wrapper>
    )
}
