import { feedStyles } from '@/assets/style/feed.style';
import { formatDistanceToNow } from "date-fns";
import React from 'react';
import { Image, Text, View } from 'react-native';

interface comment {
    content: string,
    _creationTime: number,
    user: {
        fullname: string,
        image: string,
    }
}
export default function Comment({ comment }: { comment: comment }) {
    return (
        <View style={feedStyles.commentsConatiner}>
            <Image source={{ uri: comment.user.image }} style={feedStyles.commentAvatar} />
            <View style={feedStyles.commentContent}>

                <Text style={feedStyles.commentUsername}>{comment.user.fullname}</Text>
                <Text style={feedStyles.commentText}>{comment.content}</Text>
                <Text style={feedStyles.commentTime}>
                    {formatDistanceToNow(comment._creationTime,{addSuffix:true})}
                </Text>
            </View>
        </View>
    )
}