import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

// Auth Screens
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

// Main Screens
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import SiteListScreen from '../screens/sites/SiteListScreen';
import AddSiteScreen from '../screens/sites/AddSiteScreen';
import SiteDetailsScreen from '../screens/sites/SiteDetailsScreen';
import AttendanceScreen from '../screens/attendance/AttendanceScreen';
import DailyExpenseScreen from '../screens/expenses/DailyExpenseScreen';
// MaterialPurchase, LabourWork, Measurement disabled
import InvoiceBillScreen from '../screens/billing/InvoiceBillScreen';
import InvoiceListScreen from '../screens/billing/InvoiceListScreen';
import InvoiceEntryScreen from '../screens/billing/InvoiceEntryScreen';
import InvoiceViewerScreen from '../screens/billing/InvoiceViewerScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

import theme from '../config/theme';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Auth Stack
const AuthStack = () => (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
        }}
    >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
);

// Dashboard Tab
const DashboardStack = () => (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
        }}
    >
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
    </Stack.Navigator>
);

// Sites Tab
const SitesStack = () => (
    <Stack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: theme.colors.primary,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }}
    >
        <Stack.Screen name="SiteList" component={SiteListScreen} options={{ title: 'Sites' }} />
        <Stack.Screen name="AddSite" component={AddSiteScreen} options={{ title: 'Add Site' }} />
        <Stack.Screen name="SiteDetails" component={SiteDetailsScreen} options={{ title: 'Site Details' }} />
    </Stack.Navigator>
);

// Work Tab
const WorkStack = () => (
    <Stack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: theme.colors.primary,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }}
    >
        <Stack.Screen name="Attendance" component={AttendanceScreen} />
        <Stack.Screen name="DailyExpense" component={DailyExpenseScreen} options={{ title: 'Daily Expense' }} />
    </Stack.Navigator>
);

// Billing Tab
const BillingStack = () => (
    <Stack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: theme.colors.primary,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }}
    >
        <Stack.Screen name="InvoiceBill" component={InvoiceBillScreen} options={{ title: 'Invoice Bill' }} />
        <Stack.Screen name="InvoiceList" component={InvoiceListScreen} options={{ title: 'Invoice List' }} />
        <Stack.Screen name="InvoiceEntry" component={InvoiceEntryScreen} options={{ title: 'Invoice Entry' }} />
        <Stack.Screen name="InvoiceViewer" component={InvoiceViewerScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
);

// Profile Tab
const ProfileStack = () => (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
        }}
    >
        <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
);

// Main Tab Navigator
const MainTabs = () => (
    <Tab.Navigator
        screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: theme.colors.textSecondary,
            tabBarStyle: {
                backgroundColor: theme.colors.surface,
                borderTopWidth: 1,
                borderTopColor: theme.colors.border,
            },
        }}
    >
        <Tab.Screen
            name="DashboardTab"
            component={DashboardStack}
            options={{
                tabBarLabel: 'Dashboard',
                tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>📊</Text>,
            }}
        />
        <Tab.Screen
            name="SitesTab"
            component={SitesStack}
            options={{
                tabBarLabel: 'Sites',
                tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>🏗️</Text>,
            }}
        />
        <Tab.Screen
            name="WorkTab"
            component={WorkStack}
            options={{
                tabBarLabel: 'Work',
                tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>📝</Text>,
            }}
        />
        <Tab.Screen
            name="BillingTab"
            component={BillingStack}
            options={{
                tabBarLabel: 'Billing',
                tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>💰</Text>,
            }}
        />
        <Tab.Screen
            name="ProfileTab"
            component={ProfileStack}
            options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>👤</Text>,
            }}
        />
    </Tab.Navigator>
);

// Main App Navigator
const AppNavigator = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <NavigationContainer>
            {isAuthenticated ? <MainTabs /> : <AuthStack />}
        </NavigationContainer>
    );
};

export default AppNavigator;
