/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eefcff",
          100: "#d7f8ff",
          200: "#afeefe",
          300: "#75defa",
          400: "#30c6ee",
          500: "#08acd8",
          600: "#0289b2",
          700: "#066d8e",
          800: "#0a5973",
          900: "#104a60"
        },
        ink: {
          950: "#07111f"
        },
        mint: "#7ef0d8",
        coral: "#ff8f7a"
      },
      boxShadow: {
        float: "0 25px 80px rgba(8, 172, 216, 0.16)",
        glass: "0 20px 60px rgba(7, 17, 31, 0.10)"
      },
      backgroundImage: {
        "hero-wash":
          "radial-gradient(circle at top left, rgba(8, 172, 216, 0.24), transparent 35%), radial-gradient(circle at top right, rgba(126, 240, 216, 0.18), transparent 25%), linear-gradient(180deg, #f5fdff 0%, #ecf7ff 50%, #f8fbff 100%)"
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        rise: "rise 0.8s ease-out"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      }
    }
  },
  plugins: []
};

