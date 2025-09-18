'use client';
/* eslint-disable react/no-unescaped-entities */

import React, { useState, useRef, useEffect } from 'react';
import {
    DollarSign,
    TrendingDown,
    AlertTriangle,
    BarChart3,
    PieChart,
    Calendar,
    MapPin,
    Phone,
    Mail,
    User,
    ChevronDown,
    CheckCircle,
    XCircle,
    ArrowRight,
    Home as HomeIcon,
    Clock,
    Users,
    FileText,
    Target
} from 'lucide-react';

interface DashboardComponentProps {
    title: string;
    children: React.ReactNode;
    delay?: number;
}

const DashboardComponent = ({ title, children, delay = 0 }: DashboardComponentProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setIsVisible(true), delay);
                }
            },
            { threshold: 0.2 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [delay]);

    return (
        <div
            ref={ref}
            className={`bg-white rounded-2xl shadow-2xl p-8`}
        >
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">{title}</h3>
            {children}
        </div>
    );
};

export const FinancialDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');

    // Sample data - in real app this would come from API
    const properties = [
        { id: 1, name: "Victoria Island Complex", units: 8, totalRent: 16000000 },
        { id: 2, name: "Lekki Phase 1 Apartments", units: 6, totalRent: 9000000 },
        { id: 3, name: "Ikoyi Duplex", units: 4, totalRent: 72000000 }
    ];

    const units = [
        { id: 1, property: "Victoria Island Complex", unit: "A1", rent: 2000000, rentType: "monthly", status: "paid", daysOwing: 0, tenant: "Adebayo Johnson", paymentHistory: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], reliabilityScore: 10 },
        { id: 2, property: "Victoria Island Complex", unit: "A2", rent: 2000000, rentType: "monthly", status: "owing", daysOwing: 89, tenant: "Fatima Ahmed", paymentHistory: [1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0], reliabilityScore: 4 },
        { id: 3, property: "Victoria Island Complex", unit: "B1", rent: 2000000, rentType: "monthly", status: "owing", daysOwing: 45, tenant: "Chinedu Okoro", paymentHistory: [1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0], reliabilityScore: 3 },
        { id: 4, property: "Victoria Island Complex", unit: "B2", rent: 2000000, rentType: "monthly", status: "owing", daysOwing: 38, tenant: "Grace Okafor", paymentHistory: [1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], reliabilityScore: 2 },
        { id: 5, property: "Lekki Phase 1 Apartments", unit: "101", rent: 1500000, rentType: "monthly", status: "paid", daysOwing: 0, tenant: "Michael Adebayo", paymentHistory: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], reliabilityScore: 10 },
        { id: 6, property: "Lekki Phase 1 Apartments", unit: "102", rent: 1500000, rentType: "monthly", status: "owing", daysOwing: 95, tenant: "Sarah Ibrahim", paymentHistory: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], reliabilityScore: 1 },
        { id: 7, property: "Lekki Phase 1 Apartments", unit: "201", rent: 1500000, rentType: "monthly", status: "owing", daysOwing: 112, tenant: "David Ogun", paymentHistory: [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], reliabilityScore: 1 },
        { id: 8, property: "Lekki Phase 1 Apartments", unit: "202", rent: 1500000, rentType: "monthly", status: "paid", daysOwing: 0, tenant: "Blessing Nwosu", paymentHistory: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], reliabilityScore: 10 },
        { id: 9, property: "Ikoyi Duplex", unit: "Duplex A", rent: 36000000, rentType: "yearly", status: "owing", daysOwing: 78, tenant: "Emeka Nwankwo", paymentHistory: [1, 1, 1, 0], reliabilityScore: 2 },
        { id: 10, property: "Ikoyi Duplex", unit: "Duplex B", rent: 36000000, rentType: "yearly", status: "paid", daysOwing: 0, tenant: "Aisha Mohammed", paymentHistory: [1, 1, 1, 1, 1], reliabilityScore: 10 }
    ];

    // Helper function to format overdue time
    const formatOverdueTime = (days: number) => {
        if (days >= 30) {
            const months = Math.floor(days / 30);
            const remainingDays = days % 30;
            if (remainingDays === 0) {
                return `${months} month${months > 1 ? 's' : ''}`;
            }
            return `${months} month${months > 1 ? 's' : ''} ${remainingDays}d`;
        } else if (days >= 7) {
            const weeks = Math.floor(days / 7);
            const remainingDays = days % 7;
            if (remainingDays === 0) {
                return `${weeks} week${weeks > 1 ? 's' : ''}`;
            }
            return `${weeks} week${weeks > 1 ? 's' : ''} ${remainingDays}d`;
        } else {
            return `${days} day${days > 1 ? 's' : ''}`;
        }
    };

    // Helper function to get reliability status
    const getReliabilityStatus = (score: number) => {
        if (score >= 8) return { label: "Excellent", color: "text-green-600", bg: "bg-green-50" };
        if (score >= 6) return { label: "Good", color: "text-blue-600", bg: "bg-blue-50" };
        if (score >= 4) return { label: "Fair", color: "text-yellow-600", bg: "bg-yellow-50" };
        return { label: "Poor", color: "text-red-600", bg: "bg-red-50" };
    };

    const totalRentCollected = units.filter(unit => unit.status === "paid").reduce((sum, unit) => sum + unit.rent, 0);
    const totalRentOwing = units.filter(unit => unit.status === "owing").reduce((sum, unit) => sum + unit.rent, 0);
    const totalUnits = units.length;
    const paidUnits = units.filter(unit => unit.status === "paid").length;
    const owingUnits = units.filter(unit => unit.status === "owing").length;
    const totalProperties = properties.length;

    // Categorize tenants by payment behavior
    const alwaysOnTime = units.filter(unit => unit.reliabilityScore >= 8);
    const sometimesLate = units.filter(unit => unit.reliabilityScore >= 4 && unit.reliabilityScore < 8);
    const alwaysLate = units.filter(unit => unit.reliabilityScore < 4);

    return (
        <DashboardComponent title="LiveableIndex Landlord Dashboard" delay={200}>
            <div className="space-y-6">
                {/* Dashboard Tabs */}
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'overview'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('tenants')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'tenants'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Tenant Analysis
                    </button>
                    <button
                        onClick={() => setActiveTab('collection')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'collection'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Collection Details
                    </button>
                    <button
                        onClick={() => setActiveTab('health')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'health'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Rental Health
                    </button>
                </div>

                {/* Key Metrics - Always Visible */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                        <div className="flex items-center space-x-2 mb-1">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            <p className="text-xs text-gray-600">Rent Collected</p>
                        </div>
                        <p className="text-lg font-bold text-green-600">₦{totalRentCollected.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">{paidUnits}/{totalUnits} units</p>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                        <div className="flex items-center space-x-2 mb-1">
                            <AlertTriangle className="w-4 h-4 text-red-600" />
                            <p className="text-xs text-gray-600">Rent Owing</p>
                        </div>
                        <p className="text-lg font-bold text-red-600">₦{totalRentOwing.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">{owingUnits} units</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <div className="flex items-center space-x-2 mb-1">
                            <HomeIcon className="w-4 h-4 text-blue-600" />
                            <p className="text-xs text-gray-600">Total Units</p>
                        </div>
                        <p className="text-lg font-bold text-blue-600">{totalUnits}</p>
                        <p className="text-xs text-gray-500">{totalProperties} properties</p>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                        <div className="flex items-center space-x-2 mb-1">
                            <Clock className="w-4 h-4 text-yellow-600" />
                            <p className="text-xs text-gray-600">Collection Rate</p>
                        </div>
                        <p className="text-lg font-bold text-yellow-600">{Math.round((paidUnits / totalUnits) * 100)}%</p>
                        <p className="text-xs text-gray-500">This month</p>
                    </div>
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                    <div className="grid lg:grid-cols-2 gap-4">
                        {/* Properties Overview */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold mb-3 text-gray-800 text-sm">Properties Overview</h4>
                            <div className="space-y-2">
                                {properties.map((property) => {
                                    const propertyUnits = units.filter(unit => unit.property === property.name);
                                    const paidCount = propertyUnits.filter(unit => unit.status === "paid").length;
                                    const owingCount = propertyUnits.filter(unit => unit.status === "owing").length;

                                    return (
                                        <div key={property.id} className="bg-white p-3 rounded border text-sm">
                                            <div className="flex justify-between items-center mb-1">
                                                <h5 className="font-medium text-gray-800 text-xs">{property.name}</h5>
                                                <span className="text-xs text-gray-500">{propertyUnits.length} units</span>
                                            </div>
                                            <div className="flex justify-between text-xs">
                                                <span className="text-green-600">✓ {paidCount} paid</span>
                                                <span className="text-red-600">⚠ {owingCount} owing</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Units Owing Money */}
                        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                            <h4 className="font-semibold mb-3 text-red-800 text-sm">Units Owing Money</h4>
                            <div className="space-y-2 max-h-48 overflow-y-auto">
                                {units.filter(unit => unit.status === "owing").map((unit) => (
                                    <div key={unit.id} className="bg-white p-3 rounded border border-red-200 text-sm">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-800 text-xs">{unit.property} - {unit.unit}</p>
                                                <p className="text-xs text-gray-600">{unit.tenant}</p>
                                                <p className="text-xs text-gray-500">₦{unit.rent.toLocaleString()}/{unit.rentType}</p>
                                            </div>
                                            <div className="text-right ml-2">
                                                <p className="text-sm font-bold text-red-600">{formatOverdueTime(unit.daysOwing)}</p>
                                                <p className="text-xs text-gray-500">overdue</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'tenants' && (
                    <div className="space-y-4">
                        {/* Tenant Categories */}
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                <h4 className="font-semibold text-green-800 mb-2">Always On-Time ({alwaysOnTime.length})</h4>
                                <div className="space-y-2">
                                    {alwaysOnTime.map((unit) => (
                                        <div key={unit.id} className="bg-white p-2 rounded text-xs">
                                            <p className="font-medium text-gray-800">{unit.tenant}</p>
                                            <p className="text-gray-500">{unit.property} - {unit.unit}</p>
                                            <p className="text-green-600">Score: {unit.reliabilityScore}/10</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                                <h4 className="font-semibold text-yellow-800 mb-2">Sometimes Late ({sometimesLate.length})</h4>
                                <div className="space-y-2">
                                    {sometimesLate.map((unit) => (
                                        <div key={unit.id} className="bg-white p-2 rounded text-xs">
                                            <p className="font-medium text-gray-800">{unit.tenant}</p>
                                            <p className="text-gray-500">{unit.property} - {unit.unit}</p>
                                            <p className="text-yellow-600">Score: {unit.reliabilityScore}/10</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                                <h4 className="font-semibold text-red-800 mb-2">Always Late ({alwaysLate.length})</h4>
                                <div className="space-y-2">
                                    {alwaysLate.map((unit) => (
                                        <div key={unit.id} className="bg-white p-2 rounded text-xs">
                                            <p className="font-medium text-gray-800">{unit.tenant}</p>
                                            <p className="text-gray-500">{unit.property} - {unit.unit}</p>
                                            <p className="text-red-600">Score: {unit.reliabilityScore}/10</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Detailed Tenant Analysis */}
                        <div className="bg-white p-4 rounded-lg border">
                            <h4 className="font-semibold text-gray-800 mb-4">Tenant Payment Analysis</h4>
                            <div className="space-y-3">
                                {units.map((unit) => {
                                    const reliability = getReliabilityStatus(unit.reliabilityScore);
                                    const onTimeRate = Math.round((unit.paymentHistory.filter(p => p === 1).length / unit.paymentHistory.length) * 100);

                                    return (
                                        <div key={unit.id} className="border rounded-lg p-3">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <p className="font-medium text-sm text-gray-800">{unit.tenant}</p>
                                                    <p className="text-xs text-gray-500">{unit.property} - {unit.unit}</p>
                                                </div>
                                                <div className="text-right">
                                                    <span className={`px-2 py-1 rounded-full text-xs ${reliability.bg} ${reliability.color}`}>
                                                        {reliability.label}
                                                    </span>
                                                    <p className="text-xs text-gray-500 mt-1">{onTimeRate}% on-time</p>
                                                </div>
                                            </div>


                                            <div className="flex justify-between text-xs text-gray-500">
                                                <span className="text-gray-500">Rent: ₦{unit.rent.toLocaleString()}/{unit.rentType}</span>
                                                <span className="text-gray-500">Score: {unit.reliabilityScore}/10</span>
                                                {unit.status === "owing" && (
                                                    <span className="text-red-600">{formatOverdueTime(unit.daysOwing)} overdue</span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'collection' && (
                    <div className="space-y-4">
                        {/* Collection Analytics */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                <h4 className="font-semibold text-blue-800 mb-2">Collection Summary</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Total Expected Rent:</span>
                                        <span className="font-semibold text-gray-800">₦{(totalRentCollected + totalRentOwing).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Actually Collected:</span>
                                        <span className="font-semibold text-green-600">₦{totalRentCollected.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Lost to Non-Payment:</span>
                                        <span className="font-semibold text-red-600">₦{totalRentOwing.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Collection Efficiency:</span>
                                        <span className="font-semibold text-gray-800">{Math.round((paidUnits / totalUnits) * 100)}%</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <h4 className="font-semibold text-gray-800 mb-2">Risk Assessment</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">High-Risk Tenants:</span>
                                        <span className="font-semibold text-red-600">{alwaysLate.length}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Medium-Risk Tenants:</span>
                                        <span className="font-semibold text-yellow-600">{sometimesLate.length}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Low-Risk Tenants:</span>
                                        <span className="font-semibold text-green-600">{alwaysOnTime.length}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Total at Risk:</span>
                                        <span className="font-semibold text-gray-800">₦{totalRentOwing.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Type Breakdown */}
                        <div className="bg-white p-4 rounded-lg border">
                            <h4 className="font-semibold text-gray-800 mb-4">Payment Type Analysis</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <h5 className="font-medium text-gray-800">Monthly Rentals</h5>
                                    {units.filter(unit => unit.rentType === "monthly").map((unit) => (
                                        <div key={unit.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                            <div>
                                                <p className="text-sm font-medium text-gray-800">{unit.tenant}</p>
                                                <p className="text-xs text-gray-500">{unit.property} - {unit.unit}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-semibold text-gray-800">₦{unit.rent.toLocaleString()}/month</p>
                                                <p className={`text-xs ${unit.status === "paid" ? "text-green-600" : "text-red-600"}`}>
                                                    {unit.status === "paid" ? "Paid" : `${formatOverdueTime(unit.daysOwing)} overdue`}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-3">
                                    <h5 className="font-medium text-gray-800">Yearly Rentals</h5>
                                    {units.filter(unit => unit.rentType === "yearly").map((unit) => (
                                        <div key={unit.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                            <div>
                                                <p className="text-sm font-medium text-gray-800">{unit.tenant}</p>
                                                <p className="text-xs text-gray-500">{unit.property} - {unit.unit}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-semibold text-gray-800">₦{unit.rent.toLocaleString()}/year</p>
                                                <p className={`text-xs ${unit.status === "paid" ? "text-green-600" : "text-red-600"}`}>
                                                    {unit.status === "paid" ? "Paid" : `${formatOverdueTime(unit.daysOwing)} overdue`}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'health' && (
                    <div className="space-y-4">
                        {/* Vacancy Losses */}
                        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                            <h4 className="font-semibold text-red-800 mb-2">Vacancy Losses</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-700">4 apartments vacant for 90+ days</span>
                                    <span className="text-lg font-bold text-red-600">₦2,100,000</span>
                                </div>
                                <p className="text-xs text-red-700">lost in rent already</p>
                                <div className="bg-white p-2 rounded border-l-4 border-orange-400">
                                    <p className="text-xs font-medium text-orange-800">Action Required:</p>
                                    <p className="text-xs text-orange-700">"Ask your PM to lower rent or renovate for quicker occupancy."</p>
                                </div>
                            </div>
                        </div>

                        {/* Vacancy Cost Clock */}
                        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                            <h4 className="font-semibold text-orange-800 mb-2">Vacancy Cost Clock</h4>
                            <div className="flex items-center space-x-4">
                                <div className="text-lg md:text-2xl font-bold text-orange-600">₦35,000</div>
                                <div className="text-sm text-orange-700">daily loss on vacant units</div>
                            </div>
                        </div>

                        {/* Rent Expiry Risk */}
                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                            <h4 className="font-semibold text-yellow-800 mb-2">Rent Expiry Risk</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-700">6 tenancy agreements expire within 60 days</span>
                                    <span className="text-lg font-bold text-yellow-600">₦8,000,000</span>
                                </div>
                                <p className="text-xs text-yellow-700">at risk if tenants exit or negotiate lower rent</p>
                                <div className="bg-white p-2 rounded border-l-4 border-yellow-400">
                                    <p className="text-xs font-medium text-yellow-800">Action Required:</p>
                                    <p className="text-xs text-yellow-700">"Have your PM start renewal conversations NOW."</p>
                                </div>
                            </div>
                        </div>

                        {/* Renewal Probability */}
                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                            <h4 className="font-semibold text-purple-800 mb-2">Renewal Probability Index</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-700">4 tenants have low likelihood of renewing</span>
                                    <span className="text-lg font-bold text-purple-600">₦5,500,000</span>
                                </div>
                                <p className="text-xs text-purple-700">annual rent at risk</p>
                            </div>
                        </div>

                        {/* Competitive Benchmarking */}
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <h4 className="font-semibold text-blue-800 mb-2">Competitive Benchmarking</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-700">Average 3-bed in Lekki:</span>
                                    <span className="font-semibold text-gray-800">₦6,500,000/year</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-700">Your average:</span>
                                    <span className="font-semibold text-gray-800">₦5,200,000/year</span>
                                </div>
                                <div className="flex justify-between text-red-600">
                                    <span className="text-red-600">You're leaving on the table:</span>
                                    <span className="font-bold text-red-600">₦1,300,000 per unit</span>
                                </div>
                                <div className="bg-white p-2 rounded border-l-4 border-blue-400">
                                    <p className="text-xs font-medium text-blue-800">Tip:</p>
                                    <p className="text-xs text-blue-700">"Upgrade fittings (e.g. POP ceiling, modern tiles, repainting) to justify higher rent."</p>
                                </div>
                            </div>
                        </div>

                        {/* Yield Comparison */}
                        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                            <h4 className="font-semibold text-indigo-800 mb-2">Yield Comparison</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-700">Your portfolio yield:</span>
                                    <span className="font-semibold text-red-600">4.8%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-700">Similar properties in area:</span>
                                    <span className="font-semibold text-green-600">7.3%</span>
                                </div>
                                <div className="flex justify-between text-red-600">
                                    <span className="text-red-600">Underperforming by:</span>
                                    <span className="font-bold text-red-600">2.5%</span>
                                </div>
                                <p className="text-xs text-indigo-700">⚠️ Equivalent to significant annual losses</p>
                            </div>
                        </div>

                        {/* Revenue Projection */}
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <h4 className="font-semibold text-gray-800 mb-2">Revenue Projection</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-700">Expected rent this year:</span>
                                    <span className="font-semibold text-gray-800">₦52,000,000</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-700">Collected so far:</span>
                                    <span className="font-semibold text-green-600">₦31,000,000 (59%)</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-700">Outstanding:</span>
                                    <span className="font-semibold text-red-600">₦21,000,000</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-700">Tenants owing:</span>
                                    <span className="font-semibold text-red-600">14 tenants</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardComponent>
    );
};

export const MaintenanceTracker = () => {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <DashboardComponent title="Maintenance Tracker" delay={400}>
            <div className="space-y-6">
                {/* Dashboard Tabs */}
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'overview'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Property Health
                    </button>
                    <button
                        onClick={() => setActiveTab('maintenance')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'maintenance'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Maintenance Analysis
                    </button>
                    <button
                        onClick={() => setActiveTab('inspections')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'inspections'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Inspections & Reports
                    </button>
                </div>

                {/* Key Metrics - Always Visible */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                        <div className="flex items-center space-x-2 mb-1">
                            <AlertTriangle className="w-4 h-4 text-red-600" />
                            <p className="text-xs text-gray-600">High Risk Units</p>
                        </div>
                        <p className="text-lg font-bold text-red-600">7</p>
                        <p className="text-xs text-gray-500">not inspected 2+ years</p>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                        <div className="flex items-center space-x-2 mb-1">
                            <Clock className="w-4 h-4 text-orange-600" />
                            <p className="text-xs text-gray-600">Last PM Report</p>
                        </div>
                        <p className="text-lg font-bold text-orange-600">18 months</p>
                        <p className="text-xs text-gray-500">ago</p>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                        <div className="flex items-center space-x-2 mb-1">
                            <HomeIcon className="w-4 h-4 text-yellow-600" />
                            <p className="text-xs text-gray-600">Structural Issues</p>
                        </div>
                        <p className="text-lg font-bold text-yellow-600">3</p>
                        <p className="text-xs text-gray-500">critical warnings</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <div className="flex items-center space-x-2 mb-1">
                            <DollarSign className="w-4 h-4 text-blue-600" />
                            <p className="text-xs text-gray-600">Overspending</p>
                        </div>
                        <p className="text-lg font-bold text-blue-600">₦900k</p>
                        <p className="text-xs text-gray-500">yearly</p>
                    </div>
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                    <div className="space-y-4">
                        {/* Property Health Overview */}
                        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                            <h4 className="font-semibold text-red-800 mb-2">Property Health Overview</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-700">7 units have not been inspected in over 2 years</span>
                                    <span className="text-lg font-bold text-red-600">⚠️ HIGH RISK</span>
                                </div>
                                <p className="text-xs text-red-700">You risk repairs wiping out 2 years of rent due to inflation (avg. +18% yearly)</p>
                                <div className="bg-white p-2 rounded border-l-4 border-orange-400">
                                    <p className="text-xs font-medium text-orange-800">Action Required:</p>
                                    <p className="text-xs text-orange-700">"Schedule urgent inspections."</p>
                                </div>
                            </div>
                        </div>

                        {/* Critical Issues */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                                <h4 className="font-semibold text-orange-800 mb-2">Deferred Maintenance Risk</h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-700">Unit B-14 plumbing not checked in 3 years</span>
                                        <span className="text-lg font-bold text-orange-600">₦2,000,000+</span>
                                    </div>
                                    <p className="text-xs text-orange-700">Water damage could cost ₦2m+ if not addressed</p>
                                </div>
                            </div>

                            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                                <h4 className="font-semibold text-yellow-800 mb-2">Structural Red Flags</h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-700">Cracks in Block C could escalate to failure</span>
                                        <span className="text-lg font-bold text-yellow-600">18 months</span>
                                    </div>
                                    <p className="text-xs text-yellow-700">if ignored - could cost millions to repair</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'maintenance' && (
                    <div className="space-y-4">
                        {/* Maintenance Efficiency */}
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <h4 className="font-semibold text-blue-800 mb-2">Maintenance Efficiency Analysis</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-700">Annual maintenance spend:</span>
                                    <span className="font-semibold text-red-600">₦3,600,000</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-700">Industry average for your portfolio size:</span>
                                    <span className="font-semibold text-green-600">₦2,700,000</span>
                                </div>
                                <div className="flex justify-between text-red-600">
                                    <span className="text-red-600">⚠️ Overspending:</span>
                                    <span className="font-bold text-red-600">₦900,000 yearly</span>
                                </div>
                            </div>
                        </div>

                        {/* Maintenance Breakdown */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <h4 className="font-semibold text-gray-800 mb-2">Maintenance Categories</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Plumbing & Water:</span>
                                        <span className="font-semibold text-gray-800">₦1,200,000</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Electrical:</span>
                                        <span className="font-semibold text-gray-800">₦800,000</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Structural:</span>
                                        <span className="font-semibold text-gray-800">₦600,000</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">General Repairs:</span>
                                        <span className="font-semibold text-gray-800">₦1,000,000</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                <h4 className="font-semibold text-green-800 mb-2">Cost Optimization</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Preventive maintenance:</span>
                                        <span className="font-semibold text-green-600">₦1,800,000</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Emergency repairs:</span>
                                        <span className="font-semibold text-red-600">₦1,800,000</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Emergency ratio:</span>
                                        <span className="font-semibold text-red-600">50% (High)</span>
                                    </div>
                                    <p className="text-xs text-green-700 mt-2">Target: 30% emergency, 70% preventive</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'inspections' && (
                    <div className="space-y-4">
                        {/* Last PM Report */}
                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                            <h4 className="font-semibold text-purple-800 mb-2">Last PM Report Status</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-700">Last report submitted: March 2023</span>
                                    <span className="text-lg font-bold text-purple-600">18 months ago</span>
                                </div>
                                <p className="text-xs text-purple-700">⚠️ You've had NO professional update in over a year</p>
                                <div className="bg-white p-2 rounded border-l-4 border-purple-400">
                                    <p className="text-xs font-medium text-purple-800">Recommendation:</p>
                                    <p className="text-xs text-purple-700">"Request immediate property assessment from your PM."</p>
                                </div>
                            </div>
                        </div>

                        {/* Inspection Schedule */}
                        <div className="bg-white p-4 rounded-lg border">
                            <h4 className="font-semibold text-gray-800 mb-4">Inspection Schedule & Status</h4>
                            <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                    <div className="text-center">
                                        <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold">Overdue</div>
                                        <p className="text-lg font-bold text-red-600 mt-1">7 units</p>
                                        <p className="text-xs text-gray-500">2+ years</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">Due Soon</div>
                                        <p className="text-lg font-bold text-yellow-600 mt-1">3 units</p>
                                        <p className="text-xs text-gray-500">within 3 months</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">Current</div>
                                        <p className="text-lg font-bold text-green-600 mt-1">0 units</p>
                                        <p className="text-xs text-gray-500">up to date</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardComponent>
    );
};

export const TenantCommunication = () => {
    return (
        <DashboardComponent title="Tenant Communication Hub" delay={600}>
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <Mail className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <p className="font-semibold">12</p>
                        <p className="text-sm text-gray-600">New Messages</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                        <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <p className="font-semibold">8</p>
                        <p className="text-sm text-gray-600">Resolved Today</p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg text-center">
                        <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                        <p className="font-semibold">3</p>
                        <p className="text-sm text-gray-600">Pending Responses</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="border-l-4 border-blue-600 bg-blue-50 p-4 rounded-r-lg">
                        <div className="flex justify-between items-start mb-2">
                            <p className="font-semibold">Sarah Johnson - Unit 2B</p>
                            <span className="text-xs text-gray-500">2 hours ago</span>
                        </div>
                        <p className="text-gray-700">"Hi, the kitchen faucet is dripping. Can someone take a look?"</p>
                        <button className="mt-2 bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                            Respond
                        </button>
                    </div>

                    <div className="border-l-4 border-green-600 bg-green-50 p-4 rounded-r-lg">
                        <div className="flex justify-between items-start mb-2">
                            <p className="font-semibold">Mike Chen - Unit 1A</p>
                            <span className="text-xs text-gray-500">1 day ago</span>
                        </div>
                        <p className="text-gray-700">"Thank you for the quick AC repair! Everything is working perfectly now."</p>
                        <div className="mt-2 flex items-center text-green-600">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            <span className="text-sm text-green-600">Resolved</span>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardComponent>
    );
};

export const MarketAnalysis = () => {
    const [selectedProperty, setSelectedProperty] = useState('Unit 2B');

    return (
        <DashboardComponent title="Market Analysis & Pricing Strategy" delay={200}>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <select
                        value={selectedProperty}
                        onChange={(e) => setSelectedProperty(e.target.value)}
                        className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-2"
                    >
                        <option>Unit 2B</option>
                        <option>Unit 1A</option>
                        <option>Unit 3C</option>
                    </select>
                    <div className="text-right">
                        <p className="text-sm text-gray-600">Market Position</p>
                        <p className="text-xl md:text-3xl font-bold text-green-600">Optimal</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <Target className="w-6 h-6 text-blue-600 mb-2" />
                        <p className="text-sm text-gray-600">Current Rent</p>
                        <p className="text-xl font-semibold text-blue-600">$2,200</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                        <TrendingDown className="w-6 h-6 text-green-600 mb-2" />
                        <p className="text-sm text-gray-600">Market Average</p>
                        <p className="text-xl font-semibold text-green-600">$2,150</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                        <BarChart3 className="w-6 h-6 text-purple-600 mb-2" />
                        <p className="text-sm text-gray-600">Potential Increase</p>
                        <p className="text-xl font-semibold text-purple-600">$150/mo</p>
                    </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold mb-4">Comparable Properties Analysis</h4>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-medium">123 Oak Street (0.2 mi)</p>
                                <p className="text-sm text-gray-600">2BR/2BA • 1,100 sq ft</p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold">$2,300</p>
                                <p className="text-sm text-green-600">+$100 opportunity</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-medium">456 Pine Avenue (0.4 mi)</p>
                                <p className="text-sm text-gray-600">2BR/2BA • 1,050 sq ft</p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold">$2,100</p>
                                <p className="text-sm text-blue-600">Market rate</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-medium">789 Elm Drive (0.6 mi)</p>
                                <p className="text-sm text-gray-600">2BR/2BA • 1,200 sq ft</p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold">$2,400</p>
                                <p className="text-sm text-green-600">+$200 potential</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                        <h5 className="font-semibold text-green-800 mb-2">Pricing Recommendation</h5>
                        <p className="text-sm text-gray-700">Based on market analysis, you can increase rent by $150/month at next renewal while remaining competitive.</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h5 className="font-semibold text-blue-800 mb-2">Market Trends</h5>
                        <p className="text-sm text-gray-700">Local market showing 8% annual growth. Consider strategic improvements to justify premium pricing.</p>
                    </div>
                </div>
            </div>
        </DashboardComponent>
    );
};

export const RiskManagement = () => {
    const [activeTab, setActiveTab] = useState('compliance');

    interface RiskItem {
        item: string;
        status: string;
        date: string;
    }

    const riskData: { [key: string]: RiskItem[] } = {
        compliance: [
            { item: "Fair Housing Training", status: "current", date: "Updated Oct 2024" },
            { item: "Local Rental Licenses", status: "current", date: "Expires Dec 2024" },
            { item: "Safety Inspections", status: "warning", date: "Due Nov 2024" },
            { item: "Lead Paint Disclosure", status: "current", date: "On file" }
        ],
        insurance: [
            { item: "Property Insurance", status: "current", date: "Renewed Sep 2024" },
            { item: "Liability Coverage", status: "current", date: "$2M coverage" },
            { item: "Loss of Rent", status: "warning", date: "Consider upgrade" },
            { item: "Umbrella Policy", status: "missing", date: "Recommended" }
        ],
        legal: [
            { item: "Lease Agreements", status: "current", date: "State compliant" },
            { item: "Eviction Procedures", status: "current", date: "Updated 2024" },
            { item: "Security Deposit Laws", status: "current", date: "Compliant" },
            { item: "Tenant Screening", status: "warning", date: "Review process" }
        ]
    };

    return (
        <DashboardComponent title="Legal Compliance & Risk Management" delay={400}>
            <div className="space-y-6">
                <div className="flex space-x-4 border-b">
                    <button
                        onClick={() => setActiveTab('compliance')}
                        className={`pb-2 px-1 ${activeTab === 'compliance' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
                    >
                        Compliance
                    </button>
                    <button
                        onClick={() => setActiveTab('insurance')}
                        className={`pb-2 px-1 ${activeTab === 'insurance' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-600'}`}
                    >
                        Insurance
                    </button>
                    <button
                        onClick={() => setActiveTab('legal')}
                        className={`pb-2 px-1 ${activeTab === 'legal' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-600'}`}
                    >
                        Legal
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                        <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <p className="font-semibold">12</p>
                        <p className="text-sm text-gray-600">Items Compliant</p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg text-center">
                        <AlertTriangle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                        <p className="font-semibold">3</p>
                        <p className="text-sm text-gray-600">Need Attention</p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg text-center">
                        <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                        <p className="font-semibold">1</p>
                        <p className="text-sm text-gray-600">Critical Issues</p>
                    </div>
                </div>

                <div className="space-y-3">
                    {riskData[activeTab].map((item: RiskItem, index: number) => (
                        <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-gray-800">{item.item}</p>
                                    <p className="text-sm text-gray-600">{item.date}</p>
                                </div>
                                <div className="flex items-center">
                                    {item.status === 'current' && (
                                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center">
                                            <CheckCircle className="w-4 h-4 mr-1" />
                                            Current
                                        </span>
                                    )}
                                    {item.status === 'warning' && (
                                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm flex items-center">
                                            <AlertTriangle className="w-4 h-4 mr-1" />
                                            Review
                                        </span>
                                    )}
                                    {item.status === 'missing' && (
                                        <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm flex items-center">
                                            <XCircle className="w-4 h-4 mr-1" />
                                            Missing
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-3">Risk Assessment Summary</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">Overall Risk Level</p>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div className="bg-yellow-500 h-3 rounded-full w-1/3"></div>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">Moderate - Action needed</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">Compliance Score</p>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div className="bg-green-500 h-3 rounded-full w-4/5"></div>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">80% - Good standing</p>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardComponent>
    );
};

interface DangerSectionProps {
    title: string;
    description: string;
    consequences: string[];
    delay?: number;
}

export const DangerSection = ({ title, description, consequences, delay = 0 }: DangerSectionProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setIsVisible(true), delay);
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [delay]);

    return (
        <section
            ref={ref}
            className={`py-20 px-6 bg-gradient-to-r from-red-900 to-red-700`}
        >
            <div className="max-w-4xl mx-auto text-center">
                <AlertTriangle className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
                <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">{title}</h2>
                <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">{description}</p>
                <div className="grid md:grid-cols-3 gap-6 mt-12">
                    {consequences.map((consequence: string, index: number) => (
                        <div key={index} className="bg-red-800 bg-opacity-50 p-6 rounded-lg">
                            <XCircle className="w-8 h-8 text-red-300 mx-auto mb-4" />
                            <p className="text-gray-800">{consequence}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

interface QuestionSectionProps {
    question: string;
    delay?: number;
}

export const QuestionSection = ({ question, delay = 0 }: QuestionSectionProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setIsVisible(true), delay);
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [delay]);

    return (
        <section
            ref={ref}
            className={`py-20 px-6 bg-slate-100`}
        >
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-8">{question}</h2>
                <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
            </div>
        </section>
    );
};

export const CourseSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [expandedModule, setExpandedModule] = useState<number | null>(null);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    const modules = [
        {
            id: 1,
            title: "Foundations of Landlord Finance",
            lessons: [
                "1.1 Introduction to Real Estate Income Models",
                "• Rent vs. appreciation",
                "• Passive vs. active income",
                "1.2 Key Financial Metrics for Landlords",
                "• Cash flow",
                "• Cap rate, ROI, and IRR",
                "• Net operating income (NOI)",
                "1.3 Setting Income Goals & Financial Vision",
                "• Personal financial blueprint",
                "• SMART income goals for your rental business"
            ]
        },
        {
            id: 2,
            title: "Maximizing Rental Income",
            lessons: [
                "2.1 Pricing Strategy & Market Positioning",
                "• Market research methods",
                "• Dynamic pricing and how to apply it",
                "2.2 Increasing Property Value to Justify Higher Rent",
                "• High ROI upgrades (kitchens, bathrooms, flooring)",
                "• Curb appeal and property staging",
                "2.3 Ancillary Income Streams",
                "• Pet rent, storage, parking, laundry, etc.",
                "• Offering furnished rentals or short-term stays"
            ]
        },
        {
            id: 3,
            title: "Reducing Costs & Boosting Profit Margins",
            lessons: [
                "3.1 Operating Expense Optimization",
                "• Budgeting for maintenance",
                "• Cutting utilities and service costs smartly",
                "3.2 Smart Tax Strategies",
                "• Depreciation benefits",
                "• Deductible expenses",
                "• Working with a real estate-savvy CPA",
                "3.3 Insurance, Risk & Vacancy Management",
                "• Choosing proper coverage",
                "• Preventing vacancies and bad debt"
            ]
        },
        {
            id: 4,
            title: "Rent Collection & Financial Systems",
            lessons: [
                "4.1 Setting Up Efficient Rent Collection Systems",
                "• Online tools (e.g., Avail, RentRedi, Buildium)",
                "• Late fees and incentives",
                "4.2 Bookkeeping & Accounting Basics",
                "• Separating personal vs. rental finances",
                "• Using software like QuickBooks or Stessa",
                "4.3 Financial Reporting & Analysis",
                "• Monthly income statements",
                "• KPI tracking dashboards for landlords"
            ]
        },
        {
            id: 5,
            title: "Financing, Refinancing, and Leveraging Debt",
            lessons: [
                "5.1 Understanding Rental Property Financing Options",
                "• Conventional, DSCR, portfolio loans, etc.",
                "5.2 Using Leverage to Expand and Multiply Returns",
                "• When and how to use other people's money",
                "5.3 Refinance, Cash-Out, and HELOCs",
                "• Case studies: When it makes sense",
                "• Risks and rewards"
            ]
        },
    ];

    return (
        <section
            ref={ref}
            className={`py-20 px-6 bg-gradient-to-br from-gray-900 to-black`}
        >
            <div className="max-w-7xl mx-auto">
                {/* Story-driven Header */}
                <div className="text-center mb-16">
                    <h2 className="text-2xl md:text-6xl font-bold text-white mb-8">
                        Think about this
                    </h2>
                    
                    <div className="space-y-6 text-lg md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
                        <p className="font-medium">
                            Even if you know who paid rent, what next?
                        </p>
                        <p className="font-medium">
                            Do you know how to grow that money?
                        </p>
                        <p className="font-medium">
                            Do you know how to structure your finances so your properties keep funding themselves instead of draining you?
                        </p>
                    </div>

                    <div className="bg-yellow-900 bg-opacity-20 border border-yellow-500 rounded-2xl p-8 max-w-4xl mx-auto">
                        <p className="text-lg md:text-3xl text-yellow-400 font-bold mb-4">
                            That's what the Landlord Finance Course will show you.
                        </p>
                        <p className="text-lg text-gray-200">
                            Simple, powerful lessons every Nigerian landlord needs to master — so you never fall into debt traps, bad investments, or blind spending.
                        </p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Course Curriculum */}
                    <div className="lg:col-span-2">
                        <h3 className="text-lg md:text-2xl font-semibold text-white mb-8">Complete Course Curriculum</h3>
                        <div className="space-y-4">
                            {modules.map((module) => (
                                <div key={module.id} className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden">
                                    <button
                                        onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                                        className="w-full p-6 text-left flex justify-between items-center hover:bg-white/20 transition-colors"
                                    >
                                        <div>
                                            <h4 className="text-lg font-semibold text-white mb-1">
                                                Module {module.id}: {module.title}
                                            </h4>
                                            <p className="text-gray-300 text-sm">
                                                {module.lessons.length} lessons
                                            </p>
                                        </div>
                                        <ChevronDown 
                                            className={`w-5 h-5 text-white transition-transform ${
                                                expandedModule === module.id ? 'rotate-180' : ''
                                            }`} 
                                        />
                                    </button>
                                    
                                    {expandedModule === module.id && (
                                        <div className="px-6 pb-6 bg-white/5">
                                            <div className="space-y-3">
                                                {module.lessons.map((lesson, index) => (
                                                    <div key={index} className="flex items-start space-x-3">
                                                        <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                                                        <p className="text-gray-200 text-sm">{lesson}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pricing & CTA */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-2xl shadow-2xl sticky top-8">
                            <div className="text-center mb-6">
                                <p className="text-gray-600 line-through text-lg">₦150,000</p>
                                <p className="text-2xl md:text-4xl font-bold text-green-600">FREE</p>
                                <p className="text-gray-600">During Landlord Week Only</p>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="flex items-center space-x-3">
                                    <FileText className="w-5 h-5 text-blue-600" />
                                    <span className="text-gray-700">5 comprehensive modules</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Users className="w-5 h-5 text-blue-600" />
                                    <span className="text-gray-700">Private community access</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Clock className="w-5 h-5 text-blue-600" />
                                    <span className="text-gray-700">Lifetime access</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Target className="w-5 h-5 text-blue-600" />
                                    <span className="text-gray-700">Complete landlord finance mastery</span>
                                </div>
                            </div>

                            <button className="w-full bg-green-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors">
                                Claim Your Free Access
                            </button>

                            <p className="text-center text-gray-500 text-sm mt-4">
                                Limited time offer - No payment required
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export const FinancialSafetyTracker = () => {
  const [activeTab, setActiveTab] = useState('remittance');

  return (
    <DashboardComponent title="Financial Safety & Opportunities" delay={200}>
      <div className="space-y-6">
        {/* Dashboard Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('remittance')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'remittance' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Remittance Lag
          </button>
          <button
            onClick={() => setActiveTab('expenses')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'expenses' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Expense Transparency
          </button>
        </div>

        {/* Key Metrics - Always Visible */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-red-50 p-3 rounded-lg border border-red-200">
            <div className="flex items-center space-x-2 mb-1">
              <Clock className="w-4 h-4 text-red-600" />
              <p className="text-xs text-gray-600">Remittance Delay</p>
            </div>
            <p className="text-lg font-bold text-red-600">21 days</p>
            <p className="text-xs text-gray-500">vs 7 days industry avg</p>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
            <div className="flex items-center space-x-2 mb-1">
              <DollarSign className="w-4 h-4 text-orange-600" />
              <p className="text-xs text-gray-600">Money at Risk</p>
            </div>
            <p className="text-lg font-bold text-orange-600">₦1.2M</p>
            <p className="text-xs text-gray-500">delayed transfers</p>
          </div>
          <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
            <div className="flex items-center space-x-2 mb-1">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
              <p className="text-xs text-gray-600">Overbilling Detected</p>
            </div>
            <p className="text-lg font-bold text-yellow-600">₦350k</p>
            <p className="text-xs text-gray-500">excess charges</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2 mb-1">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <p className="text-xs text-gray-600">Monthly Loss</p>
            </div>
            <p className="text-lg font-bold text-blue-600">₦350k</p>
            <p className="text-xs text-gray-500">lost interest</p>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'remittance' && (
          <div className="space-y-4">
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h4 className="font-semibold text-red-800 mb-2">Remittance Lag Analysis</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Your PM takes 21 days to remit rent</span>
                  <span className="text-lg font-bold text-red-600">₦1.2M at risk</span>
                </div>
                <p className="text-xs text-red-700">Industry standard is 7 days - you're losing ₦350k monthly in lost interest</p>
                <div className="bg-white p-2 rounded border-l-4 border-red-400">
                  <p className="text-xs font-medium text-red-800">Action Required:</p>
                  <p className="text-xs text-red-700">"Demand immediate remittance or switch PMs."</p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-2">Financial Risk Assessment</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Money held by PM:</span>
                  <span className="font-semibold text-orange-600">₦1.2M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Monthly interest loss:</span>
                  <span className="font-semibold text-orange-600">₦350k</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Annual opportunity cost:</span>
                  <span className="font-semibold text-orange-600">₦4.2M</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'expenses' && (
          <div className="space-y-4">
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-2">Expense Transparency Issues</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Repair overbilling detected: ₦850k charged for ₦500k work</span>
                  <span className="text-lg font-bold text-yellow-600">₦350k excess</span>
                </div>
                <p className="text-xs text-yellow-700">No expense transparency = hidden theft from your pocket</p>
                <div className="bg-white p-2 rounded border-l-4 border-yellow-400">
                  <p className="text-xs font-medium text-yellow-800">Action Required:</p>
                  <p className="text-xs text-yellow-700">"Request detailed expense breakdowns and receipts."</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-2">Expense Categories</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Plumbing repair (overbilled):</span>
                  <span className="font-semibold text-red-600">₦850k (should be ₦500k)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Electrical work:</span>
                  <span className="font-semibold text-gray-800">₦200k</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">General maintenance:</span>
                  <span className="font-semibold text-gray-800">₦150k</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>Total overbilling detected:</span>
                  <span className="font-bold">₦350k</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardComponent>
  );
};

export const ReputationTracker = () => {
  const [activeTab, setActiveTab] = useState('complaints');

  return (
    <DashboardComponent title="Reputation & Tenant Sentiment" delay={400}>
      <div className="space-y-6">
        {/* Dashboard Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('complaints')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'complaints' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Tenant Complaints
          </button>
          <button
            onClick={() => setActiveTab('credit')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'credit' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Credit Health
          </button>
        </div>

        {/* Key Metrics - Always Visible */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-red-50 p-3 rounded-lg border border-red-200">
            <div className="flex items-center space-x-2 mb-1">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <p className="text-xs text-gray-600">Unresolved Complaints</p>
            </div>
            <p className="text-lg font-bold text-red-600">3</p>
            <p className="text-xs text-gray-500">older than 45 days</p>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
            <div className="flex items-center space-x-2 mb-1">
              <TrendingDown className="w-4 h-4 text-orange-600" />
              <p className="text-xs text-gray-600">Credit Drops</p>
            </div>
            <p className="text-lg font-bold text-orange-600">2</p>
            <p className="text-xs text-gray-500">tenants in 6 months</p>
          </div>
          <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
            <div className="flex items-center space-x-2 mb-1">
              <Users className="w-4 h-4 text-yellow-600" />
              <p className="text-xs text-gray-600">Churn Risk</p>
            </div>
            <p className="text-lg font-bold text-yellow-600">High</p>
            <p className="text-xs text-gray-500">dissatisfaction rising</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2 mb-1">
              <DollarSign className="w-4 h-4 text-blue-600" />
              <p className="text-xs text-gray-600">Vacancy Cost</p>
            </div>
            <p className="text-lg font-bold text-blue-600">₦2.1M</p>
            <p className="text-xs text-gray-500">reputation damage</p>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'complaints' && (
          <div className="space-y-4">
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h4 className="font-semibold text-red-800 mb-2">Unresolved Complaints</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">3 complaints older than 45 days</span>
                  <span className="text-lg font-bold text-red-600">⚠️ HIGH RISK</span>
                </div>
                <p className="text-xs text-red-700">Dissatisfaction increases churn and vacancy risk - costing you ₦2.1M in lost rent</p>
                <div className="bg-white p-2 rounded border-l-4 border-red-400">
                  <p className="text-xs font-medium text-red-800">Action Required:</p>
                  <p className="text-xs text-red-700">"Resolve complaints immediately to prevent reputation damage."</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold text-gray-800 mb-4">Complaint Details</h4>
              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-sm text-gray-800">Unit A2 - Water Pressure Issue</p>
                      <p className="text-xs text-gray-500">Reported 67 days ago</p>
                    </div>
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">Critical</span>
                  </div>
                  <p className="text-xs text-gray-600">Tenant: "Water pressure has been low for 2 months, affecting daily life"</p>
                </div>
                <div className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-sm text-gray-800">Unit B1 - AC Not Working</p>
                      <p className="text-xs text-gray-500">Reported 52 days ago</p>
                    </div>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">High</span>
                  </div>
                  <p className="text-xs text-gray-600">Tenant: "AC has been broken since last month, very uncomfortable"</p>
                </div>
                <div className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-sm text-gray-800">Unit 102 - Security Concerns</p>
                      <p className="text-xs text-gray-500">Reported 48 days ago</p>
                    </div>
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-semibold">Medium</span>
                  </div>
                  <p className="text-xs text-gray-600">Tenant: "Gate security is unreliable, feeling unsafe"</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'credit' && (
          <div className="space-y-4">
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-2">Tenant Credit Health</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">2 tenants' credit scores dropped in last 6 months</span>
                  <span className="text-lg font-bold text-orange-600">Rising Default Risk</span>
                </div>
                <p className="text-xs text-orange-700">Credit deterioration indicates financial stress - higher risk of non-payment</p>
                <div className="bg-white p-2 rounded border-l-4 border-orange-400">
                  <p className="text-xs font-medium text-orange-800">Action Required:</p>
                  <p className="text-xs text-orange-700">"Monitor payment patterns and consider early intervention."</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold text-gray-800 mb-4">Credit Score Changes</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium text-sm text-gray-800">Fatima Ahmed - Unit A2</p>
                    <p className="text-xs text-gray-500">Score dropped from 720 to 580</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-red-600">-140 points</p>
                    <p className="text-xs text-red-600">High Risk</p>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium text-sm text-gray-800">Chinedu Okoro - Unit B1</p>
                    <p className="text-xs text-gray-500">Score dropped from 680 to 620</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-orange-600">-60 points</p>
                    <p className="text-xs text-orange-600">Medium Risk</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardComponent>
  );
};

// Custom Multi-Select Component
const MultiSelectDropdown = ({ 
    options, 
    selectedValues, 
    onChange, 
    placeholder = "Select options...",
    className = ""
}: {
    options: string[];
    selectedValues: string[];
    onChange: (values: string[]) => void;
    placeholder?: string;
    className?: string;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearchTerm('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleOption = (option: string) => {
        if (selectedValues.includes(option)) {
            onChange(selectedValues.filter(val => val !== option));
        } else {
            onChange([...selectedValues, option]);
        }
    };

    const removeOption = (option: string) => {
        onChange(selectedValues.filter(val => val !== option));
    };

    return (
        <div ref={dropdownRef} className={`relative ${className}`}>
            <div
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 cursor-pointer min-h-[48px] flex flex-wrap items-center gap-2"
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedValues.length === 0 ? (
                    <span className="text-gray-500">{placeholder}</span>
                ) : (
                    selectedValues.map((value) => (
                        <span
                            key={value}
                            className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                        >
                            {value}
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeOption(value);
                                }}
                                className="text-blue-600 hover:text-blue-800"
                            >
                                ×
                            </button>
                        </span>
                    ))
                )}
                <div className="ml-auto">
                    <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </div>

            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden">
                    <div className="p-2 border-b">
                        <input
                            type="text"
                            placeholder="Search states..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                    <div className="max-h-48 overflow-y-auto">
                        {filteredOptions.map((option) => (
                            <label
                                key={option}
                                className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedValues.includes(option)}
                                    onChange={() => toggleOption(option)}
                                    className="mr-3 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="text-gray-900">{option}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// Nigerian States Array (prioritized order)
const nigerianStates = [
    // Priority states first
    'Lagos', 'FCT Abuja', 'Rivers',
    // Other states in alphabetical order
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa',
    'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo',
    'Ekiti', 'Enugu', 'Gombe', 'Imo', 'Jigawa',
    'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
    'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun',
    'Oyo', 'Plateau', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
];

export const SignupForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        propertyStatus: '',
        locations: [] as string[],
        sessionType: '',
        preferredDate: '',
        preferredTime: '',
        reportFrequency: '',
        additionalQuestions: '',
        wantsDashboard: false,
        wantsCourse: false,
        whatsappConsent: false
    });

    const [isVisible, setIsVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        
        if (name === 'locations') {
            const target = e.target as HTMLInputElement;
            const locationValue = target.value;
            if (target.checked) {
                setFormData({
                    ...formData,
                    locations: [...formData.locations, locationValue]
                });
            } else {
                setFormData({
                    ...formData,
                    locations: formData.locations.filter(loc => loc !== locationValue)
                });
            }
        } else {
            setFormData({
                ...formData,
                [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Validate required fields for in-person sessions
        if (formData.sessionType === 'physical' && !formData.preferredDate) {
            alert('Preferred date is required for in-person sessions.');
            setIsSubmitting(false);
            return;
        }
        
        // If virtual session selected, save form data first, then redirect to Calendly
        if (formData.sessionType === 'virtual') {
            try {
                const response = await fetch('/api/submit-form', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                const result = await response.json();

                if (response.ok) {
                    // Form saved successfully, now redirect to Calendly with pre-filled data
                    const calendlyUrl = `https://calendly.com/goodtenantsvisits/new-meeting?name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}&phone=${encodeURIComponent(formData.phone)}`;
                    window.open(calendlyUrl, '_blank');
                    setIsSuccess(true);
                    // Reset form
                    setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        propertyStatus: '',
                        locations: [],
                        sessionType: '',
                        preferredDate: '',
                        preferredTime: '',
                        reportFrequency: '',
                        additionalQuestions: '',
                        wantsDashboard: false,
                        wantsCourse: false,
                        whatsappConsent: false
                    });
                } else {
                    alert(result.error || 'Something went wrong. Please try again.');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                alert('Something went wrong. Please try again.');
            } finally {
                setIsSubmitting(false);
            }
            return;
        }
        
        try {
            const response = await fetch('/api/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                setIsSuccess(true);
                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    propertyStatus: '',
                    locations: [],
                    sessionType: '',
                    preferredDate: '',
                    preferredTime: '',
                    reportFrequency: '',
                    additionalQuestions: '',
                    wantsDashboard: false,
                    wantsCourse: false,
                    whatsappConsent: false
                });
            } else {
                alert(result.error || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Success State
    if (isSuccess) {
        return (
            <section className="py-20 px-6 bg-gradient-to-br from-green-900 to-emerald-800">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle className="w-12 h-12 text-white" />
                    </div>
                    <h2 className="text-2xl md:text-6xl font-bold text-white mb-8">
                        Welcome to Oga Landlord Week!
                    </h2>
                    <div className="space-y-6 text-lg md:text-xl text-green-100 max-w-3xl mx-auto mb-12">
                        <p className="font-medium">
                            Thank you for taking control of your property portfolio.
                        </p>
                        <p className="font-medium">
                            Our team will be in touch within 24 hours to confirm your advisory session and provide you with access to your personalized dashboard.
                        </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
                        <h3 className="text-lg md:text-2xl font-bold text-white mb-4">What happens next?</h3>
                        <div className="space-y-4 text-left">
                            <div className="flex items-start space-x-3">
                                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-white text-sm font-bold">1</span>
                                </div>
                                <p className="text-green-100">We'll send you a confirmation email with your session details</p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-white text-sm font-bold">2</span>
                                </div>
                                <p className="text-green-100">Access to your personalized landlord dashboard</p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-white text-sm font-bold">3</span>
                                </div>
                                <p className="text-green-100">Free access to the Landlord Finance Course</p>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsSuccess(false)}
                        className="mt-8 bg-white text-green-600 py-3 px-8 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
                    >
                        Submit Another Application
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section
            ref={ref}
            className={`py-20 px-6 bg-gradient-to-br from-gray-900 to-black`}
        >
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-6xl font-bold text-white mb-8">
                        Oga Landlord, this is your moment.
                    </h2>
                    <div className="space-y-6 text-lg md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
                        <p className="font-medium">
                            You can continue managing in the dark… hoping nothing bad happens.
                        </p>
                        <p className="font-medium">
                            Or you can step into the light, take control, and finally enjoy the peace of mind you deserve.
                        </p>
                    </div>
                    <div className="bg-red-900 bg-opacity-20 border border-red-500 rounded-2xl p-8 max-w-4xl mx-auto">
                        <p className="text-lg md:text-3xl text-red-400 font-bold mb-4">
                            Don't be the landlord who discovers losses when it's too late.
                        </p>
                        <p className="text-xl text-gray-200">
                            Be the landlord who saw the danger early — and acted.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Information */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-white mb-2">
                                <User className="w-4 h-4 inline mr-2" />
                                Full Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white mb-2">
                                <Mail className="w-4 h-4 inline mr-2" />
                                Email Address *
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                                placeholder="Enter your email"
                            />
                        </div>
                    </div>

                    {/* Phone Number and Property Status - Same Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-white mb-2">
                                <Phone className="w-4 h-4 inline mr-2" />
                                Phone Number *
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                                placeholder="Enter your phone number"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white mb-2">
                                <HomeIcon className="w-4 h-4 inline mr-2" />
                                Property Ownership Status *
                            </label>
                            <select
                                name="propertyStatus"
                                value={formData.propertyStatus}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                            >
                                <option value="">Select your status</option>
                                <option value="current">I already own rental properties</option>
                                <option value="soon">I'm about to become a landlord</option>
                                <option value="considering">I'm considering real estate investment</option>
                            </select>
                        </div>
                    </div>

                    {/* Property Location - Custom Multi-select */}
                    <div>
                        <label className="block text-sm font-medium text-white mb-2">
                            <MapPin className="w-4 h-4 inline mr-2" />
                            Property Location (Select all that apply) *
                        </label>
                        <MultiSelectDropdown
                            options={nigerianStates}
                            selectedValues={formData.locations}
                            onChange={(values) => setFormData({ ...formData, locations: values })}
                            placeholder="Select states where you have properties..."
                        />
                    </div>

                    {/* Session Preferences */}
                    <div>
                        <label className="block text-sm font-medium text-white mb-2">
                            Advisory Session Preference *
                        </label>
                        <div className="flex space-x-4">
                            <label className="flex items-center text-white">
                                <input
                                    type="radio"
                                    name="sessionType"
                                    value="virtual"
                                    checked={formData.sessionType === 'virtual'}
                                    onChange={handleInputChange}
                                    className="mr-2 w-5 h-5"
                                />
                                Virtual (Calendly)
                            </label>
                            <label className="flex items-center text-white">
                                <input
                                    type="radio"
                                    name="sessionType"
                                    value="physical"
                                    checked={formData.sessionType === 'physical'}
                                    onChange={handleInputChange}
                                    className="mr-2 w-5 h-5"
                                />
                                In-Person
                            </label>
                        </div>
                        {formData.sessionType === 'virtual' && (
                            <div className="mt-4 p-4 bg-blue-900 bg-opacity-20 border border-blue-500 rounded-lg">
                                <p className="text-blue-200 text-sm">
                                    <strong>Virtual sessions:</strong> You'll be redirected to Calendly to book your preferred time slot.
                                </p>
                            </div>
                        )}
                    </div>

                    {formData.sessionType === 'physical' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">
                                    <Calendar className="w-4 h-4 inline mr-2" />
                                    Preferred Date
                                    {formData.sessionType === 'physical' && <span className="text-red-400 ml-1">*</span>}
                                </label>
                                <input
                                    type="date"
                                    name="preferredDate"
                                    value={formData.preferredDate}
                                    onChange={handleInputChange}
                                    required={formData.sessionType === 'physical'}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">
                                    <Clock className="w-4 h-4 inline mr-2" />
                                    Preferred Time
                                </label>
                                <div className="flex space-x-4 items-center h-12">
                                    <label className="flex items-center text-white">
                                        <input
                                            type="radio"
                                            name="preferredTime"
                                            value="morning"
                                            checked={formData.preferredTime === 'morning'}
                                            onChange={handleInputChange}
                                            className="mr-2 w-5 h-5"
                                        />
                                        Morning
                                    </label>
                                    <label className="flex items-center text-white">
                                        <input
                                            type="radio"
                                            name="preferredTime"
                                            value="afternoon"
                                            checked={formData.preferredTime === 'afternoon'}
                                            onChange={handleInputChange}
                                            className="mr-2 w-5 h-5"
                                        />
                                        Afternoon
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Interest Checkboxes */}
                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                        <h3 className="text-lg font-semibold text-white mb-4">👉 Tick the boxes for your Dashboard and Finance Course</h3>
                        
                        <div className="space-y-4">
                            <label className="flex items-start space-x-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="wantsDashboard"
                                    checked={formData.wantsDashboard}
                                    onChange={handleInputChange}
                                    className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <div>
                                    <p className="font-medium text-white">I want this dashboard for all my properties</p>
                                    <p className="text-sm text-gray-300 mt-1">
                                        If you're not getting this, you might be in trouble. This dashboard helps you monitor the state of your properties in near real-time.
                                    </p>
                                </div>
                            </label>

                            <label className="flex items-start space-x-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="wantsCourse"
                                    checked={formData.wantsCourse}
                                    onChange={handleInputChange}
                                    className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <div>
                                    <p className="font-medium text-white">Sign me up for the Landlord Finance Course</p>
                                    <p className="text-sm text-gray-300 mt-1">
                                        Master the financial strategies that separate successful landlords from the rest. FREE during Landlord Week.
                                    </p>
                                </div>
                            </label>

                            <label className="flex items-start space-x-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="whatsappConsent"
                                    checked={formData.whatsappConsent}
                                    onChange={handleInputChange}
                                    className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <div>
                                    <p className="font-medium text-white">Consent for WhatsApp updates</p>
                                    <p className="text-sm text-gray-300 mt-1">
                                        I consent to receive important updates and notifications via WhatsApp.
                                    </p>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Final CTA */}
                    <div className="text-center">
                        <p className="text-xl text-white mb-6">
                            👉 And take back control of your wealth.
                        </p>
                        
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-4 px-8 rounded-lg font-bold text-xl hover:from-red-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                                    Submitting...
                                </div>
                            ) : (
                                '"Secure Your Spot Now →"'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export const StrategicInsightsDashboard = () => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setIsVisible(true), 200);
                }
            },
            { threshold: 0.2 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`bg-white rounded-2xl shadow-2xl p-8`}
        >
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Strategic Insights Dashboard</h3>
            
            <div className="space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                        <div className="flex items-center space-x-2 mb-1">
                            <TrendingDown className="w-4 h-4 text-green-600" />
                            <p className="text-xs text-gray-600">Short-let Demand</p>
                        </div>
                        <p className="text-lg font-bold text-green-600">+30%</p>
                        <p className="text-xs text-gray-500">In your area</p>
                    </div>
                    
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <div className="flex items-center space-x-2 mb-1">
                            <DollarSign className="w-4 h-4 text-blue-600" />
                            <p className="text-xs text-gray-600">Conversion Value</p>
                        </div>
                        <p className="text-lg font-bold text-blue-600">₦2M</p>
                        <p className="text-xs text-gray-500">Per unit yearly</p>
                    </div>
                    
                    <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                        <div className="flex items-center space-x-2 mb-1">
                            <BarChart3 className="w-4 h-4 text-purple-600" />
                            <p className="text-xs text-gray-600">Appreciation</p>
                        </div>
                        <p className="text-lg font-bold text-purple-600">22%</p>
                        <p className="text-xs text-gray-500">3 years</p>
                    </div>
                    
                    <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                        <div className="flex items-center space-x-2 mb-1">
                            <AlertTriangle className="w-4 h-4 text-red-600" />
                            <p className="text-xs text-gray-600">Concentration</p>
                        </div>
                        <p className="text-lg font-bold text-red-600">100%</p>
                        <p className="text-xs text-gray-500">Lagos only</p>
                    </div>
                </div>

                {/* Market Opportunities */}
                <div className="grid lg:grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <h4 className="font-semibold mb-3 text-green-800 text-sm">Market Opportunities</h4>
                        <div className="space-y-2">
                            <div className="bg-white p-3 rounded border text-sm">
                                <div className="flex justify-between items-center mb-1">
                                    <h5 className="font-medium text-gray-800 text-xs">Short-let Conversion</h5>
                                    <span className="text-xs text-green-600 font-bold">+30% demand</span>
                                </div>
                                <p className="text-xs text-gray-600">Converting 1 vacant unit could earn ₦2M more yearly</p>
                            </div>
                            <div className="bg-white p-3 rounded border text-sm">
                                <div className="flex justify-between items-center mb-1">
                                    <h5 className="font-medium text-gray-800 text-xs">Rent Optimization</h5>
                                    <span className="text-xs text-blue-600 font-bold">22% appreciation</span>
                                </div>
                                <p className="text-xs text-gray-600">Without updated valuation, you're under-pricing rent</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                        <h4 className="font-semibold mb-3 text-red-800 text-sm">Portfolio Risks</h4>
                        <div className="space-y-2">
                            <div className="bg-white p-3 rounded border text-sm">
                                <div className="flex justify-between items-center mb-1">
                                    <h5 className="font-medium text-gray-800 text-xs">Geographic Risk</h5>
                                    <span className="text-xs text-red-600 font-bold">100% Lagos</span>
                                </div>
                                <p className="text-xs text-gray-600">Market downturn could slash income heavily</p>
                            </div>
                            <div className="bg-white p-3 rounded border text-sm">
                                <div className="flex justify-between items-center mb-1">
                                    <h5 className="font-medium text-gray-800 text-xs">Diversification</h5>
                                    <span className="text-xs text-orange-600 font-bold">Consider</span>
                                </div>
                                <p className="text-xs text-gray-600">Consider diversifying to reduce market risk</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Required */}
                <div className="bg-teal-100 border border-teal-300 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                        <Target className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold text-teal-800 text-sm mb-1">Strategic Recommendations</h4>
                            <p className="text-sm text-teal-700">
                                <strong>Immediate:</strong> Convert 1 unit to short-let for ₦2M additional revenue. <strong>Long-term:</strong> Consider geographic diversification to reduce Lagos concentration risk.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
