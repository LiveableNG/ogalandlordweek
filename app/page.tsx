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
import {
  FinancialDashboard,
  MaintenanceTracker,
  TenantCommunication,
  MarketAnalysis,
  RiskManagement,
  FinancialSafetyTracker,
  ReputationTracker,
  StrategicInsightsDashboard,
  DangerSection,
  QuestionSection,
  CourseSection,
  SignupForm
} from './components';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      <div className={`text-center px-6 z-10 max-w-5xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
          Oga Landlord… 
          <br />
          Your property dey shine outside — but inside, your money may be burning quietly.
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-12 font-light max-w-4xl mx-auto">
          Every year in Nigeria, landlords like you are losing money they will never recover. Some don't realize how much damage tenants are quietly causing until it's too late.
          <br />
          <span className="text-red-400 font-medium">Others only see the true cost when a tenant is about to move out — losses and repairs that swallow years of rent in one bite.</span>
        </p>

        <div className="animate-bounce">
          <ChevronDown className="w-8 h-8 text-white mx-auto" />
        </div>
      </div>
    </section>
  );
};

const ParallaxSection = () => {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Fixed background image */}
       <div 
         className="absolute inset-0 bg-cover bg-center bg-no-repeat"
         style={{
           backgroundImage: 'url(/page-2.1.png)',
           backgroundAttachment: 'fixed',
           backgroundPosition: 'center',
           backgroundSize: 'cover'
         }}
       />
       
       {/* Text overlay */}
       <div className="absolute inset-0 flex items-center justify-center z-10">
         <div className="bg-black bg-opacity-80 rounded-lg p-8 text-center max-w-4xl mx-6">
           <h2 className="text-4xl md:text-6xl font-bold text-white mb-2">
             Oga Landlord
           </h2>
           <p className="text-lg md:text-xl text-white mb-4 font-mono">
             /Ogaˈlænd.lɔːd/
           </p>
           <p className="text-sm md:text-base text-white mb-6">
             noun
           </p>
           <p className="text-base md:text-lg text-white mb-6 leading-relaxed max-w-3xl mx-auto">
             A young (and getting younger every year) male, female who has inherited or invests in property (or is intending to) with clarity, knows the nitti-gritties of how to get great ROI like a good businessman should, and understands that capital appreciation is as important as rent. Usually making money with peace of mind, not shouting and fighting everyday. Does not regret building houses or inheriting them.
           </p>
           <p className="text-sm md:text-base text-blue-300">
             Similar: Fun, helping tenants become productive, healthy, legacy-conscious
           </p>
         </div>
       </div>
    </section>
  );
};

const PortfolioDashboard = () => {
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
      className={`bg-white rounded-2xl shadow-2xl p-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
    >
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Portfolio Overview Dashboard</h3>

      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-red-50 p-3 rounded-lg border border-red-200">
            <div className="flex items-center space-x-2 mb-1">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <p className="text-xs text-gray-600">Default Rate</p>
            </div>
            <p className="text-lg font-bold text-red-600">12%</p>
            <p className="text-xs text-gray-500">3 chronic defaulters</p>
          </div>

          <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
            <div className="flex items-center space-x-2 mb-1">
              <Clock className="w-4 h-4 text-orange-600" />
              <p className="text-xs text-gray-600">Payment Delay</p>
            </div>
            <p className="text-lg font-bold text-orange-600">14 days</p>
            <p className="text-xs text-gray-500">Average delay</p>
          </div>

          <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
            <div className="flex items-center space-x-2 mb-1">
              <Users className="w-4 h-4 text-purple-600" />
              <p className="text-xs text-gray-600">Concentration Risk</p>
            </div>
            <p className="text-lg font-bold text-purple-600">45%</p>
            <p className="text-xs text-gray-500">Income on 3 tenants</p>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2 mb-1">
              <HomeIcon className="w-4 h-4 text-blue-600" />
              <p className="text-xs text-gray-600">Vacancy Rate</p>
            </div>
            <p className="text-lg font-bold text-blue-600">9.5%</p>
            <p className="text-xs text-gray-500">4 vacant units</p>
          </div>
        </div>

        {/* Risk Analysis */}
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h4 className="font-semibold mb-3 text-red-800 text-sm">Critical Issues</h4>
            <div className="space-y-2">
              <div className="bg-white p-3 rounded border text-sm">
                <div className="flex justify-between items-center mb-1">
                  <h5 className="font-medium text-gray-800 text-xs">Chronic Defaulters</h5>
                  <span className="text-xs text-red-600 font-bold">3 tenants</span>
                </div>
                <p className="text-xs text-gray-600">Risk: ₦4.2M annually if no action taken</p>
              </div>
              <div className="bg-white p-3 rounded border text-sm">
                <div className="flex justify-between items-center mb-1">
                  <h5 className="font-medium text-gray-800 text-xs">Cash Flow Crisis</h5>
                  <span className="text-xs text-orange-600 font-bold">14 days delay</span>
                </div>
                <p className="text-xs text-gray-600">Funding expenses from savings instead of rent</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-semibold mb-3 text-yellow-800 text-sm">Concentration Risk</h4>
            <div className="space-y-2">
              <div className="bg-white p-3 rounded border text-sm">
                <div className="flex justify-between items-center mb-1">
                  <h5 className="font-medium text-gray-800 text-xs">High Dependency</h5>
                  <span className="text-xs text-purple-600 font-bold">45%</span>
                </div>
                <p className="text-xs text-gray-600">Income depends on just 3 tenants</p>
              </div>
              <div className="bg-white p-3 rounded border text-sm">
                <div className="flex justify-between items-center mb-1">
                  <h5 className="font-medium text-gray-800 text-xs">Portfolio Risk</h5>
                  <span className="text-xs text-red-600 font-bold">High</span>
                </div>
                <p className="text-xs text-gray-600">If they exit, portfolio income halves overnight</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Required */}
        <div className="bg-red-100 border border-red-300 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-red-800 text-sm mb-1">Immediate Action Required</h4>
              <p className="text-sm text-red-700">
                <strong>Suggestion:</strong> "Advise your PM to exit these tenants immediately."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="font-sans">
      <HeroSection />
      <ParallaxSection />

      {/* Section 1: Portfolio */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">
              Your Portfolio
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Properties: 6 | Units: 42 | Tenants: 38 (4 vacant)
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Problem Statement */}
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
              <div className="flex items-start space-x-4">
                <AlertTriangle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-red-800 mb-3">Portfolio Risk Analysis</h3>
                  <div className="space-y-3 text-gray-700">
                    <p className="font-semibold text-base">Defaults & Late Rent Payments: 12% default rate across your tenants.</p>
                    <ul className="space-y-2 text-sm">
                      <li>• 3 tenants are chronic defaulters – you risk losing ₦4.2M annually</li>
                      <li>• Average payment delay across portfolio is 14 days</li>
                      <li>• Cash flow is weakening — you're funding expenses from savings</li>
                      <li>• 45% of your income depends on just 3 tenants</li>
                    </ul>
                    <p className="text-red-700 font-semibold text-base">Suggestion: "Advise your PM to exit these tenants immediately."</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Solution Component - Portfolio Dashboard */}
            <div className="lg:col-span-2">
              <PortfolioDashboard />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Financial Reporting & Analytics */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">
              You're losing ₦6.5M annually and don't even know it
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Most landlords think they're making money, but poor financial tracking is silently eating their profits. Every month, thousands of naira disappear through gaps you can't see.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Problem Statement */}
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
              <div className="flex items-start space-x-4">
                <AlertTriangle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-red-800 mb-3">The Hidden Financial Disaster</h3>
                  <div className="space-y-3 text-gray-700">
                    <p className="font-semibold text-base">Most landlords are losing ₦2.1M annually and don't even know it.</p>
                    <ul className="space-y-2 text-sm">
                      <li>• Poor rent collection costs you ₦1.2M yearly</li>
                      <li>• Vacant units lose ₦2.1M in rent annually</li>
                      <li>• Maintenance overspending burns ₦900k extra</li>
                      <li>• Underpricing leaves ₦1.3M on the table per unit</li>
                    </ul>
                    <p className="text-red-700 font-semibold text-base">Total annual loss: ₦6.5M+ that you'll never recover</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Solution Component */}
            <div className="lg:col-span-2">
              <FinancialDashboard />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Maintenance Management */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">
              That small leak just became a ₦2M disaster
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Deferred maintenance costs 3x more than preventive care. While you're sleeping, small problems are growing into million-naira disasters that wipe out years of rent.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Problem Statement */}
            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
              <div className="flex items-start space-x-4">
                <AlertTriangle className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-orange-800 mb-3">The Maintenance Time Bomb</h3>
                  <div className="space-y-3 text-gray-700">
                    <p className="font-semibold text-base">That small leak you ignored? It just became a ₦2M water damage bill.</p>
                    <ul className="space-y-2 text-sm">
                      <li>• Deferred maintenance costs 3x more than preventive care</li>
                      <li>• 7 units haven't been inspected in 2+ years</li>
                      <li>• You're overspending ₦900k yearly on emergency repairs</li>
                      <li>• Structural issues could cost millions if ignored</li>
                    </ul>
                    <p className="text-orange-700 font-semibold text-base">Every day you delay costs you ₦35,000 in potential damage</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Solution Component */}
            <div className="lg:col-span-2">
              <MaintenanceTracker />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Financial Safety & Opportunities */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">
              Your PM is holding ₦1.2M of your money hostage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Property managers who delay remittances and overbill repairs are silently stealing from you. Most landlords never catch these financial leaks.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Problem Statement */}
            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-lg">
              <div className="flex items-start space-x-4">
                <AlertTriangle className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-indigo-800 mb-3">The Financial Leak</h3>
                  <div className="space-y-3 text-gray-700">
                    <p className="font-semibold text-base">Your PM takes 21 days to remit vs industry standard of 7 days - ₦1.2M at risk.</p>
                    <ul className="space-y-2 text-sm">
                      <li>• Delayed remittances cost you ₦350k monthly in lost interest</li>
                      <li>• Overbilling detected: ₦850k charged for ₦500k repair</li>
                      <li>• No expense transparency = hidden theft</li>
                      <li>• Your money sits in their account earning them interest</li>
                    </ul>
                    <p className="text-indigo-700 font-semibold text-base">Total financial risk: ₦4.2M+ annually in delayed/overbilled funds</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Solution Component */}
            <div className="lg:col-span-2">
              <FinancialSafetyTracker />
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Reputation & Tenant Sentiment */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">
              Your reputation is bleeding tenants and money
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Unresolved complaints and declining tenant credit health are creating a dangerous cycle of churn and vacancy risk that costs you millions.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Problem Statement */}
            <div className="bg-pink-50 border-l-4 border-pink-500 p-6 rounded-r-lg">
              <div className="flex items-start space-x-4">
                <AlertTriangle className="w-6 h-6 text-pink-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-pink-800 mb-3">The Reputation Crisis</h3>
                  <div className="space-y-3 text-gray-700">
                    <p className="font-semibold text-base">3 unresolved complaints older than 45 days are destroying your reputation.</p>
                    <ul className="space-y-2 text-sm">
                      <li>• Tenant complaints: 3 unresolved for 45+ days</li>
                      <li>• Dissatisfaction increases churn and vacancy risk</li>
                      <li>• 2 tenants' credit scores dropped in last 6 months</li>
                      <li>• Rising default risk from declining tenant health</li>
                    </ul>
                    <p className="text-pink-700 font-semibold text-base">⚠️ Dissatisfaction increases churn and vacancy risk</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Solution Component */}
            <div className="lg:col-span-2">
              <ReputationTracker />
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Strategic & Competitive Insights */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">
              You're missing ₦8M+ in strategic opportunities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Market shifts and portfolio concentration risks are creating massive opportunities you're not capitalizing on, while exposing you to unnecessary risks.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Problem Statement */}
            <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-lg">
              <div className="flex items-start space-x-4">
                <AlertTriangle className="w-6 h-6 text-teal-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-teal-800 mb-3">The Strategic Blind Spots</h3>
                  <div className="space-y-3 text-gray-700">
                    <p className="font-semibold text-base">Market opportunities and diversification risks you're completely missing.</p>
                    <ul className="space-y-2 text-sm">
                      <li>• Short-let demand up 30% - convert 1 unit for ₦2M more yearly</li>
                      <li>• Properties appreciated 22% but you're under-pricing rent</li>
                      <li>• 100% concentration in Lagos - market downturn risk</li>
                      <li>• Without updated valuation, missing sales potential</li>
                    </ul>
                    <p className="text-teal-700 font-semibold text-base">⚠️ Market downturn could slash income heavily — consider diversifying</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Solution Component */}
            <div className="lg:col-span-2">
              <StrategicInsightsDashboard />
            </div>
          </div>
        </div>
      </section>

      <CourseSection />

      <SignupForm />

      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 Landlord Finance Mastery. Transform your rental property business today.
          </p>
        </div>
      </footer>
    </div>
  );
}