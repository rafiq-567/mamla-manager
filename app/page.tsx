import { Button } from '@/components/ui/button';
import {
  Briefcase,
  BarChart3,
  Shield,
  Users,
  FileText,
  ArrowRight,
  Search,
  Filter,
  Calendar,
} from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-white/5 bg-slate-950/90 backdrop-blur-lg sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold text-white">MamlaManager</div>
                <div className="text-[10px] text-slate-500 -mt-0.5">Legal Case Management</div>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-sm text-slate-400 hover:text-white transition-colors">Features</a>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/5 font-medium text-sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm px-5">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                <span className="text-xs font-semibold text-blue-400">Legal Case Management</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight">
                  Manage Your Legal Practice
                  <span className="block text-blue-400"> with Confidence</span>
                </h1>

                <p className="text-lg text-slate-400 leading-relaxed max-w-lg">
                  Track cases, manage clients, organize documents, and stay on top of court schedules — 
                  all in one place.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/register">
                  <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-6 text-base">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" className="w-full sm:w-auto border-slate-700 hover:border-slate-500 text-slate-300 font-medium px-8 py-6 text-base">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="relative">
              <div className="relative bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                      <Briefcase className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">Dashboard Preview</div>
                      <div className="text-[10px] text-slate-500">Sample interface</div>
                    </div>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/10">
                      <Briefcase className="h-6 w-6 text-blue-400 mb-2" />
                      <div className="text-2xl font-bold text-white mb-0.5">—</div>
                      <div className="text-xs text-slate-500">Active Cases</div>
                    </div>

                    <div className="p-3 rounded-xl bg-indigo-500/5 border border-indigo-500/10">
                      <Users className="h-6 w-6 text-indigo-400 mb-2" />
                      <div className="text-2xl font-bold text-white mb-0.5">—</div>
                      <div className="text-xs text-slate-500">Total Clients</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                    <div className="text-sm font-medium text-white mb-3">Upcoming Hearings</div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between py-1.5 border-b border-slate-700/50">
                        <div>
                          <div className="text-sm text-slate-300">State vs Rahman</div>
                          <div className="text-xs text-slate-600">Case #CR-2026-0042</div>
                        </div>
                        <div className="text-xs text-slate-500">Aug 15, 2026</div>
                      </div>
                      <div className="flex items-center justify-between py-1.5">
                        <div>
                          <div className="text-sm text-slate-300">Property Dispute</div>
                          <div className="text-xs text-slate-600">Case #CV-2026-0087</div>
                        </div>
                        <div className="text-xs text-slate-500">Aug 22, 2026</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2 rounded-lg bg-slate-800/30 border border-slate-700/30 text-center">
                      <Search className="h-4 w-4 text-slate-500 mx-auto mb-1" />
                      <span className="text-[10px] text-slate-500">Search</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-800/30 border border-slate-700/30 text-center">
                      <Filter className="h-4 w-4 text-slate-500 mx-auto mb-1" />
                      <span className="text-[10px] text-slate-500">Filter</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-800/30 border border-slate-700/30 text-center">
                      <BarChart3 className="h-4 w-4 text-slate-500 mx-auto mb-1" />
                      <span className="text-[10px] text-slate-500">Analytics</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything you need to run your practice
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Tools designed for legal professionals who need organization, clarity, and control.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 hover:border-slate-700 transition-colors">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                <Briefcase className="h-5 w-5 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Case Tracking</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Organize cases by status, type, and priority. Search, filter, and sort to find what you need instantly.
              </p>
            </div>

            <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 hover:border-slate-700 transition-colors">
              <div className="h-10 w-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4">
                <Users className="h-5 w-5 text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Client Management</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Maintain a complete client directory with contact details, case history, and communication records.
              </p>
            </div>

            <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 hover:border-slate-700 transition-colors">
              <div className="h-10 w-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                <FileText className="h-5 w-5 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Document Storage</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Upload and organize case documents with cloud storage. Access files from anywhere, anytime.
              </p>
            </div>

            <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 hover:border-slate-700 transition-colors">
              <div className="h-10 w-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4">
                <Calendar className="h-5 w-5 text-amber-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Hearing Reminders</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Track court dates and deadlines with upcoming hearing alerts so you never miss an appearance.
              </p>
            </div>

            <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 hover:border-slate-700 transition-colors">
              <div className="h-10 w-10 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-4">
                <BarChart3 className="h-5 w-5 text-rose-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Dashboard Analytics</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Get an overview of your practice with case statistics, status breakdowns, and monthly trends.
              </p>
            </div>

            <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 hover:border-slate-700 transition-colors">
              <div className="h-10 w-10 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-4">
                <Shield className="h-5 w-5 text-sky-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Secure Access</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Role-based access control with encrypted authentication. Your data stays private and protected.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-white/5">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to get organized?
          </h2>
          <p className="text-slate-400 mb-10 max-w-lg mx-auto">
            Create your account and start managing your cases today.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/register">
              <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-6 text-base">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" className="w-full sm:w-auto border-slate-700 hover:border-slate-500 text-slate-300 font-medium px-8 py-6 text-base">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Briefcase className="h-4 w-4 text-white" />
              </div>
              <div className="text-sm font-semibold text-white">MamlaManager</div>
            </div>
            <p className="text-xs text-slate-600">
              &copy; 2026 MamlaManager. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
