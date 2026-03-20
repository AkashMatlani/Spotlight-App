import { feedStyles } from '@/assets/style/feed.style'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { COLORS } from '../constants/theme'

export default function Post({ post }: { post: any }) {
    return (
        <View style={feedStyles.post}>
            {/* Post Header */}
            <Link href={"/(tabs)/notifications"}>
                <TouchableOpacity style={feedStyles.postHeaderLeft}>
                    <Image
                        source={post.author.image}
                        style={feedStyles.postAvatar}
                        contentFit='cover'
                        transition={200}
                        cachePolicy='memory-disk'
                    ></Image>
                    <Text style={feedStyles.postUserName}>{post.author.username}</Text>
                </TouchableOpacity>
            </Link>

            <Image source={post.imageUrl}
                style={feedStyles.postImage}
                contentFit='cover'
                transition={200}
                cachePolicy='memory-disk'>
            </Image>
            {/* Post Actions */}
            <View style={feedStyles.postAction}>
                <View style={feedStyles.postActionsLeft}>
                    <TouchableOpacity>
                        <Ionicons name='heart-outline' size={24} color={COLORS.white}></Ionicons>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name='chatbubble-outline' size={22} color={COLORS.white}></Ionicons>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <Ionicons name='bookmark-outline' size={22} color={COLORS.white}></Ionicons>
                </TouchableOpacity>
            </View>

            {/* POST INFO */}
            <View style={feedStyles.postInfo}>
                <Text style={feedStyles.likeText}>Be the first to like</Text>
                {post.caption && (
                    <View style={feedStyles.captionContainer}>
                        <Text style={feedStyles.captionUsername}>{post.author.username}</Text>
                        <Text style={feedStyles.captionText}>{post.caption}</Text>
                    </View>
                )}

                <TouchableOpacity>
                    <Text style={feedStyles.commentsText}>View all 2 comments</Text>
                </TouchableOpacity>

                <Text style={feedStyles.timeAgo}> 2 Hours ago</Text>
            </View>
        </View>
    )
}