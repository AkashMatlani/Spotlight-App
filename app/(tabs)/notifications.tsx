import { nofificationStyle } from '@/assets/style/notifications.style'
import { api } from '@/convex/_generated/api'
import { Ionicons } from '@expo/vector-icons'
import { useQuery } from 'convex/react'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import React from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import Loader from '../components/Loader'
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
        renderItem={({ item }) => <NotificationItem notification={item} />}
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

function NotificationItem({ notification }: any) {

  return (
    <View style={nofificationStyle.notificationItem}>
      <View style={nofificationStyle.notificationContent}>
        <Link href={'/notifications'} asChild>
          <TouchableOpacity style={nofificationStyle.avatarConatiner}>
            <Image source={notification.sender.image}
              style={nofificationStyle.avatar}
              contentFit="cover"
              transition={200}
            />
            <View style={nofificationStyle.iconBadge}>
              {notification.type === "like" ? (
                <Ionicons name='heart' size={14} color={COLORS.primary} />
              ) :
                notification.type === "follow" ? (<Ionicons name='person-add' size={14} color="#8B5CF6" />

                ) : (<Ionicons name='chatbubble' size={14} color="#3B82F6" />)}
            </View>
          </TouchableOpacity>
        </Link>

        <View style={nofificationStyle.notificationInfo}>
          <Link href={"/notifications"} asChild>
          <TouchableOpacity>
            <Text style={nofificationStyle.userName}>{notification.sender.username}</Text>
          </TouchableOpacity>
          </Link>

          <Text style={nofificationStyle.action}>
            {notification.type==="follow" ? 
            "started following you"
            :
            notification.type==="like"
            ? "liked your post"
            :
            `commented: "${notification.comment}"`}
          </Text>
        </View>


      </View>

    </View>)

}