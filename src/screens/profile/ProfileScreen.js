import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Image,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import theme from '../../config/theme';
import { globalStyles } from '../../styles/globalStyles';

const ProfileScreen = ({ navigation }) => {
    const { user, logout } = useAuth();

    const MenuItem = ({ icon, label, onPress, color = theme.colors.text }) => (
        <TouchableOpacity style={styles.menuItem} onPress={onPress}>
            <View style={styles.menuItemLeft}>
                <Text style={[styles.menuItemIcon, { color }]}>{icon}</Text>
                <Text style={[styles.menuItemLabel, { color }]}>{label}</Text>
            </View>
            <Text style={styles.menuItemArrow}>›</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />
            
            {/* Header Section */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Profile</Text>
            </View>

            <ScrollView style={styles.content}>
                {/* User Profile Card */}
                <View style={styles.profileCard}>
                    <View style={styles.avatarContainer}>
                        <Text style={styles.avatarText}>
                            {user?.name?.charAt(0).toUpperCase() || 'U'}
                        </Text>
                    </View>
                    <Text style={styles.userName}>{user?.name || 'User'}</Text>
                    <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
                    <View style={styles.roleBadge}>
                        <Text style={styles.roleText}>{user?.role || 'User'}</Text>
                    </View>
                </View>

                {/* Account Settings */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Account</Text>
                    <View style={styles.menuContainer}>
                        <MenuItem 
                            icon="👤" 
                            label="Edit Profile" 
                            onPress={() => {}} 
                        />
                        <MenuItem 
                            icon="🔒" 
                            label="Change Password" 
                            onPress={() => {}} 
                        />
                        <MenuItem 
                            icon="🔔" 
                            label="Notifications" 
                            onPress={() => {}} 
                        />
                    </View>
                </View>

                {/* Support */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Support</Text>
                    <View style={styles.menuContainer}>
                        <MenuItem 
                            icon="❓" 
                            label="Help & Support" 
                            onPress={() => {}} 
                        />
                        <MenuItem 
                            icon="📄" 
                            label="Privacy Policy" 
                            onPress={() => {}} 
                        />
                    </View>
                </View>

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>

                <Text style={styles.versionText}>Version 1.0.0</Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        backgroundColor: theme.colors.primary,
        paddingTop: 20,
        paddingBottom: 20,
        paddingHorizontal: theme.spacing.md,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: theme.fonts.sizes.xl,
        fontWeight: 'bold',
        color: '#fff',
    },
    content: {
        flex: 1,
        padding: theme.spacing.md,
    },
    profileCard: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.lg,
        alignItems: 'center',
        marginBottom: theme.spacing.lg,
        ...theme.shadows.small,
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: theme.colors.primary + '20', // 20% opacity
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
        borderWidth: 2,
        borderColor: theme.colors.primary,
    },
    avatarText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    userName: {
        fontSize: theme.fonts.sizes.xl,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: 4,
    },
    userEmail: {
        fontSize: theme.fonts.sizes.md,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.sm,
    },
    roleBadge: {
        backgroundColor: theme.colors.secondary + '20',
        paddingHorizontal: theme.spacing.md,
        paddingVertical: 4,
        borderRadius: theme.borderRadius.round,
    },
    roleText: {
        fontSize: theme.fonts.sizes.xs,
        fontWeight: '600',
        color: theme.colors.secondary,
        textTransform: 'uppercase',
    },
    section: {
        marginBottom: theme.spacing.lg,
    },
    sectionTitle: {
        fontSize: theme.fonts.sizes.md,
        fontWeight: '600',
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.sm,
        marginLeft: theme.spacing.xs,
    },
    menuContainer: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.md,
        ...theme.shadows.small,
        overflow: 'hidden',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.background,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuItemIcon: {
        fontSize: 20,
        marginRight: theme.spacing.md,
        width: 24,
        textAlign: 'center',
    },
    menuItemLabel: {
        fontSize: theme.fonts.sizes.md,
        color: theme.colors.text,
    },
    menuItemArrow: {
        fontSize: 20,
        color: theme.colors.textSecondary,
    },
    logoutButton: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        alignItems: 'center',
        marginBottom: theme.spacing.lg,
        borderWidth: 1,
        borderColor: theme.colors.error,
    },
    logoutText: {
        fontSize: theme.fonts.sizes.md,
        fontWeight: '600',
        color: theme.colors.error,
    },
    versionText: {
        textAlign: 'center',
        color: theme.colors.textSecondary,
        fontSize: theme.fonts.sizes.sm,
        marginBottom: theme.spacing.xl,
    },
});

export default ProfileScreen;
