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
import { measurementSchema } from '../../utils/validators';
import CustomInput from '../../components/common/CustomInput';
import CustomDropdown from '../../components/common/CustomDropdown';
import CustomButton from '../../components/common/CustomButton';
import theme from '../../config/theme';
import { calculateVolume, calculateArea, formatNumber } from '../../utils/calculations';

const unitOptions = [
    { label: 'Cubic Meter (Volume)', value: 'cum' },
    { label: 'Square Feet (Area)', value: 'sqft' },
    { label: 'Running Feet (Length)', value: 'rft' },
];

const MeasurementScreen = () => {
    const { selectedSite } = useSite();

    const handleSubmit = (values, { resetForm }) => {
        // TODO: Save to API
        let result = 0;
        if (values.unit === 'cum') {
            result = calculateVolume(values.length, values.width, values.height);
        } else if (values.unit === 'sqft') {
            result = calculateArea(values.length, values.width);
        } else {
            result = parseFloat(values.length) || 0;
        }

        Alert.alert(
            'Success',
            `Measurement added successfully!\nCalculated: ${formatNumber(result)} ${values.unit}`,
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
                        itemName: '',
                        length: '',
                        width: '',
                        height: '',
                        unit: '',
                    }}
                    validationSchema={measurementSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, handleChange, handleBlur, setFieldValue, handleSubmit, isSubmitting }) => {
                        let calculatedValue = 0;
                        if (values.unit === 'cum') {
                            calculatedValue = calculateVolume(values.length, values.width, values.height);
                        } else if (values.unit === 'sqft') {
                            calculatedValue = calculateArea(values.length, values.width);
                        } else if (values.unit === 'rft') {
                            calculatedValue = parseFloat(values.length) || 0;
                        }

                        return (
                            <View style={styles.form}>
                                <CustomInput
                                    label="Item Name *"
                                    value={values.itemName}
                                    onChangeText={handleChange('itemName')}
                                    onBlur={handleBlur('itemName')}
                                    error={errors.itemName}
                                    touched={touched.itemName}
                                    placeholder="Enter item name"
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
                                    label="Length *"
                                    value={values.length}
                                    onChangeText={handleChange('length')}
                                    onBlur={handleBlur('length')}
                                    error={errors.length}
                                    touched={touched.length}
                                    placeholder="Enter length"
                                    keyboardType="numeric"
                                />

                                {(values.unit === 'cum' || values.unit === 'sqft') && (
                                    <CustomInput
                                        label="Width *"
                                        value={values.width}
                                        onChangeText={handleChange('width')}
                                        onBlur={handleBlur('width')}
                                        error={errors.width}
                                        touched={touched.width}
                                        placeholder="Enter width"
                                        keyboardType="numeric"
                                    />
                                )}

                                {values.unit === 'cum' && (
                                    <CustomInput
                                        label="Height *"
                                        value={values.height}
                                        onChangeText={handleChange('height')}
                                        onBlur={handleBlur('height')}
                                        error={errors.height}
                                        touched={touched.height}
                                        placeholder="Enter height"
                                        keyboardType="numeric"
                                    />
                                )}

                                {values.unit && calculatedValue > 0 && (
                                    <View style={styles.resultCard}>
                                        <Text style={styles.resultLabel}>Calculated Measurement:</Text>
                                        <Text style={styles.resultValue}>
                                            {formatNumber(calculatedValue)} {values.unit}
                                        </Text>
                                    </View>
                                )}

                                <CustomButton
                                    title="Add Measurement"
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

    resultCard: {
        backgroundColor: theme.colors.secondary + '20',
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
        alignItems: 'center',
    },

    resultLabel: {
        fontSize: theme.fonts.sizes.sm,
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },

    resultValue: {
        fontSize: theme.fonts.sizes.xxl,
        fontWeight: 'bold',
        color: theme.colors.secondary,
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

export default MeasurementScreen;
