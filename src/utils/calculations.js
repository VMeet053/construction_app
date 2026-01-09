// Calculation helper functions for Construction Management App

/**
 * Calculate total amount from quantity and rate
 */
export const calculateAmount = (quantity, rate) => {
    const qty = parseFloat(quantity) || 0;
    const rt = parseFloat(rate) || 0;
    return qty * rt;
};

/**
 * Calculate measurement volume (Length × Width × Height)
 */
export const calculateVolume = (length, width, height) => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;
    return l * w * h;
};

/**
 * Calculate measurement area (Length × Width)
 */
export const calculateArea = (length, width) => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    return l * w;
};

/**
 * Calculate GST amount
 */
export const calculateGST = (amount, gstPercentage) => {
    const amt = parseFloat(amount) || 0;
    const gst = parseFloat(gstPercentage) || 0;
    return (amt * gst) / 100;
};

/**
 * Calculate total with GST
 */
export const calculateTotalWithGST = (amount, gstPercentage) => {
    const amt = parseFloat(amount) || 0;
    const gstAmount = calculateGST(amt, gstPercentage);
    return amt + gstAmount;
};

/**
 * Calculate balance (Total Bill - Paid - Deduction + Advance)
 */
export const calculateBalance = (totalBill, paid, deduction, advance) => {
    const total = parseFloat(totalBill) || 0;
    const paidAmount = parseFloat(paid) || 0;
    const deductionAmount = parseFloat(deduction) || 0;
    const advanceAmount = parseFloat(advance) || 0;

    return total - paidAmount - deductionAmount + advanceAmount;
};

/**
 * Calculate machine rent (Rate × Days/Hours)
 */
export const calculateMachineRent = (rate, duration, rateType = 'day') => {
    const rt = parseFloat(rate) || 0;
    const dur = parseFloat(duration) || 0;
    return rt * dur;
};

/**
 * Calculate total from array of items
 */
export const calculateTotal = (items, field = 'amount') => {
    if (!Array.isArray(items)) return 0;
    return items.reduce((sum, item) => sum + (parseFloat(item[field]) || 0), 0);
};

/**
 * Calculate attendance summary
 */
export const calculateAttendanceSummary = (attendanceRecords) => {
    if (!Array.isArray(attendanceRecords)) {
        return { present: 0, absent: 0, halfDay: 0, total: 0 };
    }

    const summary = attendanceRecords.reduce(
        (acc, record) => {
            if (record.status === 'present') acc.present++;
            else if (record.status === 'absent') acc.absent++;
            else if (record.status === 'halfday') acc.halfDay++;
            return acc;
        },
        { present: 0, absent: 0, halfDay: 0 }
    );

    summary.total = attendanceRecords.length;
    return summary;
};

/**
 * Calculate labour cost with attendance
 */
export const calculateLabourCostWithAttendance = (
    dailyRate,
    presentDays,
    halfDays = 0
) => {
    const rate = parseFloat(dailyRate) || 0;
    const present = parseFloat(presentDays) || 0;
    const half = parseFloat(halfDays) || 0;

    return (rate * present) + (rate * 0.5 * half);
};

/**
 * Format currency (Indian Rupee)
 */
export const formatCurrency = (amount) => {
    const amt = parseFloat(amount) || 0;
    try {
        if (typeof Intl !== 'undefined' && Intl.NumberFormat) {
            return new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                minimumFractionDigits: 2,
            }).format(amt);
        }
    } catch (error) {
        // Fallback if Intl fails
    }
    return '₹' + amt.toFixed(2);
};

/**
 * Format number with commas
 */
export const formatNumber = (number, decimals = 2) => {
    const num = parseFloat(number) || 0;
    try {
        if (typeof Intl !== 'undefined' && Intl.NumberFormat) {
            return num.toLocaleString('en-IN', {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
            });
        }
    } catch (error) {
        // Fallback
    }
    return num.toFixed(decimals);
};

/**
 * Calculate percentage
 */
export const calculatePercentage = (value, total) => {
    const val = parseFloat(value) || 0;
    const tot = parseFloat(total) || 0;
    if (tot === 0) return 0;
    return (val / tot) * 100;
};

/**
 * Round to 2 decimal places
 */
export const roundTo2Decimals = (number) => {
    return Math.round((parseFloat(number) || 0) * 100) / 100;
};
