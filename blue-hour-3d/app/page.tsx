'use client'
import dynamic from 'next/dynamic'
import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Box, Code2, Cpu, Layers3, Maximize2, MousePointer2, Palette, Plus, Sparkles, Volume2, X } from 'lucide-react'
import { usePortfolio } from '../components/store'

const WorkstationScene=dynamic(()=>import('../components/WorkstationScene'),{ssr:false,loading:()=> <div className="scene-loading"><span/><small>PREPARING YOUR DIGITAL SPACE</small></div>})
const experiences=[
 {id:'workspace',number:'01',title:'Workspace',description:'A place where ideas take shape.',short:'THE DESK',color:'#9a79ff',tint:'#eee9ff',stage:'#171522',icon:Layers3,kind:'Complete setup'},
 {id:'hardware',number:'02',title:'Hardware',description:'A closer look under the hood.',short:'THE MACHINE',color:'#ff9564',tint:'#fff0e7',stage:'#211712',icon:Cpu,kind:'Component study'},
 {id:'development',number:'03',title:'Development',description:'Where design meets the browser.',short:'THE PROCESS',color:'#4fb9ff',tint:'#e4f4ff',stage:'#101a28',icon:Code2,kind:'Code in motion'},
 {id:'creative',number:'04',title:'Creative Projects',description:'Interfaces with a little more feeling.',short:'THE STUDIO',color:'#f57fba',tint:'#fceaf4',stage:'#21131d',icon:Palette,kind:'Visual playground'},
 {id:'experiments',number:'05',title:'Experiments',description:'Curiosity, rendered in three dimensions.',short:'THE PLAYGROUND',color:'#d3df55',tint:'#f5f5df',stage:'#191b12',icon:Sparkles,kind:'Unfinished ideas'}
]
const initial='workspace'

