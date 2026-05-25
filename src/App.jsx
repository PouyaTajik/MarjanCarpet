import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ShoppingBag,
  Sparkles,
  Globe2,
  ArrowDown,
  MessageCircle,
  Image as ImageIcon,
  ChevronRight,
  Menu,
  X,
  Plus,
  Minus,
  Trash2,
  Send,
  Inbox,
  MailCheck,
  UserPlus,
  LogIn,
  ShieldCheck,
  Phone,
  Mail,
  User,
} from "lucide-react";

const rugs = [
  {
    id: 1,
    titleFa: "فرش ایرانی کلاسیک",
    titleEn: "Classic Persian Rug",
    subtitleFa: "نقش اصیل، رنگ آرام، مناسب خانه‌های شیک و مدرن",
    subtitleEn: "Traditional motif, soft palette, perfect for elegant interiors",
    price: 420,
    image:
      "https://images.unsplash.com/photo-1600166898405-da9535204843?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 2,
    titleFa: "فرش چهره سفارشی",
    titleEn: "Custom Portrait Rug",
    subtitleFa: "تبدیل عکس عزیزان شما به یک فرش هنری و ماندگار",
    subtitleEn: "Turn a beloved portrait into a timeless woven artwork",
    price: 650,
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 3,
    titleFa: "تابلو فرش دیواری",
    titleEn: "Wall Carpet Art",
    subtitleFa: "برای دیوار، گالری، هدیه خاص و دکوراسیون سطح بالا",
    subtitleEn: "Made for walls, galleries, gifts, and luxury interiors",
    price: 280,
    image:
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1600&auto=format&fit=crop",
  },
];

const demoInbox = [
  {
    id: 1,
    from: "Marjan Carpet",
    subjectFa: "خوش آمدید به مرجان کارپت",
    subjectEn: "Welcome to Marjan Carpet",
    bodyFa: "حساب شما آماده است. هر زمان سوالی داشتید از همین بخش پیام بدهید.",
    bodyEn: "Your account is ready. You can message us here anytime.",
    time: "Today",
    unread: true,
  },
  {
    id: 2,
    from: "Support",
    subjectFa: "راهنمای سفارش فرش چهره",
    subjectEn: "Portrait rug order guide",
    bodyFa: "برای فرش چهره، عکس واضح، سایز دلخواه و رنگ زمینه را ارسال کنید.",
    bodyEn: "For portrait rugs, send a clear photo, desired size, and background tone.",
    time: "12:30",
    unread: false,
  },
];

