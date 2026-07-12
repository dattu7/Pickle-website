'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Volume2, VolumeX, Sparkles, Sunset, Gift, Award, ChevronRight, ChevronLeft, Music, Play, Pause } from 'lucide-react';
import Image from 'next/image';

const fontLink = `
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Playfair+Display:ital,wght@0,600;0,800;1,400&family=Quicksand:wght@400;600;700&display=swap');
`;

class LiveMusicBox {
    private ctx: AudioContext | null = null;
    private isPlaying = false;
    private timeouts: any[] = [];

    constructor() {}

    private init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
    }

    private playPluck(freq: number, start: number, duration: number) {
        if (!this.ctx) return;
        
        const osc = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gainNode = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();
        const delay = this.ctx.createDelay();
        const feedback = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(freq * 2, start);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1400, start);
        filter.frequency.exponentialRampToValueAtTime(120, start + duration);

        gainNode.gain.setValueAtTime(0, start);
        gainNode.gain.linearRampToValueAtTime(0.35, start + 0.015);
        gainNode.gain.exponentialRampToValueAtTime(0.001, start + duration);

        delay.delayTime.setValueAtTime(0.28, start);
        feedback.gain.setValueAtTime(0.22, start);

        osc.connect(filter);
        osc2.connect(filter);
        filter.connect(gainNode);

        gainNode.connect(this.ctx.destination);
        gainNode.connect(delay);
        delay.connect(feedback);
        feedback.connect(delay);
        delay.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + duration);
        osc2.start(start);
        osc2.stop(start + duration);
    }

    public playBirthdaySong(onNoteTriggered: (index: number) => void, onFinished: () => void) {
        this.init();
        if (this.isPlaying) return;
        this.isPlaying = true;

        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }

        const C5 = 523.25;
        const D5 = 587.33;
        const E5 = 659.25;
        const F5 = 698.46;
        const G5 = 783.99;
        const A5 = 880.00;
        const Bb5 = 932.33;
        const C6 = 1046.50;

        const melody = [
            { f: C5, d: 0.5 }, { f: C5, d: 0.5 }, { f: D5, d: 1.0 }, { f: C5, d: 1.0 }, { f: F5, d: 1.0 }, { f: E5, d: 2.0 },
            { f: C5, d: 0.5 }, { f: C5, d: 0.5 }, { f: D5, d: 1.0 }, { f: C5, d: 1.0 }, { f: G5, d: 1.0 }, { f: F5, d: 2.0 },
            { f: C5, d: 0.5 }, { f: C5, d: 0.5 }, { f: C6, d: 1.0 }, { f: A5, d: 1.0 }, { f: F5, d: 1.0 }, { f: E5, d: 1.0 }, { f: D5, d: 2.0 },
            { f: Bb5, d: 0.5 }, { f: Bb5, d: 0.5 }, { f: A5, d: 1.0 }, { f: F5, d: 1.0 }, { f: G5, d: 1.0 }, { f: F5, d: 2.5 }
        ];

        let playHead = this.ctx!.currentTime + 0.1;
        let cumulativeDelayMs = 100;

        melody.forEach((note, index) => {
            const timeoutId = setTimeout(() => {
                if (this.isPlaying) {
                    onNoteTriggered(index);
                }
            }, cumulativeDelayMs);
            this.timeouts.push(timeoutId);

            const durationSec = note.d * 0.75;
            this.playPluck(note.f, playHead, durationSec);

            const stepSec = note.d * 0.77;
            playHead += stepSec;
            cumulativeDelayMs += stepSec * 1000;
        });

        const finishTimeout = setTimeout(() => {
            this.isPlaying = false;
            onFinished();
        }, cumulativeDelayMs);
        this.timeouts.push(finishTimeout);
    }

    public stop() {
        this.isPlaying = false;
        this.timeouts.forEach(t => clearTimeout(t));
        this.timeouts = [];
        if (this.ctx) {
            this.ctx.close().catch(() => {});
            this.ctx = null;
        }
    }

    public getPlayingState() {
        return this.isPlaying;
    }
}

