'use client'
import { useLayoutEffect, useRef, useState } from 'react'
import hljs from 'highlight.js/lib/core'
import cpp from 'highlight.js/lib/languages/cpp'
import 'highlight.js/styles/github-dark.css'
import '../../styles/HighlightedCode.css'
import { FaCheck } from 'react-icons/fa6'
import { PiCopyDuotone } from 'react-icons/pi'

hljs.registerLanguage('cpp', cpp)

export default function HighlightedCode({ code, language = 'cpp' }) {
    const codeRef = useRef(null)
    const [copied, setCopied] = useState(false)

    useLayoutEffect(() => {
        if (!codeRef.current) return

        const el = codeRef.current
        el.textContent = code

        // 🔑 remove previous highlight.js state
        el.removeAttribute('data-highlighted')
        el.classList.remove('hljs')

        hljs.highlightElement(el)
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
                <code ref={codeRef} className={`hljs language-${language}`} />
            </pre>
        </div>
    )
}
