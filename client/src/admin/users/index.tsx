import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { z } from 'zod';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { createCategories, getUsersAdmin } from '../../api';

import { ICategory, IProductType } from '../../interfaces';
import { ButtonGreen, ButtonGreenBorder } from '../../ui/buttons';
import { InputAdmin, InputEmail } from '../../ui/inputs/input';
import { SelectWithSearch } from '../../components/cleverSearch';
import { PurpleSwitch } from '../../ui/switch';
import { Fs13Fw300Black, Fs13Fw500White, Fs16BoldBlack, Fs16BoldWhite, Fs16Fw400Black, Fs16Fw400White, Fs32BoldBlack, Fs32BoldWhite } from '../../components/typography';
import { PopupComponent } from '../components/popup';
import { getNormalDate } from '../../utils/normalDate';
import { InputFileLight3 } from '../../ui/input-file';
import { withImageData } from '../../utils/withImageData';

export const Users = () => {

    const { data } = useQuery({
        queryFn: getUsersAdmin,
        queryKey: ['admin-users'],
        keepPreviousData: true,
    });

    return (
        <div className={styles.wrapper}>
            <div className={styles.titleBlock}>
                <Fs32BoldBlack.span>Пользователи</Fs32BoldBlack.span>
            </div>
            <div className={styles.block}>
                {
                    data?.map((el, idx) => (
                        <div className={styles.item} key={idx}>
                            <div className={styles.bl}>
                                <Fs13Fw300Black.span>ID</Fs13Fw300Black.span>
                                <Fs16Fw400Black.span>{el.id}</Fs16Fw400Black.span>
                            </div>
                            <div className={styles.bl}>
                                <Fs13Fw300Black.span>Дата создания</Fs13Fw300Black.span>
                                <Fs16Fw400Black.span>{getNormalDate(new Date(el.createdAt))}</Fs16Fw400Black.span>
                            </div>
                            <div className={styles.bl}>
                                <Fs13Fw300Black.span>Имя</Fs13Fw300Black.span>
                                <Fs16Fw400Black.span>{el.name}</Fs16Fw400Black.span>
                            </div>
                            <div className={styles.bl}>
                                <Fs13Fw300Black.span>E-mail</Fs13Fw300Black.span>
                                <Fs16Fw400Black.span>{el.email}</Fs16Fw400Black.span>
                            </div>
                            <div className={styles.bl}>
                                <Fs13Fw300Black.span>Роль</Fs13Fw300Black.span>
                                <Fs16Fw400Black.span>{el.role}</Fs16Fw400Black.span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
