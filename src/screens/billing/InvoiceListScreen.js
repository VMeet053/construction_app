import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSite } from '../../context/SiteContext';
import theme from '../../config/theme';
import { formatDate } from '../../utils/dateHelpers';
import { formatCurrency } from '../../utils/calculations';

const InvoiceListScreen = () => {
    const { selectedSite } = useSite();

    const invoices = [
        { id: 1, number: 'INV-001', date: new Date('2024-01-20'), amount: 350000, status: 'Paid' },
        { id: 2, number: 'INV-002', date: new Date('2024-02-15'), amount: 420000, status: 'Partially Paid' },
        { id: 3, number: 'INV-003', date: new Date('2024-03-10'), amount: 280000, status: 'Pending' },
    ];

    if (!selectedSite) {
        return (
            <View style={styles.noSiteContainer}>
                <Text style={styles.noSiteIcon}>🏗️</Text>
                <Text style={styles.noSiteText}>Please select a site first</Text>
            </View>
        );
    }

    const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);

    const handleViewPdf = async (invoice) => {
        try {
            setGeneratingPdf(invoice.id);
            const options = {
                html: generateInvoiceHtml(invoice),
                fileName: `Invoice_${invoice.number}`,
                directory: 'Documents',
            };

            const file = await RNHTMLtoPDF.convert(options);
            
            setGeneratingPdf(null);
            
            navigation.navigate('InvoiceViewer', {
                filePath: file.filePath,
                invoiceNumber: invoice.number
            });

        } catch (error) {
            setGeneratingPdf(null);
            console.error('Error generating PDF:', error);
            Alert.alert('Error', 'Failed to generate PDF');
        }
    };

    const renderInvoice = ({ item }) => (
        <View style={styles.invoiceCard}>
            <View style={styles.invoiceHeader}>
                <Text style={styles.invoiceNumber}>🧾 {item.number}</Text>
                <Text style={styles.amount}>{formatCurrency(item.amount)}</Text>
            </View>
            <View style={styles.invoiceDetails}>
                <Text style={styles.detail}>Date: {formatDate(item.date)}</Text>
                <Text style={[styles.status, getStatusStyle(item.status)]}>{item.status}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.siteText}>{selectedSite.name}</Text>
                <View style={styles.totalCard}>
                    <Text style={styles.totalLabel}>Total Invoices:</Text>
                    <Text style={styles.totalValue}>{formatCurrency(totalAmount)}</Text>
                </View>
            </View>

            <FlatList
                data={invoices}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderInvoice}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyIcon}>🧾</Text>
                        <Text style={styles.emptyText}>No invoices yet</Text>
                    </View>
                }
            />
        </View>
    );
};

const getStatusStyle = (status) => {
    switch (status) {
        case 'Paid':
            return styles.statusPaid;
        case 'Partially Paid':
            return styles.statusPartial;
        default:
            return styles.statusPending;
    }
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
        backgroundColor: theme.colors.primary + '20',
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
        color: theme.colors.primary,
    },
    listContent: {
        padding: theme.spacing.md,
    },
    invoiceCard: {
        backgroundColor: theme.colors.card,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.sm,
        ...theme.shadows.small,
    },
    invoiceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
    },
    invoiceNumber: {
        fontSize: theme.fonts.sizes.md,
        fontWeight: 'bold',
        color: theme.colors.text,
        flex: 1,
    },
    amount: {
        fontSize: theme.fonts.sizes.lg,
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    invoiceDetails: {
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        paddingTop: theme.spacing.sm,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
    },
    actionRow: {
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        paddingTop: theme.spacing.sm,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    downloadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.primary + '15', // Light primary background
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: theme.borderRadius.sm,
    },
    downloadButtonText: {
        color: theme.colors.primary,
        fontWeight: '600',
        fontSize: theme.fonts.sizes.sm,
    },
    detail: {
        fontSize: theme.fonts.sizes.sm,
        color: theme.colors.textSecondary,
    },
    status: {
        fontSize: theme.fonts.sizes.sm,
        fontWeight: '600',
    },
    statusPaid: {
        color: theme.colors.success,
    },
    statusPartial: {
        color: theme.colors.warning,
    },
    statusPending: {
        color: theme.colors.error,
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

export default InvoiceListScreen;
