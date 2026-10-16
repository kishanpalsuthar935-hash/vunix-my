import React, { useState } from 'react';
import { X, ShieldCheck, FileText, RefreshCw, Lock, CheckCircle2 } from 'lucide-react';

export type LegalDocType = 'terms' | 'privacy' | 'refund';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDoc?: LegalDocType;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  initialDoc = 'terms',
}) => {
  const [activeDoc, setActiveDoc] = useState<LegalDocType>(initialDoc);

  // Synchronize initialDoc when modal opens
  React.useEffect(() => {
    setActiveDoc(initialDoc);
  }, [initialDoc, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-3xl bg-white rounded-[32px] shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[88vh] relative">
        {/* Modal Top Bar */}
        <div className="p-6 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EDE9FE] flex items-center justify-center text-[#451A03] font-black text-sm border border-[#DDD6FE]">
              VX
            </div>
            <div>
              <h2 className="text-base font-black text-neutral-900 tracking-tight">
                Vunix Legal & Compliance Center
              </h2>
              <p className="text-xs text-neutral-500">Official platform terms, privacy protocols, and refund policies</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-neutral-200/60 hover:bg-neutral-200 text-neutral-700 transition"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 pt-3 bg-neutral-50/40 border-b border-neutral-200 flex gap-2">
          <button
            onClick={() => setActiveDoc('terms')}
            className={`pb-2.5 px-3 text-xs font-bold transition border-b-2 flex items-center gap-1.5 ${
              activeDoc === 'terms'
                ? 'border-[#451A03] text-[#451A03]'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Terms of Service</span>
          </button>
          <button
            onClick={() => setActiveDoc('privacy')}
            className={`pb-2.5 px-3 text-xs font-bold transition border-b-2 flex items-center gap-1.5 ${
              activeDoc === 'privacy'
                ? 'border-[#451A03] text-[#451A03]'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Privacy Policy</span>
          </button>
          <button
            onClick={() => setActiveDoc('refund')}
            className={`pb-2.5 px-3 text-xs font-bold transition border-b-2 flex items-center gap-1.5 ${
              activeDoc === 'refund'
                ? 'border-[#451A03] text-[#451A03]'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Free Usage Policy</span>
          </button>
        </div>

        {/* Scrollable Document Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs text-neutral-700 leading-relaxed font-sans">
          {activeDoc === 'terms' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                  Last Updated: October 2026
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  100% Free & Open
                </span>
              </div>

              <h3 className="text-base font-bold text-neutral-900">1. Acceptance of Terms</h3>
              <p>
                By accessing or using the Vunix platform (&quot;Vunix&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) via web or mobile PWA, you agree to be bound by these Terms of Service. Vunix is provided completely free of charge for all personal and commercial use with zero restrictions.
              </p>

              <h3 className="text-base font-bold text-neutral-900">2. Free Access to All 15 Tools</h3>
              <p>
                Every single utility in the Vunix suite (including QR Generator, GST Invoice Generator, Background Remover, ID Photo Resizer, Storefront Builder, and PDF Suite) is <strong>100% free forever</strong> with zero paywalls, subscriptions, or mandatory logins.
              </p>

              <h3 className="text-base font-bold text-neutral-900">3. User Content & Intellectual Property</h3>
              <p>
                You retain <strong>100% full ownership</strong> of all data, text, files, logos, invoices, and photos you create or process through Vunix. All file processing runs directly in your browser. We do not store or claim intellectual property rights over any customer files, PDFs, or generated QR codes.
              </p>

              <h3 className="text-base font-bold text-neutral-900">4. Prohibited Uses</h3>
              <p>
                You agree not to use Vunix to generate fraudulent identification documents, illegal spam campaigns via WhatsApp Sender, malicious QR payloads, or copyrighted material without appropriate permissions.
              </p>

              <h3 className="text-base font-bold text-neutral-900">5. Limitation of Liability</h3>
              <p>
                Vunix utilities are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis for your convenience. In no event shall Vunix be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use the platform.
              </p>
            </div>
          )}

          {activeDoc === 'privacy' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                  Last Updated: October 2026
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  Privacy-First Architecture
                </span>
              </div>

              <h3 className="text-base font-bold text-neutral-900">1. Client-Side Privacy Architecture</h3>
              <p>
                <strong>Zero Uploads to Remote Servers:</strong> ID Photo Resizing, Background Removal cutouts, PDF manipulation, and Word Counts run entirely client-side inside your browser canvas. Your uploaded images and confidential business invoices are <strong>never transmitted or stored on external servers</strong>.
              </p>

              <h3 className="text-base font-bold text-neutral-900">2. No Forced Sign-Up & Zero Tracking</h3>
              <p>
                You are never forced to sign up, enter a credit card, or provide personal credentials to use any of our 15 utilities.
              </p>

              <h3 className="text-base font-bold text-neutral-900">3. Local Browser Storage</h3>
              <p>
                We use your device&apos;s local browser storage to save draft invoice items, resume fields, and application preferences locally for your convenience.
              </p>
            </div>
          )}

          {activeDoc === 'refund' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                  Effective: 2026
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  100% Free Forever
                </span>
              </div>

              <h3 className="text-base font-bold text-neutral-900">1. 100% Free with Zero Charges</h3>
              <p>
                Vunix operates on a completely free and open model. There are no monthly fees, no yearly fees, no recurring subscriptions, and no hidden costs. All 15 tools are unlocked for everyone.
              </p>

              <h3 className="text-base font-bold text-neutral-900">2. Inquiries & Support</h3>
              <p>
                If you have any questions or feedback regarding the platform, please reach out to our team at <strong>support@vunix.app</strong>.
              </p>
            </div>
          )}
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 px-6 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Official Vunix SaaS Legal Agreement</span>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-black text-white text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition shadow-sm"
          >
            Close Policy
          </button>
        </div>
      </div>
    </div>
  );
};
