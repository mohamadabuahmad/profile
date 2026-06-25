import React, { useState } from "react";
import emailjs from "emailjs-com";
import { motion } from "framer-motion";
import {
  FaBrain,
  FaCogs,
  FaCode,
  FaChartLine,
  FaComments,
  FaCheckCircle,
  FaInstagram,
} from "react-icons/fa";
import "./Services.css";

const services = [
  {
    icon: <FaBrain />,
    title: "حلول ذكاء اصطناعي مخصصة",
    desc: "نطوّر حلول ذكاء اصطناعي تناسب احتياجات عملك وتحقق نتائج حقيقية وملموسة.",
  },
  {
    icon: <FaCogs />,
    title: "أتمتة العمليات",
    desc: "نقوم بأتمتة المهام المتكررة والعمليات اليومية لتوفير الوقت وتقليل الأخطاء.",
  },
  {
    icon: <FaCode />,
    title: "أنظمة وبرامج مخصصة",
    desc: "نصمم ونبني أنظمة وبرامج مخصصة تدعم نمو عملك وتحقق أهدافك.",
  },
  {
    icon: <FaChartLine />,
    title: "تحليل البيانات واتخاذ القرار",
    desc: "نحوّل بياناتك إلى رؤى واضحة تساعدك على اتخاذ قرارات أفضل وأسرع.",
  },
  {
    icon: <FaComments />,
    title: "استشارات تقنية",
    desc: "نقدّم استشارات تقنية لمساعدتك في اختيار أفضل الحلول وبناء استراتيجية ذكية.",
  },
];

const highlights = [
  "مشاركة المعرفة والنصائح حول الذكاء الاصطناعي",
  "عرض حلول وأدوات عملية لأعمال حقيقية",
  "محتوى تعليمي مبسّط يساعدك على مواكبة المستقبل",
  "أحدث أخبار وتقنيات الذكاء الاصطناعي والأتمتة",
];

const Services = () => {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          phone: form.phone,
          message: `طلب اتصال (خدمات M DEV)\nالهاتف: ${form.phone}\nملاحظات: ${form.message || "—"}`,
        },
        process.env.REACT_APP_EMAILJS_USER_ID
      )
      .then(() => {
        setSent(true);
        setSending(false);
        setForm({ name: "", phone: "", message: "" });
      })
      .catch(() => {
        setSending(false);
        alert("تعذّر إرسال الطلب، يرجى المحاولة مرة أخرى لاحقًا.");
      });
  };

  return (
    <div className="services-page" dir="rtl">
      <div className="services-bg-glow" />

      {/* Hero */}
      <motion.section
        className="services-hero"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="services-brand">
          <span className="brand-mark">M</span>
          <div className="brand-text">
            <span className="brand-name">M&nbsp;DEV</span>
            <span className="brand-tag">حلول الذكاء الاصطناعي للأعمال</span>
          </div>
        </div>

        <h1 className="services-title">
          مرحبًا بك في <span className="accent">M DEV</span>
        </h1>
        <p className="services-subtitle">حلول ذكية لأعمالك</p>
        <p className="services-intro">
          نحن نساعد الشركات وأصحاب الأعمال على الاستفادة من الذكاء الاصطناعي
          لبناء أنظمة ذكية، وأتمتة المهام، وتوفير الوقت، وتقليل التكاليف، وزيادة
          الإنتاجية.
        </p>
      </motion.section>

      {/* Services grid */}
      <section className="services-grid">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            className="service-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -6 }}
          >
            <div className="service-icon">{s.icon}</div>
            <h3 className="service-card-title">{s.title}</h3>
            <p className="service-card-desc">{s.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Highlights */}
      <motion.section
        className="services-highlights"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="highlights-title">في هذه الصفحة ستجد</h2>
        <ul className="highlights-list">
          {highlights.map((h) => (
            <li key={h}>
              <FaCheckCircle className="check-icon" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className="goal-box">
          <span className="goal-label">هدفنا بسيط</span>
          <p className="goal-text">
            نحو أعمال أكثر ذكاءً، وأتمتةً، ونموًا.
          </p>
        </div>
      </motion.section>

      {/* Callback form */}
      <motion.section
        className="services-contact"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <div className="contact-card">
          <h2 className="contact-title">هل تريد أن نتواصل معك؟</h2>
          <p className="contact-sub">
            اترك اسمك ورقم هاتفك وسنتصل بك في أقرب وقت ممكن.
          </p>

          {sent ? (
            <div className="contact-success">
              <FaCheckCircle />
              <span>تم استلام طلبك بنجاح! سنتصل بك قريبًا.</span>
            </div>
          ) : (
            <form className="callback-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="الاسم الكامل"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="رقم الهاتف"
                value={form.phone}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="كيف يمكننا مساعدتك؟ (اختياري)"
                value={form.message}
                onChange={handleChange}
                rows={3}
              />
              <button type="submit" className="callback-button" disabled={sending}>
                {sending ? "جارٍ الإرسال..." : "اطلب اتصال"}
              </button>
            </form>
          )}
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        className="services-cta"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="cta-text">
          تابِعنا لـ<span className="accent">تتعلّم</span>، وتستفيد، و
          <span className="accent">تطوّر</span> أعمالك معنا.
        </h2>
        <a
          href="https://instagram.com/mohamadaa.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-handle"
        >
          <FaInstagram />
          mohamadaa.dev
        </a>
      </motion.section>
    </div>
  );
};

export default Services;
