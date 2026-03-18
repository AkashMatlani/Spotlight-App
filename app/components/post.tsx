import { feedStyles } from '@/assets/style/feed.style'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export default function Post({ post }: { post: any }) {
    return (
        <View style={feedStyles.post}>
            {/* Post Header */}
            <Link href={"/(tabs)/notifications"}></Link>
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
        </View>
    )
}