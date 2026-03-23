import { feedStyles } from '@/assets/style/feed.style'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { Ionicons } from '@expo/vector-icons'
import { useMutation } from 'convex/react'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { COLORS } from '../constants/theme'


type PostProps = {
    post: {
        _id: Id<"posts">;
        imageUrl: string,
        caption?: string;
        likes: number,
        comments: number,
        _creationTime: number,
        isLiked: boolean,
        isBookmarked: boolean,
        author: {
            _id: string,
            username: string,
            image: string,
        };
    };
};
export default function Post({ post }: PostProps) {
    const [isLiked, setIsLiked] = useState(post.isLiked);
    const [likesCount, setLikesCount] = useState(post.likes);

    const toggleLike = useMutation(api.posts.toggleLike);

    const handleLike = async () => {
        try {
            const newIsLiked = await toggleLike({ postId: post._id })
            setIsLiked(newIsLiked);
            setLikesCount((prev) => (newIsLiked ? prev + 1 : prev - 1))
        } catch (error) {
            console.error("Error in toogle Like", error);

        }

    }

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

            <TouchableOpacity
            >
                <Ionicons name='trash-outline' size={20} color={COLORS.primary} />
            </TouchableOpacity>

            <Image source={post.imageUrl}
                style={feedStyles.postImage}
                contentFit='cover'
                transition={200}
                cachePolicy='memory-disk'>
            </Image>

            {/* Post Actions */}
            <View style={feedStyles.postAction}>
                <View style={feedStyles.postActionsLeft}>
                    <TouchableOpacity onPress={handleLike}>
                        <Ionicons name={isLiked ? "heart" : 'heart-outline'} size={24}
                            color={isLiked ? COLORS.primary : COLORS.white}
                        ></Ionicons>
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
                <Text style={feedStyles.likeText}>
                    {likesCount > 0 ? `${likesCount.toLocaleString()} likes` : "Be the first to Like"}
                </Text>
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