"use client";

import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  visible: boolean;
  onClose: () => void;
}

const Toast = ({ message, visible, onClose }: ToastProps) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: "fixed",
        bottom: "40px",
        right: "40px",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: "20px",
        backgroundColor: "#ffffff",
        border: "1px solid #000000",
        padding: "16px 24px",
        fontFamily: "'Switzer', sans-serif",
        fontSize: "14px",
        fontWeight: 400,
        lineHeight: "20px",
        color: "#000000",
        letterSpacing: "0.01em",
        // Slide up in, fade out
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 400ms cubic-bezier(0.4,0,0.2,1), transform 400ms cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        aria-label="Dismiss"
        style={{
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          color: "#000000",
          fontSize: "16px",
          lineHeight: 1,
          opacity: 0.4,
          fontFamily: "inherit",
          transition: "opacity 200ms",
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
        onMouseLeave={e => (e.currentTarget.style.opacity = "0.4")}
      >
        ×
      </button>
    </div>
  );
};

export default Toast;
