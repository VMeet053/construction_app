import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text, Platform } from 'react-native';
import Pdf from 'react-native-pdf';
import RNPrint from 'react-native-print';
import theme from '../../config/theme';

const InvoiceViewerScreen = ({ route, navigation }) => {
    const { filePath, invoiceNumber } = route.params;

    const handlePrint = async () => {
        try {
            await RNPrint.print({ filePath });
        } catch (error) {
            console.error('Error printing PDF:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>← Back</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{invoiceNumber}</Text>
                <TouchableOpacity onPress={handlePrint} style={styles.printButton}>
                    <Text style={styles.printButtonText}>⬇️ Save/Print</Text>
                </TouchableOpacity>
            </View>
            
            <Pdf
                source={{ uri: filePath, cache: true }}
                style={styles.pdf}
                onError={(error) => {
                    console.log(error);
                }}
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing.md,
        backgroundColor: theme.colors.primary,
        paddingTop: Platform.OS === 'ios' ? 50 : theme.spacing.md,
    },
    headerTitle: {
        color: '#fff',
        fontSize: theme.fonts.sizes.lg,
        fontWeight: 'bold',
    },
    backButton: {
        padding: theme.spacing.sm,
    },
    backButtonText: {
        color: '#fff',
        fontSize: theme.fonts.sizes.md,
    },
    printButton: {
        backgroundColor: '#fff',
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
        borderRadius: theme.borderRadius.sm,
    },
    printButtonText: {
        color: theme.colors.primary,
        fontWeight: '600',
        fontSize: theme.fonts.sizes.sm,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
});

export default InvoiceViewerScreen;
