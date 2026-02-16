"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ShoppingCart, MessageCircle, X, Plus, Minus, MapPin, Phone, User, Instagram, Facebook, Twitter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';



// Types
interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
}

interface CartItem {
    item: Product;
    quantity: number;
}

interface OrderDetails {
    name: string;
    address: string;
    phone: string;
}

// Mock Data
const PRODUCTS: Product[] = [
    { id: 1, name: "Velvet Rose Cake", price: 15000, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80", category: "Cake" },
    { id: 2, name: "Chocolate Bliss", price: 12000, image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80", category: "Treats" },
    { id: 3, name: "Strawberry Dream", price: 14000, image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80", category: "Cake" },
    { id: 4, name: "Vanilla Glaze Donuts", price: 5000, image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80", category: "Treats" },
    { id: 5, name: "Caramel Drizzle Cake", price: 18000, image: "https://images.unsplash.com/photo-1535141123063-3bb6ca609e41?w=800&q=80", category: "Cake" },
    { id: 6, name: "Assorted Cupcakes", price: 8000, image: "https://images.unsplash.com/photo-1519869325930-281384150729?w=800&q=80", category: "Treats" },
];

export default function Home() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [timeLeft, setTimeLeft] = useState(3600);
    const [orderDetails, setOrderDetails] = useState<OrderDetails>({ name: '', address: '', phone: '' });
    const [isLoading, setIsLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isBannerOpen, setIsBannerOpen] = useState(true);

    const HERO_SLIDES = [
        {
            image: "/assets/happy.png",
            title: "Baked with Love",
            highlight: "Fresh Daily",
            desc: "Our master bakers bring you the freshest treats every single morning."
        },
        {
            image: "/assets/morecakes.png",
            title: "Premium Quality",
            highlight: "Crafted Care",
            desc: "Using only the finest ingredients to create masterpieces for your table."
        }
    ];

    useEffect(() => {
        const loadingTimer = setTimeout(() => setIsLoading(false), 2500);

        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        const carouselTimer = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
        }, 5000);

        return () => {
            clearTimeout(loadingTimer);
            clearInterval(timer);
            clearInterval(carouselTimer);
        };
    }, []);

    const addToCart = (product: Product) => {
        setCart(prev => {
            const existing = prev.find(i => i.item.id === product.id);
            if (existing) {
                return prev.map(i => i.item.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prev, { item: product, quantity: 1 }];
        });
    };

    const updateQuantity = (productId: number, delta: number) => {
        setCart(prev => prev.map(i => {
            if (i.item.id === productId) {
                const newQty = Math.max(1, i.quantity + delta);
                return { ...i, quantity: newQty };
            }
            return i;
        }));
    };

    const cartTotal = cart.reduce((acc, curr) => acc + (curr.item.price * curr.quantity), 0);

    const sendWhatsAppOrder = () => {
        const itemsList = cart.map(i => `- ${i.item.name} (x${i.quantity}) - ₦${(i.item.price * i.quantity).toLocaleString()}`).join('%0A');
        const message = `*NEW ORDER FROM RUNO'S OVEN*%0A%0A*Items:*%0A${itemsList}%0A%0A*Total: ₦${cartTotal.toLocaleString()}*%0A%0A*Customer Details:*%0AName: ${orderDetails.name}%0APhone: ${orderDetails.phone}%0AAddress: ${orderDetails.address}%0A%0A_Sent from Website_`;
        window.open(`https://wa.me/2347054885172?text=${message}`, '_blank');
    };

    return (
        <>
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        key="splash"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-bakery-cream flex items-center justify-center text-center px-4"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.1, 1], opacity: [1, 0.8, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="space-y-6"
                        >
                            <div className="relative w-32 h-32 md:w-48 md:h-48 mx-auto">
                                <Image src="/assets/runologo.png" alt="Logo" fill className="object-contain drop-shadow-2xl" />
                            </div>
                            <h2 className="text-4xl md:text-6xl font-serif text-bakery-chocolate italic tracking-tighter">Runo's Oven</h2>
                            <div className="w-16 h-1 bg-primary mx-auto rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-secondary"
                                    animate={{ x: [-64, 64] }}
                                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="min-h-screen bg-bakery-cream">
                {/* Top Info Bar */}
                <div className="bg-bakery-chocolate text-white/80 py-2 px-4 md:px-6 text-xs md:text-sm flex flex-col md:flex-row justify-between items-center text-center md:text-left border-b border-white/10 gap-2 md:gap-0">
                    <div className="flex gap-4">
                        <span className="flex items-center gap-1"><Phone size={14} className="text-primary-light" /> +234 705 488 5172</span>
                        <span className="flex items-center gap-1"><MapPin size={14} className="text-primary-light" /> Lagos, Nigeria</span>
                    </div>
                    <div className="italic text-[10px] md:text-xs">Freshly baked everyday since 2011</div>
                </div>

                {/* Navbar */}
                <nav className="bg-white sticky top-0 z-40 px-4 md:px-6 py-3 md:py-4 flex justify-between items-center shadow-md border-b border-primary/10">
                    <div className="flex items-center gap-2">
                        <div className="relative w-10 h-10 md:w-14 md:h-14">
                            <Image
                                src="/assets/runologo.png"
                                alt="Runo's Oven"
                                fill
                                className="rounded-full shadow-inner object-contain"
                            />
                        </div>
                        <span className="text-lg md:text-2xl font-serif font-bold text-bakery-chocolate italic tracking-tight">Runo's Oven</span>
                    </div>

                    <div className="hidden md:flex gap-8 font-semibold text-bakery-chocolate">
                        <a href="#" className="hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary">Home</a>
                        <a href="#menu" className="hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary">Menu</a>
                        <a href="#about" className="hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary">About Us</a>
                        <a href="#contact" className="hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary">Contact</a>
                    </div>

                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="relative p-2 text-bakery-chocolate hover:text-primary transition-colors bg-bakery-cream/50 rounded-full"
                    >
                        <ShoppingCart size={24} className="md:w-7 md:h-7" />
                        {cart.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] md:text-xs font-bold w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full shadow-lg ring-2 ring-white animate-bounce">
                                {cart.reduce((acc, curr) => acc + curr.quantity, 0)}
                            </span>
                        )}
                    </button>
                </nav>

                {/* Flash Sale Banner */}
                <AnimatePresence>
                    {isBannerOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="bg-gradient-to-r from-primary to-primary-dark text-white overflow-hidden relative border-b-4 border-secondary origin-top"
                        >
                            <div className="py-4 md:py-8">
                                <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-center md:text-left">
                                    <div className="flex flex-col">
                                        <span className="text-secondary-light font-bold tracking-widest uppercase text-[10px] md:text-sm mb-1">Limited Time Offer</span>
                                        <h2 className="text-2xl md:text-5xl font-serif font-bold">✨ FLASH SALE: 20% OFF! ✨</h2>
                                        <p className="text-white/80 mt-1 md:mt-2 text-sm md:text-lg">Indulge in your favorites for less.</p>
                                    </div>

                                    <div className="flex items-center gap-4 md:gap-6 bg-white/20 backdrop-blur-md rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-6 border border-white/30 shadow-2xl scale-90 md:scale-125 origin-center">
                                        <div className="flex flex-col items-center">
                                            <span className="text-3xl md:text-5xl font-mono font-black tracking-tighter">
                                                {Math.floor(timeLeft / 60).toString().padStart(2, '0')}
                                            </span>
                                            <span className="text-[10px] md:text-[12px] uppercase font-bold opacity-80 mt-1">Min</span>
                                        </div>
                                        <span className="text-3xl md:text-5xl font-mono font-black -mt-4 md:-mt-6">:</span>
                                        <div className="flex flex-col items-center">
                                            <span className="text-3xl md:text-5xl font-mono font-black tracking-tighter">
                                                {(timeLeft % 60).toString().padStart(2, '0')}
                                            </span>
                                            <span className="text-[10px] md:text-[12px] uppercase font-bold opacity-80 mt-1">Sec</span>
                                        </div>
                                    </div>

                                    <button className="bg-white text-primary font-bold px-6 md:px-10 py-3 md:py-4 rounded-full hover:bg-secondary-light transition-all shadow-xl hover:-translate-y-1 active:scale-95 text-sm md:text-xl">
                                        Claim Discount
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsBannerOpen(false)}
                                className="absolute top-2 right-2 md:right-4 text-white/50 hover:text-white transition-colors"
                            >
                                <X size={16} className="md:w-5 md:h-5" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Banner Toggle Button */}
                <AnimatePresence>
                    {!isBannerOpen && (
                        <motion.button
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -50, opacity: 0 }}
                            onClick={() => setIsBannerOpen(true)}
                            className="absolute top-16 md:top-24 left-1/2 -translate-x-1/2 z-30 bg-primary text-white px-3 md:px-4 py-1 rounded-b-xl shadow-md text-[10px] md:text-xs font-bold tracking-widest uppercase hover:bg-primary-dark transition-colors"
                        >
                            Show Offer
                        </motion.button>
                    )}
                </AnimatePresence>

                {/* Hero Carousel */}
                <header className="relative h-[60vh] md:h-[85vh] flex items-center justify-center overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                            className="absolute inset-0 z-0"
                        >
                            <Image
                                src={HERO_SLIDES[currentSlide].image}
                                alt="Hero Image"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-bakery-chocolate/90 via-bakery-chocolate/40 to-transparent"></div>
                        </motion.div>
                    </AnimatePresence>

                    <div className="relative z-10 text-center px-4 max-w-5xl">
                        <motion.div
                            key={`meta-${currentSlide}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-4 md:mb-8 inline-block"
                        >
                            <span className="bg-primary/20 backdrop-blur-md border border-primary/30 text-primary-light px-4 md:px-8 py-2 md:py-3 rounded-full font-bold text-xs md:text-sm tracking-[0.25em] uppercase">
                                Premium Artisanal Bakery
                            </span>
                        </motion.div>
                        <motion.h1
                            key={`title-${currentSlide}`}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-9xl font-serif text-white mb-4 md:mb-8 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] leading-tight"
                        >
                            {HERO_SLIDES[currentSlide].title} <span className="block md:inline text-primary italic">{HERO_SLIDES[currentSlide].highlight}</span>
                        </motion.h1>
                        <motion.p
                            key={`desc-${currentSlide}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-lg md:text-3xl text-white/90 mb-8 md:mb-12 font-medium max-w-3xl mx-auto leading-relaxed px-4"
                        >
                            {HERO_SLIDES[currentSlide].desc}
                        </motion.p>
                        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-primary hover:bg-primary-dark text-white text-lg md:text-xl font-bold px-8 md:px-12 py-3 md:py-5 rounded-2xl shadow-[0_0_20px_rgba(225,29,72,0.4)] transition-all"
                            >
                                Order Now
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white/10 backdrop-blur-md border border-white/30 text-white text-lg md:text-xl font-bold px-8 md:px-12 py-3 md:py-5 rounded-2xl hover:bg-white/20 transition-all font-serif"
                            >
                                Explore Menu
                            </motion.button>
                        </div>

                        <div className="flex justify-center gap-3 mt-8 md:mt-12">
                            {HERO_SLIDES.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentSlide(idx)}
                                    className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${currentSlide === idx ? 'bg-primary w-6 md:w-8' : 'bg-white/50'}`}
                                />
                            ))}
                        </div>
                    </div>
                </header>

                {/* Why Choose Us */}
                <section className="py-12 md:py-24 bg-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 md:w-64 h-32 md:h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 md:w-96 h-48 md:h-96 bg-secondary/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="text-center mb-10 md:mb-16">
                            <h2 className="text-3xl md:text-5xl font-serif text-bakery-chocolate mb-2 md:mb-4">Why Choose Runo's Oven?</h2>
                            <div className="w-16 md:w-24 h-1 md:h-1.5 bg-primary mx-auto rounded-full"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                            {[
                                { title: 'Premium Ingredients', desc: 'We use only the finest, freshest ingredients to ensure every treat is a masterpiece.', icon: '🍓' },
                                { title: 'Handcrafted with Love', desc: 'Every cake and donut is carefully crafted by hand with attention to every tiny detail.', icon: '💝' },
                                { title: 'Express Delivery', desc: 'Fast and secure delivery across Lagos, making sure your treats arrive fresh and perfect.', icon: '🚚' }
                            ].map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.2 }}
                                    className="bg-bakery-cream/30 p-6 md:p-10 rounded-3xl border border-primary/5 hover:border-primary/20 transition-all text-center group"
                                >
                                    <div className="text-4xl md:text-6xl mb-4 md:mb-6 group-hover:scale-110 transition-transform inline-block">{feature.icon}</div>
                                    <h3 className="text-xl md:text-2xl font-serif text-bakery-chocolate mb-2 md:mb-4">{feature.title}</h3>
                                    <p className="text-bakery-chocolate/70 leading-relaxed text-sm md:text-lg">{feature.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Menu Section */}
                <section id="menu" className="py-12 md:py-20 px-4 md:px-6 max-w-7xl mx-auto">
                    <div className="text-center mb-10 md:mb-16">
                        <h2 className="text-3xl md:text-6xl font-serif text-bakery-chocolate mb-2 md:mb-4">Our Sweet Menu</h2>
                        <div className="w-20 md:w-32 h-1 md:h-1.5 bg-primary mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                        {PRODUCTS.map((product) => (
                            <motion.div
                                key={product.id}
                                whileHover={{ y: -15 }}
                                className="bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-xl md:shadow-2xl overflow-hidden border border-primary/5 group"
                            >
                                <div className="relative h-56 md:h-72 w-full overflow-hidden">
                                    <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-primary text-white font-bold px-3 py-1 md:px-4 md:py-2 rounded-xl shadow-lg text-xs md:text-base">
                                        {product.category}
                                    </div>
                                </div>
                                <div className="p-6 md:p-8">
                                    <h3 className="text-2xl md:text-3xl font-serif text-bakery-chocolate mb-3 md:mb-4">{product.name}</h3>
                                    <div className="flex justify-between items-center bg-bakery-cream/30 p-3 md:p-4 rounded-2xl">
                                        <span className="text-2xl md:text-3xl font-bold text-primary">₦{product.price.toLocaleString()}</span>
                                        <button
                                            onClick={() => addToCart(product)}
                                            className="p-3 md:p-4 bg-secondary hover:bg-primary text-white rounded-2xl transition-all shadow-md group/btn"
                                        >
                                            <Plus size={20} className="md:w-6 md:h-6 group-hover/btn:rotate-90 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Testimonials */}
                <section className="py-12 md:py-24 bg-bakery-chocolate text-white">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-10 md:mb-16">
                            <h2 className="text-3xl md:text-5xl font-serif italic mb-2 md:mb-4">Sweet words from our family</h2>
                            <div className="w-16 md:w-24 h-1 bg-primary mx-auto rounded-full"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            {[
                                { name: "Sarah J.", text: "The Velvet Rose cake was the highlight of our anniversary. Stunning and delicious!" },
                                { name: "Mike O.", text: "Runo's Oven is my go-to for corporate gifts. The packaging is as premium as the taste." },
                                { name: "Blessing A.", text: "Those Vanilla Glaze donuts are dangerous! I can't stop ordering them." }
                            ].map((testi, i) => (
                                <div key={i} className="bg-white/5 p-6 md:p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                                    <p className="text-lg md:text-xl italic mb-4 md:mb-6 text-white/90">"{testi.text}"</p>
                                    <span className="font-bold text-primary">— {testi.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* WhatsApp Chat & Order Widget */}
                <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
                    <button
                        onClick={() => setIsCartOpen(!isCartOpen)}
                        className="bg-[#25D366] text-white p-3 md:p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 group"
                    >
                        <MessageCircle size={24} className="md:w-8 md:h-8" />
                        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-bold whitespace-nowrap text-sm md:text-base">
                            Chat & Order
                        </span>
                        {cart.length > 0 && (
                            <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-red-400 text-white text-[10px] md:text-xs font-bold w-5 h-5 md:w-6 md:h-6 flex items-center justify-center rounded-full border-2 border-white">
                                {cart.length}
                            </span>
                        )}
                    </button>

                    <AnimatePresence>
                        {isCartOpen && (
                            <motion.div
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 100 }}
                                className="fixed inset-y-0 right-0 w-full md:w-[450px] bg-white shadow-2xl z-[60] flex flex-col pt-16"
                            >
                                <div className="bg-primary p-6 md:p-8 text-white flex justify-between items-center">
                                    <div>
                                        <h3 className="text-2xl md:text-3xl font-serif">Your Order</h3>
                                        <p className="opacity-80 text-sm md:text-base">We're excited to bake for you!</p>
                                    </div>
                                    <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white/20 rounded-full">
                                        <X size={24} className="md:w-7 md:h-7" />
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-4 md:space-y-6 bg-primary-light/10">
                                    {cart.length === 0 ? (
                                        <div className="text-center py-20 text-bakery-chocolate/30">
                                            <ShoppingCart size={60} className="mx-auto mb-6 opacity-10 md:w-20 md:h-20" />
                                            <p className="text-lg md:text-xl font-medium">Your oven is empty!</p>
                                        </div>
                                    ) : (
                                        <>
                                            {cart.map((item) => (
                                                <div key={item.item.id} className="flex gap-4 items-center bg-white p-4 rounded-2xl shadow-sm border border-primary/10">
                                                    <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden shrink-0">
                                                        <Image src={item.item.image} alt={item.item.name} fill className="object-cover" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-bold text-bakery-chocolate text-base md:text-lg">{item.item.name}</h4>
                                                        <p className="text-primary font-black text-lg md:text-xl">₦{item.item.price.toLocaleString()}</p>
                                                    </div>
                                                    <div className="flex items-center gap-2 md:gap-3 bg-bakery-cream p-2 rounded-xl">
                                                        <button onClick={() => updateQuantity(item.item.id, -1)} className="p-1 hover:bg-white rounded-lg"><Minus size={14} className="md:w-4 md:h-4" /></button>
                                                        <span className="w-4 md:w-6 text-center font-bold text-sm md:text-base">{item.quantity}</span>
                                                        <button onClick={() => updateQuantity(item.item.id, 1)} className="p-1 hover:bg-white rounded-lg"><Plus size={14} className="md:w-4 md:h-4" /></button>
                                                    </div>
                                                </div>
                                            ))}

                                            <div className="pt-8 border-t border-primary/20 space-y-4 md:space-y-6">
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                                                    <input
                                                        type="text"
                                                        placeholder="Full Name"
                                                        className="w-full pl-12 pr-4 py-3 md:py-4 bg-white border-2 border-primary/10 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none text-bakery-chocolate font-bold placeholder:text-bakery-chocolate/40 text-sm md:text-base"
                                                        value={orderDetails.name}
                                                        onChange={(e) => setOrderDetails({ ...orderDetails, name: e.target.value })}
                                                    />
                                                </div>
                                                <div className="relative">
                                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                                                    <input
                                                        type="tel"
                                                        placeholder="Phone Number"
                                                        className="w-full pl-12 pr-4 py-3 md:py-4 bg-white border-2 border-primary/10 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none text-bakery-chocolate font-bold placeholder:text-bakery-chocolate/40 text-sm md:text-base"
                                                        value={orderDetails.phone}
                                                        onChange={(e) => setOrderDetails({ ...orderDetails, phone: e.target.value })}
                                                    />
                                                </div>
                                                <div className="relative">
                                                    <MapPin className="absolute left-4 top-4 md:top-6 text-primary" size={20} />
                                                    <textarea
                                                        placeholder="Delivery Address"
                                                        className="w-full pl-12 pr-4 py-3 md:py-4 bg-white border-2 border-primary/10 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none h-24 md:h-32 text-bakery-chocolate font-bold placeholder:text-bakery-chocolate/40 resize-none text-sm md:text-base"
                                                        value={orderDetails.address}
                                                        onChange={(e) => setOrderDetails({ ...orderDetails, address: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div className="p-6 md:p-8 border-t bg-white shadow-2xl">
                                    <div className="flex justify-between items-center mb-6 md:mb-8">
                                        <span className="text-lg md:text-xl font-medium text-bakery-chocolate/60">Total Amount:</span>
                                        <span className="text-3xl md:text-4xl font-black text-primary">₦ {cartTotal.toLocaleString()}</span>
                                    </div>
                                    <button
                                        disabled={cart.length === 0 || !orderDetails.name || !orderDetails.phone || !orderDetails.address}
                                        onClick={sendWhatsAppOrder}
                                        className="w-full bg-[#25D366] hover:bg-[#128C7E] disabled:bg-gray-200 text-white font-bold py-4 md:py-5 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 text-lg md:text-xl active:scale-95"
                                    >
                                        <MessageCircle size={24} className="md:w-7 md:h-7" />
                                        Send Order on WhatsApp
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer */}
                <footer className="bg-gradient-to-br from-bakery-chocolate to-[#1a100e] text-white py-12 md:py-24 px-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary"></div>
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 relative z-10">
                        <div className="space-y-6 md:space-y-8">
                            <div className="flex items-center gap-3">
                                <Image src="/assets/runologo.png" alt="Logo" width={50} height={50} className="rounded-full bg-white/10 p-1 md:w-[60px] md:h-[60px]" />
                                <h3 className="text-3xl md:text-4xl font-serif italic text-primary-light">Runo's Oven</h3>
                            </div>
                            <p className="text-white/60 leading-relaxed text-base md:text-lg">Deliciously handcrafted cakes, donuts, and treats for every occasion. We bring sweetness and joy to your doorstep, one bite at a time.</p>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer group">
                                    <Instagram className="text-white w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
                                </div>
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer group">
                                    <Facebook className="text-white w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
                                </div>
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer group">
                                    <Twitter className="text-white w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 border-l-4 border-primary pl-4">Contact Us</h4>
                            <div className="space-y-4 md:space-y-6 text-white/70 text-base md:text-lg">
                                <p className="flex items-center gap-4 group cursor-pointer hover:text-white transition-colors">
                                    <Phone size={20} className="text-primary group-hover:scale-110 transition-transform md:w-6 md:h-6" /> +234 705 488 5172
                                </p>
                                <p className="flex items-center gap-4 group cursor-pointer hover:text-white transition-colors">
                                    <MapPin size={20} className="text-primary group-hover:scale-110 transition-transform md:w-6 md:h-6" /> Lagos, Nigeria
                                </p>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 border-l-4 border-primary pl-4">Opening Hours</h4>
                            <div className="space-y-3 md:space-y-4 text-white/70 text-base md:text-lg">
                                <div className="flex justify-between items-center">
                                    <span>Mon - Fri</span>
                                    <span className="font-bold text-primary italic">9:00 - 19:00</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Saturday</span>
                                    <span className="font-bold text-primary italic">10:00 - 18:00</span>
                                </div>
                                <div className="flex justify-between items-center opacity-50">
                                    <span>Sunday</span>
                                    <span>Closed</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </main>
        </>
    );
}
