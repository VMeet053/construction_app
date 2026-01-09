import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import theme from '../../config/theme';
import { formatDate } from '../../utils/dateHelpers';

const SiteDetailsScreen = ({ route, navigation }) => {
    const { site } = route.params;

    const menuItems = [
        { title: 'Attendance', icon: '✅', screen: 'WorkTab', subScreen: 'Attendance' },
        { title: 'Daily Expense', icon: '💰', screen: 'WorkTab', subScreen: 'DailyExpense' },
        // Material Purchase, Labour Work, Measurement disabled
        { title: 'Invoice Bill', icon: '📄', screen: 'BillingTab', subScreen: 'InvoiceBill' },
        { title: 'Invoice Entry', icon: '✍️', screen: 'BillingTab', subScreen: 'InvoiceEntry' },
        { title: 'Invoice List', icon: '🧾', screen: 'BillingTab', subScreen: 'InvoiceList' },
        // Removed: Abstract Bill, Main Bill, Payment Entry/History, Machine Entry/List
    ];

    const handleMenuPress = (item) => {
        navigation.navigate(item.screen, { screen: item.subScreen });
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {/* Site Info Card */}
            <View style={styles.infoCard}>
                <Text style={styles.siteName}>{site.name}</Text>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>📍 Location:</Text>
                    <Text style={styles.value}>{site.location}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>👤 Client:</Text>
                    <Text style={styles.value}>{site.clientName}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>📅 Start Date:</Text>
                    <Text style={styles.value}>{formatDate(site.startDate)}</Text>
                </View>
            </View>

            {/* Menu Section */}
            <Text style={styles.sectionTitle}>Site Management</Text>

            <View style={styles.menuGrid}>
                {menuItems.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.menuItem}
                        onPress={() => handleMenuPress(item)}
                    >
                        <Text style={styles.menuIcon}>{item.icon}</Text>
                        <Text style={styles.menuText}>{item.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },

    content: {
        padding: theme.spacing.md,
    },

    infoCard: {
        backgroundColor: theme.colors.card,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.lg,
        marginBottom: theme.spacing.lg,
        ...theme.shadows.medium,
    },

    siteName: {
        fontSize: theme.fonts.sizes.xxl,
        fontWeight: 'bold',
        color: theme.colors.primary,
        marginBottom: theme.spacing.md,
    },

    infoRow: {
        flexDirection: 'row',
        marginBottom: theme.spacing.sm,
    },

    label: {
        fontSize: theme.fonts.sizes.md,
        color: theme.colors.textSecondary,
        width: 120,
    },

    value: {
        fontSize: theme.fonts.sizes.md,
        color: theme.colors.text,
        flex: 1,
        fontWeight: '500',
    },

    sectionTitle: {
        fontSize: theme.fonts.sizes.lg,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: theme.spacing.md,
    },

    menuGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },

    menuItem: {
        width: '48%',
        backgroundColor: theme.colors.card,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
        alignItems: 'center',
        marginBottom: theme.spacing.md,
        ...theme.shadows.small,
    },

    menuIcon: {
        fontSize: 32,
        marginBottom: theme.spacing.sm,
    },

    menuText: {
        fontSize: theme.fonts.sizes.sm,
        fontWeight: '600',
        color: theme.colors.text,
        textAlign: 'center',
    },
});

export default SiteDetailsScreen;
