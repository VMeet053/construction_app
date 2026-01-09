import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSite } from '../../context/SiteContext';
import CustomButton from '../../components/common/CustomButton';
import theme from '../../config/theme';
import { formatCurrency } from '../../utils/calculations';

const AbstractBillScreen = () => {
    const { selectedSite } = useSite();

    // Mock data - would come from measurements
    const workCategories = [
        { category: 'Excavation', amount: 150000 },
        { category: 'Concrete Work', amount: 450000 },
        { category: 'Brickwork', amount: 280000 },
        { category: 'Plastering', amount: 180000 },
        { category: 'Flooring', amount: 220000 },
    ];

    const total = workCategories.reduce((sum, item) => sum + item.amount, 0);

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
                <Text style={styles.subtitle}>Abstract Bill Summary</Text>
            </View>

            <View style={styles.card}>
                {workCategories.map((item, index) => (
                    <View key={index} style={styles.row}>
                        <Text style={styles.category}>{item.category}</Text>
                        <Text style={styles.amount}>{formatCurrency(item.amount)}</Text>
                    </View>
                ))}

                <View style={[styles.row, styles.totalRow]}>
                    <Text style={styles.totalLabel}>Total Amount:</Text>
                    <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
                </View>
            </View>

            <CustomButton title="Generate PDF" onPress={() => { }} style={styles.button} />
            <CustomButton title="Share Bill" onPress={() => { }} variant="outline" />
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
        marginBottom: theme.spacing.lg,
        ...theme.shadows.small,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: theme.spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },

    category: {
        fontSize: theme.fonts.sizes.md,
        color: theme.colors.text,
    },

    amount: {
        fontSize: theme.fonts.sizes.md,
        color: theme.colors.text,
        fontWeight: '500',
    },

    totalRow: {
        borderBottomWidth: 0,
        borderTopWidth: 2,
        borderTopColor: theme.colors.primary,
        marginTop: theme.spacing.sm,
        paddingTop: theme.spacing.md,
    },

    totalLabel: {
        fontSize: theme.fonts.sizes.lg,
        fontWeight: 'bold',
        color: theme.colors.text,
    },

    totalValue: {
        fontSize: theme.fonts.sizes.lg,
        fontWeight: 'bold',
        color: theme.colors.primary,
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

export default AbstractBillScreen;
