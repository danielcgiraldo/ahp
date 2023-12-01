/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        colors: {
            "primary": "#171A20",
            "secondary": "#393C41",
            "regular": "#5C5E62",
            "bg": "#F4F4F4",
            "border": "#00000026",
            "callable": "#3E6AE1",
            "callable-hover": "#3457b1",
            "white": "#FFFFFF",
            "transparent": "transparent",
            "black": "#000000",
            "bg2": "#e9e9e9",
        },
        fontFamily: {
            'sans': ['Inter', 'sans-serif']
        },
        extend: {
            width: {
                '134': '33.5rem',
            }

        }
    },
    plugins: [],
}
