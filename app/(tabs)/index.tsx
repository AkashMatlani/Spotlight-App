import { feedStyles } from '@/assets/style/feed.style';
import { useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Story from '../components/story';
import { STORIES } from '../constants/mock-data';
import { COLORS } from '../constants/theme';
export default function Index() {
  const { signOut } = useAuth();

  return (
    <View style={feedStyles.container}>
      <View style={feedStyles.header}>
        <Text style={feedStyles.headerTitle}>SpotLight</Text>
        <TouchableOpacity onPress={() => signOut()}>
          <Ionicons name='log-out-outline' size={24} color={COLORS.white}></Ionicons>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={feedStyles.storiesContainer}>
        {STORIES.map((story) => (
          <Story key={story.id} story={story} />
        ))}
      </ScrollView>
    </View>
  );
}
