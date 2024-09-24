import React from 'react'
import styles from './index.module.scss'
import { Wrapper } from '../../components/wrapper'
import { HeadLine } from '../../components/headline'
import { FirstSwiper } from './first-swiper'
import { ThirdSwiper } from './third-swiper'
import { Fs16BoldWhite, Fs20Fw400Gray, Fs32BoldWhite } from '../../components/typography'
import { ButtonGray, ButtonGreen } from '../../ui/buttons'
import chicken from '../../assets/images/chickenCafe.png'
import chef from '../../assets/icons/chef.svg'
import onion from '../../assets/icons/onion.svg'
import schick from '../../assets/images/shadowForChicken.png'
import { BlockWithTitle } from '../../components/block-with-title'
import { MdOutlineFavoriteBorder } from 'react-icons/md'
import { BsLightning } from "react-icons/bs";
import { SecondSwiper } from './second-swiper'
import { Contacts } from '../../components/contacts'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getCategories, getProduct, getSettingsAdmin, getUserCategories, getUsers } from '../../api'
import { Curtain } from '../../components/curtain'

export const Main = () => {

    const nav = useNavigate();

    const { data: categories } = useQuery({
        queryFn: getUserCategories,
        queryKey: ['categories'],
    });

    const { data } = useQuery({
        queryFn: getSettingsAdmin,
        queryKey: ['user-settings'],
        keepPreviousData: true,
    });

    return (
        <Wrapper className={styles.main}>
            <Curtain />
            {categories?.map(category => (
                <>
                    {category.Product.length > 0 &&
                        <section key={category.id}>
                            <div className={styles.rowHeadlineImage}>
                                <HeadLine title={category.name} />
                                <img src={category.imageUrl} alt={category.name} className={styles.companiesLogo} />
                            </div>
                            <FirstSwiper key={category.id} el={category} />
                        </section>
                    }
                </>
            ))}
            {data &&
                <section className={styles.ourCoffe}>
                    <div className={styles.leftSide}>
                        <Fs32BoldWhite.h4>{data?.about_title}</Fs32BoldWhite.h4>
                        <Fs20Fw400Gray.p>{data?.about_description}</Fs20Fw400Gray.p>
                        <ButtonGray className={styles.btnGray} onClick={() => nav('/catalog')}>
                            <Fs16BoldWhite.span>ПОСМОТРЕТЬ МЕНЮ</Fs16BoldWhite.span>
                        </ButtonGray>
                    </div>
                    <div className={styles.rightSide}>
                        <BlockWithTitle title={'Свежайшие продукты'} image={onion} />
                        <BlockWithTitle title={'Быстрая доставка'} icon={<BsLightning />} />
                        <BlockWithTitle title={'Лучшие повора'} image={chef} />
                        <BlockWithTitle title={'Заказ в 1 клик'} icon={<MdOutlineFavoriteBorder />} />
                    </div>
                    <img src={chicken} className={styles.chicken} alt="img" />
                    <img src={schick} className={styles.chicken2} alt="img" />
                </section>
            }
            {data && <Contacts data={data} />}
        </Wrapper>
    )
}