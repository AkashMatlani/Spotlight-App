import { profileStyle } from '@/assets/style/profile.style'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { Ionicons } from '@expo/vector-icons'
import { useMutation, useQuery } from 'convex/react'
import { Image } from 'expo-image'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Loader from '../components/Loader'
import { COLORS } from '../constants/theme'

export default function UserProfileScreen() {
    const { id } = useLocalSearchParams();

    const profile = useQuery(api.users.getUserProfile, { id: id as Id<"users"> });
    const post = useQuery(api.posts.getPostByUser, { userId: id as Id<"users"> });

    const isFollowing = useQuery(api.users.isFollowing, { followingId: id as Id<"users"> });

    const toogleFollow = useMutation(api.users.toogleFollow);

    const handleBack = () => { };

    if (profile === undefined || post === undefined || isFollowing === undefined) return <Loader />
    return (
        <View style={profileStyle.container}>
            <View style={profileStyle.header}>
                <TouchableOpacity onPress={handleBack}>
                    <Ionicons name='arrow-back' size={24} color={COLORS.white} />
                </TouchableOpacity>
                <Text style={profileStyle.headerTitle}>{profile.username}</Text>
                <View style={{ width: 24 }} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={profileStyle.profileInfo}>
                    <View style={profileStyle.avatarAndStats}>
                        {/* Avatar */}
                        <Image source={profile.image}
                            style={profileStyle.avatar}
                            contentFit='cover'
                            cachePolicy="memory-disk"></Image>

                    </View>
                </View>
            </ScrollView>
        </View>
    )
}