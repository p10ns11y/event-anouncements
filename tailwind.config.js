/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'fixed',
    'inset-0',
    'bg-black',
    'bg-opacity-50',
    'flex',
    'justify-center',
    'items-center',
    'z-50',
    'bg-white',
    'rounded-xl',
    'p-4',
    'max-w-4xl',
    'max-h-4xl',
    'relative',
    'absolute',
    'top-2',
    'right-2',
    'text-gray-500',
    'hover:text-gray-700',
    'text-2xl',
    'max-w-full',
    'max-h-[80vh]',
    'rounded-lg',
    'text-center',
    'mt-4',
    'text-sm',
    'text-gray-600'
  ]
}