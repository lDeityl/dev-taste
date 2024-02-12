import React from 'react'
import styles from './index.module.scss'
import action1 from '../../assets/images/action/action1.png'
import action2 from '../../assets/images/action/action2.png'
import action3 from '../../assets/images/action/action3.png'
import { HeadLine } from '../../components/headline'
import { Wrapper } from '../../components/wrapper'
import { ActionBlock } from '../../components/action-block'
import { Contacts } from '../../components/contacts'

const actions = [
    {
        image: action1,
        title: 'Без мяса? Здесь!',
        description: 'Самое время попробовать «Сырную» пиццу, «Маргариту», пиццу «Овощи и грибы», Пасту Четыре сыра, Томатный суп с гренками, Грибной Стартер, Рулетики с сыром, Картофель из печи, Картофельные оладьи или Греческий салат. Выберите свой вкус!',
        date: 'до 31 июля.'
    },
    {
        image: action2,
        title: 'Сырный бортик',
        description: 'Самое время попробовать «Сырную» пиццу, «Маргариту», пиццу «Овощи и грибы», Пасту Четыре сыра, Томатный суп с гренками, Грибной Стартер, Рулетики с сыром, Картофель из печи, Картофельные оладьи или Греческий салат. Выберите свой вкус!',
        date: 'до 31 июля.'
    },
    {
        image: action1,
        title: 'Без мяса? Здесь!',
        description: 'Самое время попробовать «Сырную» пиццу, «Маргариту», пиццу «Овощи и грибы», Пасту Четыре сыра, Томатный суп с гренками, Грибной Стартер, Рулетики с сыром, Картофель из печи, Картофельные оладьи или Греческий салат. Выберите свой вкус!',
        date: 'до 31 июля.'
    },
    {
        image: action2,
        title: 'Выгодное комбо c напитками',
        description: 'Самое время попробовать «Сырную» пиццу, «Маргариту», пиццу «Овощи и грибы», Пасту Четыре сыра, Томатный суп с гренками, Грибной Стартер, Рулетики с сыром, Картофель из печи, Картофельные оладьи или Греческий салат. Выберите свой вкус!',
        date: 'до 31 июля.'
    },
    {
        image: action3,
        title: 'Сырный бортик',
        description: 'Самое время попробовать «Сырную» пиццу, «Маргариту», пиццу «Овощи и грибы», Пасту Четыре сыра, Томатный суп с гренками, Грибной Стартер, Рулетики с сыром, Картофель из печи, Картофельные оладьи или Греческий салат. Выберите свой вкус!',
        date: 'до 31 июля.'
    },
    {
        image: action1,
        title: 'Без мяса? Здесь!',
        description: 'Самое время попробовать «Сырную» пиццу, «Маргариту», пиццу «Овощи и грибы», Пасту Четыре сыра, Томатный суп с гренками, Грибной Стартер, Рулетики с сыром, Картофель из печи, Картофельные оладьи или Греческий салат. Выберите свой вкус!',
        date: 'до 31 июля.'
    },
    {
        image: action3,
        title: 'Выгодное комбо c напитками',
        description: 'Самое время попробовать «Сырную» пиццу, «Маргариту», пиццу «Овощи и грибы», Пасту Четыре сыра, Томатный суп с гренками, Грибной Стартер, Рулетики с сыром, Картофель из печи, Картофельные оладьи или Греческий салат. Выберите свой вкус!',
        date: 'до 31 июля.'
    },
];

export const Action = () => {
    return (
        <div>
            <Wrapper>
                <HeadLine title='АКЦИИ' />
            </Wrapper>
            <div className={styles.customHR} />
            <Wrapper className={styles.actions}>
                {actions.map((action, index) => (
                    <ActionBlock
                        key={index}
                        image={action.image}
                        title={action.title}
                        description={action.description}
                        date={action.date}
                    />
                ))}
            </Wrapper>
            <Wrapper>
                <Contacts />
            </Wrapper>
        </div>
    )
}