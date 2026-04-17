import { feedStyles } from '@/assets/style/feed.style';
import { api } from '@/convex/_generated/api';
import { useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from 'convex/react';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import Loader from '../components/Loader';
import Post from '../components/post';
import StoriesSection from '../components/Stories';
import { COLORS } from '../constants/theme';
export default function Index() {
  const { signOut } = useAuth();

  const [refreshKey, setRefreshKey] = useState(0);

  const posts = useQuery(api.posts.getFeedPosts, {refreshKey});

  const [isRefreshing, setIsRefreshing] = useState(false);

  const isLoading = posts ===undefined;
  
  const handleRefresh = async () => {
    setIsRefreshing(true);
    setRefreshKey((prev) => prev + 1);
    useEffect(() => {
      if (posts !== undefined) {
        setIsRefreshing(false);
      }
    }, [posts]);
  }

  //undefined means loading state
  if (isLoading) return <Loader />

  if (posts.length === 0) return <NoPostsFound />
  return (
    <View style={feedStyles.container}>
      <View style={feedStyles.header}>
        <Text style={feedStyles.headerTitle}>SpotLight</Text>
        <TouchableOpacity onPress={() => signOut()}>
          <Ionicons name='log-out-outline' size={24} color={COLORS.white}></Ionicons>
        </TouchableOpacity>
      </View>

      <FlatList data={posts}
        renderItem={({ item }) => <Post post={item} />}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
        ListHeaderComponent={<StoriesSection />}
        refreshControl={
          <RefreshControl
            onRefresh={handleRefresh}
            refreshing={isRefreshing || isLoading}
            tintColor={COLORS.primary}
          ></RefreshControl>
        }
      />
    </View>
  );
}


const NoPostsFound = () => (
  <View style={{
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  }}>

    <Text style={{ fontSize: 20, color: COLORS.primary }}>No Posts Yet</Text>
  </View>
)
