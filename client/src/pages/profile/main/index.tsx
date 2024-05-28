import React, { useState } from 'react'
import styles from './index.module.scss'
import image from '../../../assets/images/hot/meat-2.png';
import { Fs18Fw400Green, Fs18Fw500White } from '../../../components/typography';
import { IUsers } from '../../../interfaces';
import { ButtonGreen, ButtonGreenBorder } from '../../../ui/buttons';
import { InputEmail } from '../../../ui/inputs/input';

export const ProfileMain = (el: IUsers) => {

    const [isChange, setChange] = useState<boolean>(false);

    return (
        <div className={styles.main}>
            <img src={image} alt="avatar" className={styles.img} />
            <div className={styles.inputs}>
                {isChange ?
                    <>
                        <InputEmail type='text' placeholder='Имя:' />
                        <InputEmail type='email' placeholder='E-mail:' />
                        <InputEmail type='text' placeholder='Телефон:' />
                    </>
                    :
                    <>
                        <div className={styles.block}>
                            <Fs18Fw500White.span>Имя:</Fs18Fw500White.span>
                            <Fs18Fw500White.span>{el.name}</Fs18Fw500White.span>
                        </div>
                        <div className={styles.block}>
                            <Fs18Fw500White.span>E-mail:</Fs18Fw500White.span>
                            <Fs18Fw500White.span>{el.email}</Fs18Fw500White.span>
                        </div>
                        <div className={styles.block}>
                            <Fs18Fw500White.span>Телефон:</Fs18Fw500White.span>
                            <Fs18Fw500White.span>{el.phone}</Fs18Fw500White.span>
                        </div>
                    </>
                }
            </div>
            {isChange ?
                <div className={styles.col}>
                    <ButtonGreen><Fs18Fw500White.span>Сохранить</Fs18Fw500White.span></ButtonGreen>
                    <ButtonGreenBorder onClick={() => setChange(el => !el)}><Fs18Fw500White.span>Отменить</Fs18Fw500White.span></ButtonGreenBorder>
                </div>
                :
                <ButtonGreenBorder onClick={() => setChange(el => !el)}><Fs18Fw500White.span>Изменить</Fs18Fw500White.span></ButtonGreenBorder>
            }
        </div>
    )
}
