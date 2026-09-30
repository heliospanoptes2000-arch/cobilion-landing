'use client'

import { useState, FormEvent } from 'react'

// Google Form "Cobilion Whitelist" — required Email field entry.569180788
const GOOGLE_FORM_ACTION =
  'https://docs.google.com/forms/d/e/1FAIpQLSdMZOduQQ_5k6GdXlEF7Tb4NC3omjdGkDMfg2w_FEsiGO7CQw/formResponse'
const GOOGLE_FORM_EMAIL_ENTRY = 'entry.569180788'

// ─── Reusable waitlist form ─────────────────
function WaitlistForm({ id, btnLabel }: { id: string; btnLabel: string }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      // Google Forms does not return a readable CORS response; no-cors yields an opaque success.
      await fetch(GOOGLE_FORM_ACTION, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ [GOOGLE_FORM_EMAIL_ENTRY]: email }),
      })
      setStatus('ok')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'ok') {
    return (
      <p className="text-[#4ADE80] text-base pt-1">
        ✓ You&apos;re on the list. We&apos;ll be in touch.
      </p>
    )
  }

  return (
    <div>
      <form id={id} onSubmit={handleSubmit} className="flex gap-2.5 flex-wrap">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          autoComplete="email"
          className="
            flex-1 min-w-0
            bg-[#161616] border border-[#252525] focus:border-[#4ADE80]
            text-[#F0EDE8] placeholder-[#3A3A3A]
            text-[15px] px-[18px] py-[13px] rounded-[10px]
            outline-none transition-colors
          "
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="
            bg-[#4ADE80] hover:bg-[#38d173] text-[#111]
            text-[14px] font-bold px-6 py-[13px] rounded-[10px]
            whitespace-nowrap transition-colors
            disabled:opacity-60 disabled:cursor-not-allowed
          "
        >
          {status === 'loading' ? 'Sending…' : btnLabel}
        </button>
      </form>
      {status === 'error' && (
        <p className="text-red-400 text-sm mt-2">Something went wrong — try again.</p>
      )}
    </div>
  )
}

// ─── Main page ──────────────────────────────
export default function Page() {
  return (
    <div className="font-[family-name:var(--font-dm-sans)]">

      {/* NAV */}
      <nav className="
        fixed inset-x-0 top-0 z-50
        flex justify-between items-center
        px-16 py-[18px]
        bg-[rgba(13,13,13,0.82)] backdrop-blur-xl
        border-b border-white/5
      ">
        <span className="text-[22px] font-extrabold text-[#F0EDE8] tracking-tight">
          Cobilion
        </span>
        <a
          href="#join"
          className="
            bg-[#4ADE80] hover:bg-[#38d173] text-[#111]
            text-[14px] font-bold px-[22px] py-[10px] rounded-[8px]
            transition-colors no-underline
          "
        >
          Get Early Access
        </a>
      </nav>

      {/* HERO */}
      <section className="
        bg-[#0D0D0D]
        min-h-screen flex flex-col justify-center
        px-16 pt-40 pb-24 gap-10
      ">
        <h1 className="
          text-[clamp(52px,6.5vw,92px)] font-extrabold leading-[0.95]
          tracking-[-0.03em] text-[#F0EDE8]
          max-w-[920px] text-balance
        ">
          Co-create with{' '}
          <em className="not-italic text-[#4ADE80]">1 billion robots.</em>
        </h1>

        <p className="
          text-[clamp(18px,2.2vw,24px)] font-light text-[#555]
          max-w-[600px] leading-relaxed
        ">
          Cobilion is the marketplace where humans record physical tasks and get paid —
          and robotics companies buy the demonstrations to train their AI.
        </p>

        <div id="join" className="max-w-[480px]">
          <WaitlistForm id="hero-form" btnLabel="Join waitlist" />
          <p className="text-[13px] text-[#333] mt-2.5">Be first to earn from your movements.</p>
        </div>

        <div className="flex flex-wrap gap-0 mt-2">
          {[
            { n: '$60B+', l: 'robotics market by 2030', c: '#4ADE80' },
            { n: 'Millions', l: 'of demonstrations needed per robot skill', c: '#FB923C' },
            { n: '#1', l: 'bottleneck in humanoid AI: real-world data', c: '#F0EDE8' },
          ].map((s, i) => (
            <div
              key={i}
              className={`flex flex-col gap-1 pr-10 ${
                i > 0 ? 'pl-10 border-l border-[#1E1E1E]' : ''
              }`}
            >
              <span
                className="text-[38px] font-extrabold leading-none tracking-tight"
                style={{ color: s.c }}
              >
                {s.n}
              </span>
              <span className="text-[13px] text-[#444] leading-snug max-w-[160px]">{s.l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT */}
      <section className="bg-[#F5F4F0] text-[#111] px-16 py-28">
        <p className="text-[12px] font-bold tracking-[0.1em] uppercase text-[#16A34A] mb-5">
          What is Cobilion
        </p>
        <h2 className="text-[clamp(36px,4.5vw,60px)] font-extrabold leading-none tracking-[-0.025em] max-w-[760px] mb-6 text-balance">
          The marketplace for robot training data.
        </h2>
        <p className="text-[20px] font-light text-[#555] max-w-[640px] leading-relaxed mb-14">
          Robots learn by watching humans. Today, labs pay full-time employees to perform tasks
          in controlled environments — expensive, slow, and limited. Cobilion opens that market
          to anyone with a phone.
        </p>

        {/* Flow */}
        <div className="flex items-stretch">
          <div className="flex-1 bg-[#111] text-[#F0EDE8] p-10 rounded-[14px] flex flex-col gap-3">
            <h3 className="text-[20px] font-bold">Contributors</h3>
            <p className="text-[16px] opacity-55 leading-relaxed">
              Anyone records everyday physical tasks using a phone or wearable — at home, at work, anywhere.
            </p>
          </div>
          <div className="flex items-center px-5 text-[28px] text-[#4ADE80]">→</div>
          <div className="flex-1 bg-[#4ADE80] text-[#111] p-10 rounded-[14px] flex flex-col gap-3">
            <h3 className="text-[20px] font-bold">Cobilion</h3>
            <p className="text-[16px] opacity-75 leading-relaxed">
              Curation, quality scoring, labeling, and marketplace layer.
            </p>
          </div>
          <div className="flex items-center px-5 text-[28px] text-[#4ADE80]">→</div>
          <div className="flex-1 bg-[#111] text-[#F0EDE8] p-10 rounded-[14px] flex flex-col gap-3">
            <h3 className="text-[20px] font-bold">Robotics Labs</h3>
            <p className="text-[16px] opacity-55 leading-relaxed">
              Browse, filter, and license demonstrations by task type, environment, and diversity — at scale.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-[#0D0D0D] text-[#F0EDE8] px-16 py-28">
        <p className="text-[12px] font-bold tracking-[0.1em] uppercase text-[#4ADE80] mb-5">
          How it works
        </p>
        <h2 className="text-[clamp(36px,4.5vw,60px)] font-extrabold leading-none tracking-[-0.025em] mb-16">
          Simple on both sides.
        </h2>

        <div className="grid grid-cols-[1fr_1px_1fr]">
          {/* Contributors */}
          <div className="flex flex-col gap-10 pr-12">
            <p className="text-[12px] font-bold tracking-[0.1em] uppercase text-[#4ADE80]">
              For Contributors
            </p>
            {[
              {
                n: '1',
                h: 'Record a task',
                p: 'Use your phone or a clip-on camera to film everyday things — folding laundry, opening a box, cooking.',
              },
              {
                n: '2',
                h: 'Upload to Cobilion',
                p: 'Our platform reviews, labels, and prices your demonstrations automatically. No technical knowledge needed.',
              },
              {
                n: '3',
                h: 'Get paid',
                p: 'Earn every time a robotics lab licenses your data. You keep 75% of every sale.',
              },
            ].map((s) => (
              <div key={s.n} className="flex gap-5 items-start">
                <span className="text-[36px] font-extrabold leading-none tracking-tight text-[#4ADE80] shrink-0">
                  {s.n}
                </span>
                <div>
                  <h4 className="text-[18px] font-semibold mb-1.5">{s.h}</h4>
                  <p className="text-[15px] text-[#555] leading-relaxed">{s.p}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#1E1E1E]" />

          {/* Labs */}
          <div className="flex flex-col gap-10 pl-12">
            <p className="text-[12px] font-bold tracking-[0.1em] uppercase text-[#FB923C]">
              For Robotics Labs
            </p>
            {[
              {
                n: '1',
                h: 'Define what you need',
                p: 'Search by task type, environment, body type — or send custom requests directly to the contributor pool.',
              },
              {
                n: '2',
                h: 'License at scale',
                p: 'Browse a curated, quality-scored catalogue. Subscribe for unlimited access or buy individual datasets.',
              },
              {
                n: '3',
                h: 'Train faster',
                p: 'Diverse, real-world demonstrations that cut training time and improve generalization across environments.',
              },
            ].map((s) => (
              <div key={s.n} className="flex gap-5 items-start">
                <span className="text-[36px] font-extrabold leading-none tracking-tight text-[#FB923C] shrink-0">
                  {s.n}
                </span>
                <div>
                  <h4 className="text-[18px] font-semibold mb-1.5">{s.h}</h4>
                  <p className="text-[15px] text-[#555] leading-relaxed">{s.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY NOW */}
      <section className="bg-[#F5F4F0] text-[#111] px-16 py-28">
        <p className="text-[12px] font-bold tracking-[0.1em] uppercase text-[#16A34A] mb-5">
          Why now
        </p>
        <h2 className="text-[clamp(36px,4.5vw,60px)] font-extrabold leading-none tracking-[-0.025em] max-w-[680px] mb-4 text-balance">
          The market is already proving this.
        </h2>
        <p className="text-[20px] font-light text-[#555] max-w-[560px] leading-relaxed mb-14">
          Physical world training data is the next crowdsourced data business — and no open
          marketplace exists yet.
        </p>

        <div className="flex flex-col gap-3.5">
          {[
            {
              h: 'Scale AI — $14B valuation',
              p: 'Built a business on crowdsourced data labeling. Cobilion is the same model applied to physical world demonstrations — harder to collect, higher switching costs, larger long-term market.',
              border: '#4ADE80',
            },
            {
              h: 'Physical Intelligence & Shift Robotics',
              p: 'Well-funded labs are already hiring humans to generate demonstrations — but only for their own robots. No open marketplace exists yet. Cobilion is building it.',
              border: '#FB923C',
            },
            {
              h: "China's data farms",
              p: 'Chinese manufacturers are paying workers full-time to perform tasks for robot training at scale. The demand signal is real. The platform does not exist in the West.',
              border: '#333',
            },
          ].map((c) => (
            <div
              key={c.h}
              className="bg-[#111] text-[#F0EDE8] px-10 py-9 rounded-[14px] flex flex-col gap-2"
              style={{ borderLeft: `4px solid ${c.border}` }}
            >
              <h3 className="text-[18px] font-bold">{c.h}</h3>
              <p className="text-[16px] text-[#555] leading-relaxed max-w-[780px]">{c.p}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#EEECEA] border border-[#E2E0DA] rounded-[12px] px-9 py-7 mt-12 text-[18px] text-[#555] leading-relaxed max-w-[820px]">
          <b className="text-[#111]">The business model:</b> 25% take rate on every demonstration
          sold — contributors keep 75%. Lab subscriptions for high-volume buyers. Exclusive rights
          tiers for labs that need proprietary training data.
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#0D0D0D] px-16 py-28 flex flex-col gap-10">
        <h2 className="text-[clamp(44px,5.5vw,80px)] font-extrabold leading-none tracking-[-0.03em] max-w-[900px] text-balance">
          Every robot on the planet<br />
          needs to learn from{' '}
          <em className="not-italic text-[#4ADE80]">humans first.</em>
        </h2>
        <p className="text-[20px] font-light text-[#555] max-w-[500px] leading-relaxed">
          We&apos;re building the platform that makes that possible at scale. Get early access — as
          a contributor, a lab, or an investor.
        </p>
        <div className="max-w-[480px]">
          <WaitlistForm id="cta-form" btnLabel="Get early access" />
          <p className="text-[13px] text-[#333] mt-2.5">For contributors, labs, and investors.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#080808] px-16 py-9 flex justify-between items-center border-t border-[#141414]">
        <div>
          <p className="text-[18px] font-extrabold text-[#2A2A2A]">Cobilion</p>
          <p className="text-[13px] text-[#222] mt-1">Do a task. Sell it to the robots.</p>
        </div>
        <a href="mailto:hello@mintventures.xyz" className="text-[14px] text-[#2A2A2A] no-underline hover:text-[#4ADE80] transition-colors">hello@mintventures.xyz</a>
      </footer>

    </div>
  )
}
