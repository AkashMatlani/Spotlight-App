import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import React from 'react'
import { Text, View } from 'react-native'
import Loader from '../components/Loader'
import { COLORS } from '../constants/theme'

export default function Bookmarks() {

  const bookamarkPosts = useQuery(api.bookmarks.getBookmarkPosts)

  if (bookamarkPosts === undefined) return <Loader />
  if (bookamarkPosts.length === 0) return <NoBookmarksFound />
  return (
    <View>
      <Text>bookmark</Text>
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