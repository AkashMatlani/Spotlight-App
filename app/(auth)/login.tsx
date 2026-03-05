import { useSSO } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Login() {
    
  const { startSSOFlow } = useSSO();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: 'oauth_google',
      });

      if (setActive && createdSessionId) {
        setActive({ session: createdSessionId });
        router.replace('/(tabs)');
      }
    } catch (error) {
      console.error('OAuth Login failed:', error);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={handleGoogleSignIn}>
        <Text>Login with Google</Text>
      </TouchableOpacity>

      
    </View>
  );
}