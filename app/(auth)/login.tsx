import { loginStyles } from '@/assets/style/login.style';
import { useSSO } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, View } from 'react-native';

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
    <View style={loginStyles.container}>
      <Image source={require('@/assets/images/adaptive-icon.png')}
        style={loginStyles.logo}
      />
      <View style={loginStyles.logoText}>
        <Text style={loginStyles.text}>Spotlight</Text>
        <Text style={loginStyles.subText}>don't miss the anything</Text>
      </View>

      {/* IllustationContainer*/}
      <View style={loginStyles.illustationContainer}>
        <Image
          source={require('@/assets/images/auth-bg-2.png')}
          resizeMode="cover"
          style={loginStyles.illustration}
        />

      </View>
  
    </View>
  );
}