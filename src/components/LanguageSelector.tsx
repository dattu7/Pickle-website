"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Globe, Check, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function LanguageSelector() {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const languages = [
        { code: 'en', label: 'English' },
        { code: 'te', label: 'Telugu (తెలుగు)' },
        { code: 'hi', label: 'Hindi (हिंदी)' }
    ];

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all text-white border border-white/20"
                title="Change Language"
            >
                <Globe size={18} />
                <span className="uppercase font-bold text-sm tracking-wide">{language}</span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-fade-in origin-top-right">
                    <div className="py-1">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => {
                                    setLanguage(lang.code as any);
                                    setIsOpen(false);
                                }}
                                className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center justify-between group ${language === lang.code ? 'bg-green-50/50' : ''
                                    }`}
                            >
                                <span className={`text-sm ${language === lang.code ? 'font-bold text-[#006536]' : 'text-gray-700 group-hover:text-gray-900'}`}>
                                    {lang.label}
                                </span>
                                {language === lang.code && (
                                    <Check size={16} className="text-[#006536]" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
