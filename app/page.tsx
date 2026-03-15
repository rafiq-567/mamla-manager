import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Briefcase, 
  BarChart3, 
  Shield, 
  Clock, 
  CheckCircle, 
  Users, 
  FileText,
  Bell,
  Zap,
  Award,
  ArrowRight,
  Star,
  TrendingUp,
  Lock,
  Sparkles,
  Globe,
  Database,
  Laptop,
  Search,
  Filter,
  Calendar
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/30 rounded-full mix-blend-multiply filter blur-[128px] animate-blob" />
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-500/30 rounded-full mix-blend-multiply filter blur-[128px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-pink-500/30 rounded-full mix-blend-multiply filter blur-[128px] animate-blob animation-delay-4000" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] pointer-events-none opacity-10" />

      {/* Navbar */}
      <nav className="relative border-b border-white/10 bg-slate-950/80 backdrop-blur-2xl sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-200 animate-pulse" />
                <div className="relative h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-2xl">
                  <Briefcase className="h-7 w-7 text-white" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-black tracking-tight">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    MamlaManager
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Sparkles className="h-3 w-3 text-yellow-500" />
                  <span className="font-medium">Next-Gen Legal Platform</span>
                </div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">Features</a>
              <a href="#benefits" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">Benefits</a>
              <a href="#demo" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">Demo</a>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" className="text-white hover:bg-white/10 font-semibold">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="relative group overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:shadow-2xl hover:shadow-purple-500/50 font-bold transition-all duration-300">
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div className="space-y-10 relative z-10">
                {/* Premium Badge */}
                <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 border border-white/20 backdrop-blur-xl">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      LIVE NOW
                    </span>
                  </div>
                  <div className="h-4 w-px bg-white/20" />
                  <span className="text-sm font-semibold text-white">
                    500+ Lawyers Already Using
                  </span>
                  <Award className="h-4 w-4 text-yellow-500" />
                </div>

                {/* Main Heading */}
                <div className="space-y-6">
                  <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight">
                    <span className="block text-white mb-4">
                      Transform
                    </span>
                    <span className="block">
                      <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                        Legal Work
                      </span>
                    </span>
                    <span className="block text-white mt-4">
                      Forever
                    </span>
                  </h1>
                  
                  <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-xl">
                    The AI-powered platform that helps legal professionals manage cases 
                    <span className="text-white font-semibold"> 10x faster</span> with intelligent automation.
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/register" className="group">
                    <Button 
                      size="lg" 
                      className="w-full sm:w-auto text-lg px-10 py-7 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 shadow-2xl shadow-purple-500/50 font-black relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        <Zap className="h-5 w-5" />
                        Start Free Trial
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="w-full sm:w-auto text-lg px-10 py-7 border-2 border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 backdrop-blur-xl font-bold text-white"
                    >
                      Watch Demo
                    </Button>
                  </Link>
                </div>

                {/* Social Proof */}
                <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-3">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 border-2 border-slate-950 flex items-center justify-center text-white text-sm font-bold">
                          {String.fromCharCode(65 + i)}
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-sm text-slate-300 font-medium">500+ Five-star reviews</p>
                    </div>
                  </div>
                  
                  <div className="h-12 w-px bg-white/10" />
                  
                  <div className="flex flex-col">
                    <div className="text-3xl font-bold text-white">99.9%</div>
                    <p className="text-sm text-slate-400">Uptime SLA</p>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="text-3xl font-bold text-white">50hrs</div>
                    <p className="text-sm text-slate-400">Saved/Month</p>
                  </div>
                </div>
              </div>

              {/* Right Content - Premium Dashboard */}
              <div className="relative lg:scale-110">
                {/* Glow Effect */}
                <div className="absolute -inset-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-3xl opacity-30 animate-pulse" />
                
                {/* Main Dashboard Card */}
                <div className="relative bg-slate-900/90 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-slate-900/50 to-slate-800/50">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center font-black text-white text-lg">
                        A
                      </div>
                      <div>
                        <div className="font-bold text-white">Admin Dashboard</div>
                        <div className="text-xs text-slate-400 flex items-center gap-1">
                          <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                          Live
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Bell className="h-5 w-5 text-slate-400" />
                        <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-slate-900" />
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-600/20 to-blue-600/5 border border-blue-500/20">
                        <div className="flex items-center justify-between mb-3">
                          <Briefcase className="h-8 w-8 text-blue-400" />
                          <div className="flex items-center gap-1 text-xs font-semibold text-green-400">
                            <TrendingUp className="h-3 w-3" />
                            +12%
                          </div>
                        </div>
                        <div className="text-3xl font-black text-white mb-1">156</div>
                        <div className="text-xs text-blue-300 font-medium">Active Cases</div>
                      </div>

                      <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-600/20 to-purple-600/5 border border-purple-500/20">
                        <div className="flex items-center justify-between mb-3">
                          <Users className="h-8 w-8 text-purple-400" />
                          <div className="flex items-center gap-1 text-xs font-semibold text-green-400">
                            <TrendingUp className="h-3 w-3" />
                            +24%
                          </div>
                        </div>
                        <div className="text-3xl font-black text-white mb-1">89</div>
                        <div className="text-xs text-purple-300 font-medium">Total Clients</div>
                      </div>

                      <div className="p-4 rounded-2xl bg-gradient-to-br from-pink-600/20 to-pink-600/5 border border-pink-500/20">
                        <div className="flex items-center justify-between mb-3">
                          <Award className="h-8 w-8 text-pink-400" />
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        </div>
                        <div className="text-3xl font-black text-white mb-1">94%</div>
                        <div className="text-xs text-pink-300 font-medium">Win Rate</div>
                      </div>

                      <div className="p-4 rounded-2xl bg-gradient-to-br from-green-600/20 to-green-600/5 border border-green-500/20">
                        <div className="flex items-center justify-between mb-3">
                          <Calendar className="h-8 w-8 text-green-400" />
                          <Clock className="h-4 w-4 text-orange-400" />
                        </div>
                        <div className="text-3xl font-black text-white mb-1">24</div>
                        <div className="text-xs text-green-300 font-medium">This Week</div>
                      </div>
                    </div>

                    {/* Progress Section */}
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-white/10">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-semibold text-white">Monthly Progress</span>
                        <span className="text-sm font-black text-blue-400">87%</span>
                      </div>
                      <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full w-[87%] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full relative">
                          <div className="absolute inset-0 bg-white/20 animate-shimmer" />
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-3 gap-2">
                      <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group">
                        <Search className="h-5 w-5 text-slate-400 group-hover:text-white mx-auto mb-1" />
                        <span className="text-xs text-slate-400 group-hover:text-white">Search</span>
                      </button>
                      <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group">
                        <Filter className="h-5 w-5 text-slate-400 group-hover:text-white mx-auto mb-1" />
                        <span className="text-xs text-slate-400 group-hover:text-white">Filter</span>
                      </button>
                      <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group">
                        <BarChart3 className="h-5 w-5 text-slate-400 group-hover:text-white mx-auto mb-1" />
                        <span className="text-xs text-slate-400 group-hover:text-white">Stats</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 p-4 bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl animate-float">
                  <div className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-green-400" />
                    <span className="text-sm font-bold text-white">Secure</span>
                  </div>
                </div>

                <div className="absolute -bottom-6 -left-6 p-4 bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl animate-float animation-delay-2000">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-400" />
                    <span className="text-sm font-bold text-white">Real-time</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section id="features" className="relative py-32 bg-slate-900/50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                <Sparkles className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-bold text-blue-400">Premium Features</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  Everything You Need.
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Nothing You Don't.
                </span>
              </h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                Built for modern legal professionals who demand excellence
              </p>
            </div>

            {/* Bento Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Briefcase,
                  title: 'Smart Case Management',
                  description: 'AI-powered organization with intelligent tagging and instant search',
                  gradient: 'from-blue-500 to-cyan-500',
                  span: 'md:col-span-2',
                },
                {
                  icon: Shield,
                  title: 'Bank-Level Security',
                  description: 'End-to-end encryption & compliance',
                  gradient: 'from-green-500 to-emerald-500',
                },
                {
                  icon: BarChart3,
                  title: 'Visual Analytics',
                  description: 'Real-time insights & reporting',
                  gradient: 'from-purple-500 to-pink-500',
                },
                {
                  icon: FileText,
                  title: 'Document Hub',
                  description: 'Cloud storage with OCR & search',
                  gradient: 'from-orange-500 to-red-500',
                  span: 'md:col-span-2',
                },
                {
                  icon: Users,
                  title: 'Client Portal',
                  description: 'Complete CRM built-in',
                  gradient: 'from-indigo-500 to-purple-500',
                  span: 'md:col-span-2',
                },
                {
                  icon: Clock,
                  title: 'Smart Reminders',
                  description: 'Never miss a deadline',
                  gradient: 'from-yellow-500 to-orange-500',
                },
              ].map((feature, index) => (
                <div 
                  key={index}
                  className={`group ${feature.span || ''} relative overflow-hidden rounded-3xl bg-slate-900/50 backdrop-blur-xl border border-white/10 p-8 hover:border-white/20 transition-all duration-300`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  <div className="relative">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-2xl`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 text-lg">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Marquee */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-4 gap-12 text-center">
            {[
              { number: '500+', label: 'Legal Professionals', icon: Users },
              { number: '15,000+', label: 'Cases Managed', icon: Briefcase },
              { number: '99.9%', label: 'Uptime SLA', icon: Shield },
              { number: '50hrs', label: 'Saved Monthly', icon: Clock },
            ].map((stat, index) => (
              <div key={index} className="group">
                <stat.icon className="h-16 w-16 mx-auto mb-6 text-white/80 group-hover:scale-110 transition-transform" />
                <div className="text-6xl font-black text-white mb-3">{stat.number}</div>
                <p className="text-white/80 font-semibold text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-40">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-950" />
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-8">
              <div className="inline-flex p-6 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-2xl shadow-purple-500/50 animate-pulse">
                <Sparkles className="h-12 w-12 text-white" />
              </div>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black mb-8">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Start Your Free Trial
              </span>
            </h2>
            
            <p className="text-2xl text-slate-300 mb-12 leading-relaxed">
              Join <span className="text-white font-bold">500+ legal professionals</span> who've already transformed their practice
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link href="/register">
                <Button 
                  size="lg" 
                  className="text-xl px-16 py-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 shadow-2xl shadow-purple-500/50 font-black group"
                >
                  <Zap className="h-6 w-6 mr-3" />
                  Start Free Trial
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center justify-center gap-8 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Free forever plan</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 bg-slate-950/50 backdrop-blur-2xl py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-xl">
                <Briefcase className="h-7 w-7 text-white" />
              </div>
              <div>
                <div className="text-2xl font-black text-white">MamlaManager</div>
                <div className="text-sm text-slate-400">Next-Gen Legal Platform</div>
              </div>
            </div>
            
            <div className="flex items-center gap-8 text-sm text-slate-400">
              <a href="#" className="hover:text-white transition-colors font-medium">Privacy</a>
              <a href="#" className="hover:text-white transition-colors font-medium">Terms</a>
              <a href="#" className="hover:text-white transition-colors font-medium">Contact</a>
            </div>
            
            <p className="text-sm text-slate-500">
              &copy; 2026 MamlaManager. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}