function App() {
  const [lang, setLang] = useState("fa");
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");
  const [sentMessages, setSentMessages] = useState([
    {
      id: 1,
      to: "Marjan Carpet",
      subjectFa: "سوال درباره قیمت",
      subjectEn: "Question about pricing",
      bodyFa: "سلام، قیمت فرش چهره با سایز ۷۰ در ۱۰۰ چقدر می‌شود؟",
      bodyEn: "Hi, how much is a 70x100 portrait rug?",
      time: "Yesterday",
    },
  ]);
  const [messageTab, setMessageTab] = useState("inbox");
  const [selectedMessage, setSelectedMessage] = useState(demoInbox[0]);

  const [authMode, setAuthMode] = useState("login");
  const [authStep, setAuthStep] = useState("email");
  const [account, setAccount] = useState(null);
  const [authForm, setAuthForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "Iran +98",
  });
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef([]);

  const isFa = lang === "fa";

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, -160]);
  const heroScale = useTransform(scrollYProgress, [0, 0.35], [1, 0.9]);
  const frameRotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  const demoCode = "246810";

  const addToCart = (rug) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === rug.id);
      if (exists) {
        return prev.map((item) =>
          item.id === rug.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...rug, qty: 1 }];
    });
    setCartOpen(true);
  };

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item))
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      to: "Marjan Carpet",
      subjectFa: "پیام جدید مشتری",
      subjectEn: "New customer message",
      bodyFa: message,
      bodyEn: message,
      time: "Now",
    };

    setSentMessages((prev) => [newMessage, ...prev]);
    setSelectedMessage(newMessage);
    setMessage("");
    setMessageTab("sent");
  };

  const sendDemoCode = () => {
    if (!authForm.email.trim()) {
      alert(isFa ? "اول ایمیل را وارد کن." : "Please enter your email first.");
      return;
    }

    setAuthStep("code");
    setOtp(["", "", "", "", "", ""]);

    setTimeout(() => {
      otpRefs.current[0]?.focus();
    }, 100);
  };

  const handleOtpChange = (value, index) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const nextOtp = [...otp];
    nextOtp[index] = digit;
    setOtp(nextOtp);

    if (digit && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }

    const completed = nextOtp.join("");
    if (completed.length === 6 && index === 5) {
      finishLogin(completed);
    }
  };

  const handleOtpKeyDown = (event, index) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const finishLogin = (code = otp.join("")) => {
    if (code.length !== 6) return;

    setAccount({
      name: authForm.name || (isFa ? "مشتری مرجان" : "Marjan Customer"),
      email: authForm.email,
      phone: authForm.phone,
      country: authForm.country,
    });

    setAuthOpen(false);
    setAuthStep("email");
    setOtp(["", "", "", "", "", ""]);

    alert(
      isFa
        ? `ورود انجام شد. کد دمو: ${demoCode}`
        : `Logged in. Demo code: ${demoCode}`
    );
  };

  return (
    <main
      dir={isFa ? "rtl" : "ltr"}
      className="min-h-screen overflow-x-hidden bg-[#F7F1E6] text-[#12382F]"
    >
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-[#12382F]/10 bg-[#F7F1E6]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="#" className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-[#0F4D3F] text-white shadow-lg">
              <Sparkles size={18} />
            </div>
            <div>
              <p className="font-serif text-xl font-bold leading-none">
                {isFa ? "مرجان کارپت" : "Marjan Carpet"}
              </p>
              <p className="text-xs text-[#12382F]/70">
                {isFa
                  ? "فرش ایرانی، تابلو فرش و فرش چهره"
                  : "Persian Rugs, Wall Art & Portrait Rugs"}
              </p>
            </div>
          </a>

          <div className="hidden items-center gap-6 md:flex">
            <a href="#collections" className="text-sm hover:text-[#0F4D3F]">
              {isFa ? "کالکشن‌ها" : "Collections"}
            </a>
            <button
              onClick={() => setMessageOpen(true)}
              className="text-sm hover:text-[#0F4D3F]"
            >
              {isFa ? "مرکز پیام" : "Message Center"}
            </button>
            <a href="#order" className="text-sm hover:text-[#0F4D3F]">
              {isFa ? "سفارش" : "Order"}
            </a>

            <button
              onClick={() => setLang(isFa ? "en" : "fa")}
              className="flex items-center gap-2 rounded-full border border-[#12382F]/20 px-4 py-2 text-sm hover:bg-white/60"
            >
              <Globe2 size={16} />
              {isFa ? "English" : "فارسی"}
            </button>

            <button
              onClick={() => setAuthOpen(true)}
              className="flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm shadow-sm"
            >
              {account ? <User size={16} /> : <LogIn size={16} />}
              {account ? account.name : isFa ? "ورود" : "Login"}
            </button>

            <button
              onClick={() => setMessageOpen(true)}
              className="relative grid h-11 w-11 place-items-center rounded-full bg-white/70 shadow-sm"
            >
              <MessageCircle size={19} />
              <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-[#0F4D3F] text-[10px] font-bold text-white">
                {demoInbox.filter((m) => m.unread).length}
              </span>
            </button>

            <button
              onClick={() => setCartOpen(true)}
              className="group relative flex h-12 items-center gap-2 rounded-full bg-[#0F4D3F] px-4 text-white shadow-xl shadow-[#0F4D3F]/20 transition hover:-translate-y-0.5 hover:bg-[#0B3F34]"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white/15 transition group-hover:bg-white/25">
                <ShoppingBag size={18} />
              </span>
              <span className="text-sm font-bold">
                {isFa ? "سبد" : "Cart"}
              </span>
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full border-2 border-[#F7F1E6] bg-white text-xs font-black text-[#0F4D3F]">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-[#12382F]/10 bg-[#F7F1E6] px-5 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              <a href="#collections" onClick={() => setMenuOpen(false)}>
                {isFa ? "کالکشن‌ها" : "Collections"}
              </a>
              <button onClick={() => setMessageOpen(true)} className="text-right">
                {isFa ? "مرکز پیام" : "Message Center"}
              </button>
              <button onClick={() => setAuthOpen(true)} className="text-right">
                {account ? account.name : isFa ? "ورود / ساخت حساب" : "Login / Sign up"}
              </button>
              <button
                onClick={() => setCartOpen(true)}
                className="w-fit rounded-full bg-[#0F4D3F] px-4 py-2 text-white"
              >
                {isFa ? `سبد خرید (${totalItems})` : `Cart (${totalItems})`}
              </button>
            </div>
          </div>
        )}
      </nav>

      <section className="relative flex min-h-screen items-center overflow-hidden px-5 pt-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(15,77,63,0.20),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.8),transparent_35%)]" />

        <motion.div
          style={{ y: heroY, scale: heroScale }}
          className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.9fr]"
        >
          <div>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#0F4D3F]/20 bg-white/55 px-4 py-2 text-sm text-[#0F4D3F] shadow-sm backdrop-blur"
            >
              <Sparkles size={16} />
              {isFa
                ? "فرش ایرانی، تابلو فرش و فرش چهره سفارشی"
                : "Persian rugs, wall art, and custom portrait carpets"}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="max-w-4xl font-serif text-5xl font-bold leading-tight text-[#12382F] md:text-7xl"
            >
              {isFa
                ? "مرجان کارپت؛ قاب زنده‌ای از هنر ایرانی"
                : "Marjan Carpet; a living frame of Iranian art"}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-7 max-w-2xl text-lg leading-9 text-[#12382F]/75"
            >
              {isFa
                ? "سایت سینماتیک با سبد خرید، حساب کاربری، ورود با ایمیل و مرکز پیام شامل پیام‌های دریافتی و ارسالی."
                : "A cinematic website with cart, account login, email code verification, and a message center with inbox and sent messages."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-9 flex flex-wrap gap-4"
            >
              <a
                href="#collections"
                className="inline-flex items-center gap-3 rounded-full bg-[#0F4D3F] px-7 py-4 font-semibold text-white shadow-xl shadow-[#0F4D3F]/20 transition hover:-translate-y-1"
              >
                {isFa ? "دیدن کالکشن‌ها" : "View Collections"}
                <ChevronRight size={18} />
              </a>

              <button
                onClick={() => setAuthOpen(true)}
                className="inline-flex items-center gap-3 rounded-full border border-[#12382F]/20 bg-white/55 px-7 py-4 font-semibold text-[#12382F] backdrop-blur transition hover:-translate-y-1 hover:bg-white"
              >
                <ShieldCheck size={18} />
                {isFa ? "ورود / ساخت حساب" : "Login / Sign up"}
              </button>
            </motion.div>
          </div>

          <motion.div style={{ rotate: frameRotate }} className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-[#0F4D3F]/25 via-white/80 to-[#C9DCCB]/70 blur-3xl" />
            <div className="relative rounded-[2.5rem] border border-[#12382F]/10 bg-white/40 p-5 shadow-2xl backdrop-blur-xl">
              <div className="rounded-[2rem] border-[14px] border-white bg-white p-4 shadow-inner">
                <img
                  src={rugs[0].image}
                  alt="Marjan Carpet"
                  className="h-[560px] w-full rounded-[1.25rem] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 left-8 right-8 rounded-3xl border border-white/70 bg-[#F7F1E6]/90 p-5 shadow-xl backdrop-blur">
                <p className="font-serif text-2xl font-bold text-[#12382F]">
                  {isFa ? "سفید، کرم، سبز یشمی" : "White, cream, jade green"}
                </p>
                <p className="mt-2 text-sm text-[#12382F]/70">
                  {isFa
                    ? "با فضای لوکس، آرام و مینیمال برای فروش فرش."
                    : "A calm, minimal, luxury mood for selling rugs."}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <a
          href="#collections"
          className="absolute bottom-8 left-1/2 grid h-12 w-12 -translate-x-1/2 place-items-center rounded-full border border-[#12382F]/20 bg-white/60 text-[#12382F] backdrop-blur"
        >
          <ArrowDown size={20} />
        </a>
      </section>

      <section id="collections" className="px-5 py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-3xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-[#0F4D3F]">
              {isFa ? "کالکشن‌های ویژه" : "Featured Collections"}
            </p>
            <h2 className="font-serif text-4xl font-bold text-[#12382F] md:text-6xl">
              {isFa
                ? "انتخاب کن، به سبد خرید اضافه کن، سفارش بده"
                : "Choose, add to cart, and order"}
            </h2>
          </div>

          <div className="space-y-28">
            {rugs.map((rug, index) => (
              <motion.article
                key={rug.id}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className={`grid items-center gap-10 lg:grid-cols-2 ${
                  index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative">
                  <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-[#0F4D3F]/20 via-white/80 to-[#C9DCCB]/70 blur-2xl" />
                  <div className="relative rounded-[2.5rem] bg-white p-5 shadow-2xl">
                    <div className="rounded-[2rem] border-[12px] border-[#F7F1E6] bg-white p-3">
                      <img
                        src={rug.image}
                        alt={rug.titleEn}
                        className="h-[520px] w-full rounded-[1.3rem] object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-[2.5rem] border border-[#12382F]/10 bg-white/55 p-8 shadow-xl backdrop-blur md:p-12">
                  <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-[#0F4D3F]">
                    0{index + 1}
                  </p>
                  <h3 className="font-serif text-4xl font-bold text-[#12382F] md:text-5xl">
                    {isFa ? rug.titleFa : rug.titleEn}
                  </h3>
                  <p className="mt-6 text-lg leading-9 text-[#12382F]/75">
                    {isFa ? rug.subtitleFa : rug.subtitleEn}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <span className="rounded-full bg-[#DDE8D1] px-5 py-3 font-semibold text-[#12382F]">
                      €{rug.price}
                    </span>

                    <button
                      onClick={() => addToCart(rug)}
                      className="inline-flex items-center gap-2 rounded-full bg-[#0F4D3F] px-6 py-3 font-semibold text-white transition hover:-translate-y-1"
                    >
                      <ShoppingBag size={17} />
                      {isFa ? "افزودن به سبد" : "Add to cart"}
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="order" className="px-5 py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1fr]">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-[#0F4D3F]">
              {isFa ? "خرید و سفارش" : "Shop & Order"}
            </p>
            <h2 className="font-serif text-4xl font-bold text-[#12382F] md:text-6xl">
              {isFa ? "شروع سفارش مرجان کارپت" : "Start your Marjan Carpet order"}
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-9 text-[#12382F]/75">
              {isFa
                ? "بعد از ورود با ایمیل، مشتری می‌تواند از سبد خرید ادامه سفارش بدهد و پیام‌هایش را در مرکز پیام ببیند."
                : "After email login, customers can continue from cart and track messages in the message center."}
            </p>

            <div className="mt-10 rounded-[2rem] bg-[#DDE8D1] p-7 text-[#12382F]">
              <p className="font-serif text-3xl font-bold">
                {isFa ? "مجموع سبد خرید" : "Cart Total"}
              </p>
              <p className="mt-3 text-2xl font-bold">€{totalPrice}</p>
              <button
                onClick={() => setCartOpen(true)}
                className="mt-5 rounded-full bg-[#0F4D3F] px-6 py-3 font-semibold text-white"
              >
                {isFa ? "دیدن سبد خرید" : "View Cart"}
              </button>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!account) {
                setAuthOpen(true);
                return;
              }
              alert(isFa ? "سفارش نمایشی ثبت شد." : "Demo order submitted.");
            }}
            className="rounded-[2.5rem] border border-[#12382F]/10 bg-white/60 p-7 shadow-2xl backdrop-blur md:p-10"
          >
            {!account && (
              <div className="mb-6 rounded-3xl border border-[#0F4D3F]/15 bg-[#DDE8D1] p-5">
                <p className="font-bold">
                  {isFa ? "برای ثبت سفارش وارد حساب شوید." : "Please login to place an order."}
                </p>
                <button
                  type="button"
                  onClick={() => setAuthOpen(true)}
                  className="mt-4 rounded-full bg-[#0F4D3F] px-5 py-3 text-sm font-bold text-white"
                >
                  {isFa ? "ورود / ساخت حساب" : "Login / Sign up"}
                </button>
              </div>
            )}

            <div className="grid gap-5 md:grid-cols-2">
              <label>
                <span className="mb-2 block text-sm font-semibold">{isFa ? "نام" : "Name"}</span>
                <input className="w-full rounded-2xl border border-[#12382F]/15 bg-[#F7F1E6] px-4 py-4 outline-none focus:border-[#0F4D3F]" />
              </label>

              <label>
                <span className="mb-2 block text-sm font-semibold">{isFa ? "شماره تماس" : "Phone"}</span>
                <input className="w-full rounded-2xl border border-[#12382F]/15 bg-[#F7F1E6] px-4 py-4 outline-none focus:border-[#0F4D3F]" />
              </label>

              <label className="md:col-span-2">
                <span className="mb-2 block text-sm font-semibold">{isFa ? "نوع سفارش" : "Order type"}</span>
                <select className="w-full rounded-2xl border border-[#12382F]/15 bg-[#F7F1E6] px-4 py-4 outline-none focus:border-[#0F4D3F]">
                  <option>{isFa ? "فرش ایرانی" : "Persian rug"}</option>
                  <option>{isFa ? "فرش چهره" : "Portrait rug"}</option>
                  <option>{isFa ? "تابلو فرش دیواری" : "Wall carpet"}</option>
                </select>
              </label>

              <label className="md:col-span-2">
                <span className="mb-2 block text-sm font-semibold">{isFa ? "توضیحات" : "Notes"}</span>
                <textarea
                  rows="5"
                  className="w-full resize-none rounded-2xl border border-[#12382F]/15 bg-[#F7F1E6] px-4 py-4 outline-none focus:border-[#0F4D3F]"
                />
              </label>
            </div>

            <button className="mt-7 flex w-full items-center justify-center gap-3 rounded-full bg-[#0F4D3F] px-7 py-5 text-lg font-bold text-white shadow-xl shadow-[#0F4D3F]/20 transition hover:-translate-y-1">
              <MessageCircle size={21} />
              {isFa ? "شروع سفارش" : "Start Order"}
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-[#12382F]/10 px-5 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center md:flex-row">
          <p className="text-sm text-[#12382F]/65">
            {isFa
              ? "© مرجان کارپت — فرش ایرانی، تابلو فرش و فرش چهره سفارشی"
              : "© Marjan Carpet — Persian rugs, wall art, and custom portrait carpets"}
          </p>
          <div className="flex gap-4 text-sm text-[#12382F]/65">
            <button onClick={() => setMessageOpen(true)} className="hover:text-[#0F4D3F]">
              {isFa ? "مرکز پیام" : "Message Center"}
            </button>
            <button onClick={() => setCartOpen(true)} className="hover:text-[#0F4D3F]">
              {isFa ? "سبد خرید" : "Cart"}
            </button>
          </div>
        </div>
      </footer>

      {authOpen && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-black/35 p-5 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-[2.5rem] bg-[#F7F1E6] p-6 shadow-2xl md:p-7">
            <div className="mb-4 flex shrink-0 items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="break-words font-serif text-2xl font-bold text-[#12382F] sm:text-3xl">
                  {authMode === "login"
                    ? isFa
                      ? "ورود به حساب"
                      : "Login"
                    : isFa
                    ? "ساخت حساب"
                    : "Create account"}
                </h3>
                <p className="mt-2 text-sm text-[#12382F]/65">
                  {authStep === "email"
                    ? isFa
                      ? "با ایمیل شروع کن. موبایل ایران/خارج بعداً به همین فرم وصل می‌شود."
                      : "Start with email. Iran/international mobile login can be connected later."
                    : isFa
                    ? `کد دمو: ${demoCode}`
                    : `Demo code: ${demoCode}`}
                </p>
              </div>

              <button
                onClick={() => setAuthOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full bg-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-5 grid grid-cols-2 gap-2 rounded-[1.75rem] bg-white/70 p-2">
              <button
                onClick={() => {
                  setAuthMode("login");
                  setAuthStep("email");
                }}
                className={`flex h-16 items-center justify-center gap-2 rounded-[1.35rem] px-4 text-sm font-bold transition ${
                  authMode === "login"
                    ? "bg-[#0F4D3F] text-white shadow-lg shadow-[#0F4D3F]/20"
                    : "bg-white text-[#12382F]"
                }`}
              >
                <LogIn size={18} />
                {isFa ? "ورود" : "Login"}
              </button>
              <button
                onClick={() => {
                  setAuthMode("signup");
                  setAuthStep("email");
                }}
                className={`flex h-16 items-center justify-center gap-2 rounded-[1.35rem] px-4 text-sm font-bold transition ${
                  authMode === "signup"
                    ? "bg-[#0F4D3F] text-white shadow-lg shadow-[#0F4D3F]/20"
                    : "bg-white text-[#12382F]"
                }`}
              >
                <UserPlus size={18} />
                {isFa ? "ساخت حساب" : "Sign up"}
              </button>
            </div>

            {authStep === "email" ? (
              <div className="min-h-[430px] space-y-4">
                {authMode === "signup" && (
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold">
                      {isFa ? "نام کامل" : "Full name"}
                    </span>
                    <div className="flex h-14 items-center gap-3 rounded-2xl border border-[#12382F]/15 bg-white px-4">
                      <User size={18} />
                      <input
                        value={authForm.name}
                        onChange={(e) =>
                          setAuthForm((prev) => ({ ...prev, name: e.target.value }))
                        }
                        className="w-full bg-transparent outline-none"
                        placeholder={isFa ? "نام و نام خانوادگی" : "First and last name"}
                      />
                    </div>
                  </label>
                )}

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold">
                    {isFa ? "ایمیل" : "Email"}
                  </span>
                  <div className="flex h-14 items-center gap-3 rounded-2xl border border-[#12382F]/15 bg-white px-4">
                    <Mail size={18} />
                    <input
                      value={authForm.email}
                      onChange={(e) =>
                        setAuthForm((prev) => ({ ...prev, email: e.target.value }))
                      }
                      className="w-full bg-transparent outline-none"
                      placeholder="name@example.com"
                    />
                  </div>
                </label>

                <div className="grid gap-4 md:grid-cols-[0.8fr_1.2fr]">
                  <label>
                    <span className="mb-2 block text-sm font-semibold">
                      {isFa ? "کشور" : "Country"}
                    </span>
                    <select
                      value={authForm.country}
                      onChange={(e) =>
                        setAuthForm((prev) => ({ ...prev, country: e.target.value }))
                      }
                      className="h-14 w-full rounded-2xl border border-[#12382F]/15 bg-white px-4 outline-none"
                    >
                      <option>Iran +98</option>
                      <option>Germany +49</option>
                      <option>UAE +971</option>
                      <option>USA +1</option>
                      <option>UK +44</option>
                      <option>Other</option>
                    </select>
                  </label>

                  <label>
                    <span className="mb-2 block text-sm font-semibold">
                      {isFa ? "موبایل، اختیاری" : "Mobile, optional"}
                    </span>
                    <div className="flex h-14 items-center gap-3 rounded-2xl border border-[#12382F]/15 bg-white px-4">
                      <Phone size={18} />
                      <input
                        value={authForm.phone}
                        onChange={(e) =>
                          setAuthForm((prev) => ({ ...prev, phone: e.target.value }))
                        }
                        className="w-full bg-transparent outline-none"
                        placeholder={isFa ? "بعداً OTP موبایل" : "Later mobile OTP"}
                      />
                    </div>
                  </label>
                </div>

                <button
                  onClick={sendDemoCode}
                  className="flex w-full items-center justify-center gap-3 rounded-full bg-[#0F4D3F] px-7 py-4 font-bold text-white"
                >
                  <MailCheck size={19} />
                  {isFa ? "ارسال کد به ایمیل" : "Send code to email"}
                </button>
              </div>
            ) : (
              <div className="min-h-[430px]">
                <div className="rounded-3xl bg-white/70 p-5">
                  <p className="font-bold">
                    {isFa
                      ? "کد ۶ رقمی ارسال‌شده به ایمیل را وارد کن"
                      : "Enter the 6-digit code sent to your email"}
                  </p>
                  <p className="mt-2 text-sm text-[#12382F]/65">
                    {isFa
                      ? "در دمو، از کد 246810 استفاده کن. وقتی آخرین عدد را بزنی، ورود خودکار انجام می‌شود."
                      : "In demo, use 246810. After the last digit, login happens automatically."}
                  </p>
                </div>

                <div dir="ltr" className="mt-6 grid grid-cols-6 gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (otpRefs.current[index] = el)}
                      value={digit}
                      onChange={(e) => handleOtpChange(e.target.value, index)}
                      onKeyDown={(e) => handleOtpKeyDown(e, index)}
                      inputMode="numeric"
                      maxLength={1}
                      className="h-14 rounded-2xl border border-[#12382F]/15 bg-white text-center text-2xl font-bold outline-none focus:border-[#0F4D3F] md:h-16"
                    />
                  ))}
                </div>

                <button
                  onClick={() => finishLogin()}
                  className="mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-[#0F4D3F] px-7 py-4 font-bold text-white"
                >
                  <ShieldCheck size={19} />
                  {isFa ? "تایید و ورود" : "Verify and login"}
                </button>

                <button
                  onClick={() => setAuthStep("email")}
                  className="mt-3 w-full rounded-full bg-white px-7 py-4 font-bold text-[#12382F]"
                >
                  {isFa ? "تغییر ایمیل" : "Change email"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {messageOpen && (
        <div className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto bg-black/35 p-2 backdrop-blur-sm sm:p-4 md:p-5">
          <div className="my-2 flex max-h-[calc(100dvh-1rem)] w-full max-w-4xl flex-col overflow-hidden rounded-[1.5rem] bg-[#F7F1E6] p-3 shadow-2xl sm:my-4 sm:max-h-[calc(100dvh-2rem)] sm:rounded-[2rem] sm:p-4 md:rounded-[2.5rem] md:p-6">
            <div className="mb-4 flex shrink-0 items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="break-words font-serif text-2xl font-bold text-[#12382F] sm:text-3xl">
                  {isFa ? "مرکز پیام" : "Message Center"}
                </h3>
                <p className="mt-1 text-sm text-[#12382F]/65">
                  {isFa ? "پیام‌های دریافتی و ارسالی" : "Inbox and sent messages"}
                </p>
              </div>
              <button
                onClick={() => setMessageOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full bg-white"
              >
                <X size={20} />
              </button>
            </div>

            {!account && (
              <div className="mb-4 shrink-0 rounded-3xl border border-[#0F4D3F]/15 bg-[#DDE8D1] p-4 sm:p-5">
                <p className="font-bold">
                  {isFa
                    ? "برای استفاده کامل از مرکز پیام، وارد حساب شوید."
                    : "Login to fully use the message center."}
                </p>
                <button
                  onClick={() => setAuthOpen(true)}
                  className="mt-4 rounded-full bg-[#0F4D3F] px-5 py-3 text-sm font-bold text-white"
                >
                  {isFa ? "ورود / ساخت حساب" : "Login / Sign up"}
                </button>
              </div>
            )}

            <div className="grid min-h-0 flex-1 gap-4 overflow-y-auto overscroll-contain pr-1 lg:grid-cols-[0.8fr_1.2fr] lg:gap-5">
              <div className="min-w-0 rounded-[1.5rem] bg-white/65 p-3 sm:rounded-[2rem] sm:p-4">
                <div className="mb-4 grid grid-cols-2 rounded-full bg-[#F7F1E6] p-1">
                  <button
                    onClick={() => {
                      setMessageTab("inbox");
                      setSelectedMessage(demoInbox[0]);
                    }}
                    className={`rounded-full px-4 py-3 text-sm font-bold ${
                      messageTab === "inbox"
                        ? "bg-[#0F4D3F] text-white"
                        : "text-[#12382F]"
                    }`}
                  >
                    <Inbox className="mx-auto mb-1" size={16} />
                    {isFa ? "دریافتی" : "Inbox"}
                  </button>
                  <button
                    onClick={() => {
                      setMessageTab("sent");
                      setSelectedMessage(sentMessages[0]);
                    }}
                    className={`rounded-full px-4 py-3 text-sm font-bold ${
                      messageTab === "sent"
                        ? "bg-[#0F4D3F] text-white"
                        : "text-[#12382F]"
                    }`}
                  >
                    <Send className="mx-auto mb-1" size={16} />
                    {isFa ? "ارسالی" : "Sent"}
                  </button>
                </div>

                <div className="max-h-[34dvh] space-y-3 overflow-y-auto overscroll-contain pr-1 md:max-h-[360px]">
                  {(messageTab === "inbox" ? demoInbox : sentMessages).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedMessage(item)}
                      className={`w-full min-w-0 rounded-3xl border p-3 text-start shadow-sm transition hover:-translate-y-0.5 sm:p-4 ${
                        selectedMessage?.id === item.id
                          ? "border-[#0F4D3F] bg-[#DDE8D1]"
                          : "border-[#12382F]/10 bg-white"
                      }`}
                    >
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <p className="font-bold">
                          {messageTab === "inbox" ? item.from : item.to}
                        </p>
                        <span className="text-xs text-[#12382F]/55">{item.time}</span>
                      </div>
                      <p className="break-words font-semibold text-[#0F4D3F]">
                        {isFa ? item.subjectFa : item.subjectEn}
                      </p>
                      <p className="mt-2 line-clamp-2 break-words text-sm leading-6 text-[#12382F]/70">
                        {isFa ? item.bodyFa : item.bodyEn}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="min-w-0 rounded-[1.5rem] bg-[#0F4D3F] p-3 text-white sm:rounded-[2rem] sm:p-5">
                {selectedMessage && (
                  <div className="mb-4 max-h-[28dvh] overflow-y-auto overscroll-contain rounded-[1.25rem] bg-white/10 p-4 sm:mb-5 sm:rounded-[1.5rem] sm:p-5 md:max-h-[320px]">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <p className="text-sm font-bold text-white/70">
                        {messageTab === "inbox"
                          ? isFa
                            ? "پیام دریافتی"
                            : "Inbox message"
                          : isFa
                          ? "پیام ارسالی"
                          : "Sent message"}
                      </p>
                      <span className="rounded-full bg-white/15 px-3 py-1 text-xs">
                        {selectedMessage.time}
                      </span>
                    </div>

                    <h4 className="break-words font-serif text-xl font-bold sm:text-2xl">
                      {isFa ? selectedMessage.subjectFa : selectedMessage.subjectEn}
                    </h4>

                    <p className="mt-3 text-sm text-white/70">
                      {messageTab === "inbox"
                        ? `${isFa ? "از طرف" : "From"}: ${selectedMessage.from}`
                        : `${isFa ? "به" : "To"}: ${selectedMessage.to}`}
                    </p>

                    <p className="mt-5 break-words leading-8 text-white/90">
                      {isFa ? selectedMessage.bodyFa : selectedMessage.bodyEn}
                    </p>
                  </div>
                )}

                <h4 className="font-serif text-2xl font-bold sm:text-3xl">
                  {isFa ? "ارسال پیام جدید" : "Send new message"}
                </h4>
                <p className="mt-2 text-sm text-white/70">
                  {isFa
                    ? "پیام ارسال‌شده داخل پوشه ارسالی ذخیره می‌شود."
                    : "Sent messages are saved in the sent folder."}
                </p>

                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows="4"
                  className="mt-4 w-full resize-none rounded-[1.25rem] border border-white/20 bg-white/95 p-4 text-[#12382F] outline-none sm:mt-5 sm:rounded-[1.5rem] sm:p-5"
                  placeholder={isFa ? "پیام خود را بنویسید..." : "Write your message..."}
                />

                <button
                  onClick={handleSendMessage}
                  className="mt-4 flex w-full items-center justify-center gap-3 rounded-full bg-white px-6 py-3.5 font-bold text-[#0F4D3F] transition hover:-translate-y-1 sm:mt-5 sm:px-7 sm:py-4"
                >
                  <Send size={18} />
                  {isFa ? "ارسال پیام" : "Send Message"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {cartOpen && (
        <div className="fixed inset-0 z-[80] bg-black/35 backdrop-blur-sm">
          <div className="absolute bottom-0 right-0 top-0 w-full max-w-md overflow-y-auto bg-[#F7F1E6] p-6 shadow-2xl">
            <div className="mb-7 flex items-center justify-between">
              <h3 className="font-serif text-3xl font-bold text-[#12382F]">
                {isFa ? "سبد خرید" : "Shopping Cart"}
              </h3>
              <button
                onClick={() => setCartOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full bg-white"
              >
                <X size={20} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="rounded-3xl bg-white/70 p-7 text-center">
                <ShoppingBag className="mx-auto mb-4 text-[#0F4D3F]" size={42} />
                <p className="font-semibold">
                  {isFa ? "سبد خرید خالی است." : "Your cart is empty."}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="rounded-3xl bg-white/75 p-4 shadow-sm">
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.titleEn}
                        className="h-24 w-24 rounded-2xl object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-bold">
                          {isFa ? item.titleFa : item.titleEn}
                        </p>
                        <p className="mt-1 text-sm text-[#12382F]/65">
                          €{item.price}
                        </p>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => decreaseQty(item.id)}
                              className="grid h-8 w-8 place-items-center rounded-full bg-[#DDE8D1]"
                            >
                              <Minus size={15} />
                            </button>
                            <span className="min-w-6 text-center font-bold">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => increaseQty(item.id)}
                              className="grid h-8 w-8 place-items-center rounded-full bg-[#DDE8D1]"
                            >
                              <Plus size={15} />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="grid h-8 w-8 place-items-center rounded-full bg-red-50 text-red-700"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="mt-6 rounded-3xl bg-[#0F4D3F] p-6 text-white">
                  <div className="flex justify-between text-lg font-bold">
                    <span>{isFa ? "جمع کل" : "Total"}</span>
                    <span>€{totalPrice}</span>
                  </div>

                  <a
                    href="#order"
                    onClick={() => setCartOpen(false)}
                    className="mt-5 flex w-full items-center justify-center gap-3 rounded-full bg-white px-6 py-4 font-bold text-[#0F4D3F]"
                  >
                    <ShoppingBag size={18} />
                    {isFa ? "ادامه سفارش" : "Continue Order"}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
