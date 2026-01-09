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
import { siteSchema } from '../../utils/validators';
import CustomInput from '../../components/common/CustomInput';
import CustomDatePicker from '../../components/common/CustomDatePicker';
import CustomButton from '../../components/common/CustomButton';
import ErrorMessage from '../../components/common/ErrorMessage';
import theme from '../../config/theme';

const AddSiteScreen = ({ navigation }) => {
    const { addSite } = useSite();
    const [error, setError] = useState('');

    const handleSubmit = async (values, { setSubmitting }) => {
        setError('');

        try {
            // TODO: Replace with actual API call
            const newSite = {
                id: Date.now(),
                name: values.name,
                location: values.location,
                clientName: values.clientName,
                startDate: values.startDate,
            };

            addSite(newSite);

            Alert.alert(
                'Success',
                'Site added successfully!',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.goBack(),
                    },
                ]
            );
        } catch (err) {
            setError('Failed to add site. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                <ErrorMessage message={error} />

                <Formik
                    initialValues={{
                        name: '',
                        location: '',
                        clientName: '',
                        startDate: new Date(),
                    }}
                    validationSchema={siteSchema}
                    onSubmit={handleSubmit}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        setFieldValue,
                        handleSubmit,
                        isSubmitting,
                    }) => (
                        <View style={styles.form}>
                            <CustomInput
                                label="Site Name *"
                                value={values.name}
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                error={errors.name}
                                touched={touched.name}
                                placeholder="Enter site name"
                            />

                            <CustomInput
                                label="Location *"
                                value={values.location}
                                onChangeText={handleChange('location')}
                                onBlur={handleBlur('location')}
                                error={errors.location}
                                touched={touched.location}
                                placeholder="Enter location"
                            />

                            <CustomInput
                                label="Client Name *"
                                value={values.clientName}
                                onChangeText={handleChange('clientName')}
                                onBlur={handleBlur('clientName')}
                                error={errors.clientName}
                                touched={touched.clientName}
                                placeholder="Enter client name"
                            />

                            <CustomDatePicker
                                label="Start Date *"
                                value={values.startDate}
                                onChange={(date) => setFieldValue('startDate', date)}
                                error={errors.startDate}
                                touched={touched.startDate}
                            />

                            <CustomButton
                                title="Add Site"
                                onPress={handleSubmit}
                                loading={isSubmitting}
                                style={styles.submitButton}
                            />

                            <CustomButton
                                title="Cancel"
                                onPress={() => navigation.goBack()}
                                variant="outline"
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
        padding: theme.spacing.lg,
    },

    form: {
        width: '100%',
    },

    submitButton: {
        marginTop: theme.spacing.md,
        marginBottom: theme.spacing.sm,
    },
});

export default AddSiteScreen;
