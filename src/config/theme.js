// Theme Configuration for Construction Management App
export const theme = {
    colors: {
        primary: '#4facfe',
        secondary: '#2196F3',
        accent: '#F7B801',
        background: '#F5F7FA',
        surface: '#FFFFFF',      // White
        error: '#E63946',        // Red
        success: '#4CAF50',
        warning: '#FFB703',      // Amber
        text: '#2D3436',
        textSecondary: '#8E8E93',
        border: '#E0E0E0',       // Light Border
        disabled: '#BDBDBD',     // Disabled Gray
        card: '#FFFFFF',         // Card Background
        shadow: '#000000',       // Shadow Color
    },

    fonts: {
        regular: 'System',
        medium: 'System',
        bold: 'System',
        sizes: {
            xs: 12,
            sm: 14,
            md: 16,
            lg: 18,
            xl: 20,
            xxl: 24,
            xxxl: 32,
        },
    },

    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 48,
    },

    borderRadius: {
        sm: 4,
        md: 8,
        lg: 12,
        xl: 16,
        round: 50,
    },

    shadows: {
        small: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
        },
        medium: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 4,
        },
        large: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.2,
            shadowRadius: 16,
            elevation: 8,
        },
    },
};

export default theme;
