import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import styles from './index.module.scss'
import { useQuery } from 'react-query';
import { Fs16Fw400White, Fs18Fw500White, Fs20Fw400Gray, Fs20Fw400White } from '../../../../components/typography';
import { AccordionContent, AccordionTrigger } from '../../../../ui/accordion';

const question = [
    {
        title: 'Какое блюдо вы хотели бы заказать?',
        desc: 'Пожалуйста, выберите блюдо из нашего меню. Вы можете указать любые предпочтения или ограничения в диете.'
    },
    {
        title: 'Какое количество порций вам необходимо?',
        desc: 'Укажите, сколько порций каждого выбранного вами блюда вам нужно. Это поможет нам правильно рассчитать количество продуктов для вашего заказа.'
    },
    {
        title: 'Каким способом вы предпочитаете оплатить заказ?',
        desc: 'Выберите удобный для вас способ оплаты. Мы принимаем как онлайн-платежи, так и наличные при доставке.'
    },
    {
        title: 'Нужна ли вам доставка или вы заберете заказ самостоятельно?',
        desc: 'Пожалуйста, укажите, предпочитаете ли вы доставку на дом/офис или планируете забрать заказ самостоятельно из нашего ресторана.'
    },
    {
        title: 'Есть ли у вас аллергия на какие-либо продукты?',
        desc: 'Сообщите нам о любых аллергиях или непереносимости продуктов, чтобы мы могли адаптировать ваш заказ согласно вашим потребностям.'
    },
    {
        title: 'Желаете ли вы добавить специальные инструкции к вашему заказу?',
        desc: 'Если у вас есть специальные пожелания к заказу, например, по степени прожарки мяса или добавлению дополнительных ингредиентов, пожалуйста, укажите их здесь.'
    }
]

export const AccordionDevTaste = () => {

    return (
        <div className={styles.wrapper}>
            <Accordion.Root className="AccordionRoot" type="single" collapsible>
                {question.map((el, idx) => (
                    <>
                        <Accordion.Item key={idx} className={styles.AccordionItem} value={`${idx + 1}`}>
                            <AccordionTrigger className={styles.AccordionTrigger}>
                                <Fs18Fw500White.span className={styles.title}>{el.title}</Fs18Fw500White.span>
                            </AccordionTrigger>
                            <AccordionContent className={styles.AccordionContent}>
                                <Fs16Fw400White.p>{el.desc}</Fs16Fw400White.p>
                            </AccordionContent>
                        </Accordion.Item>
                    </>
                ))}
            </Accordion.Root>
        </div>
    )
}

