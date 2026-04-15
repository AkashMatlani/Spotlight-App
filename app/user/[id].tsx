import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useMutation, useQuery } from 'convex/react'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import Loader from '../components/Loader'

export default function UserProfileScreen() {
    const { id } = useLocalSearchParams();

    const profile = useQuery(api.users.getUserProfile, { id: id as Id<"users"> });
    const post = useQuery(api.posts.getPostByUser, { userId: id as Id<"users"> });

    const isFollowing = useQuery(api.users.isFollowing, { followingId: id as Id<"users"> });

    const toogleFollow = useMutation(api.users.toogleFollow);

    if(profile === undefined || post === undefined || isFollowing ===undefined) return <Loader/>
    return (
        <View>
        </View>
    )
}