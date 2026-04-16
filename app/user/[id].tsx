import { profileStyle } from '@/assets/style/profile.style'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { Ionicons } from '@expo/vector-icons'
import { useMutation, useQuery } from 'convex/react'
import { Image } from 'expo-image'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { FlatList, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Loader from '../components/Loader'
import { COLORS } from '../constants/theme'

export default function UserProfileScreen() {
    const { id } = useLocalSearchParams();

    const profile = useQuery(api.users.getUserProfile, { id: id as Id<"users"> });
    const posts = useQuery(api.posts.getPostByUser, { userId: id as Id<"users"> });

    const isFollowing = useQuery(api.users.isFollowing, { followingId: id as Id<"users"> });

    const toogleFollow = useMutation(api.users.toogleFollow);

    const router = useRouter();

    const handleBack = () => {
        if (router.canGoBack())  router.back();
        else 
        router.replace("/(tabs)");
    };

    if (profile === undefined || posts === undefined || isFollowing === undefined) return <Loader />
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
                            cachePolicy="memory-disk">
                        </Image>

                        {/* Stats*/}
                        <View style={profileStyle.statsContiner}>
                            <View style={profileStyle.statItem}>
                                <Text style={profileStyle.statNumber}>{profile.posts}</Text>
                                <Text style={profileStyle.statLabel}>Posts</Text>
                            </View>
                            <View style={profileStyle.statItem}>
                                <Text style={profileStyle.statNumber}>{profile.followers}</Text>
                                <Text style={profileStyle.statLabel}>Followers</Text>
                            </View>
                            <View style={profileStyle.statItem}>
                                <Text style={profileStyle.statNumber}>{profile.following}</Text>
                                <Text style={profileStyle.statLabel}>Following</Text>
                            </View>
                        </View>
                    </View>

                    <Text style={profileStyle.name}>{profile.fullname}</Text>
                    {profile.bio && <Text style={profileStyle.bio}>{profile.bio}</Text>}

                    <Pressable style={[profileStyle.followButton, isFollowing && profileStyle.followingButton]}
                        onPress={() => toogleFollow({ followingId: id as Id<"users"> })}>
                        <Text style={[profileStyle.followButtonText, isFollowing && profileStyle.followingButtonText]}
                        >{isFollowing ? "Following" : "Follow"}</Text>
                    </Pressable>
                </View>

                <View style={profileStyle.postGrid}>
                    {posts.length === 0 ? (
                        <View style={profileStyle.noPostContainer}>
                            <Ionicons name='image-outline' size={48} color={COLORS.grey} />
                            <Text style={profileStyle.noPostsText}>No posts yet</Text>
                        </View>
                    ) : (
                        <FlatList
                            data={posts}
                            numColumns={3}
                            scrollEnabled={false}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={profileStyle.gridItem}>
                                    <Image source={item.imageUrl}
                                        style={profileStyle.gridImage}
                                        contentFit='cover'
                                        transition={200}
                                        cachePolicy='memory-disk'></Image>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item._id}
                        ></FlatList>
                    )}
                </View>
            </ScrollView>
        </View>
    )
}