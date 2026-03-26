"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";

export default function LanguageSelector() {
    const { language, setLanguage } = useLanguage();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const languages = [
        { code: 'en', label: 'English', short: 'EN' },
        { code: 'te', label: 'Telugu (తెలుగు)', short: 'TE' },
        { code: 'hi', label: 'Hindi (हिंदी)', short: 'HI' }
    ];

    const currentLang = languages.find(l => l.code === language) || languages[0];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLanguageSelect = (code: string) => {
        setLanguage(code as any);
        setOpen(false);
    };

    return (
        <div style={{ position: 'relative' }} ref={dropdownRef}>
            <button
                onClick={() => setOpen(!open)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    backgroundColor: open ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                    border: '1px solid transparent',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    outline: 'none',
                    fontFamily: 'inherit'
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.color = '#ffffff';
                    if (!open) {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                    }
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                    if (!open) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                    }
                }}
            >
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'inherit',
                    transition: 'all 0.2s ease'
                }}>
                    <Globe size={18} />
                </div>
                <span>{currentLang.short}</span>
                <ChevronDown 
                    size={16} 
                    style={{
                        transition: 'transform 0.3s ease',
                        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                        color: 'inherit'
                    }} 
                />
            </button>

            {open && (
                <div className="lang-dropdown">
                    <style>{`
                        .lang-dropdown {
                            position: absolute;
                            right: 0;
                            top: calc(100% + 10px);
                            width: 210px;
                            background-color: #ffffff;
                            border-radius: 16px;
                            box-shadow: 0 10px 30px rgba(0,0,0,0.12);
                            border: 1px solid #f3f4f6;
                            overflow: hidden;
                            z-index: 1000;
                            animation: fadeInSlide 0.2s ease-out forwards;
                        }
                        @media (max-width: 850px) {
                            .lang-dropdown {
                                right: auto;
                                left: 0;
                            }
                        }
                        @keyframes fadeInSlide {
                            from { opacity: 0; transform: translateY(-10px) scale(0.95); }
                            to { opacity: 1; transform: translateY(0) scale(1); }
                        }
                        .lang-btn {
                            width: 100%;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            padding: 12px 16px;
                            background: transparent;
                            border: none;
                            cursor: pointer;
                            transition: all 0.2s ease;
                            color: #374151;
                            font-size: 0.95rem;
                            font-weight: 500;
                            margin-bottom: 4px;
                        }
                        .lang-btn:last-child {
                            margin-bottom: 0;
                        }
                        .lang-btn:hover {
                            background-color: #f9fafb;
                        }
                        .lang-btn.active {
                            background-color: #f0fdf4;
                            color: #166534;
                        }
                        .lang-btn.active .lang-icon {
                            background-color: #ffffff;
                            color: #166534;
                            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                        }
                    `}</style>
                    <div style={{ padding: '8px' }}>
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => handleLanguageSelect(lang.code)}
                                className={`lang-btn ${language === lang.code ? 'active' : ''}`}
                                style={{ borderRadius: '12px' }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <span 
                                        className="lang-icon"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%',
                                            fontSize: '0.75rem',
                                            fontWeight: 700,
                                            backgroundColor: '#f3f4f6',
                                            color: '#6b7280',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        {lang.short}
                                    </span>
                                    {lang.label}
                                </div>
                                {language === lang.code && <Check size={18} color="#166534" />}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
