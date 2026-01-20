'use client'

import './About.css'
import Image from 'next/image'
import Link from 'next/link'
import { FaEnvelope, FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa'

export default function About() {
  return (
    <section className="about">
      <div className="about-wrapper">
        <div className="about-content">
          <span className="about-tag">ABOUT ME</span>

          <h1 className="about-heading">
            Yogesh <span>Saini</span>
          </h1>

          <p className="about-subtitle">
            Full-Stack Developer · Backend-Focused
          </p>

          <p className="about-description">
            I’m a full-stack developer with strong expertise in
            <strong> React, Node.js, MongoDB</strong>. I build scalable,
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
            <Link href="mailto:yogesh.saini4002@gmail.com" aria-label="Email">
              <FaEnvelope />
            </Link>
            <Link
              href="https://www.linkedin.com/in/yogesh-saini-203153265/"
              target="_blank"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </Link>
            <Link
              href="https://github.com/Saini-Yogesh"
              target="_blank"
              aria-label="GitHub"
            >
              <FaGithub />
            </Link>
            <Link
              href="https://saini-yogesh.github.io/Portfolio/"
              target="_blank"
              aria-label="Portfolio"
            >
              <FaGlobe />
            </Link>
          </div>
        </div>

        <div className="about-image">
          <Image
            src="/self_image.jpg"
            alt="Yogesh Saini"
            width={350}
            height={350}
            priority
          />
        </div>
      </div>

      <footer className="about-footer">
        © {new Date().getFullYear()} Yogesh Saini · All rights reserved
      </footer>
    </section>
  )
}
