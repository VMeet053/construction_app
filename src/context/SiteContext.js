import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SiteContext = createContext();

export const SiteProvider = ({ children }) => {
    const [selectedSite, setSelectedSite] = useState(null);
    const [sites, setSites] = useState([]);
    const [loading, setLoading] = useState(false);

    // Load selected site from storage
    useEffect(() => {
        loadSelectedSite();
        loadInitialSites();
    }, []);

    const loadInitialSites = () => {
        // Mock data for initial sites if empty
        if (sites.length === 0) {
            const mockSites = [
                {
                    id: 1,
                    name: 'City Center Mall',
                    location: 'Downtown',
                    clientName: 'ABC Corp',
                    startDate: '2023-01-15',
                    status: 'active'
                },
                {
                    id: 2,
                    name: 'Green Valley Apartments',
                    location: 'Suburb Area',
                    clientName: 'XYZ Developers',
                    startDate: '2023-03-10',
                    status: 'active'
                },
                {
                    id: 3,
                    name: 'Tech Park Phase 2',
                    location: 'IT Zone',
                    clientName: 'Tech Solutions',
                    startDate: '2023-06-01',
                    status: 'planning'
                }
            ];
            setSites(mockSites);
        }
    };

    const loadSelectedSite = async () => {
        try {
            const storedSite = await AsyncStorage.getItem('selectedSite');
            if (storedSite) {
                setSelectedSite(JSON.parse(storedSite));
            }
        } catch (error) {
            console.error('Error loading selected site:', error);
        }
    };

    const selectSite = async (site) => {
        try {
            await AsyncStorage.setItem('selectedSite', JSON.stringify(site));
            setSelectedSite(site);
        } catch (error) {
            console.error('Error selecting site:', error);
        }
    };

    const clearSelectedSite = async () => {
        try {
            await AsyncStorage.removeItem('selectedSite');
            setSelectedSite(null);
        } catch (error) {
            console.error('Error clearing selected site:', error);
        }
    };

    const addSite = (site) => {
        setSites(prevSites => [...prevSites, site]);
    };

    const updateSite = (siteId, updatedData) => {
        setSites(prevSites =>
            prevSites.map(site =>
                site.id === siteId ? { ...site, ...updatedData } : site
            )
        );

        // Update selected site if it's the one being updated
        if (selectedSite?.id === siteId) {
            setSelectedSite(prev => ({ ...prev, ...updatedData }));
        }
    };

    const deleteSite = (siteId) => {
        setSites(prevSites => prevSites.filter(site => site.id !== siteId));

        // Clear selected site if it's the one being deleted
        if (selectedSite?.id === siteId) {
            clearSelectedSite();
        }
    };

    const value = {
        selectedSite,
        sites,
        loading,
        selectSite,
        clearSelectedSite,
        addSite,
        updateSite,
        deleteSite,
        setSites,
    };

    return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
};

export const useSite = () => {
    const context = useContext(SiteContext);
    if (!context) {
        throw new Error('useSite must be used within a SiteProvider');
    }
    return context;
};

export default SiteContext;
