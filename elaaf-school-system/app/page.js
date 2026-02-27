"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const targetDate = new Date("2026-03-26T00:00:00").getTime();

    function updateCountdown() {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setTimeLeft(null);
        return;
      }

      setTimeLeft({
        days: String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, "0"),
        hours: String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, "0"),
        minutes: String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0"),
        seconds: String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, "0"),
      });
    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: "Open Sans", sans-serif; }
        body { min-height: 100vh; background: linear-gradient(135deg, #0f2027, #203a43, #2c5364); display: flex; align-items: center; justify-content: center; color: #fff; text-align: center; }
        .container { max-width: 700px; width: 100%; padding: 20px; display: flex; flex-direction: column; align-items: center; }
        .logo { height: 140px; width: 140px; border-radius: 50%; background: #fff; display: flex; justify-content: center; align-items: center; margin-bottom: 25px; overflow: hidden; }
        .logo img { width: 80%; }
        h1 { font-size: clamp(32px, 5vw, 48px); margin-bottom: 10px; }
        p { font-size: clamp(15px, 3vw, 18px); margin-bottom: 20px; opacity: 0.9; }
        .countdown { display: grid; grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)); gap: 15px; width: 100%; max-width: 420px; margin-bottom: 30px; }
        .countdown div { background: rgba(255,255,255,0.15); padding: 14px 10px; border-radius: 5px; }
        .countdown span { font-size: clamp(22px, 5vw, 28px); font-weight: 700; display: block; }
        .email-box { display: flex; width: 100%; max-width: 420px; margin-bottom: 30px; }
        .email-box input { flex: 1; padding: 12px; border: none; outline: none; border-radius: 4px 0 0 4px; }
        .email-box button { padding: 12px 18px; border: none; background: #C2151D; color: #fff; cursor: pointer; border-radius: 0 4px 4px 0; }
        .email-box button:hover { background: #a31218; }
        footer { margin-top: 20px; font-size: 14px; opacity: 0.7; }
        .seo-section { max-width: 600px; margin-top: 30px; opacity: 0.9; }
        .seo-section h2 { font-size: 22px; margin-bottom: 10px; }
        .seo-section p { font-size: 15px; margin-bottom: 10px; }
      `}</style>

      <div className="container">
        <div className="logo">
          <img src="/logo-elaaf.png" alt="Elaaf School System Karachi Logo" />
        </div>

        <h1>Coming Soon</h1>
        <p>Elaaf School System is launching soon in Karachi. Stay tuned for admissions.</p>

        {timeLeft ? (
          <div className="countdown">
            <div><span>{timeLeft.days}</span>Days</div>
            <div><span>{timeLeft.hours}</span>Hours</div>
            <div><span>{timeLeft.minutes}</span>Minutes</div>
            <div><span>{timeLeft.seconds}</span>Seconds</div>
          </div>
        ) : (
          <p>We are Live 🚀</p>
        )}

        <div className="email-box">
          <input type="email" placeholder="Enter your email" />
          <button>Notify Me</button>
        </div>

        <section className="seo-section">
          <h2>Elaaf School System – A Trusted School in Karachi</h2>
          <p>
            Elaaf School System is a dedicated educational institution in Karachi,
            focused on providing quality education in a safe and supportive learning
            environment. Our mission is to build strong academic foundations while
            nurturing discipline, confidence, and character in students.
          </p>
          <p>
            We offer admissions for early years, primary, and secondary classes with
            qualified teaching staff, a structured curriculum, and modern teaching
            methodologies. Elaaf School System is committed to academic excellence
            and holistic student development.
          </p>
        </section>

        <footer>© 2026 Elaaf School System</footer>
      </div>
    </>
  );
}