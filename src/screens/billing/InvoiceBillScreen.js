import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Alert,
} from 'react-native';
import { useSite } from '../../context/SiteContext';
import CustomDatePicker from '../../components/common/CustomDatePicker';
import CustomInput from '../../components/common/CustomInput';
import CustomButton from '../../components/common/CustomButton';
import theme from '../../config/theme';
import { formatCurrency, calculateTotalWithGST } from '../../utils/calculations';

const InvoiceBillScreen = () => {
    const { selectedSite } = useSite();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [materialCharges, setMaterialCharges] = useState('');
    const [labourCharges, setLabourCharges] = useState('');
    const [machineCharges, setMachineCharges] = useState('');
    const [gstPercentage, setGstPercentage] = useState('18');

    const handleGenerate = () => {
        const material = parseFloat(materialCharges) || 0;
        const labour = parseFloat(labourCharges) || 0;
        const machine = parseFloat(machineCharges) || 0;
        const subtotal = material + labour + machine;
        const total = calculateTotalWithGST(subtotal, parseFloat(gstPercentage) || 0);

        Alert.alert(
            'Invoice Generated',
            `Subtotal: ${formatCurrency(subtotal)}\nGST (${gstPercentage}%): ${formatCurrency(total - subtotal)}\nTotal: ${formatCurrency(total)}`,
            [{ text: 'OK' }]
        );
    };

    if (!selectedSite) {
        return (
            <View style={styles.noSiteContainer}>
                <Text style={styles.noSiteIcon}>🏗️</Text>
                <Text style={styles.noSiteText}>Please select a site first</Text>
            </View>
        );
    }

    const material = parseFloat(materialCharges) || 0;
    const labour = parseFloat(labourCharges) || 0;
    const machine = parseFloat(machineCharges) || 0;
    const subtotal = material + labour + machine;
    const total = calculateTotalWithGST(subtotal, parseFloat(gstPercentage) || 0);

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.header}>
                <Text style={styles.siteText}>{selectedSite.name}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Date Range</Text>
                <CustomDatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={setStartDate}
                />
                <CustomDatePicker
                    label="End Date"
                    value={endDate}
                    onChange={setEndDate}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Charges</Text>
                <CustomInput
                    label="Material Charges (₹)"
                    value={materialCharges}
                    onChangeText={setMaterialCharges}
                    placeholder="Enter material charges"
                    keyboardType="numeric"
                />
                <CustomInput
                    label="Labour Charges (₹)"
                    value={labourCharges}
                    onChangeText={setLabourCharges}
                    placeholder="Enter labour charges"
                    keyboardType="numeric"
                />
                <CustomInput
                    label="Machine Charges (₹)"
                    value={machineCharges}
                    onChangeText={setMachineCharges}
                    placeholder="Enter machine charges"
                    keyboardType="numeric"
                />
                <CustomInput
                    label="GST (%)"
                    value={gstPercentage}
                    onChangeText={setGstPercentage}
                    placeholder="Enter GST percentage"
                    keyboardType="numeric"
                />
            </View>

            {subtotal > 0 && (
                <View style={styles.summaryCard}>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Subtotal:</Text>
                        <Text style={styles.summaryValue}>{formatCurrency(subtotal)}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>GST ({gstPercentage}%):</Text>
                        <Text style={styles.summaryValue}>{formatCurrency(total - subtotal)}</Text>
                    </View>
                    <View style={[styles.summaryRow, styles.totalRow]}>
                        <Text style={styles.totalLabel}>Total:</Text>
                        <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
                    </View>
                </View>
            )}

            <CustomButton title="Generate Invoice" onPress={handleGenerate} />
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
        marginBottom: theme.spacing.md,
    },

    siteText: {
        fontSize: theme.fonts.sizes.lg,
        fontWeight: 'bold',
        color: theme.colors.text,
    },

    section: {
        marginBottom: theme.spacing.lg,
    },

    sectionTitle: {
        fontSize: theme.fonts.sizes.md,
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
    },

    summaryCard: {
        backgroundColor: theme.colors.card,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
        ...theme.shadows.small,
    },

    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: theme.spacing.sm,
    },

    summaryLabel: {
        fontSize: theme.fonts.sizes.md,
        color: theme.colors.textSecondary,
    },

    summaryValue: {
        fontSize: theme.fonts.sizes.md,
        color: theme.colors.text,
        fontWeight: '500',
    },

    totalRow: {
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        paddingTop: theme.spacing.sm,
        marginTop: theme.spacing.sm,
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

export default InvoiceBillScreen;
