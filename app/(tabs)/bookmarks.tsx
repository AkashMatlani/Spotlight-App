import { feedStyles } from '@/assets/style/feed.style'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import { Image } from 'expo-image'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import Loader from '../components/Loader'
import { COLORS } from '../constants/theme'

export default function Bookmarks() {

  const bookamarkPosts = useQuery(api.bookmarks.getBookmarkPosts)

  if (bookamarkPosts === undefined) return <Loader />
  if (bookamarkPosts.length === 0) return <NoBookmarksFound />
  return (
    <View style={feedStyles.container}>
      <View style={feedStyles.header}>
        <Text style={feedStyles.headerTitle}>Bookamarks</Text>
      </View>
      <ScrollView contentContainerStyle={{
        padding: 8,
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}
      >
        {bookamarkPosts.map((post) => {
          if (!post) return null;
          return (
            <View key={post._id} style={{ width: "33.33%", padding: 1 }}>
              <Image source={post.imageUrl}
                style={{ width: "100%", aspectRatio: 1 }}
                contentFit='cover'
                transition={200}
                cachePolicy='memory-disk'>
              </Image>
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

function NoBookmarksFound() {
  return <View style={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  }}>

    <Text style={{ color: COLORS.primary, fontSize: 22 }}>No bookmarks post yet</Text>
  </View>
}