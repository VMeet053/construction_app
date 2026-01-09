import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    RefreshControl,
    TouchableOpacity,
    StatusBar,
    Dimensions
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useSite } from '../../context/SiteContext';
import theme from '../../config/theme';
import { formatCurrency } from '../../utils/calculations';

const { width } = Dimensions.get('window');

const DashboardScreen = ({ navigation }) => {
    const { user, logout } = useAuth();
    const { sites, selectedSite, selectSite } = useSite();
    const [refreshing, setRefreshing] = useState(false);
    const [metrics, setMetrics] = useState({
        totalSites: 0,
        todayExpense: 0,
        totalBilling: 0,
        pendingPayment: 0,
    });

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        // TODO: Replace with actual API call
        // Mock data for demonstration
        setMetrics({
            totalSites: sites.length || 3,
            todayExpense: 25000,
            totalBilling: 1500000,
            pendingPayment: 450000,
        });
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await loadDashboardData();
        setRefreshing(false);
    };

    const ActionButton = ({ icon, label, onPress }) => (
        <TouchableOpacity style={styles.actionBtn} onPress={onPress}>
            <View style={styles.actionIconContainer}>
                <Text style={styles.actionIcon}>{icon}</Text>
            </View>
            <Text style={styles.actionLabel}>{label}</Text>
        </TouchableOpacity>
    );

    const CardMetric = ({ icon, label, value, color }) => (
        <View style={styles.cardMetric}>
             <View style={[styles.cardMetricIconBg, { backgroundColor: color + '15' }]}>
                <Text style={[styles.cardMetricIcon, { color: color }]}>{icon}</Text>
             </View>
             <Text style={styles.cardMetricValue} numberOfLines={1}>{value}</Text>
             <Text style={styles.cardMetricLabel}>{label}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />
            
            {/* Blue Header Section */}
            <View style={styles.headerContainer}>
                <View style={styles.headerContent}>
                    <View>
                        <Text style={styles.headerTitle}>Hey {user?.name || 'User'},</Text>
                        <Text style={styles.headerSubtitle}>What will you do today?</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('ProfileTab')} style={styles.profileBtn}>
                         <Text style={styles.profileText}>{user?.name?.charAt(0) || 'U'}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />}
                showsVerticalScrollIndicator={false}
            >
                {/* Floating Balance Card */}
                <View style={styles.balanceCard}>
                    <View style={styles.balanceHeader}>
                        <View>
                            <Text style={styles.balanceLabel}>My total balance</Text>
                            <Text style={styles.balanceAmount}>{formatCurrency(metrics.totalBilling)}</Text>
                        </View>
                        <View style={styles.balanceBadge}>
                            <Text style={styles.balanceBadgeText}>+2.5%</Text>
                        </View>
                    </View>
                    
                    <View style={styles.balanceDivider} />

                    <View style={styles.cardMetricsRow}>
                        <CardMetric 
                            icon="⏳" 
                            label="Pending" 
                            value={formatCurrency(metrics.pendingPayment)} 
                            color={theme.colors.warning}
                        />
                        <CardMetric 
                            icon="💸" 
                            label="Expense" 
                            value={formatCurrency(metrics.todayExpense)} 
                            color={theme.colors.error}
                        />
                        <CardMetric 
                            icon="🏗️" 
                            label="Sites" 
                            value={metrics.totalSites.toString()} 
                            color={theme.colors.primary}
                        />
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionSection}>
                    <ActionButton 
                        icon="✅" 
                        label="Attendance" 
                        onPress={() => navigation.navigate('WorkTab', { screen: 'Attendance' })} 
                    />
                    <ActionButton 
                        icon="💰" 
                        label="Expense" 
                        onPress={() => navigation.navigate('WorkTab', { screen: 'DailyExpense' })} 
                    />
                    <ActionButton 
                        icon="📄" 
                        label="Billing" 
                        onPress={() => navigation.navigate('BillingTab', { screen: 'InvoiceBill' })} 
                    />
                    <ActionButton 
                        icon="➕" 
                        label="Add Site" 
                        onPress={() => navigation.navigate('SitesTab', { screen: 'AddSite' })} 
                    />
                </View>

                {/* Active Site / Transactions */}
                <View style={styles.listSection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Active Site</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SitesTab')}>
                                <Text style={styles.seeAllText}>See All</Text>
                        </TouchableOpacity>
                    </View>

                    {selectedSite ? (
                        <TouchableOpacity 
                            style={styles.siteItem}
                            onPress={() => navigation.navigate('SitesTab', { screen: 'SiteDetails', params: { site: selectedSite } })}
                        >
                            <View style={styles.siteIconContainer}>
                                <Text style={styles.siteIcon}>🏗️</Text>
                            </View>
                            <View style={styles.siteInfo}>
                                <Text style={styles.siteName}>{selectedSite.name}</Text>
                                <Text style={styles.siteAddress}>{selectedSite.location || 'No location'}</Text>
                            </View>
                            <View style={styles.siteStatus}>
                                <Text style={styles.statusText}>Active</Text>
                            </View>
                        </TouchableOpacity>
                    ) : (
                         <View style={styles.emptyState}>
                            <Text style={styles.emptyText}>No active site selected</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('SitesTab')} style={styles.selectBtn}>
                                <Text style={styles.selectBtnText}>Select Site</Text>
                            </TouchableOpacity>
                         </View>
                    )}
                    
                     {/* Additional Reports Item */}
                     <TouchableOpacity 
                        style={[styles.siteItem, { marginTop: 12 }]}
                        onPress={() => {}}
                     >
                            <View style={[styles.siteIconContainer, { backgroundColor: theme.colors.secondary + '20' }]}>
                                <Text style={styles.siteIcon}>📊</Text>
                            </View>
                            <View style={styles.siteInfo}>
                                <Text style={styles.siteName}>Weekly Report</Text>
                                <Text style={styles.siteAddress}>View detailed analysis</Text>
                            </View>
                    <Text style={styles.arrowIcon}>👉</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={{height: 100}} /> 
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    headerContainer: {
        backgroundColor: theme.colors.primary,
        height: 280,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        paddingHorizontal: 25,
        paddingTop: 60,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    headerSubtitle: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.9)',
        fontWeight: '500',
    },
    profileBtn: {
        width: 45,
        height: 45,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 22.5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    profileText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    scrollView: {
        flex: 1,
        marginTop: -100,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    balanceCard: {
        backgroundColor: '#fff',
        borderRadius: 25,
        padding: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
        marginBottom: 25,
    },
    balanceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    balanceLabel: {
        fontSize: 14,
        color: '#8E8E93',
        marginBottom: 5,
        fontWeight: '500',
    },
    balanceAmount: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2D3436',
    },
    balanceBadge: {
        backgroundColor: '#E8F5E9',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
    },
    balanceBadgeText: {
        color: '#4CAF50',
        fontWeight: 'bold',
        fontSize: 12,
    },
    balanceDivider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginBottom: 20,
    },
    cardMetricsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardMetric: {
        alignItems: 'center',
        flex: 1,
    },
    cardMetricIconBg: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    cardMetricIcon: {
        fontSize: 18,
    },
    cardMetricValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#2D3436',
        marginBottom: 2,
    },
    cardMetricLabel: {
        fontSize: 12,
        color: '#A0A0A0',
    },
    actionSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    actionBtn: {
        alignItems: 'center',
        width: '22%',
    },
    actionIconContainer: {
        width: 60,
        height: 60,
        backgroundColor: theme.colors.surface,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    actionIcon: {
        fontSize: 24,
    },
    actionLabel: {
        fontSize: 12,
        color: '#555',
        fontWeight: '500',
    },
    listSection: {
        marginBottom: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        paddingHorizontal: 5,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    seeAllText: {
        color: theme.colors.primary,
        fontSize: 14,
        fontWeight: '600',
    },
    siteItem: {
        backgroundColor: theme.colors.surface,
        borderRadius: 20,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 5,
        elevation: 2,
    },
    siteIconContainer: {
        width: 50,
        height: 50,
        backgroundColor: theme.colors.accent + '20',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    siteIcon: {
        fontSize: 22,
    },
    siteInfo: {
        flex: 1,
    },
    siteName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: 4,
    },
    siteAddress: {
        fontSize: 13,
        color: theme.colors.textSecondary,
    },
    siteStatus: {
        backgroundColor: theme.colors.secondary + '20',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
    },
    statusText: {
        color: theme.colors.secondary,
        fontSize: 11,
        fontWeight: '600',
    },
    emptyState: {
        backgroundColor: theme.colors.surface,
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    emptyText: {
        color: theme.colors.textSecondary,
        marginBottom: 15,
    },
    selectBtn: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
    selectBtnText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    arrowIcon: {
        fontSize: 16,
        color: '#CBD5E0',
    }
});

export default DashboardScreen;
