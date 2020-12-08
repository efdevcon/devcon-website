https://tailwindcss.com/docs/optimizing-for-production

Tailwind 2.0 uses PostCSS 8, but gatsby-sass-plugin uses PostCSS 7. Until the plugin is updated, we use a compatability build:
https://tailwindcss.com/docs/installation#post-css-7-compatibility-build

When gatsby catches up we can reinstall tailwind

Intellisense:
https://blog.tailwindcss.com/introducing-linting-for-tailwindcss-intellisense

Linting:
https://www.meidev.co/blog/visual-studio-code-css-linting-with-tailwind/

1. Install stylelint extension
2. Disable CSS:Validate and SCSS:Validate in VS code

Design system notes:
Tailwind automatically applies the design system to the utility classes it generates

Our design system extends the default design system tailwind ships with - see our particular overrides in "tailwind.config.js"

In order to create custom CSS classes that reference the style system, use the "theme()" directive\*

\*@apply is technically possible in custom CSS, but it requires including "@tailwind utilities" at the top of the given file, and slows hot reloading times for
that file very significantly (not worth it). Use theme() instead. This is also the reason we import tw-utilities separately from our other css (webpack never has to revisit it after the original build). The performance related issue here has no good fix yet, but there are open issues (https://github.com/tailwindlabs/tailwindcss/issues/2544) on the tailwind repo, so keep an eye out of for fixes.
