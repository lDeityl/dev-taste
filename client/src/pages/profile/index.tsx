import React from 'react'
import { useQuery } from 'react-query'
import { getUserById } from '../../api'

export const Profile = () => {

    const { data } = useQuery({
        queryFn: getUserById,
        queryKey: ['user-by-id'],
        keepPreviousData: true
    })

    return (
        <div>
            {data?.email}
            {data?.name}
            {data?.password}
        </div>
    )
}
