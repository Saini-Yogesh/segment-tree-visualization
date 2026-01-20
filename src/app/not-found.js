'use client'
import Link from 'next/link'
import '../components/styles/NotFound.css'

export default function NotFound() {
    return (
        <section className="nf">
            <div className="nf-container">
                <h1 className="nf-code">404</h1>

                <p className="nf-text">
                    The page you’re looking for doesn’t exist.
                </p>

                <Link href="/" className="nf-home">
                    ← Go back home
                </Link>
            </div>
        </section>
    )
}
