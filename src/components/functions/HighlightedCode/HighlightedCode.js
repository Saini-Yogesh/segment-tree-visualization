'use client'
import { useEffect, useRef, useState } from 'react'
import 'highlight.js/styles/github-dark.css'
import './HighlightedCode.css'
import { FaCheck } from 'react-icons/fa6'
import { PiCopyDuotone } from 'react-icons/pi'

export default function HighlightedCode({ code, language = 'cpp' }) {
    const codeRef = useRef(null)
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        const highlight = async () => {
            const core = await import('highlight.js/lib/core')
            const cpp = await import('highlight.js/lib/languages/cpp')

            const hljs = core.default
            hljs.registerLanguage('cpp', cpp.default)

            if (codeRef.current) {
                codeRef.current.textContent = code
                hljs.highlightElement(codeRef.current)
            }
        }

        highlight()
    }, [code])

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 1200)
    }

    return (
        <div className="code-box">
            <button className="copy-icon" onClick={handleCopy}>
                {copied ? <FaCheck /> : <PiCopyDuotone />}
            </button>

            <pre>
                <code ref={codeRef} className={`language-${language}`} />
            </pre>
        </div>
    )
}
