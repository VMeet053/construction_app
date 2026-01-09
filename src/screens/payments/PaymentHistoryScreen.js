import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSite } from '../../context/SiteContext';
import theme from '../../config/theme';
import { formatDate } from '../../utils/dateHelpers';
import { formatCurrency } from '../../utils/calculations';

const PaymentHistoryScreen = () => {
    const { selectedSite } = useSite();

    // Mock payment history
    const payments = [
        { id: 1, date: new Date('2024-01-15'), amount: 300000, mode: 'Bank Transfer', remark: 'Advance payment' },
        { id: 2, date: new Date('2024-02-10'), amount: 250000, mode: 'Cheque', remark: 'Progress payment 1' },
        { id: 3, date: new Date('2024-03-05'), amount: 200000, mode: 'UPI', remark: 'Progress payment 2' },
    ];

    const totalReceived = payments.reduce((sum, payment) => sum + payment.amount, 0);

    if (!selectedSite) {
        return (
            <View style={styles.noSiteContainer}>
                <Text style={styles.noSiteIcon}>🏗️</Text>
                <Text style={styles.noSiteText}>Please select a site first</Text>
            </View>
        );
    }

    const renderPayment = ({ item }) => (
        <View style={styles.paymentCard}>
            <View style={styles.paymentHeader}>
                <Text style={styles.amount}>{formatCurrency(item.amount)}</Text>
                <Text style={styles.date}>{formatDate(item.date)}</Text>
            </View>
            <View style={styles.paymentDetails}>
                <Text style={styles.mode}>💳 {item.mode}</Text>
                {item.remark && <Text style={styles.remark}>{item.remark}</Text>}
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.siteText}>{selectedSite.name}</Text>
                <View style={styles.totalCard}>
                    <Text style={styles.totalLabel}>Total Received:</Text>
                    <Text style={styles.totalValue}>{formatCurrency(totalReceived)}</Text>
                </View>
            </View>

            <FlatList
                data={payments}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderPayment}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyIcon}>💰</Text>
                        <Text style={styles.emptyText}>No payments yet</Text>
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },

    header: {
        backgroundColor: theme.colors.card,
        padding: theme.spacing.md,
        ...theme.shadows.small,
    },

    siteText: {
        fontSize: theme.fonts.sizes.lg,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: theme.spacing.md,
    },

    totalCard: {
        backgroundColor: theme.colors.success + '20',
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    totalLabel: {
        fontSize: theme.fonts.sizes.md,
        fontWeight: '600',
        color: theme.colors.text,
    },

    totalValue: {
        fontSize: theme.fonts.sizes.xl,
        fontWeight: 'bold',
        color: theme.colors.success,
    },

    listContent: {
        padding: theme.spacing.md,
    },

    paymentCard: {
        backgroundColor: theme.colors.card,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.sm,
        ...theme.shadows.small,
    },

    paymentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
    },

    amount: {
        fontSize: theme.fonts.sizes.lg,
        fontWeight: 'bold',
        color: theme.colors.success,
    },

    date: {
        fontSize: theme.fonts.sizes.sm,
        color: theme.colors.textSecondary,
    },

    paymentDetails: {
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        paddingTop: theme.spacing.sm,
    },

    mode: {
        fontSize: theme.fonts.sizes.sm,
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },

    remark: {
        fontSize: theme.fonts.sizes.sm,
        color: theme.colors.textSecondary,
        fontStyle: 'italic',
    },

    emptyContainer: {
        alignItems: 'center',
        paddingVertical: theme.spacing.xxl * 2,
    },

    emptyIcon: {
        fontSize: 80,
        marginBottom: theme.spacing.md,
    },

    emptyText: {
        fontSize: theme.fonts.sizes.lg,
        color: theme.colors.textSecondary,
    },

    noSiteContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
    },

    noSiteIcon: {
        fontSize: 80,
        marginBottom: theme.spacing.md,
    },

    noSiteText: {
        fontSize: theme.fonts.sizes.lg,
        color: theme.colors.textSecondary,
    },
});

export default PaymentHistoryScreen;
