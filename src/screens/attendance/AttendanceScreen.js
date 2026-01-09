import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { useSite } from '../../context/SiteContext';
import CustomDatePicker from '../../components/common/CustomDatePicker';
import CustomButton from '../../components/common/CustomButton';
import theme from '../../config/theme';
import { formatDate } from '../../utils/dateHelpers';

const AttendanceScreen = () => {
    const { selectedSite } = useSite();
    const [date, setDate] = useState(new Date());
    const [labourList, setLabourList] = useState([
        { id: 1, name: 'Ramesh Kumar', status: 'present' },
        { id: 2, name: 'Suresh Patel', status: 'present' },
        { id: 3, name: 'Mahesh Shah', status: 'present' },
        { id: 4, name: 'Dinesh Rao', status: 'present' },
        { id: 5, name: 'Rajesh Verma', status: 'present' },
    ]);

    const toggleStatus = (id) => {
        setLabourList(prev =>
            prev.map(labour => {
                if (labour.id === id) {
                    let newStatus = 'present';
                    if (labour.status === 'present') newStatus = 'absent';
                    else if (labour.status === 'absent') newStatus = 'halfday';
                    else newStatus = 'present';
                    return { ...labour, status: newStatus };
                }
                return labour;
            })
        );
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'present': return theme.colors.success;
            case 'absent': return theme.colors.error;
            case 'halfday': return theme.colors.warning;
            default: return theme.colors.textSecondary;
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'present': return 'Present';
            case 'absent': return 'Absent';
            case 'halfday': return 'Half Day';
            default: return 'Present';
        }
    };

    const handleSave = () => {
        // TODO: Save to API
        const summary = labourList.reduce((acc, labour) => {
            acc[labour.status] = (acc[labour.status] || 0) + 1;
            return acc;
        }, {});

        Alert.alert(
            'Attendance Saved',
            `Present: ${summary.present || 0}\nAbsent: ${summary.absent || 0}\nHalf Day: ${summary.halfday || 0}`,
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

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.siteText}>{selectedSite.name}</Text>
                <CustomDatePicker
                    value={date}
                    onChange={setDate}
                    style={styles.datePicker}
                />
            </View>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                {labourList.map((labour) => (
                    <TouchableOpacity
                        key={labour.id}
                        style={styles.labourCard}
                        onPress={() => toggleStatus(labour.id)}
                    >
                        <Text style={styles.labourName}>{labour.name}</Text>
                        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(labour.status) + '20' }]}>
                            <Text style={[styles.statusText, { color: getStatusColor(labour.status) }]}>
                                {getStatusText(labour.status)}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <View style={styles.footer}>
                <CustomButton title="Save Attendance" onPress={handleSave} />
            </View>
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
        marginBottom: theme.spacing.sm,
    },

    datePicker: {
        marginBottom: 0,
    },

    scrollView: {
        flex: 1,
    },

    scrollContent: {
        padding: theme.spacing.md,
    },

    labourCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.colors.card,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.sm,
        ...theme.shadows.small,
    },

    labourName: {
        fontSize: theme.fonts.sizes.md,
        color: theme.colors.text,
        fontWeight: '500',
    },

    statusBadge: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
        borderRadius: theme.borderRadius.md,
    },

    statusText: {
        fontSize: theme.fonts.sizes.sm,
        fontWeight: '600',
    },

    footer: {
        padding: theme.spacing.md,
        backgroundColor: theme.colors.card,
        ...theme.shadows.small,
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

export default AttendanceScreen;
