import { StyleSheet } from 'react-native';
import theme from '../config/theme';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },

    contentContainer: {
        padding: theme.spacing.md,
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
        alignItems: 'center',
    },

    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Typography
    title: {
        fontSize: theme.fonts.sizes.xxl,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
    },

    subtitle: {
        fontSize: theme.fonts.sizes.lg,
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
    },

    heading: {
        fontSize: theme.fonts.sizes.xl,
        fontWeight: 'bold',
        color: theme.colors.text,
    },

    body: {
        fontSize: theme.fonts.sizes.md,
        color: theme.colors.text,
    },

    caption: {
        fontSize: theme.fonts.sizes.sm,
        color: theme.colors.textSecondary,
    },

    label: {
        fontSize: theme.fonts.sizes.sm,
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },

    // Spacing
    mb1: { marginBottom: theme.spacing.xs },
    mb2: { marginBottom: theme.spacing.sm },
    mb3: { marginBottom: theme.spacing.md },
    mb4: { marginBottom: theme.spacing.lg },

    mt1: { marginTop: theme.spacing.xs },
    mt2: { marginTop: theme.spacing.sm },
    mt3: { marginTop: theme.spacing.md },
    mt4: { marginTop: theme.spacing.lg },

    p1: { padding: theme.spacing.xs },
    p2: { padding: theme.spacing.sm },
    p3: { padding: theme.spacing.md },
    p4: { padding: theme.spacing.lg },

    // Borders
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },

    borderTop: {
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
    },

    // Shadows
    shadowSmall: theme.shadows.small,
    shadowMedium: theme.shadows.medium,
    shadowLarge: theme.shadows.large,

    // Error
    errorText: {
        fontSize: theme.fonts.sizes.sm,
        color: theme.colors.error,
        marginTop: theme.spacing.xs,
    },

    // Divider
    divider: {
        height: 1,
        backgroundColor: theme.colors.border,
        marginVertical: theme.spacing.md,
    },
});

export default globalStyles;
