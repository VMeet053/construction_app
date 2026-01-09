import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    RefreshControl,
} from 'react-native';
import { useSite } from '../../context/SiteContext';
import SiteCard from '../../components/common/SiteCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import theme from '../../config/theme';

const SiteListScreen = ({ navigation }) => {
    const { sites, setSites, selectedSite, selectSite } = useSite();
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadSites();
    }, []);

    const loadSites = async () => {
        // TODO: Replace with actual API call
        // Mock data for demonstration
        const mockSites = [
            {
                id: 1,
                name: 'Riverside Apartments',
                location: 'Ahmedabad, Gujarat',
                clientName: 'ABC Developers',
                startDate: new Date('2024-01-15'),
            },
            {
                id: 2,
                name: 'Commercial Complex',
                location: 'Surat, Gujarat',
                clientName: 'XYZ Builders',
                startDate: new Date('2024-02-01'),
            },
            {
                id: 3,
                name: 'Highway Bridge',
                location: 'Vadodara, Gujarat',
                clientName: 'Government of Gujarat',
                startDate: new Date('2023-12-10'),
            },
        ];

        setSites(mockSites);
        setLoading(false);
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await loadSites();
        setRefreshing(false);
    };

    const handleSitePress = (site) => {
        selectSite(site);
        navigation.navigate('SiteDetails', { site });
    };

    const handleAddSite = () => {
        navigation.navigate('AddSite');
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={sites}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <SiteCard
                        site={item}
                        onPress={handleSitePress}
                        selected={selectedSite?.id === item.id}
                    />
                )}
                contentContainerStyle={styles.listContent}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyIcon}>🏗️</Text>
                        <Text style={styles.emptyText}>No sites yet</Text>
                        <Text style={styles.emptySubtext}>Add your first construction site</Text>
                    </View>
                }
            />

            <TouchableOpacity style={styles.fab} onPress={handleAddSite}>
                <Text style={styles.fabIcon}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },

    listContent: {
        padding: theme.spacing.md,
    },

    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: theme.spacing.xxl * 2,
    },

    emptyIcon: {
        fontSize: 80,
        marginBottom: theme.spacing.md,
    },

    emptyText: {
        fontSize: theme.fonts.sizes.lg,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },

    emptySubtext: {
        fontSize: theme.fonts.sizes.md,
        color: theme.colors.textSecondary,
    },

    fab: {
        position: 'absolute',
        right: theme.spacing.lg,
        bottom: theme.spacing.lg,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        ...theme.shadows.large,
    },

    fabIcon: {
        fontSize: 32,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default SiteListScreen;
