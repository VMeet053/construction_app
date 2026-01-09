import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import { Formik } from 'formik';
import { useSite } from '../../context/SiteContext';
import { labourWorkSchema } from '../../utils/validators';
import CustomInput from '../../components/common/CustomInput';
import CustomDropdown from '../../components/common/CustomDropdown';
import CustomButton from '../../components/common/CustomButton';
import theme from '../../config/theme';
import { calculateAmount, formatCurrency } from '../../utils/calculations';

const unitOptions = [
    { label: 'Square Feet (Sqft)', value: 'sqft' },
    { label: 'Running Feet (Rft)', value: 'rft' },
    { label: 'Cubic Meter (Cum)', value: 'cum' },
    { label: 'Number (Nos)', value: 'nos' },
    { label: 'Kilogram (Kg)', value: 'kg' },
];

const LabourWorkScreen = () => {
    const { selectedSite } = useSite();

    const handleSubmit = (values, { resetForm }) => {
        // TODO: Save to API
        const total = calculateAmount(values.quantity, values.rate);
        Alert.alert(
            'Success',
            `Labour work added successfully!\nTotal Cost: ${formatCurrency(total)}`,
            [{ text: 'OK', onPress: () => resetForm() }]
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

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                <View style={styles.header}>
                    <Text style={styles.siteText}>{selectedSite.name}</Text>
                </View>

                <Formik
                    initialValues={{
                        labourName: '',
                        workDescription: '',
                        unit: '',
                        quantity: '',
                        rate: '',
                    }}
                    validationSchema={labourWorkSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, handleChange, handleBlur, setFieldValue, handleSubmit, isSubmitting }) => {
                        const total = calculateAmount(values.quantity, values.rate);

                        return (
                            <View style={styles.form}>
                                <CustomInput
                                    label="Labour / Group Name *"
                                    value={values.labourName}
                                    onChangeText={handleChange('labourName')}
                                    onBlur={handleBlur('labourName')}
                                    error={errors.labourName}
                                    touched={touched.labourName}
                                    placeholder="Enter labour or group name"
                                />

                                <CustomInput
                                    label="Work Description *"
                                    value={values.workDescription}
                                    onChangeText={handleChange('workDescription')}
                                    onBlur={handleBlur('workDescription')}
                                    error={errors.workDescription}
                                    touched={touched.workDescription}
                                    placeholder="Enter work description"
                                    multiline
                                    numberOfLines={2}
                                />

                                <CustomDropdown
                                    label="Unit *"
                                    value={values.unit}
                                    onChange={(value) => setFieldValue('unit', value)}
                                    options={unitOptions}
                                    error={errors.unit}
                                    touched={touched.unit}
                                />

                                <CustomInput
                                    label="Quantity *"
                                    value={values.quantity}
                                    onChangeText={handleChange('quantity')}
                                    onBlur={handleBlur('quantity')}
                                    error={errors.quantity}
                                    touched={touched.quantity}
                                    placeholder="Enter quantity"
                                    keyboardType="numeric"
                                />

                                <CustomInput
                                    label="Rate (₹) *"
                                    value={values.rate}
                                    onChangeText={handleChange('rate')}
                                    onBlur={handleBlur('rate')}
                                    error={errors.rate}
                                    touched={touched.rate}
                                    placeholder="Enter rate per unit"
                                    keyboardType="numeric"
                                />

                                {values.quantity && values.rate && (
                                    <View style={styles.totalCard}>
                                        <Text style={styles.totalLabel}>Labour Cost:</Text>
                                        <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
                                    </View>
                                )}

                                <CustomButton
                                    title="Add Labour Work"
                                    onPress={handleSubmit}
                                    loading={isSubmitting}
                                />
                            </View>
                        );
                    }}
                </Formik>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },

    scrollContent: {
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

    form: {
        width: '100%',
    },

    totalCard: {
        backgroundColor: theme.colors.success + '20',
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
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

export default LabourWorkScreen;
