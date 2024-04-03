/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "card-bg": "hsl(var(--card-bg))",
        "body-bg": "hsl(var(--body-bg))",
        "hover-bg": "hsl(var(--hover-bg))",
        "primary": "hsl(var(--primary))",
        "text": "hsl(var(--text))",
        "border": "hsl(var(--border))",
        "muted-bg": "hsl(var(--muted-bg))",
        "muted-text": "hsl(var(--muted-text))",
        "muted-border": "hsl(var(--muted-border))",
        "danger-color": "hsl(var(--danger-color))",
        "ring": "hsl(var(--ring))",
      },
      borderRadius: {
        lg: "calc(var(--radius) + 0.5rem)",
        md: "var(--radius)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "scale": {
          from: { opacity:"0", scale:"0.5" },
          to: { opacity:"1", scale:"1" },
        },
      },
      animation: {
        "scale": "scale 0.3s ease",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}