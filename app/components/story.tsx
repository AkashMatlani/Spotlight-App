import { feedStyles } from '@/assets/style/feed.style';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

type Story = {
    id: string;
    username: string;
    avatar: string;
    hasStory: boolean;
}

export default function story({ story }: { story: Story }) {
    return (
       <TouchableOpacity style={feedStyles.storyWrapper}>
        <View style={[ feedStyles.storyRing, !story.hasStory && feedStyles.noStory]}>
            <Image source={{uri:story.avatar}} style={feedStyles.storyAvatar}></Image>
        </View>
        <Text style={feedStyles.storyUsername}>{story.username}</Text>
       </TouchableOpacity>
    )
}