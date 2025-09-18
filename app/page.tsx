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
  Target,
  TrendingDown,
  MapPin
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

        <h1 className="text-3xl md:text-7xl font-bold text-white mb-8 leading-tight">
          Oga Landlord…
          <br />
          Your property dey shine outside — but inside, your money may be burning quietly.
        </h1>

        <p className="text-lg md:text-2xl text-gray-300 mb-12 font-light max-w-4xl mx-auto">
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
      {/* Static background image */}
      <div
        className="w-full h-full bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/page-2.png)',
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat'
        }}
      />
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
            <h2 className="text-2xl md:text-6xl font-bold text-white mb-8">
              The Hard Questions
            </h2>

            <div className="space-y-6 text-lg md:text-2xl text-white">
              <p className="font-medium">
                Do you know, right now, which of your tenants has paid rent — and who is still owing?
              </p>
              <p className="font-medium">
                Do you know how much you've spent on maintenance in the last 6 months — and whether it's eating into your profit?
              </p>
              <p className="font-medium">
                Can you prove, with real numbers, whether your property is making you money… or quietly draining it?
              </p>
            </div>

            <div className="space-y-6 text-lg md:text-2xl text-red-400 font-bold">
              <p>The truth? Most landlords can't.</p>
              <p>And that is how money burns away quietly.</p>
              <p>that is how generational wealth disappears.</p>
            </div>

            <div className="space-y-6 text-lg md:text-2xl text-yellow-400 font-medium">
              <p>And if you're looking to own your first property,</p>
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

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ParallaxSection />
      <ProblemStorySection />

      {/* Dashboard Reveal Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-6xl font-bold text-gray-800 mb-6">
              Do you have full visibility of your portfolio in real time?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
              This is what our Landlord Dashboard gives you. Without it, you are at serious risk. With it, you finally become the true Oga.
            </p>
          </div>

          {/* Dashboard Container */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h3 className="text-lg md:text-2xl font-semibold text-gray-800 mb-6">Landlord Portfolio Dashboard</h3>

            <div className="space-y-6">
              {/* Key Metrics Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <HomeIcon className="w-5 h-5 text-blue-600" />
                    <p className="text-sm text-gray-600 font-medium">Units</p>
                  </div>
                  <p className="text-lg md:text-2xl font-bold text-blue-600">42</p>
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
                  <p className="text-lg md:text-2xl font-bold text-green-600">38</p>
                  <p className="text-xs text-red-600 font-semibold">Default Rate: 12%</p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <DollarSign className="w-5 h-5 text-purple-600" />
                    <p className="text-sm text-gray-600 font-medium">Total Value</p>
                  </div>
                  <p className="text-lg md:text-2xl font-bold text-purple-600">₦59m</p>
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
                        <p>• Flat A1 Orchid: ₦1.3m below market rate - Find out why</p>
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
                      <p>• Risk: 3 years rent on renovation when tenants move, considering inflation</p>
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

      {/* Strategic Insights and Opportunities Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-6xl font-bold text-gray-800 mb-6">
              About to become a landlord or looking to expand your portfolio?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
              You might be missing information required to make decisions:
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Opportunities in your area */}
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
              <div className="flex items-start space-x-4">
                <BarChart3 className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-green-800 mb-3">Opportunities in your area</h3>
                  <div className="space-y-3 text-gray-700">
                    <p className="font-semibold text-base">Short-let demand in your area is up 30%</p>
                    <ul className="space-y-2 text-sm">
                      <li>• Converting 1 vacant unit could earn ₦2m more yearly</li>
                      <li>• Converting a block of duplexes into small units could double your annual income</li>
                      <li>• Buy with clarity, not the wrong property</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Market Analysis */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <div className="flex items-start space-x-4">
                <Target className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-blue-800 mb-3">Market Analysis</h3>
                  <div className="space-y-3 text-gray-700">
                    <p className="font-semibold text-base">Your properties appreciated but you're under-pricing rent</p>
                    <ul className="space-y-2 text-sm">
                      <li>• 100% concentration in Lagos - market downturn risk</li>
                      <li>• Without updated valuation, missing sales potential</li>
                      <li>• Market downturn could slash income heavily — consider diversifying</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategic Recommendations */}
            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
              <div className="flex items-start space-x-4">
                <TrendingDown className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-purple-800 mb-3">Strategic Recommendations</h3>
                  <div className="space-y-3 text-gray-700">
                    <p className="font-semibold text-base">Make informed decisions with real market data</p>
                    <ul className="space-y-2 text-sm">
                      <li>• Geographic diversification to reduce risk</li>
                      <li>• Property type optimization based on local demand</li>
                      <li>• Timing your investments with market cycles</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supercharging Your Assets Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-6xl font-bold text-gray-800 mb-6">
              Supercharging your assets
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
              Because real Oga Landlords have this transparency, they have clarity on their income, can make better decisions, and also access services such as:
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Upfront Rent */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-gray-800 mb-4">Upfront Rent</h3>
              <p className="text-gray-600 leading-relaxed">
                Get your rent payments in advance to improve cash flow and reduce collection risks. Access your rental income when you need it most.
              </p>
            </div>

            {/* Renovation Finance */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <HomeIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-gray-800 mb-4">Renovation Finance</h3>
              <p className="text-gray-600 leading-relaxed">
                Finance property improvements and upgrades without depleting your savings. Increase property value and rental income potential.
              </p>
            </div>

            {/* Rent Guarantee */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-gray-800 mb-4">Rent Guarantee by AXA Mansard</h3>
              <p className="text-gray-600 leading-relaxed">
                Never worry about defaults again. Get guaranteed rent payments even when tenants don't pay, protecting your income stream.
              </p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              <span className="font-semibold text-gray-800">These services are only available to landlords with full portfolio transparency.</span>
              <br />
              Start your journey to becoming a true Oga Landlord today.
            </p>
          </div>
        </div>
      </section>

      <CourseSection />

      {/* Oga Landlord Week Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
              EXCLUSIVE EVENT
            </div>
            <h2 className="text-2xl md:text-6xl font-bold text-gray-800 mb-8">
              Everything you've seen till now is exactly why we created Oga Landlord Week
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
              One powerful week where you:
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Advisory Session */}
            <div className="group relative bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 border border-yellow-200 hover:shadow-xl transition-all duration-300">
              <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                MOST POPULAR
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-gray-800 mb-4">Get Advisory Session</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our experts sit with you and show you how to stop losses and increase ROI on your properties.
              </p>
              <div className="bg-yellow-100 rounded-lg p-4">
                <p className="text-yellow-800 font-semibold text-sm">✓ 1-on-1 consultation</p>
                <p className="text-yellow-800 font-semibold text-sm">✓ Portfolio analysis</p>
                <p className="text-yellow-800 font-semibold text-sm">✓ Action plan creation</p>
              </div>
            </div>

            {/* Physical Events */}
            <div className="group relative bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-gray-800 mb-4">Physical Events</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Join us at one of our physical landlord events in Lagos or Abuja – connect with other successful landlords.
              </p>
              <div className="bg-green-100 rounded-lg p-4">
                <p className="text-green-800 font-semibold text-sm">✓ Lagos & Abuja venues</p>
                <p className="text-green-800 font-semibold text-sm">✓ Networking opportunities</p>
                <p className="text-green-800 font-semibold text-sm">✓ Live Q&A sessions</p>
              </div>
            </div>

            {/* Landlord Awards */}
            <div className="group relative bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 border border-purple-200 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-gray-800 mb-4">Landlord Awards</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                By tenants, for good landlords – recognize and celebrate excellence in property management.
              </p>
              <div className="bg-purple-100 rounded-lg p-4">
                <p className="text-purple-800 font-semibold text-sm">✓ Tenant recognition</p>
                <p className="text-purple-800 font-semibold text-sm">✓ Industry validation</p>
                <p className="text-purple-800 font-semibold text-sm">✓ Public recognition</p>
              </div>
            </div>
          </div>

          {/* Success Stories */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12 border border-blue-200">
            <div className="text-center mb-8">
              <h3 className="text-xl md:text-3xl font-bold text-gray-800 mb-4">Already, hundreds of landlords across Nigeria have joined.</h3>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-gray-700 text-lg font-medium">
                  They are seeing their properties differently. They now know the truth.
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingDown className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-gray-700 text-lg font-medium">
                  Some even discovered losses they didn't know about – and immediately took action to recover.
                </p>
              </div>
            </div>
          </div>

          {/* Urgency Warning */}
          <div className="relative bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-8 text-center overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl md:text-3xl font-bold text-white mb-4">But here's the warning:</h3>
              <p className="text-lg md:text-xl text-orange-100 mb-6">
                Slots for advisory sessions are limited.
              </p>
              <p className="text-lg md:text-2xl font-bold text-white mb-6">
                If you don't sign up now, you might miss the chance.
              </p>
              <div className="inline-block bg-white text-red-600 px-6 py-3 rounded-full font-bold text-sm md:text-lg">
                ⚠️ LIMITED SPOTS AVAILABLE
              </div>
            </div>
          </div>
        </div>
      </section>

      <SignupForm />

      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Landlord Finance Mastery. Transform your rental property business today.
          </p>
        </div>
      </footer>
    </div>
  );
}