export default function Home(){
 const selected=usePortfolio(s=>s.active),setSelected=usePortfolio(s=>s.setActive),[view,setView]=useState<'studio'|'orbit'>('studio'),[connect,setConnect]=useState(false),reduced=useReducedMotion()
 const current=useMemo(()=>experiences.find(x=>x.id===selected)??experiences[0],[selected])
 useEffect(()=>{if(!experiences.some(x=>x.id===selected))setSelected(initial)},[selected,setSelected])
 const change=(index:number)=>setSelected(experiences[(index+experiences.findIndex(x=>x.id===selected)+experiences.length)%experiences.length].id)
 return <main className="showroom-page" style={{'--accent':current.color,'--tint':current.tint,'--stage':current.stage} as React.CSSProperties}>
  <div className="page-wash"/>
  <div className="showroom-shell">
   <header className="topbar">
    <a className="wordmark" href="#home" aria-label="Vineet home"><span className="logo-symbol">v<span>.</span></span><span>VINEET<small>CREATIVE FRONTEND DEVELOPER</small></span></a>
    <nav className="top-links" aria-label="Main navigation"><a className="top-active" href="#home">Digital space</a><a href="#explore">Explore</a><button onClick={()=>setConnect(true)}>Contact</button></nav>
    <div className="top-end"><span className="available"><i/> AVAILABLE FOR SELECT PROJECTS</span><button className="connect-top" onClick={()=>setConnect(true)}>Let’s talk <ArrowUpRight size={14}/></button></div>
   </header>

   <div id="home" className="showroom-grid">
    <section className="visual-stage" aria-label={`${current.title} 3D showcase`}>
     <div className="stage-orb orb-main" key={`orb-${current.id}`}><div/></div><div className="stage-orb orb-soft"/>
     <div className="stage-grain"/><div className="stage-cross cross-one">+</div><div className="stage-cross cross-two">+</div>
     <div className="stage-meta"><span>VINEET / DIGITAL SHOWROOM</span><span>COLLECTION&nbsp; {current.number} — 05</span></div>
     <div className="stage-copy"><AnimatePresence mode="wait"><motion.div key={current.id} initial={reduced?false:{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:.38}}><span className="stage-eyebrow"><i/>{current.short} &nbsp;·&nbsp; {current.kind}</span><h1>Building beyond<br/>the <em>screen.</em></h1><p>Exploring the intersection of technology, creativity and interactive experiences.</p></motion.div></AnimatePresence></div>
     <div className="scene-wrap"><WorkstationScene selected={current.id} view={view}/></div>
     <div className="scene-hint"><MousePointer2 size={13}/> DRAG TO EXPLORE</div>
     <div className="floating-spec spec-left"><span className="spec-icon"><Box size={14}/></span><span>{current.kind}<small>VINEET’S DIGITAL SPACE</small></span></div>
     <div className="floating-spec spec-right"><span className="signal-bars"><i/><i/><i/></span><span>REALTIME RENDER<small>INTERACTIVE · WEBGL</small></span></div>
     <div className="control-dock" aria-label="Showcase controls"><div className="dock-categories">{experiences.slice(0,4).map(item=>{const Icon=item.icon;return <button key={item.id} className={current.id===item.id?'dock-active':''} onClick={()=>setSelected(item.id)} aria-label={item.title} title={item.title}><Icon size={16}/><span>{item.title==='Creative Projects'?'Creative':item.title}</span></button>})}</div><span className="dock-divider"/><button className={`view-toggle ${view==='orbit'?'view-active':''}`} onClick={()=>setView(view==='studio'?'orbit':'studio')} aria-label="Toggle orbit view" title="Toggle camera view"><Maximize2 size={15}/><span>{view==='studio'?'Orbit view':'Studio view'}</span></button><span className="dock-divider dock-divider-short"/><button className="dock-arrow" onClick={()=>change(-1)} aria-label="Previous experience"><ArrowLeft size={15}/></button><button className="dock-arrow" onClick={()=>change(1)} aria-label="Next experience"><ArrowRight size={15}/></button></div>
     <div className="stage-index"><span>0{experiences.findIndex(x=>x.id===current.id)+1}</span><i/><span>05</span></div>
    </section>

    <aside id="explore" className="collection-panel"><div className="panel-heading"><div><span className="panel-kicker">EXPLORE COLLECTION</span><h2>My digital<br/><em>space.</em></h2></div><span className="panel-count">05<br/><small>VIEWS</small></span></div><p className="panel-intro">A little tour through the things I make, the tools I use and what happens when they meet.</p>
     <div className="collection-list">{experiences.map((item,index)=>{const Icon=item.icon,active=item.id===current.id;return <button key={item.id} className={`collection-item ${active?'collection-selected':''}`} onClick={()=>setSelected(item.id)} style={{'--item-accent':item.color,'--item-tint':item.tint} as React.CSSProperties}><span className="item-number">{item.number}</span><span className="item-thumb"><span className="thumb-orbit"/><Icon size={17}/></span><span className="item-copy"><b>{item.title}</b><small>{item.description}</small></span><span className="item-go">{active?<ArrowUpRight size={16}/>:<Plus size={15}/>}</span></button>})}</div>
     <div className="panel-bottom"><div className="panel-note"><span className="note-glyph">✳</span><p>Curiosity is the<br/>best tool in the kit.</p></div><div className="panel-bottom-right"><span>SCROLL LESS.<br/>EXPLORE MORE.</span><span className="panel-arrow"><ArrowDownRight size={15}/></span></div></div>
    </aside>
   </div>
   <footer className="shell-footer"><span>© 2026 VINEET · MADE TO BE EXPLORED</span><span><span className="footer-dot"/> BUILT WITH CURIOSITY & CODE</span><button onClick={()=>setConnect(true)}>SAY HELLO <ArrowUpRight size={12}/></button></footer>
   <div className="mobile-state-bar"><span>NOW EXPLORING</span><b>{current.title}</b><button onClick={()=>change(1)} aria-label="Next experience"><ArrowRight size={15}/></button></div>
  </div>
  <AnimatePresence>{connect&&<motion.div className="connect-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setConnect(false)}><motion.div className="connect-card" initial={{y:18,scale:.97}} animate={{y:0,scale:1}} exit={{y:8,scale:.98}} onClick={e=>e.stopPropagation()}><button className="connect-close" onClick={()=>setConnect(false)} aria-label="Close"><X size={17}/></button><span className="panel-kicker">OPEN CHANNEL</span><h2>Let’s make<br/><em>something real.</em></h2><p>Have an idea, a question or a good rabbit hole? I’d love to hear about it.</p><a href="mailto:hello@vineet.dev">HELLO@VINEET.DEV <ArrowUpRight size={14}/></a><small>REPLACE WITH YOUR PREFERRED EMAIL BEFORE PUBLISHING</small></motion.div></motion.div>}</AnimatePresence>
 </main>
}
