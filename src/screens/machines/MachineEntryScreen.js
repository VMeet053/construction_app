import React, { useState } from 'react';
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
import { machineSchema } from '../../utils/validators';
import CustomInput from '../../components/common/CustomInput';
import CustomDropdown from '../../components/common/CustomDropdown';
import CustomButton from '../../components/common/CustomButton';
import theme from '../../config/theme';

const rateTypes = [
    { label: 'Per Day', value: 'day' },
    { label: 'Per Hour', value: 'hour' },
];

const MachineEntryScreen = () => {
    const { selectedSite } = useSite();

    const handleSubmit = (values, { resetForm }) => {
        // TODO: Save to API
        Alert.alert(
            'Success',
            `Machine "${values.machineName}" added successfully!`,
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
                        machineName: '',
                        rentPerDay: '',
                        rateType: 'day',
                    }}
                    validationSchema={machineSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, handleChange, handleBlur, setFieldValue, handleSubmit, isSubmitting }) => (
                        <View style={styles.form}>
                            <CustomInput
                                label="Machine Name *"
                                value={values.machineName}
                                onChangeText={handleChange('machineName')}
                                onBlur={handleBlur('machineName')}
                                error={errors.machineName}
                                touched={touched.machineName}
                                placeholder="Enter machine name"
                            />

                            <CustomDropdown
                                label="Rate Type *"
                                value={values.rateType}
                                onChange={(value) => setFieldValue('rateType', value)}
                                options={rateTypes}
                                error={errors.rateType}
                                touched={touched.rateType}
                            />

                            <CustomInput
                                label={`Rent (₹ per ${values.rateType}) *`}
                                value={values.rentPerDay}
                                onChangeText={handleChange('rentPerDay')}
                                onBlur={handleBlur('rentPerDay')}
                                error={errors.rentPerDay}
                                touched={touched.rentPerDay}
                                placeholder="Enter rent amount"
                                keyboardType="numeric"
                            />

                            <CustomButton
                                title="Add Machine"
                                onPress={handleSubmit}
                                loading={isSubmitting}
                            />
                        </View>
                    )}
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

export default MachineEntryScreen;