export default function BirthdayPage() {
    const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
    const [isFullyOpened, setIsFullyOpened] = useState(false);
    const [audioPlaying, setAudioPlaying] = useState(false);
    const [currentNoteIdx, setCurrentNoteIdx] = useState<number | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [candlesLit, setCandlesLit] = useState([true, true, true]);
    const [confettiActive, setConfettiActive] = useState(false);
    const [typingText, setTypingText] = useState('');
    
    // Photo Carousel states
    const [photoIndex, setPhotoIndex] = useState(0);
    const [dragDirection, setDragDirection] = useState(0);

    const birthdayPhotos = [
        { src: '/images/WhatsApp Image 2026-07-12 at 10.01.31 PM.jpeg', caption: 'Your beautiful radiant light ✨' },
        { src: '/images/WhatsApp Image 2026-07-12 at 10.01.32 PM.jpeg', caption: 'Moments we share, hearts aligned 💖' },
        { src: '/images/WhatsApp Image 2026-07-12 at 10.01.32 PM (1).jpeg', caption: 'Every smile of yours is a blessing 🌸' },
        { src: '/images/WhatsApp Image 2026-07-12 at 10.01.32 PM (2).jpeg', caption: 'My favorite person in the entire world 🌎' },
        { src: '/images/WhatsApp Image 2026-07-12 at 10.01.33 PM.jpeg', caption: 'Forever and always, hand in hand 💑' }
    ];

    const handleNextPhoto = () => {
        setDragDirection(1);
        setPhotoIndex((prev) => (prev + 1) % birthdayPhotos.length);
    };

    const handlePrevPhoto = () => {
        setDragDirection(-1);
        setPhotoIndex((prev) => (prev - 1 + birthdayPhotos.length) % birthdayPhotos.length);
    };

    const fullText = "Happy Birthday, my wonderful princess! ❤️  On this special day, I wanted to create a secret corner of the internet just for you. You bring so much light, color, and happiness into my life. Every single laugh we share, every conversation, and every memory count as my favorite moments. You're not just my girlfriend, you are my home, my peace, and my greatest blessing. May your year ahead be as beautiful, kind, and sparkling as you are. I promise to be here supporting you, loving you, and cheering you on in everything you do. Happiest of birthdays, my love! 🎂✨💖";

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const synthRef = useRef<LiveMusicBox | null>(null);

    useEffect(() => {
        // Fix for files with potential typos or spaces in filenames
        // We ensure image paths in state exactly match what is in public directory
        synthRef.current = new LiveMusicBox();
        return () => {
            if (synthRef.current) {
                synthRef.current.stop();
            }
        };
    }, []);

    // Photo Carousel Auto-play effect
    useEffect(() => {
        if (!isFullyOpened) return;
        const timer = setInterval(() => {
            handleNextPhoto();
        }, 3500);
        return () => clearInterval(timer);
    }, [isFullyOpened, photoIndex]);

    // Letter typing effect
    useEffect(() => {
        if (!isFullyOpened) {
            setTypingText('');
            return;
        }
        let index = 0;
        setTypingText('');
        const timer = setInterval(() => {
            setTypingText((prev) => {
                if (index < fullText.length) {
                    return fullText.slice(0, index + 1);
                }
                return prev;
            });
            index++;
            if (index >= fullText.length) {
                clearInterval(timer);
            }
        }, 30);
        return () => clearInterval(timer);
    }, [isFullyOpened]);

    // Canvas Background
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const handleResize = () => {
            if (!canvas) return;
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        class Particle {
            x = Math.random() * width;
            y = Math.random() * height + height;
            size = Math.random() * 8 + 4;
            speedY = -(Math.random() * 1.2 + 0.4);
            speedX = Math.random() * 0.8 - 0.4;
            color = `rgba(255, ${Math.floor(Math.random() * 50 + 150)}, ${Math.floor(Math.random() * 50 + 170)}, ${Math.random() * 0.3 + 0.2})`;
            type = Math.random() > 0.4 ? 'heart' : 'sparkle';
            pulseValue = Math.random() * 10;

            update() {
                this.y += this.speedY;
                this.x += this.speedX + Math.sin(this.pulseValue) * 0.15;
                this.pulseValue += 0.02;

                if (this.y < -20) {
                    this.y = height + 20;
                    this.x = Math.random() * width;
                }
            }

            draw() {
                if (!ctx) return;
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.fillStyle = this.color;
                
                if (this.type === 'heart') {
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size, this.size / 3, 0, this.size);
                    ctx.bezierCurveTo(this.size, this.size / 3, this.size / 2, -this.size / 2, 0, 0);
                    ctx.fill();
                } else {
                    ctx.beginPath();
                    for (let i = 0; i < 4; i++) {
                        ctx.lineTo(0, -this.size);
                        ctx.quadraticCurveTo(0, 0, this.size, 0);
                        ctx.quadraticCurveTo(0, 0, 0, this.size);
                        ctx.quadraticCurveTo(0, 0, -this.size, 0);
                        ctx.quadraticCurveTo(0, 0, 0, -this.size);
                    }
                    ctx.fill();
                }
                ctx.restore();
            }
        }

        class Confetti {
            x = Math.random() * width;
            y = Math.random() * -100 - 10;
            size = Math.random() * 6 + 3;
            speedY = Math.random() * 3 + 2.5;
            speedX = Math.random() * 2 - 1.0;
            color = `hsl(${Math.random() * 360}, 90%, 65%)`;
            rotation = Math.random() * 360;
            rotationSpeed = Math.random() * 3 - 1.5;

            update() {
                this.y += this.speedY;
                this.x += this.speedX;
                this.rotation += this.rotationSpeed;
            }

            draw() {
                if (!ctx) return;
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate((this.rotation * Math.PI) / 180);
                ctx.fillStyle = this.color;
                ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
                ctx.restore();
            }
        }

        const particles: Particle[] = Array.from({ length: 30 }, () => new Particle());
        let confettis: Confetti[] = [];

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
            bgGrad.addColorStop(0, '#09030b');
            bgGrad.addColorStop(0.5, '#1d071c');
            bgGrad.addColorStop(1, '#0b020e');
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, width, height);

            particles.forEach((p) => {
                p.update();
                p.draw();
            });

            if (confettiActive) {
                if (confettis.length < 100 && Math.random() > 0.2) {
                    confettis.push(new Confetti());
                }
            }

            confettis.forEach((c, idx) => {
                c.update();
                c.draw();
                if (c.y > height + 20) {
                    if (confettiActive) {
                        confettis[idx] = new Confetti();
                    } else {
                        confettis.splice(idx, 1);
                    }
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, [confettiActive]);

    const handleMusicToggle = () => {
        if (!synthRef.current) return;

        if (audioPlaying) {
            synthRef.current.stop();
            setAudioPlaying(false);
            setCurrentNoteIdx(null);
        } else {
            setAudioPlaying(true);
            const playSong = () => {
                if (!synthRef.current) return;
                synthRef.current.playBirthdaySong(
                    (idx) => setCurrentNoteIdx(idx),
                    () => {
                        setTimeout(() => {
                            if (synthRef.current && synthRef.current.getPlayingState() === false) {
                                playSong();
                            }
                        }, 1200);
                    }
                );
            };
            playSong();
        }
    };

    const blowCandle = (index: number) => {
        const updated = [...candlesLit];
        updated[index] = false;
        setCandlesLit(updated);

        if (synthRef.current) {
            const pluckSynth = (synthRef.current as any).ctx;
            if (pluckSynth) {
                const now = pluckSynth.currentTime;
                const osc = pluckSynth.createOscillator();
                const gain = pluckSynth.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(800 + index * 300, now);
                gain.gain.setValueAtTime(0.15, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
                osc.connect(gain);
                gain.connect(pluckSynth.destination);
                osc.start(now);
                osc.stop(now + 0.25);
            }
        }

        if (updated.every(c => !c)) {
            setConfettiActive(true);
            setTimeout(() => {
                setConfettiActive(false);
            }, 5000);
        }
    };

    const resetCandles = () => {
        setCandlesLit([true, true, true]);
        setConfettiActive(false);
    };

    const romanticReasons = [
        {
            title: "Your Warm, Radiant Smile",
            desc: "The absolute highlight of my day. Your smile has a special way of washing away every bit of weight on my shoulders.",
            icon: <Sparkles style={{ width: '2rem', height: '2rem', color: '#f472b6' }} />
        },
        {
            title: "Your Enduring Support",
            desc: "Through thick and thin, you believe in me. Having you by my side gives me the courage to conquer anything.",
            icon: <Award style={{ width: '2rem', height: '2rem', color: '#fbbf24' }} />
        },
        {
            title: "Your Compassionate Soul",
            desc: "The gentleness in your heart and how much you care for everyone around you makes me admire you more each day.",
            icon: <Heart style={{ width: '2rem', height: '2rem', color: '#f43f5e', fill: '#f43f5e' }} />
        },
        {
            title: "Our Inside Jokes & Laughs",
            desc: "Nothing else in the world beats our long silly laughs. Your happiness is the sweetest music to my ears.",
            icon: <Volume2 style={{ width: '2rem', height: '2rem', color: '#c084fc' }} />
        },
        {
            title: "Unconditional Comfort",
            desc: "You are my ultimate safe haven. Home is not a location anymore, it is simply wherever you are.",
            icon: <Sunset style={{ width: '2rem', height: '2rem', color: '#fb923c' }} />
        },
        {
            title: "The Beautiful Tomorrow",
            desc: "Every time I visualize the future, you are right there next to me. I can't wait to grow and unlock new paths with you.",
            icon: <Gift style={{ width: '2rem', height: '2rem', color: '#34d399' }} />
        }
    ];

    const openEnvelope = () => {
        setIsEnvelopeOpened(true);
        setTimeout(() => {
            handleMusicToggle();
        }, 400);
        setTimeout(() => {
            setIsFullyOpened(true);
        }, 1500); // 1.5 seconds for folding & sliding transitions
    };

    return (
        <main style={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden', paddingBottom: '4rem' }} className="quicksand-font">
            <style dangerouslySetInnerHTML={{ __html: `
                ${fontLink}
                
                .c-script {
                    font-family: 'Dancing Script', cursive, serif;
                }
                .playfair-heading {
                    font-family: 'Playfair Display', Georgia, serif;
                }
                .quicksand-font {
                    font-family: 'Quicksand', sans-serif;
                }
                .glass-card {
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.35);
                    border-radius: 20px;
                }
                .text-gradient {
                    background: linear-gradient(135deg, #ffe2e6 0%, #ff8fa3 60%, #ff4d6d 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                
                /* Envelope folding styling */
                .envelope-wrapper {
                    position: relative;
                    width: 300px;
                    height: 200px;
                    perspective: 1000px;
                    cursor: pointer;
                    margin: 2rem auto;
                }
                .envelope {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background: #c12349;
                    border-radius: 12px;
                    box-shadow: 0 15px 30px rgba(0,0,0,0.4);
                    transform-style: preserve-3d;
                }
                .envelope::before {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 55%;
                    background: #a3193b;
                    border-radius: 0 0 12px 12px;
                    z-index: 10;
                    clip-path: polygon(0% 100%, 50% 30%, 100% 100%);
                }
                .envelope::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: #89112f;
                    border-radius: 12px;
                    z-index: 8;
                    clip-path: polygon(0% 0%, 30% 50%, 0% 100%, 100% 100%, 70% 50%, 100% 0%);
                }
                .envelope-flap {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 52%;
                    background: #dc3c63;
                    clip-path: polygon(0% 0%, 50% 100%, 100% 0%);
                    z-index: 12;
                    transform-origin: top center;
                    transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), z-index 0.2s 0.2s;
                }
                .envelope-wrapper.open .envelope-flap {
                    transform: rotateX(180deg);
                    z-index: 5;
                }
                .envelope-letter {
                    position: absolute;
                    width: 90%;
                    height: 85%;
                    background: #fffdf9;
                    top: 10%;
                    left: 5%;
                    border-radius: 8px;
                    padding: 16px;
                    box-shadow: 0 5px 12px rgba(0,0,0,0.15);
                    z-index: 9;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                    opacity: 0;
                    pointer-events: none;
                    transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.25), opacity 0.5s ease;
                }
                .envelope-wrapper.open .envelope-letter {
                    transform: translateY(-70px) scale(1.04);
                    opacity: 1;
                    pointer-events: auto;
                }
                
                .wax-seal {
                    position: absolute;
                    top: 40%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 50px;
                    height: 50px;
                    background: radial-gradient(circle, #f5b743 0%, #c48b20 70%, #905e04 100%);
                    border-radius: 50%;
                    z-index: 20;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.4);
                    border: 2px solid #a37213;
                    animation: pulseSeal 2s infinite ease-in-out;
                }
                @keyframes pulseSeal {
                    0% { transform: translate(-50%, -50%) scale(1); }
                    50% { transform: translate(-50%, -50%) scale(1.08); box-shadow: 0 4px 20px rgba(245,183,67,0.4); }
                    100% { transform: translate(-50%, -50%) scale(1); }
                }
                
                /* Candle animation */
                .flame {
                    width: 12px;
                    height: 24px;
                    background: radial-gradient(ellipse at bottom, #ffee55 0%, #ff8800 65%, #bb1111 100%);
                    border-radius: 50% 50% 20% 20% / 60% 60% 40% 40%;
                    position: absolute;
                    top: -24px;
                    left: 4px;
                    animation: flickerFlame 0.8s infinite ease-in-out alternate;
                    box-shadow: 0 0 15px #ff7700;
                    transform-origin: center bottom;
                }
                @keyframes flickerFlame {
                    0% { transform: scale(1) rotate(-1deg); }
                    100% { transform: scale(0.95, 1.05) rotate(1deg); }
                }
                .smoke {
                    width: 2px;
                    height: 0px;
                    background: rgba(255,255,255,0.3);
                    position: absolute;
                    top: -12px;
                    left: 9px;
                    border-radius: 50%;
                    animation: riseSmoke 1.2s forwards ease-out;
                }
                @keyframes riseSmoke {
                    0% { height: 12px; opacity: 0.5; transform: translateY(0); }
                    100% { height: 0px; opacity: 0; transform: translateY(-30px); }
                }

                /* Music vinyl record rotate styling */
                .vinyl-disc {
                    border: 4px solid #111;
                    background: radial-gradient(circle, #333 30%, #111 31%, #111 60%, #222 62%, #111 75%);
                    border-radius: 50%;
                    box-shadow: 0 8px 20px rgba(0,0,0,0.4);
                }
                .rotate-loop {
                    animation: spin 5s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                /* Layout structural utilities */
                .page-container {
                    width: 100%;
                    max-width: 580px;
                    margin: 0 auto;
                    padding: 1.5rem;
                    box-sizing: border-box;
                }
                .flex-center {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
                .w-full {
                    width: 100%;
                }
                .text-center {
                    text-align: center;
                }
                
                /* Hide global components that shouldn't appear on this special page */
                .whatsapp-btn {
                    display: none !important;
                }
                
                /* Hide carousel nav arrows on mobile view */
                @media (max-width: 640px) {
                    .carousel-arrows {
                        display: none !important;
                    }
                }
            ` }} />

            <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }} />

            {/* Vinyl Music Record Player Control (Sticky Top Right) */}
            {isFullyOpened && (
                <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 100 }}>
                    <button
                        onClick={handleMusicToggle}
                        style={{
                            background: 'rgba(255, 255, 255, 0.08)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            padding: '6px 12px',
                            borderRadius: '30px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: 'white',
                            transition: 'all 0.3s'
                        }}
                    >
                        <div 
                            className={`vinyl-disc flex-center rotate-loop ${audioPlaying ? '' : 'paused'}`}
                            style={{ 
                                width: '32px', 
                                height: '32px', 
                                animationPlayState: audioPlaying ? 'running' : 'paused',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            {audioPlaying ? (
                                <Pause style={{ width: '12px', height: '12px', color: '#ff8fa3', fill: '#ff8fa3' }} />
                            ) : (
                                <Play style={{ width: '12px', height: '12px', color: '#ff8fa3', fill: '#ff8fa3', marginLeft: '1.5px' }} />
                            )}
                        </div>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#ffd5dd' }}>
                            {audioPlaying ? 'Pause Music' : 'Play Music'}
                        </span>
                    </button>
                </div>
            )}

            <div className="relative z-10 min-h-screen flex-center" style={{ padding: '1rem' }}>
                <AnimatePresence mode="wait">
                    {!isFullyOpened ? (
                        /* Closed Envelope Screen */
                        <motion.div 
                            key="envelope-view"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.5 }}
                            className="flex-center w-full"
                            style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}
                        >
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f472b6', letterSpacing: '2px', textTransform: 'uppercase' }}>
                                A special message awaits you
                            </span>
                            <h1 className="playfair-heading" style={{ color: 'white', fontSize: '2.2rem', fontWeight: 800, margin: '0.75rem 0 2rem 0', lineHeight: 1.25 }}>
                                Personal Corner <br/>
                                <span className="text-gradient">For My Girlfriend ❤️</span>
                            </h1>

                            <div onClick={openEnvelope} className={`envelope-wrapper ${isEnvelopeOpened ? 'open' : ''}`}>
                                <div className="envelope">
                                    <div className="envelope-flap"></div>
                                    <div className="envelope-letter">
                                        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ffe4e6', paddingBottom: '4px' }}>
                                            <span style={{ fontSize: '8px', color: '#b45309', fontWeight: 'bold' }}>LOVE NOTE</span>
                                            <Heart style={{ width: '8px', height: '8px', fill: '#f43f5e', color: '#f43f5e' }} />
                                        </div>
                                        <p className="c-script" style={{ color: '#4c0519', fontSize: '1.4rem', fontWeight: 'bold', margin: 'auto 0' }}>
                                            Happy Birthday <br/>
                                            My Sweetheart!
                                        </p>
                                        <div style={{ width: '30px', height: '3px', background: '#fda4af', borderRadius: '2px' }}></div>
                                    </div>
                                    <div className="wax-seal">
                                        <Heart style={{ width: '22px', height: '22px', fill: 'white', color: 'white' }} />
                                    </div>
                                </div>
                            </div>
                            
                            <p style={{ color: 'white', opacity: 0.45, fontSize: '0.7rem', marginTop: '1.5rem' }}>
                                * Break the gold seal to view the wishes *
                            </p>
                        </motion.div>
                    ) : (
                        /* Open Card Presentation Screen */
                        <motion.div 
                            key="surprise-view"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="page-container"
                        >
                            {/* Cute Header */}
                            <motion.div 
                                className="text-center"
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1, duration: 0.5 }}
                                style={{ marginBottom: '2.5rem' }}
                            >
                                <div style={{ 
                                    display: 'inline-flex',
                                    alignItems: 'center', 
                                    gap: '6px', 
                                    background: 'rgba(244,114,182,0.12)', 
                                    border: '1px solid rgba(244,114,182,0.25)', 
                                    padding: '6px 14px', 
                                    borderRadius: '50px',
                                    color: '#f472b6',
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    marginBottom: '1rem'
                                }}>
                                    <Sparkles style={{ width: '13px', height: '13px' }} /> Happiest Birthday Sweetheart!
                                </div>
                                <h1 className="playfair-heading" style={{ color: 'white', fontSize: '2.4rem', fontWeight: 800, margin: 0, lineHeight: 1.25 }}>
                                    Wishes From My Heart <br/>
                                    <span className="text-gradient c-script" style={{ fontSize: '3.6rem', padding: '0.4rem 0' }}>Happy Birthday!</span>
                                </h1>
                            </motion.div>

                            {/* Love Letter Frame */}
                            <motion.div 
                                className="glass-card" 
                                style={{ padding: '2.5rem 1.5rem', marginBottom: '2rem' }}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                <div style={{ borderLeft: '3px solid #ff4d6d', paddingLeft: '1.25rem' }}>
                                    <p className="c-script" style={{ color: '#ffe4e6', fontSize: '1.65rem', lineHeight: 1.55, margin: 0, whiteSpace: 'pre-wrap' }}>
                                        {typingText}
                                        <span style={{ 
                                            display: 'inline-block',
                                            width: '6px',
                                            height: '22px',
                                            background: '#ff4d6d',
                                            marginLeft: '4px',
                                            animation: 'blink 0.8s infinite'
                                        }}></span>
                                    </p>
                                </div>
                            </motion.div>

                            {/* Photo Gallery Carousel */}
                            <motion.div 
                                className="flex-center"
                                style={{ gap: '1rem', marginBottom: '2.5rem', width: '100%' }}
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
                                    <h3 style={{ color: '#ffd5dd', fontSize: '1.1rem', fontWeight: 700, margin: '0 0 4px 0' }}>Our Precious Memories</h3>
                                    <p style={{ color: 'white', opacity: 0.6, fontSize: '0.75rem', margin: 0 }}>
                                        Swipe left/right to view the gallery 💖
                                    </p>
                                </div>

                                <div style={{ 
                                    position: 'relative', 
                                    width: '280px', 
                                    height: '350px',
                                    margin: '0 auto',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                }}>
                                    <div style={{
                                        background: 'white', 
                                        padding: '12px 12px 18px 12px', 
                                        borderRadius: '6px', 
                                        boxShadow: '0 12px 28px rgba(0,0,0,0.4)', 
                                        width: '100%',
                                        height: '310px',
                                        boxSizing: 'border-box',
                                        position: 'relative',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        overflow: 'hidden'
                                    }}>
                                        <AnimatePresence initial={false} custom={dragDirection}>
                                            <motion.div
                                                key={photoIndex}
                                                custom={dragDirection}
                                                variants={{
                                                    enter: (direction: number) => ({
                                                        x: direction > 0 ? 260 : -260,
                                                        opacity: 0,
                                                        scale: 0.95
                                                    }),
                                                    center: {
                                                        x: 0,
                                                        opacity: 1,
                                                        scale: 1,
                                                        zIndex: 1
                                                    },
                                                    exit: (direction: number) => ({
                                                        x: direction < 0 ? 260 : -260,
                                                        opacity: 0,
                                                        scale: 0.95,
                                                        zIndex: 0
                                                    })
                                                }}
                                                initial="enter"
                                                animate="center"
                                                exit="exit"
                                                transition={{
                                                    x: { type: "spring", stiffness: 260, damping: 26 },
                                                    opacity: { duration: 0.2 }
                                                }}
                                                drag="x"
                                                dragConstraints={{ left: 0, right: 0 }}
                                                dragElastic={0.7}
                                                onDragEnd={(e, info) => {
                                                    const swipeThreshold = 50;
                                                    if (info.offset.x < -swipeThreshold) {
                                                        handleNextPhoto();
                                                    } else if (info.offset.x > swipeThreshold) {
                                                        handlePrevPhoto();
                                                    }
                                                }}
                                                style={{ 
                                                    width: 'calc(100% - 24px)', 
                                                    height: 'calc(100% - 24px)', 
                                                    position: 'absolute',
                                                    left: '12px',
                                                    top: '12px',
                                                    cursor: 'grab',
                                                    display: 'flex',
                                                    flexDirection: 'column'
                                                }}
                                            >
                                                {/* Image Container */}
                                                <div style={{ 
                                                    position: 'relative', 
                                                    width: '100%', 
                                                    height: '210px', 
                                                    overflow: 'hidden', 
                                                    borderRadius: '4px',
                                                    background: '#fafafa',
                                                    border: '1px solid #f1f1f1'
                                                }}>
                                                    <Image
                                                        src={birthdayPhotos[photoIndex].src}
                                                        alt="Lovely Memory"
                                                        fill
                                                        style={{ objectFit: 'cover' }}
                                                        sizes="256px"
                                                        priority
                                                    />
                                                </div>

                                                {/* Caption */}
                                                <div style={{ 
                                                    marginTop: '10px', 
                                                    textAlign: 'center', 
                                                    flexGrow: 1, 
                                                    display: 'flex', 
                                                    alignItems: 'center', 
                                                    justifyContent: 'center' 
                                                }}>
                                                    <span className="c-script" style={{ color: '#2d3748', fontSize: '1.25rem', fontWeight: 'bold', lineHeight: 1.2 }}>
                                                        {birthdayPhotos[photoIndex].caption}
                                                    </span>
                                                </div>
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>

                                    {/* Action Buttons overlaying left/right */}
                                    <div className="carousel-arrows" style={{
                                        position: 'absolute',
                                        width: '320px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        top: '135px',
                                        left: '-20px',
                                        pointerEvents: 'none'
                                    }}>
                                        <button 
                                            onClick={handlePrevPhoto}
                                            style={{
                                                background: 'rgba(255, 255, 255, 0.15)',
                                                backdropFilter: 'blur(8px)',
                                                border: '1px solid rgba(255, 255, 255, 0.25)',
                                                borderRadius: '50%',
                                                width: '32px',
                                                height: '32px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'white',
                                                cursor: 'pointer',
                                                pointerEvents: 'auto',
                                                boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                                            }}
                                            title="Previous Memory"
                                        >
                                            <ChevronLeft size={16} />
                                        </button>
                                        <button 
                                            onClick={handleNextPhoto}
                                            style={{
                                                background: 'rgba(255, 255, 255, 0.15)',
                                                backdropFilter: 'blur(8px)',
                                                border: '1px solid rgba(255, 255, 255, 0.25)',
                                                borderRadius: '50%',
                                                width: '32px',
                                                height: '32px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'white',
                                                cursor: 'pointer',
                                                pointerEvents: 'auto',
                                                boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                                            }}
                                            title="Next Memory"
                                        >
                                            <ChevronRight size={16} />
                                        </button>
                                    </div>
                                    
                                    {/* Hearts Indicator */}
                                    <div style={{ display: 'flex', gap: '6px', marginTop: '12px' }}>
                                        {birthdayPhotos.map((_, idx) => (
                                            <span 
                                                key={idx} 
                                                onClick={() => {
                                                    setDragDirection(idx > photoIndex ? 1 : -1);
                                                    setPhotoIndex(idx);
                                                }}
                                                style={{ 
                                                    cursor: 'pointer',
                                                    fontSize: '0.9rem',
                                                    transition: 'all 0.2s',
                                                    transform: idx === photoIndex ? 'scale(1.2)' : 'scale(1)'
                                                }}
                                            >
                                                {idx === photoIndex ? '💖' : '🤍'}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Interactive Birthday Cake Frame */}
                            <motion.div 
                                className="glass-card" 
                                style={{ padding: '2rem 1.5rem', textAlign: 'center', marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                <h3 style={{ color: '#ffd5dd', fontSize: '1.1rem', fontWeight: 700, margin: '0 0 4px 0' }}>Bake the Birthday Cake</h3>
                                <p style={{ color: 'white', opacity: 0.6, fontSize: '0.75rem', margin: '0 0 1.5rem 0' }}>
                                    Tap the candles to blow them out &amp; make your wish!
                                </p>

                                <div style={{ position: 'relative', width: '160px', height: '140px', display: 'flex', alignItems: 'end', justifyContent: 'center', marginBottom: '1rem' }}>
                                    {/* Candles */}
                                    <div style={{ position: 'absolute', width: '100%', display: 'flex', justifyContent: 'center', gap: '14px', bottom: '50px', zIndex: 20 }}>
                                        {[0, 1, 2].map((i) => (
                                            <div 
                                                key={i} 
                                                onClick={() => candlesLit[i] && blowCandel(i)}
                                                style={{ position: 'relative', width: '10px', height: '35px', cursor: candlesLit[i] ? 'pointer' : 'default' }}
                                            >
                                                {/* Candle Body */}
                                                <div style={{ 
                                                    width: '8px', 
                                                    height: '35px', 
                                                    borderRadius: '3px 3px 0 0', 
                                                    margin: '0 auto',
                                                    background: i === 0 ? 'linear-gradient(to bottom, #f472b6, #db2777)' :
                                                                i === 1 ? 'linear-gradient(to bottom, #fcd34d, #f59e0b)' :
                                                                'linear-gradient(to bottom, #22d3ee, #0891b2)'
                                                }} />
                                                <div style={{ width: '1px', height: '4px', background: '#374151', margin: '0 auto' }} />
                                                
                                                {candlesLit[i] ? (
                                                    <div className="flame"></div>
                                                ) : (
                                                    <div className="smoke"></div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Cake drawing */}
                                    <svg style={{ width: '130px', height: '65px', zIndex: 10 }} viewBox="0 0 140 70">
                                        <ellipse cx="70" cy="62" rx="60" ry="7" fill="#ccc" />
                                        <path d="M 20,35 A 50,8 0 0 0 120,35 L 120,58 A 50,8 0 0 1 20,58 Z" fill="#693006" />
                                        <ellipse cx="70" cy="35" rx="50" ry="8" fill="#843c0c" />
                                        <path d="M 20,35 Q 35,45 50,35 Q 65,45 80,35 Q 95,45 110,35 Q 117,42 120,35 L 120,37 Q 117,45 110,37 Q 95,47 80,37 Q 65,47 50,37 Q 35,47 20,37 Z" fill="#ff758f" />
                                    </svg>
                                </div>

                                <div>
                                    {candlesLit.every(c => !c) ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <p className="c-script animate-bounce" style={{ color: '#fffb00', fontSize: '1.8rem', fontWeight: 700, margin: '8px 0 2px 0' }}>
                                                ✨ Wish Made! ✨
                                            </p>
                                            <p style={{ color: '#ffe4e6', fontSize: '0.75rem', margin: 0 }}>
                                                Your secret wish has been cast to the universe!
                                            </p>
                                            <button 
                                                onClick={resetCandles}
                                                style={{
                                                    marginTop: '12px',
                                                    background: 'none',
                                                    border: '1px solid rgba(255,255,255,0.2)',
                                                    borderRadius: '20px',
                                                    padding: '4px 12px',
                                                    color: 'white',
                                                    fontSize: '0.65rem',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                Light Candles Again
                                            </button>
                                        </div>
                                    ) : (
                                        <p style={{ color: '#ffb3c1', fontSize: '0.7rem', margin: 0 }}>
                                            ({candlesLit.filter(c => c).length} candles remaining)
                                        </p>
                                    )}
                                </div>
                            </motion.div>

                            {/* Reasons Slider Carousel */}
                            <motion.div 
                                className="glass-card" 
                                style={{ padding: '1.5rem', marginBottom: '2rem' }}
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                    <h4 style={{ color: '#ffb3c1', fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 750, margin: 0 }}>
                                        Why I Adore You
                                    </h4>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button 
                                            onClick={() => setCurrentSlide((prev) => (prev > 0 ? prev - 1 : romanticReasons.length - 1))}
                                            style={{ background: 'none', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', color: 'white', cursor: 'pointer', display: 'flex', padding: '4px' }}
                                        >
                                            <ChevronLeft size={14} />
                                        </button>
                                        <button 
                                            onClick={() => setCurrentSlide((prev) => (prev < romanticReasons.length - 1 ? prev + 1 : 0))}
                                            style={{ background: 'none', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', color: 'white', cursor: 'pointer', display: 'flex', padding: '4px' }}
                                        >
                                            <ChevronRight size={14} />
                                        </button>
                                    </div>
                                </div>

                                <div style={{ minHeight: '120px' }}>
                                    <AnimatePresence mode="wait">
                                        <motion.div 
                                            key={currentSlide}
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            transition={{ duration: 0.25 }}
                                            style={{ display: 'flex', gap: '12px', alignItems: 'start' }}
                                        >
                                            <div style={{ background: 'rgba(255,255,255,0.06)', padding: '8px', borderRadius: '10px', display: 'flex' }}>
                                                {romanticReasons[currentSlide].icon}
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ fontSize: '0.65rem', color: '#ffb3c1', fontWeight: 600 }}>Reason #{currentSlide + 1}</span>
                                                <h5 style={{ color: 'white', fontSize: '1rem', fontWeight: 700, margin: '2px 0 6px 0', lineHeight: 1.2 }}>
                                                    {romanticReasons[currentSlide].title}
                                                </h5>
                                                <p style={{ color: '#ffd5dd', fontSize: '0.8rem', lineHeight: 1.4, margin: 0 }}>
                                                    {romanticReasons[currentSlide].desc}
                                                </p>
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </motion.div>

                            {/* Digital Gift Hugs/Kisses Panel */}
                            <motion.div 
                                className="glass-card" 
                                style={{ padding: '2rem 1.5rem', textAlign: 'center' }}
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                <Heart style={{ width: '2rem', height: '2rem', fill: '#ff4d6d', color: '#ff4d6d', margin: '0 auto 8px auto' }} />
                                <h3 style={{ color: 'white', fontSize: '1.1rem', fontWeight: 700, margin: '0 0 1.5rem 0' }}>Receive a Virtual Gesture</h3>
                                
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                                    <button 
                                        onClick={() => alert("Virtual tight hug received! 🤗❤️")}
                                        style={{ 
                                            background: 'rgba(244,114,182,0.1)', 
                                            border: '1px solid rgba(244,114,182,0.2)',
                                            color: '#ffd5dd',
                                            borderRadius: '12px',
                                            padding: '12px 8px',
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            transition: 'transform 0.1s'
                                        }}
                                    >
                                        Virtual Hug 🤗
                                    </button>
                                    <button 
                                        onClick={() => alert("Sweet kiss on the forehead! Aww... 💋✨")}
                                        style={{ 
                                            background: 'rgba(244,63,94,0.1)', 
                                            border: '1px solid rgba(244,63,94,0.2)',
                                            color: '#ffd5dd',
                                            borderRadius: '12px',
                                            padding: '12px 8px',
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            transition: 'transform 0.1s'
                                        }}
                                    >
                                        Virtual Kiss 💋
                                    </button>
                                    <button 
                                        onClick={() => alert("You are the sweetest, most amazing person. Always keep shining! 🌟")}
                                        style={{ 
                                            background: 'rgba(6,182,212,0.1)', 
                                            border: '1px solid rgba(6,182,212,0.2)',
                                            color: '#e0f7fa',
                                            borderRadius: '12px',
                                            padding: '12px 8px',
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            transition: 'transform 0.1s'
                                        }}
                                    >
                                        Compliment 🌟
                                    </button>
                                    <button 
                                        onClick={() => alert("Blowing a stream of endless affection straight your way! 💓🚀")}
                                        style={{ 
                                            background: 'rgba(245,158,11,0.1)', 
                                            border: '1px solid rgba(245,158,11,0.2)',
                                            color: '#fffbeb',
                                            borderRadius: '12px',
                                            padding: '12px 8px',
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            transition: 'transform 0.1s'
                                        }}
                                    >
                                        Beam Love 💓
                                    </button>
                                </div>
                            </motion.div>

                            <footer style={{ textAlign: 'center', color: '#ffb3c1', opacity: 0.35, fontSize: '0.7rem', marginTop: '3rem' }}>
                                Crafted with love for a wonderful person.
                            </footer>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );

    // Mini helper locally to prevent Typo issues
    function blowCandel(idx: number) {
        blowCandle(idx);
    }
}
