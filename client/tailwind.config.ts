import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: '#3734A9',
      },

      fontFamily: {
        OpenSans: ['var(--OpenSans)'],
        ProtestRiot: ['var(--ProtestRiot)'],
        poppins: ['var(--Poppins)'],
        SegoeUi: ['var(--SegoeUi)'],
        Inter: ['var(--Inter)'],
      },
      boxShadow: {
        cardShadow: '0px 4px 28px -2px #00000014',
        revenueCard: '0px 1px 4px 0px #15223214',
        profileShadow: '0px 2px 2px 0px #00000040',

        faqCard: '0px 4px 114px 0px #00000017',
      },

      backgroundImage: {
        'custom-gradient':
          'linear-gradient(180.02deg, rgba(2, 20, 58, 0.9) 0.02%, rgba(2, 20, 58, 0.7) 47.92%, rgba(2, 20, 58, 0.5) 91.64%, rgba(2, 20, 58, 0) 117.98%)',
      },
      screens: {
        xxs: '468px', // Add your custom screen width
        mdx: '947px'
      },
    },
  },
  plugins: [],
} satisfies Config;
