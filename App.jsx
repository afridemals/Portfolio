import { useEffect, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Mail, Github, MessageCircle, Send, Facebook, Twitter, Music2,
  Globe, Box, Server, Calculator, ArrowUpRight
} from 'lucide-react'
import Scene from './Scene.jsx'

gsap.registerPlugin(ScrollTrigger)

const GITHUB = 'https://github.com/afridemals'

const projects = [
  { icon: Globe, title: 'Personal Portfolio Website', stack: 'HTML, CSS, JavaScript', text: 'Personal biography and portfolio site built with clean, native code.' },
  { icon: Box, title: 'Interactive 3D Web Component', stack: 'Three.js, WebGL', text: 'Experimental 3D user interface focusing on smooth interaction and visually engaging layouts.' },
  { icon: Server, title: 'Python Web Backend & Utility', stack: 'Python, Flask', text: 'Lightweight backend modules and logic controllers for dynamic web applications.' },
  { icon: Calculator, title: 'Mathematics & Logic Solver UI', stack: 'JavaScript, UI', text: 'Interactive web utility that breaks down logic and mathematical computations step by step.' }
]

const contacts = [
  { icon: Mail, name: 'Email', text: 'aafride941@gmail.com', href: 'mailto:aafride941@gmail.com' },
  { icon: Github, name: 'GitHub', text: 'github.com/afridemals', href: GITHUB },
  { icon: MessageCircle, name: 'WhatsApp', text: '01878239149', href: 'https://wa.me/8801878239149' },
  { icon: Send, name: 'Telegram', text: 't.me/afride420', href: 'https://t.me/afride420' },
  { icon: Facebook, name: 'Facebook', text: 'facebook.com/share/19bJKi6zrn', href: 'https://www.facebook.com/share/19bJKi6zrn/' },
  { icon: Twitter, name: 'Twitter (X)', text: 'x.com/Afride7867', href: 'https://x.com/Afride7867' },
  { icon: Music2, name: 'TikTok', text: 'tiktok.com/@afruu_18', href: 'https://tiktok.com/@afruu_18' }
]

export default function App() {
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.from('.hero-in', { y: 50, opacity: 0, duration: 1.1, stagger: 0.18, ease: 'power3.out' })
      gsap.utils.toArray('.rv').forEach((el) =>
        gsap.from(el, { y: 30, opacity: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 88%' } })
      )
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => { document.documentElement.lang = 'en' }, [])

  return (
    <>
      <Scene />

      <nav className="fixed top-0 inset-x-0 z-20 flex items-center justify-between px-6 md:px-12 py-4 backdrop-blur-md bg-ink/60"
           style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 1rem)' }}>
        <a href="#home" className="brand text-lg font-bold">Afride Mals</a>
        <div className="flex gap-6 text-sm text-mute">
          {['About', 'Projects', 'Music', 'Connect'].map((n) => (
            <a key={n} href={`#${n.toLowerCase()}`} className="hover:text-white">{n}</a>
          ))}
        </div>
      </nav>

      <main className="relative z-10">
        <section id="home" className="min-h-screen flex flex-col justify-center px-6 md:px-12 pt-24 pb-16 max-w-6xl mx-auto">
          <h1 className="hero-in font-bold leading-[1.02] tracking-tight max-w-3xl text-[clamp(2.6rem,7.5vw,5.6rem)]">
            Engineering digital experiences from the ground up.
          </h1>
          <p className="hero-in mt-8 max-w-xl text-lg text-mute">
            Hi, I’m Afride Mals, a passionate programmer from Dhaka, Bangladesh. I love experimenting with code, exploring new technologies, and bringing ideas to life, from engaging web interfaces to immersive 3D interactions. I always strive to build things that not only look incredible but are also a joy to use.
          </p>
          <div className="hero-in mt-10 flex gap-4 flex-wrap">
            <a href="#connect" className="px-6 py-3 rounded-full font-medium text-black bg-flame">Start a project</a>
            <a href="#projects" className="px-6 py-3 rounded-full font-medium border border-brand">See my work</a>
          </div>
        </section>

        <section id="about" className="px-6 md:px-12 py-24 max-w-6xl mx-auto">
          <h2 className="rv text-4xl md:text-5xl font-bold mb-8">Who am I?</h2>
          <div className="panel max-w-xl space-y-6 text-lg p-6 md:p-8">
            <p className="rv">What started as pure curiosity has now blossomed into a deep passion. Writing clean code, building projects from scratch, and solving technical problems are at the heart of what I do. Mathematics is also a key interest of mine, fueling my analytical mindset and problem-solving skills.</p>
            <p className="rv text-mute">When I’m away from the editor, you’ll likely find me diving into top-tier anime like Death Note (a childhood favorite), Demon Slayer, and Jujutsu Kaisen, or strategizing my next EXP-lane win in Mobile Legends: Bang Bang. Blue and orange set the tone for my digital aesthetic.</p>
          </div>
        </section>

        <section id="projects" className="px-6 md:px-12 py-24 max-w-6xl mx-auto">
          <h2 className="rv text-4xl md:text-5xl font-bold mb-10">Projects</h2>
          <div className="grid md:grid-cols-2 gap-5 max-w-4xl">
            {projects.map(({ icon: Icon, title, stack, text }) => (
              <a key={title} href={GITHUB} target="_blank" rel="noopener noreferrer"
                 className="rv panel p-6 block transition-colors hover:border-flame">
                <div className="flex items-start justify-between">
                  <Icon className="text-brand" size={28} aria-hidden="true" />
                  <ArrowUpRight className="text-mute" size={20} aria-hidden="true" />
                </div>
                <h3 className="font-display text-xl font-bold mt-4">{title}</h3>
                <p className="text-mute mt-2">{text}</p>
                <p className="text-flame text-sm mt-4">{stack}</p>
              </a>
            ))}
          </div>
        </section>

        <section id="music" className="px-6 md:px-12 py-24 max-w-6xl mx-auto">
          <h2 className="rv text-4xl md:text-5xl font-bold mb-3">What I code to</h2>
          <p className="rv text-mute mb-8 max-w-xl text-lg">My playlist, playing while the build runs.</p>
          <iframe
            className="rv w-full max-w-xl rounded-xl border-0"
            title="Spotify playlist"
            src="https://open.spotify.com/embed/playlist/1XjsgPjGeJNpICKs2FtRpc?utm_source=generator&theme=0"
            height="352" loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          />
        </section>

        <section id="connect" className="px-6 md:px-12 pt-24 pb-28 max-w-6xl mx-auto">
          <h2 className="rv text-4xl md:text-5xl font-bold mb-4">Let’s build together</h2>
          <p className="rv max-w-xl text-lg mb-10 text-mute">Got a project in mind or want to collaborate on code? Reach out through any of the channels below.</p>
          <div className="panel max-w-xl p-6 md:p-8">
            {contacts.map(({ icon: Icon, name, text, href }) => (
              <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="rv row">
                <Icon className="text-brand shrink-0" size={22} aria-hidden="true" />
                <span className="font-medium">{name}</span>
                <span className="ml-auto text-mute text-sm text-right break-all">{text}</span>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="relative z-10 text-center text-sm pb-10 text-mute">© 2026 Afride Mals</footer>
    </>
  )
}
