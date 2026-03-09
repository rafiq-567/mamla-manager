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
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Navbar */}
      <nav className="relative border-b bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition duration-200" />
              <div className="relative h-12 w-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-xl">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                MamlaManager
              </span>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Sparkles className="h-3 w-3" />
                <span>Legal Excellence</span>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium hover:text-blue-600 transition-colors">Features</a>
            <a href="#benefits" className="text-sm font-medium hover:text-blue-600 transition-colors">Benefits</a>
            <a href="#pricing" className="text-sm font-medium hover:text-blue-600 transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" className="font-semibold">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/50 font-semibold">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200">
                  <Sparkles className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-700">
                    #1 Legal Case Management Platform
                  </span>
                </div>

                {/* Main Heading */}
                <div className="space-y-4">
                  <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
                    Manage Cases{' '}
                    <span className="relative">
                      <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Smarter
                      </span>
                      <svg className="absolute -bottom-2 left-0 right-0 h-3" viewBox="0 0 300 12" fill="none">
                        <path d="M2 10C50 2 250 2 298 10" stroke="url(#gradient)" strokeWidth="3" strokeLinecap="round"/>
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3B82F6" />
                            <stop offset="50%" stopColor="#6366F1" />
                            <stop offset="100%" stopColor="#A855F7" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </span>
                  </h1>
                  <p className="text-xl md:text-2xl text-slate-600 leading-relaxed">
                    The all-in-one platform that helps legal professionals organize cases, 
                    track deadlines, and win more with powerful insights.
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/register" className="flex-1 sm:flex-none">
                    <Button 
                      size="lg" 
                      className="w-full sm:w-auto text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-2xl shadow-blue-500/50 font-bold group"
                    >
                      Start Free Trial
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/login" className="flex-1 sm:flex-none">
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="w-full sm:w-auto text-lg px-8 py-6 border-2 border-slate-300 hover:border-blue-500 hover:bg-blue-50 font-bold"
                    >
                      Watch Demo
                    </Button>
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center gap-6 pt-4">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                          {String.fromCharCode(65 + i)}
                        </div>
                      ))}
                    </div>
                    <div className="text-sm">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-slate-600 font-medium">500+ lawyers trust us</span>
                    </div>
                  </div>
                  
                  <div className="h-8 w-px bg-slate-300" />
                  
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-sm text-slate-600 font-medium">No credit card required</span>
                  </div>
                </div>
              </div>

              {/* Right Content - Dashboard Preview */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-2xl opacity-20" />
                <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4">
                  {/* Mock Dashboard */}
                  <div className="flex items-center justify-between pb-4 border-b">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
                        A
                      </div>
                      <div>
                        <div className="font-semibold">Admin Dashboard</div>
                        <div className="text-xs text-muted-foreground">Welcome back!</div>
                      </div>
                    </div>
                    <Bell className="h-5 w-5 text-blue-600" />
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                      <div className="flex items-center justify-between mb-2">
                        <Briefcase className="h-8 w-8 text-blue-600" />
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="text-2xl font-bold text-blue-900">48</div>
                      <div className="text-xs text-blue-700">Active Cases</div>
                    </Card>

                    <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                      <div className="flex items-center justify-between mb-2">
                        <Users className="h-8 w-8 text-purple-600" />
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="text-2xl font-bold text-purple-900">124</div>
                      <div className="text-xs text-purple-700">Total Clients</div>
                    </Card>

                    <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                      <div className="flex items-center justify-between mb-2">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                        <Award className="h-4 w-4 text-yellow-600" />
                      </div>
                      <div className="text-2xl font-bold text-green-900">89%</div>
                      <div className="text-xs text-green-700">Win Rate</div>
                    </Card>

                    <Card className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
                      <div className="flex items-center justify-between mb-2">
                        <Clock className="h-8 w-8 text-orange-600" />
                        <Bell className="h-4 w-4 text-orange-600" />
                      </div>
                      <div className="text-2xl font-bold text-orange-900">12</div>
                      <div className="text-xs text-orange-700">Upcoming</div>
                    </Card>
                  </div>

                  {/* Progress Bar */}
                  <div className="pt-2">
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-slate-600">Monthly Target</span>
                      <span className="font-semibold text-blue-600">78%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-3 border border-slate-200 animate-float">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-semibold">Live Updates</span>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-3 border border-slate-200 animate-float animation-delay-2000">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-blue-600" />
                    <span className="text-xs font-semibold">Bank-level Security</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6">
              <Zap className="h-4 w-4" />
              Powerful Features
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything You Need in{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                One Platform
              </span>
            </h2>
            <p className="text-xl text-slate-600">
              Designed by lawyers, for lawyers. Every feature you need to run a modern legal practice.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
              {
                icon: Briefcase,
                title: 'Smart Case Management',
                description: 'Organize, track, and manage all your cases with intelligent automation and powerful search.',
                gradient: 'from-blue-500 to-blue-600',
                bg: 'from-blue-50 to-blue-100',
              },
              {
                icon: Clock,
                title: 'Never Miss a Deadline',
                description: 'Automated reminders for hearings, filings, and important dates. Stay ahead, always.',
                gradient: 'from-purple-500 to-purple-600',
                bg: 'from-purple-50 to-purple-100',
              },
              {
                icon: FileText,
                title: 'Document Hub',
                description: 'Securely store, organize, and access all case documents from anywhere, anytime.',
                gradient: 'from-green-500 to-green-600',
                bg: 'from-green-50 to-green-100',
              },
              {
                icon: BarChart3,
                title: 'Visual Analytics',
                description: 'Track your performance with beautiful charts and insights. Data-driven decisions made easy.',
                gradient: 'from-orange-500 to-orange-600',
                bg: 'from-orange-50 to-orange-100',
              },
              {
                icon: Users,
                title: 'Client Management',
                description: 'Complete client profiles with case history, contacts, and communication logs.',
                gradient: 'from-pink-500 to-pink-600',
                bg: 'from-pink-50 to-pink-100',
              },
              {
                icon: Shield,
                title: 'Enterprise Security',
                description: 'Bank-level encryption, role-based access, and complete data privacy protection.',
                gradient: 'from-indigo-500 to-indigo-600',
                bg: 'from-indigo-50 to-indigo-100',
              },
            ].map((feature, index) => (
              <Card 
                key={index}
                className="group p-6 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-200 relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            {[
              { number: '500+', label: 'Legal Professionals', icon: Users },
              { number: '10,000+', label: 'Cases Managed', icon: Briefcase },
              { number: '99.9%', label: 'Uptime Guaranteed', icon: Shield },
              { number: '50hrs', label: 'Saved Monthly', icon: Clock },
            ].map((stat, index) => (
              <div key={index} className="group">
                <stat.icon className="h-12 w-12 mx-auto mb-4 opacity-80 group-hover:scale-110 transition-transform" />
                <div className="text-5xl font-bold mb-2">{stat.number}</div>
                <p className="text-blue-100 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Sparkles className="h-16 w-16 mx-auto mb-6 text-yellow-400" />
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Transform Your Practice?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Join hundreds of legal professionals who've streamlined their workflow 
              and increased productivity with MamlaManager.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/register">
                <Button 
                  size="lg" 
                  className="text-lg px-12 py-6 bg-white text-blue-600 hover:bg-blue-50 shadow-2xl font-bold group"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            
            <p className="text-sm text-blue-200">
              No credit card required • Free forever plan • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold">MamlaManager</div>
                <div className="text-xs text-muted-foreground">Legal Excellence Platform</div>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
            </div>
            
            <p className="text-sm text-muted-foreground">
              &copy; 2026 MamlaManager. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}