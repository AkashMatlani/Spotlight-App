import { feedStyles } from '@/assets/style/feed.style';
import React from 'react';
import { ScrollView } from 'react-native';
import Story from '../components/story';
import { STORIES } from '../constants/mock-data';

const StoriesSection = () => {
    //header section of stories
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={feedStyles.storiesContainer}>
            {STORIES.map((story) => (
                <Story key={story.id} story={story} />
            ))}
        </ScrollView>
    )
}

export default StoriesSection