'use client'
import { useState, useEffect } from 'react'
import { FaEnvelope, FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa'
import '@/components/styles/About.css'

export default function About() {

  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    if (open) window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [open])

  return (
    <div className='ab'>
      <div className="about">

        <h2 className="section-title-1">
          About Project
        </h2>

        <span className="project-aim-tag">PROJECT AIM</span>

        <h2 className="project-aim-heading">
          Why I Built This <span>Segment Tree Visualizer</span>
        </h2>

        <ul className="project-aim-list">
          <li>
            I am a <strong>competitive programmer</strong>, and while solving
            higher-difficulty problems, I realized that mastering data structures
            like <strong>Segment Trees</strong> is essential.
          </li>

          <li>
            When I started learning segment trees, I initially struggled to
            understand how queries, updates, and tree traversal work internally.
            Manual dry runs were time-consuming and often error-prone.
          </li>

          <li>
            I searched for <strong>segment tree visualizers</strong> to get an
            animated understanding, but couldn’t find any tool that clearly
            visualized segment trees—especially
            <strong> Lazy Propagation</strong>.
          </li>

          <li>
            Segment trees with lazy propagation are even harder to grasp without proper
            visualization., and testing multiple cases manually wastes a lot of time.
            I realized many learners face the same issue.
          </li>

          <li>
            This motivated me to build this <strong>Segment Tree Visualizer</strong>,
            a tool that visually demonstrates construction, range queries, point
            updates, and lazy propagation in a clear and interactive way.
          </li>

          <li>
            Along with visualization, I also explain the concepts so users can
            <strong> read and visually understand</strong> the logic in one place.
          </li>
        </ul>

        <p className="project-aim-closing">
          This is my small attempt to solve a real problem faced by many programmers
          and help others learn faster without wasting time searching for scattered
          resources.
        </p>

        <div className="project-aim-highlight">
          <h3>Contribute & Collaborate</h3>
          <p>
            If you have ideas, suggestions, or improvements, feel free to contribute.
            Even small enhancements can save valuable time for other learners and
            give you real-world open-source experience.
          </p>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <a
              href="https://github.com/Saini-Yogesh/segment-tree-visualization"
              target="_blank"
              rel="noopener noreferrer"
              className="project-aim-link"
            >
              🔗 View Repository →
            </a>
            <a
              href="https://github.com/Saini-Yogesh/segment-tree-visualization"
              target="_blank"
              rel="noopener noreferrer"
              className="project-aim-link"
            >
              ⭐ Star on GitHub →
            </a>
            <a
              className="project-aim-link"
              onClick={() => setOpen(true)}
              style={{ cursor: "pointer" }}
            >
              ☕ Buy Me a Coffee
            </a>
          </div>

          {/* MODAL */}
          {open && (
            <div className="modal-overlay" onClick={() => setOpen(false)}>
              <div
                className="modal"
                onClick={(e) => e.stopPropagation()}
              >
                <h3>Support the Project</h3>

                <img
                  src="/upi-qr.png"   // put QR image in public folder
                  alt="UPI QR"
                  className="qr-img"
                  draggable="false"
                />

                <p className="upi-text">
                  UPI ID: <strong>yogesh.saini4002@oksbi</strong>
                </p>

                <button
                  aria-live="polite"
                  aria-label="Copy UPI ID"
                  className={`copy-btn ${copied ? 'copied' : ''}`}
                  onClick={() => {
                    navigator.clipboard.writeText('yogesh.saini4002@oksbi')
                    setCopied(true)
                    setTimeout(() => setCopied(false), 2000)
                  }}
                >
                  {copied ? 'Copied ✓' : 'Copy UPI ID'}
                </button>


                <p className="note">
                  Totally optional — stars & feedback matter just as much ❤️
                </p>
              </div>
            </div>
          )}

        </div>

        <h2 className="section-title-2">
          About Me (Developer)
        </h2>

        <div className="about-content">
          <span className="about-tag">ABOUT ME</span>

          <h1 className="about-heading">
            Yogesh <span>Saini</span>
          </h1>

          <p className="about-subtitle">
            · Full-Stack Developer · Backend-Focused
          </p>

          <p className="about-description">
            I’m a full-stack developer with strong expertise in
            <strong> MERN Stack</strong>. I build scalable,
            high-performance web applications with clean architecture
            and intuitive user experiences.
          </p>

          <p className="about-description">
            My core interest lies in <strong>backend development</strong>,
            where I design robust APIs, handle data modeling, and deploy
            production-ready systems.
          </p>

          {/* NEW SECTION */}
          <p className="about-description about-highlight">
            I’m currently <strong>open to working on new projects</strong> and
            opportunities. You can consider or refer me for
            <strong> Backend Developer</strong>,
            <strong> Full-Stack Developer</strong>, or similar roles where I can
            contribute, learn, and deliver real value.
          </p>

          <div className="about-actions">
            <a href="mailto:yogesh.saini4002@gmail.com" aria-label="Email">
              <FaEnvelope />
            </a>
            <a
              href="https://www.linkedin.com/in/yogesh-saini-203153265/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/Saini-Yogesh"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://saini-yogesh.github.io/Portfolio/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Portfolio"
            >
              <FaGlobe />
            </a>
          </div>
        </div>

        <div className="about-footer">
          © {new Date().getFullYear()} Yogesh Saini · All rights reserved
        </div>
      </div>
    </div>
  )
}
