import { nofificationStyle } from '@/assets/style/notifications.style'
import { api } from '@/convex/_generated/api'
import { Ionicons } from '@expo/vector-icons'
import { useQuery } from 'convex/react'
import React from 'react'
import { FlatList, Text, View } from 'react-native'
import Loader from '../components/Loader'
import Notifications from '../components/Notification'
import { COLORS } from '../constants/theme'

export default function notifications() {

  const notifications = useQuery(api.notifications.getNotifications)

  if (notifications === undefined) return <Loader />

  if (notifications.length === 0) return <NoNotificationFound />
  return (
    <View style={nofificationStyle.container}>
      <View style={nofificationStyle.header}>
        <Text style={nofificationStyle.headerTitle}>Notifications</Text>
      </View>

      <FlatList
        data={notifications}
        renderItem={({ item }) => <Notifications notification={item} />}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={nofificationStyle.listContainer}
      />
    </View>
  )
}

function NoNotificationFound() {
  return <View style={[nofificationStyle.container, nofificationStyle.centerd]}>
    <Ionicons name='notifications-outline' size={48} color={COLORS.primary} />
    <Text style={{ fontSize: 20, color: COLORS.white }}>No notifications yet</Text>
  </View>
}

