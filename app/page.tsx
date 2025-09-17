'use client';
/* eslint-disable react/no-unescaped-entities */

import React, { useState, useRef, useEffect } from 'react';
import {
  DollarSign,
  AlertTriangle,
  BarChart3,
  ChevronDown,
  CheckCircle,
  XCircle,
  Home as HomeIcon,
  Clock,
  Users,
} from 'lucide-react';
import {
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
         className="absolute inset-0 w-full h-full bg-contain bg-center bg-no-repeat"
         style={{
           backgroundImage: 'url(/page-2.png)',
           backgroundPosition: 'center',
           backgroundSize: 'contain',
           backgroundRepeat: 'no-repeat'
         }}
       />

      {/* Text overlay */}
      {/* <div className="absolute inset-0 flex items-center justify-center z-10">
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
      </div> */}
    </section>
  );
};

const ProblemStorySection = () => {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/page-3.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-60" />

      {/* Text content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center px-6 max-w-5xl">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
              The Hard Questions
            </h2>

            <div className="space-y-6 text-xl md:text-2xl text-white">
              <p className="font-medium">
                ❓ Do you know, right now, which of your tenants has paid rent — and who is still owing?
              </p>
              <p className="font-medium">
                ❓ Do you know how much you've spent on maintenance in the last 6 months — and whether it's eating into your profit?
              </p>
              <p className="font-medium">
                ❓ Can you prove, with real numbers, whether your property is making you money… or quietly draining it?
              </p>
            </div>

            <div className="space-y-6 text-xl md:text-2xl text-red-400 font-bold">
              <p>The truth? Most landlords can't.</p>
              <p>And that is how money burns away quietly.</p>
              <p>And that is how generational wealth disappears.</p>
            </div>

            <div className="space-y-6 text-xl md:text-2xl text-yellow-400 font-medium">
              <p>And if you're looking to own your first property:</p>
              <p>Do you know the visibility and control you'll need to avoid falling into the same trap?</p>
              <p className="text-red-400 font-bold">
                Or will you just let life — and tenants — run the show instead of you?
              </p>
            </div>
          </div>
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
      <ProblemStorySection />

      {/* Dashboard Reveal Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              Do you have full visibility of your portfolio in real time?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              This is what our Landlord Dashboard gives you. Without it, you are at serious risk. With it, you finally become the true Oga.
            </p>
          </div>

          {/* Dashboard Container */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Landlord Portfolio Dashboard</h3>

            <div className="space-y-6">
              {/* Key Metrics Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <HomeIcon className="w-5 h-5 text-blue-600" />
                    <p className="text-sm text-gray-600 font-medium">Units</p>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">42</p>
                  <div className="mt-1 text-xs text-gray-500">
                    <div className="flex justify-between items-center">
                      <span>8 Abuja, 30 Lagos, 4 Oyo</span>
                      <span>6 Properties</span>
                    </div>
                    <p className="text-red-600">4 vacant (10.5%)</p>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="w-5 h-5 text-green-600" />
                    <p className="text-sm text-gray-600 font-medium">Tenants</p>
                  </div>
                  <p className="text-2xl font-bold text-green-600">38</p>
                  <p className="text-xs text-red-600 font-semibold">Default Rate: 12%</p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <DollarSign className="w-5 h-5 text-purple-600" />
                    <p className="text-sm text-gray-600 font-medium">Total Value</p>
                  </div>
                  <p className="text-2xl font-bold text-purple-600">₦59m</p>
                  <p className="text-xs text-gray-500">Annual</p>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <BarChart3 className="w-5 h-5 text-orange-600" />
                    <p className="text-sm text-gray-600 font-medium">Revenue</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">Expected: <span className="font-bold text-orange-600">₦52m</span></p>
                    <p className="text-sm text-gray-600">Collected: <span className="font-bold text-green-600">₦41m (79%)</span></p>
                    <p className="text-sm text-gray-600">Outstanding: <span className="font-bold text-red-600">₦11m</span></p>
                  </div>
                </div>
              </div>

              {/* Dashboard Sections */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* PERFORMING/HEALTHY */}
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold mb-4 text-green-800 text-sm flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    WHAT'S WORKING
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="bg-white p-3 rounded border">
                      <h5 className="font-medium text-gray-800 text-xs mb-2">INCOME MANAGEMENT SUCCESS</h5>
                      <div className="space-y-1 text-xs text-gray-600">
                        <p>• 79% of tenants paid rent on time</p>
                        <p>• 95% of payments remitted within 7 days</p>
                        <p>• Rent for 9 apartments is optimized</p>
                        <p>• 2 apartments upgraded (+15% annual value)</p>
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded border">
                      <h5 className="font-medium text-gray-800 text-xs mb-2">VACANCY MANAGEMENT WINS</h5>
                      <div className="space-y-1 text-xs text-gray-600">
                        <p>• Vacancy rate: 18% → 10.5% (last year)</p>
                        <p>• 92% tenant renewal rate (market avg: 75%)</p>
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded border">
                      <h5 className="font-medium text-gray-800 text-xs mb-2">MAINTENANCE SUCCESS</h5>
                      <div className="space-y-1 text-xs text-gray-600">
                        <p>• 3 inspections prevented ₦3.2m damage</p>
                        <p>• Avg resolution: 3 days (industry: 7 days)</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* UNDERPERFORMING/AT RISK */}
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold mb-4 text-yellow-800 text-sm flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    WHAT'S NOT WORKING
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="bg-white p-3 rounded border">
                      <h5 className="font-medium text-gray-800 text-xs mb-2">INCOME HEALTH</h5>
                      <div className="space-y-1 text-xs text-gray-600">
                        <p>• Deola Badmus: 2 late payments, credit rating drop → ₦1.8m risk</p>
                        <p className="text-red-600 font-semibold">Action: Exit this tenant</p>
                        <p>• Flat A1 Orchid: ₦1.3m below market rate</p>
                        <p className="text-blue-600 font-semibold">Tip: Upgrade fittings for higher rent</p>
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded border">
                      <h5 className="font-medium text-gray-800 text-xs mb-2">VACANCY STATUS</h5>
                      <div className="space-y-1 text-xs text-gray-600">
                        <p>• 3 apartments vacant 90+ days - Lost: ₦2.1m</p>
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded border">
                      <h5 className="font-medium text-gray-800 text-xs mb-2">MAINTENANCE EFFICIENCY</h5>
                      <div className="space-y-1 text-xs text-gray-600">
                        <p>• Spending 23% of income on maintenance - 80% of expenses are plumbing-related</p>
                        <p>• ₦1.2m above industry average spent</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CRITICAL ISSUES */}
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="font-semibold mb-4 text-red-800 text-sm flex items-center">
                  <XCircle className="w-4 h-4 mr-2" />
                  WHAT'S CRITICAL
                </h4>
                
                <div className="grid lg:grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded border">
                    <h5 className="font-medium text-gray-800 text-xs mb-2">PROPERTY DAMAGE RISK</h5>
                    <div className="space-y-1 text-xs text-gray-600">
                      <p>• New Court: Leaking pipe 45+ days → escalating costs</p>
                      <p>• Block C: Wall cracks → collapse risk in 18 months</p>
                      <p>• Lekki: Government demolition threat - Please pay attention</p>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded border">
                    <h5 className="font-medium text-gray-800 text-xs mb-2">Last inspection: 18 months ago</h5>
                    <div className="space-y-1 text-xs text-gray-600">
                      <p>• Risk: 3 years rent on renovation when tenants move</p>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded border">
                    <h5 className="font-medium text-gray-800 text-xs mb-2">POTENTIAL INCOME LOSS RISK</h5>
                    <div className="space-y-1 text-xs text-gray-600">
                      <p>• 2 tenants (8 months) no renewal reminders - Risk: ₦3.6m loss if they don't renew</p>
                      <p>• 3 units: No rent review in 4 years</p>
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
                      <strong>Because every day you spend without this dashboard, money could already be slipping through your hands.</strong>
                    </p>
                  </div>
                </div>
              </div>
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