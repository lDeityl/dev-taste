import React from 'react'
import { useQuery } from 'react-query'
import { getUserById } from '../../api'
import { Wrapper } from '../../components/wrapper'
import styles from './index.module.scss'

export const Profile = () => {

    const { data } = useQuery({
        queryFn: getUserById,
        queryKey: ['user-by-id'],
        keepPreviousData: true
    })

    return (
        <Wrapper className={styles.wrapper}>
            {data?.email} rewrew
            {data?.name}
            {data?.password}
        </Wrapper>
    )
}
