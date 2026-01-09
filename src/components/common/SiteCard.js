import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import theme from '../../config/theme';
import { formatDate } from '../../utils/dateHelpers';

const SiteCard = ({ site, onPress, selected = false }) => {
    return (
        <TouchableOpacity
            style={[styles.card, selected && styles.selectedCard]}
            onPress={() => onPress(site)}
            activeOpacity={0.7}
        >
            <View style={styles.header}>
                <Text style={styles.siteName}>{site.name}</Text>
                {selected && (
                    <View style={styles.selectedBadge}>
                        <Text style={styles.selectedText}>Active</Text>
                    </View>
                )}
            </View>

            <View style={styles.infoRow}>
                <Text style={styles.label}>Location:</Text>
                <Text style={styles.value}>{site.location}</Text>
            </View>

            <View style={styles.infoRow}>
                <Text style={styles.label}>Client:</Text>
                <Text style={styles.value}>{site.clientName}</Text>
            </View>

            <View style={styles.infoRow}>
                <Text style={styles.label}>Start Date:</Text>
                <Text style={styles.value}>{formatDate(site.startDate)}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: theme.colors.card,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
        borderWidth: 2,
        borderColor: 'transparent',
        ...theme.shadows.small,
    },

    selectedCard: {
        borderColor: theme.colors.primary,
        ...theme.shadows.medium,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
    },

    siteName: {
        fontSize: theme.fonts.sizes.lg,
        fontWeight: 'bold',
        color: theme.colors.text,
        flex: 1,
    },

    selectedBadge: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
        borderRadius: theme.borderRadius.sm,
    },

    selectedText: {
        fontSize: theme.fonts.sizes.xs,
        color: '#fff',
        fontWeight: '600',
    },

    infoRow: {
        flexDirection: 'row',
        marginBottom: theme.spacing.xs,
    },

    label: {
        fontSize: theme.fonts.sizes.sm,
        color: theme.colors.textSecondary,
        width: 90,
    },

    value: {
        fontSize: theme.fonts.sizes.sm,
        color: theme.colors.text,
        flex: 1,
        fontWeight: '500',
    },
});

export default SiteCard;
