import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSite } from '../../context/SiteContext';
import theme from '../../config/theme';
import { formatCurrency, calculateMachineRent } from '../../utils/calculations';

const MachineListScreen = () => {
    const { selectedSite } = useSite();

    // Mock machine data
    const machines = [
        { id: 1, name: 'JCB Excavator', rate: 5000, rateType: 'day', days: 15 },
        { id: 2, name: 'Concrete Mixer', rate: 2000, rateType: 'day', days: 30 },
        { id: 3, name: 'Tower Crane', rate: 800, rateType: 'hour', days: 120 },
    ];

    if (!selectedSite) {
        return (
            <View style={styles.noSiteContainer}>
                <Text style={styles.noSiteIcon}>🏗️</Text>
                <Text style={styles.noSiteText}>Please select a site first</Text>
            </View>
        );
    }

    const renderMachine = ({ item }) => {
        const totalRent = calculateMachineRent(item.rate, item.days, item.rateType);

        return (
            <View style={styles.machineCard}>
                <View style={styles.machineHeader}>
                    <Text style={styles.machineName}>🚜 {item.name}</Text>
                    <Text style={styles.totalRent}>{formatCurrency(totalRent)}</Text>
                </View>
                <View style={styles.machineDetails}>
                    <Text style={styles.detail}>
                        Rate: {formatCurrency(item.rate)} per {item.rateType}
                    </Text>
                    <Text style={styles.detail}>
                        Duration: {item.days} {item.rateType}s
                    </Text>
                </View>
            </View>
        );
    };

    const totalMachineRent = machines.reduce(
        (sum, machine) => sum + calculateMachineRent(machine.rate, machine.days, machine.rateType),
        0
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.siteText}>{selectedSite.name}</Text>
                <View style={styles.totalCard}>
                    <Text style={styles.totalLabel}>Total Machine Rent:</Text>
                    <Text style={styles.totalValue}>{formatCurrency(totalMachineRent)}</Text>
                </View>
            </View>

            <FlatList
                data={machines}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderMachine}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyIcon}>🚜</Text>
                        <Text style={styles.emptyText}>No machines yet</Text>
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
        backgroundColor: theme.colors.warning + '20',
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
        color: theme.colors.warning,
    },

    listContent: {
        padding: theme.spacing.md,
    },

    machineCard: {
        backgroundColor: theme.colors.card,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.sm,
        ...theme.shadows.small,
    },

    machineHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
    },

    machineName: {
        fontSize: theme.fonts.sizes.md,
        fontWeight: 'bold',
        color: theme.colors.text,
        flex: 1,
    },

    totalRent: {
        fontSize: theme.fonts.sizes.lg,
        fontWeight: 'bold',
        color: theme.colors.primary,
    },

    machineDetails: {
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        paddingTop: theme.spacing.sm,
    },

    detail: {
        fontSize: theme.fonts.sizes.sm,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.xs,
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

export default MachineListScreen;
