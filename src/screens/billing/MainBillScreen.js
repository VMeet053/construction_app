import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSite } from '../../context/SiteContext';
import CustomButton from '../../components/common/CustomButton';
import theme from '../../config/theme';
import { formatCurrency, calculateBalance } from '../../utils/calculations';

const MainBillScreen = () => {
    const { selectedSite } = useSite();

    // Mock data
    const billData = {
        totalBill: 1500000,
        advance: 300000,
        paid: 750000,
        deduction: 50000,
    };

    const balance = calculateBalance(
        billData.totalBill,
        billData.paid,
        billData.deduction,
        billData.advance
    );

    if (!selectedSite) {
        return (
            <View style={styles.noSiteContainer}>
                <Text style={styles.noSiteIcon}>🏗️</Text>
                <Text style={styles.noSiteText}>Please select a site first</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.header}>
                <Text style={styles.siteText}>{selectedSite.name}</Text>
                <Text style={styles.subtitle}>Main Bill</Text>
            </View>

            <View style={styles.card}>
                <View style={styles.row}>
                    <Text style={styles.label}>Total Bill Amount:</Text>
                    <Text style={styles.value}>{formatCurrency(billData.totalBill)}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Advance Received:</Text>
                    <Text style={[styles.value, styles.positive]}>
                        + {formatCurrency(billData.advance)}
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Amount Paid:</Text>
                    <Text style={[styles.value, styles.negative]}>
                        - {formatCurrency(billData.paid)}
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Deduction:</Text>
                    <Text style={[styles.value, styles.negative]}>
                        - {formatCurrency(billData.deduction)}
                    </Text>
                </View>

                <View style={[styles.row, styles.balanceRow]}>
                    <Text style={styles.balanceLabel}>Balance Amount:</Text>
                    <Text style={[styles.balanceValue, balance < 0 ? styles.negative : styles.positive]}>
                        {formatCurrency(Math.abs(balance))}
                    </Text>
                </View>
            </View>

            <View style={styles.statusCard}>
                <Text style={styles.statusLabel}>Payment Status:</Text>
                <Text style={[styles.statusValue, balance > 0 ? styles.pending : styles.completed]}>
                    {balance > 0 ? 'Pending' : 'Completed'}
                </Text>
            </View>

            <CustomButton title="Generate Final Bill PDF" onPress={() => { }} style={styles.button} />
            <CustomButton title="Send to Client" onPress={() => { }} variant="outline" />
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

    header: {
        marginBottom: theme.spacing.lg,
    },

    siteText: {
        fontSize: theme.fonts.sizes.xl,
        fontWeight: 'bold',
        color: theme.colors.text,
    },

    subtitle: {
        fontSize: theme.fonts.sizes.md,
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.xs,
    },

    card: {
        backgroundColor: theme.colors.card,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
        ...theme.shadows.small,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: theme.spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },

    label: {
        fontSize: theme.fonts.sizes.md,
        color: theme.colors.textSecondary,
    },

    value: {
        fontSize: theme.fonts.sizes.md,
        color: theme.colors.text,
        fontWeight: '500',
    },

    positive: {
        color: theme.colors.success,
    },

    negative: {
        color: theme.colors.error,
    },

    balanceRow: {
        borderBottomWidth: 0,
        borderTopWidth: 2,
        borderTopColor: theme.colors.primary,
        marginTop: theme.spacing.sm,
        paddingTop: theme.spacing.md,
    },

    balanceLabel: {
        fontSize: theme.fonts.sizes.lg,
        fontWeight: 'bold',
        color: theme.colors.text,
    },

    balanceValue: {
        fontSize: theme.fonts.sizes.xl,
        fontWeight: 'bold',
    },

    statusCard: {
        backgroundColor: theme.colors.card,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.lg,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...theme.shadows.small,
    },

    statusLabel: {
        fontSize: theme.fonts.sizes.md,
        fontWeight: '600',
        color: theme.colors.text,
    },

    statusValue: {
        fontSize: theme.fonts.sizes.lg,
        fontWeight: 'bold',
    },

    pending: {
        color: theme.colors.warning,
    },

    completed: {
        color: theme.colors.success,
    },

    button: {
        marginBottom: theme.spacing.sm,
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

export default MainBillScreen;
