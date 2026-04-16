import { feedStyles } from '@/assets/style/feed.style'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { useMutation, useQuery } from 'convex/react'
import { formatDistanceToNow } from 'date-fns'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { COLORS } from '../constants/theme'
import CommentsModal from './CommentsModal'


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
    const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked);

    const [commentsCount, setcommentsCount] = useState(post.comments);
    const [showComments, setshowComments] = useState(false);

    const toggleLike = useMutation(api.posts.toggleLike);
    const toogleBookmark = useMutation(api.bookmarks.toggelMutation);
    const deletePost = useMutation(api.posts.deletePost);

    const { user } = useUser();

    const currentUser = useQuery(api.users.getUserByClerkId, user ? { clearkId: user.id } : "skip")


    const handleLike = async () => {
        try {
            const newIsLiked = await toggleLike({ postId: post._id })
            setIsLiked(newIsLiked);
            setLikesCount((prev) => (newIsLiked ? prev + 1 : prev - 1))
        } catch (error) {
            console.error("Error in toogle Like", error);
        }
    }

    const handleBookmark = async () => {
        const newIsBookmarked = await toogleBookmark({ postId: post._id });
        setIsBookmarked(newIsBookmarked);
    }

    const handleDelete = async () => {
        try {
            await deletePost({ postId: post._id })
        } catch (error) {
            console.error("Error in deleting post", error);
        }
    }

    return (
        <View style={feedStyles.post}>
            {/* Post Header */}
            <View style={feedStyles.postHeader}>
                <Link href=
                    {
                        currentUser?._id === post.author._id ? "/(tabs)/profile" : `/user/${post.author._id}`
                    }
                    asChild
                >
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

                {/* if i am the owwner, show delete button */}

                {post.author._id === currentUser?._id ? (
                    <TouchableOpacity onPress={handleDelete}>
                        <Ionicons name='trash-outline' size={20} color={COLORS.primary} />
                    </TouchableOpacity>
                )
                    :
                    (
                        <TouchableOpacity>
                            <Ionicons name="ellipsis-horizontal" size={20} color={COLORS.white} />
                        </TouchableOpacity>
                    )}
            </View>

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
                    <TouchableOpacity onPress={() => setshowComments(true)}>
                        <Ionicons name='chatbubble-outline' size={22} color={COLORS.white}></Ionicons>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handleBookmark}>
                    <Ionicons name={isBookmarked ? 'bookmark' : 'bookmark-outline'} size={22} color={COLORS.white}></Ionicons>
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

                {commentsCount > 0 && (
                    <TouchableOpacity onPress={() => setshowComments(true)}>
                        <Text style={feedStyles.commentsText}>View all {commentsCount} comments</Text>
                    </TouchableOpacity>
                )}

                <Text style={feedStyles.timeAgo}> {formatDistanceToNow(post._creationTime, { addSuffix: true })}</Text>
            </View>
            <CommentsModal
                postId={post._id}
                visible={showComments}
                onClose={() => setshowComments(false)}
                onCommentsAdded={() => setcommentsCount((prev) => prev + 1)}
            />
        </View>
    )
}