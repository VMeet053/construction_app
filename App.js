/**
 * Construction Management App
 * Main App Component
 */

import React, { useEffect } from 'react';
import { StatusBar, ToastAndroid, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import { SiteProvider } from './src/context/SiteContext';
import AppNavigator from './src/navigation/AppNavigator';
import theme from './src/config/theme';
import ErrorBoundary from './src/components/common/ErrorBoundary';

const App = () => {
    useEffect(() => {
        if (Platform.OS === 'android') {
            ToastAndroid.show('Construction App Loaded', ToastAndroid.SHORT);
        }
    }, []);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <ErrorBoundary>
                    <AuthProvider>
                        <SiteProvider>
                            <StatusBar
                                barStyle="light-content"
                                backgroundColor={theme.colors.primary}
                            />
                            <AppNavigator />
                        </SiteProvider>
                    </AuthProvider>
                </ErrorBoundary>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
};

export default App;
