/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

export default {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
	theme: {
    	extend: {
    		fontFamily: {
    			inter: [
    				'Inter',
                    ...defaultTheme.fontFamily.sans
                ]
    		},
    		fontSize: {
    			'3xs': [
    				'0.55rem',
    				{
    					lineHeight: '0.7rem'
    				}
    			],
    			'2xs': [
    				'0.643rem',
    				{
    					lineHeight: '0.8rem'
    				}
    			],
    			xs: [
    				'0.75rem',
    				{
    					lineHeight: '1rem'
    				}
    			],
    			sm: [
    				'0.875rem',
    				{
    					lineHeight: '1rem'
    				}
    			],
    			base: [
    				'1rem',
    				{
    					lineHeight: '1.5rem'
    				}
    			],
    			lg: [
    				'1.125rem',
    				{
    					lineHeight: '1.75rem'
    				}
    			],
    			xl: [
    				'1.25rem',
    				{
    					lineHeight: '1.75rem'
    				}
    			],
    			'2xl': [
    				'1.5rem',
    				{
    					lineHeight: '2rem'
    				}
    			],
    			'3xl': [
    				'1.875rem',
    				{
    					lineHeight: '2.25rem'
    				}
    			],
    			'4xl': [
    				'2.25rem',
    				{
    					lineHeight: '2.5rem'
    				}
    			],
    			'5xl': [
    				'3rem',
    				{
    					lineHeight: '1'
    				}
    			],
    			'6xl': [
    				'3.75rem',
    				{
    					lineHeight: '1'
    				}
    			],
    			'7xl': [
    				'4.5rem',
    				{
    					lineHeight: '1'
    				}
    			],
    			'8xl': [
    				'6rem',
    				{
    					lineHeight: '1'
    				}
    			],
    			'9xl': [
    				'8rem',
    				{
    					lineHeight: '1'
    				}
    			]
    		},
    		screens: {
    			xs: '320px',
    			sm: '640px',
    			md: '768px',
    			lg: '1024px',
    			xl: '1200px',
    			'2xl': '1536px'
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		colors: {
    			admin: {
    				primary: {
    					DEFAULT: 'rgb(var(--admin-primary))',
    					foreground: 'var(--admin-primary-foreground)',
    					hover: 'var(--admin-primary-hover)'
    				},
    				secondary: {
    					DEFAULT: 'rgb(var(--admin-secondary))',
    					foreground: 'var(--admin-secondary-foreground)',
    					hover: 'var(--admin-secondary-hover)'
    				},
    				background: {
    					DEFAULT: 'var(--admin-background)',
    					sidebar: 'rgb(var(--admin-background-sidebar))'
    				}
    			},
    			sf: {
    				background: 'var(--sf-background)',
    				navbar: {
    					bg: 'var(--sf-navbar-bg)'
    				},
    				dark: {
    					bg: 'rgb(var(--sf-dark-bg))'
    				}
    			},
    			primary: {
    				DEFAULT: 'rgb(var(--primary))',
    				foreground: 'var(--primary-foreground)'
    			},
    			secondary: {
    				DEFAULT: 'rgb(var(--secondary))',
    				foreground: 'var(--secondary-foreground)'
    			},
    			background: {
    				DEFAULT: 'var(--background)'
    			},
    			avatar: {
    				DEFAULT: 'var(--background-avatar)',
    				placeholder: 'var(--background-avatar-placeholder)'
    			},
    			white: {
    				DEFAULT: 'var(--white)',
    				foreground: 'var(--white-foreground)'
    			},
    			foreground: 'var(--foreground)',
    			card: {
    				DEFAULT: 'var(--card)'
    			},
    			accent: {
    				DEFAULT: 'var(--accent)',
    				foreground: 'var(--accent-foreground)'
    			},
    			destructive: {
    				DEFAULT: 'var(--destructive)'
    			},
    			disabled: {
    				DEFAULT: 'var(--disabled)',
    				primary: 'var(--button-primary)',
    				disable: 'var(--button-disabled)',
    				secondary: 'var(--button-secondary-disable)'
    			},
    			button: {
    				DEFAULT: 'var(--primary)'
    			},
    			border: {
    				DEFAULT: 'var(--border)',
    				button: 'var(--button-disabled)',
    				table: 'var(--table-border)'
    			},
    			table: 'var(--table-border)',
    			text: {
    				primary: 'var(--text-primary)',
    				secondary: 'var(--text-gray)',
    				disabled: 'var(--text-disabled)',
    				name: 'var(--text-name)',
    				role: 'var(--text-role)',
    				avatar: 'var(--text-avatar-placeholder)',
    				blue: 'var(--text-form-name)',
    				logs: {
    					date: 'var(--text-logs-date)'
    				}
    			},
    			toolbar: {
    				DEFAULT: 'var(--background-toolbar)',
    				separator: 'var(--separator-toolbar)',
    				toggled: 'var(--toolbar-button-toggled)'
    			},
    			dismiss: {
    				DEFAULT: 'var(--bg-primary-dismiss-button)',
    				secondary: '(--bg-secondary-dismiss-button)',
    				border: 'var(--border-dismiss-button)'
    			},
    			reset: {
    				password: {
    					DEFAULT: 'var(--bg-reset-password-button)',
    					border: 'var(--border-reset-password-button)',
    					text: 'var(--text-reset-password-button)'
    				}
    			},
    			chart: {
    				'1': 'var(--chart-1)',
    				'2': 'var(--chart-2)',
    				'3': 'var(--chart-3)'
    			}
    		},
    		keyframes: {
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			},
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			}
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.3s ease-out',
    			'accordion-up': 'accordion-up 0.3s ease-out',
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out'
    		}
    	}
    },
	plugins: [require("tailwindcss-animate")],
};

// ! Unused

// popover: {
// 	DEFAULT: "hsl(var(--popover))",
// 	foreground: "hsl(var(--popover-foreground))",
// },
// secondary: {
// 	DEFAULT: "hsl(var(--secondary))",
// 	foreground: "hsl(var(--secondary-foreground))",
// },
// muted: {
// 	DEFAULT: "hsl(var(--muted))",
// 	foreground: "hsl(var(--muted-foreground))",
// },

// input: "hsl(var(--input))",

// 4: "hsl(var(--chart-4))",
// 5: "hsl(var(--chart-5))",

// foreground: "var(--accent-foreground)",
// foreground: "hsl(var(--destructive-foreground))",
// foreground: "hsl(var(--card-foreground))",
// foreground: "hsl(var(--disabled-foreground))",
