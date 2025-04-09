/**
 * MetaScan - Metadata Extraction Tool
 * Copyright (c) 2025
 * MIT License
 */
"use strict";var MetaScan=(()=>{var te=Object.defineProperty;var xo=Object.getOwnPropertyDescriptor;var _o=Object.getOwnPropertyNames;var ko=Object.prototype.hasOwnProperty;var So=(t,e)=>{for(var r in e)te(t,r,{get:e[r],enumerable:!0})},Mo=(t,e,r,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of _o(e))!ko.call(t,n)&&n!==r&&te(t,n,{get:()=>e[n],enumerable:!(o=xo(e,n))||o.enumerable});return t};var Co=t=>Mo(te({},"__esModule",{value:!0}),t);var an={};So(an,{MetaScan:()=>Le,configure:()=>bo,enableOrDisable:()=>Ct,exportData:()=>mo,getMetadata:()=>Te,init:()=>Jt});var Re=`/* Tailwind directives */
*, ::before, ::after {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
  --tw-contain-size:  ;
  --tw-contain-layout:  ;
  --tw-contain-paint:  ;
  --tw-contain-style:  ;
}
::backdrop {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
  --tw-contain-size:  ;
  --tw-contain-layout:  ;
  --tw-contain-paint:  ;
  --tw-contain-style:  ;
}
/* ! tailwindcss v3.4.17 | MIT License | https://tailwindcss.com */
/*
1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
*/
*,
::before,
::after {
  box-sizing: border-box; /* 1 */
  border-width: 0; /* 2 */
  border-style: solid; /* 2 */
  border-color: #e5e7eb; /* 2 */
}
::before,
::after {
  --tw-content: '';
}
/*
1. Use a consistent sensible line-height in all browsers.
2. Prevent adjustments of font size after orientation changes in iOS.
3. Use a more readable tab size.
4. Use the user's configured \`sans\` font-family by default.
5. Use the user's configured \`sans\` font-feature-settings by default.
6. Use the user's configured \`sans\` font-variation-settings by default.
7. Disable tap highlights on iOS
*/
html,
:host {
  line-height: 1.5; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  -moz-tab-size: 4; /* 3 */
  -o-tab-size: 4;
     tab-size: 4; /* 3 */
  font-family: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif; /* 4 */
  font-feature-settings: normal; /* 5 */
  font-variation-settings: normal; /* 6 */
  -webkit-tap-highlight-color: transparent; /* 7 */
}
/*
1. Remove the margin in all browsers.
2. Inherit line-height from \`html\` so users can set them as a class directly on the \`html\` element.
*/
body {
  margin: 0; /* 1 */
  line-height: inherit; /* 2 */
}
/*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. Ensure horizontal rules are visible by default.
*/
hr {
  height: 0; /* 1 */
  color: inherit; /* 2 */
  border-top-width: 1px; /* 3 */
}
/*
Add the correct text decoration in Chrome, Edge, and Safari.
*/
abbr:where([title]) {
  -webkit-text-decoration: underline dotted;
          text-decoration: underline dotted;
}
/*
Remove the default font size and weight for headings.
*/
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}
/*
Reset links to optimize for opt-in styling instead of opt-out.
*/
a {
  color: inherit;
  text-decoration: inherit;
}
/*
Add the correct font weight in Edge and Safari.
*/
b,
strong {
  font-weight: bolder;
}
/*
1. Use the user's configured \`mono\` font-family by default.
2. Use the user's configured \`mono\` font-feature-settings by default.
3. Use the user's configured \`mono\` font-variation-settings by default.
4. Correct the odd \`em\` font sizing in all browsers.
*/
code,
kbd,
samp,
pre {
  font-family: SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace; /* 1 */
  font-feature-settings: normal; /* 2 */
  font-variation-settings: normal; /* 3 */
  font-size: 1em; /* 4 */
}
/*
Add the correct font size in all browsers.
*/
small {
  font-size: 80%;
}
/*
Prevent \`sub\` and \`sup\` elements from affecting the line height in all browsers.
*/
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}
sub {
  bottom: -0.25em;
}
sup {
  top: -0.5em;
}
/*
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. Remove gaps between table borders by default.
*/
table {
  text-indent: 0; /* 1 */
  border-color: inherit; /* 2 */
  border-collapse: collapse; /* 3 */
}
/*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/
button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-feature-settings: inherit; /* 1 */
  font-variation-settings: inherit; /* 1 */
  font-size: 100%; /* 1 */
  font-weight: inherit; /* 1 */
  line-height: inherit; /* 1 */
  letter-spacing: inherit; /* 1 */
  color: inherit; /* 1 */
  margin: 0; /* 2 */
  padding: 0; /* 3 */
}
/*
Remove the inheritance of text transform in Edge and Firefox.
*/
button,
select {
  text-transform: none;
}
/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/
button,
input:where([type='button']),
input:where([type='reset']),
input:where([type='submit']) {
  -webkit-appearance: button; /* 1 */
  background-color: transparent; /* 2 */
  background-image: none; /* 2 */
}
/*
Use the modern Firefox focus style for all focusable elements.
*/
:-moz-focusring {
  outline: auto;
}
/*
Remove the additional \`:invalid\` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/
:-moz-ui-invalid {
  box-shadow: none;
}
/*
Add the correct vertical alignment in Chrome and Firefox.
*/
progress {
  vertical-align: baseline;
}
/*
Correct the cursor style of increment and decrement buttons in Safari.
*/
::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}
/*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/
[type='search'] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}
/*
Remove the inner padding in Chrome and Safari on macOS.
*/
::-webkit-search-decoration {
  -webkit-appearance: none;
}
/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to \`inherit\` in Safari.
*/
::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}
/*
Add the correct display in Chrome and Safari.
*/
summary {
  display: list-item;
}
/*
Removes the default spacing and border for appropriate elements.
*/
blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
  margin: 0;
}
fieldset {
  margin: 0;
  padding: 0;
}
legend {
  padding: 0;
}
ol,
ul,
menu {
  list-style: none;
  margin: 0;
  padding: 0;
}
/*
Reset default styling for dialogs.
*/
dialog {
  padding: 0;
}
/*
Prevent resizing textareas horizontally by default.
*/
textarea {
  resize: vertical;
}
/*
1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. Set the default placeholder color to the user's configured gray 400 color.
*/
input::-moz-placeholder, textarea::-moz-placeholder {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}
input::placeholder,
textarea::placeholder {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}
/*
Set the default cursor for buttons.
*/
button,
[role="button"] {
  cursor: pointer;
}
/*
Make sure disabled buttons don't get the pointer cursor.
*/
:disabled {
  cursor: default;
}
/*
1. Make replaced elements \`display: block\` by default. (https://github.com/mozdevs/cssremedy/issues/14)
2. Add \`vertical-align: middle\` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
   This can trigger a poorly considered lint error in some tools but is included by design.
*/
img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block; /* 1 */
  vertical-align: middle; /* 2 */
}
/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/
img,
video {
  max-width: 100%;
  height: auto;
}
/* Make elements with the HTML hidden attribute stay hidden by default */
[hidden]:where(:not([hidden="until-found"])) {
  display: none;
}
.\\!container {
  width: 100% !important;
}
.container {
  width: 100%;
}
@media (min-width: 640px) {
  .\\!container {
    max-width: 640px !important;
  }
  .container {
    max-width: 640px;
  }
}
@media (min-width: 768px) {
  .\\!container {
    max-width: 768px !important;
  }
  .container {
    max-width: 768px;
  }
}
@media (min-width: 1024px) {
  .\\!container {
    max-width: 1024px !important;
  }
  .container {
    max-width: 1024px;
  }
}
@media (min-width: 1280px) {
  .\\!container {
    max-width: 1280px !important;
  }
  .container {
    max-width: 1280px;
  }
}
@media (min-width: 1536px) {
  .\\!container {
    max-width: 1536px !important;
  }
  .container {
    max-width: 1536px;
  }
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
.visible {
  visibility: visible;
}
.fixed {
  position: fixed;
}
.absolute {
  position: absolute;
}
.relative {
  position: relative;
}
.sticky {
  position: sticky;
}
.inset-0 {
  inset: 0px;
}
.bottom-4 {
  bottom: 1rem;
}
.bottom-full {
  bottom: 100%;
}
.left-0 {
  left: 0px;
}
.left-1\\/2 {
  left: 50%;
}
.left-4 {
  left: 1rem;
}
.right-0 {
  right: 0px;
}
.right-2 {
  right: 0.5rem;
}
.right-4 {
  right: 1rem;
}
.right-8 {
  right: 2rem;
}
.top-0 {
  top: 0px;
}
.top-1\\/2 {
  top: 50%;
}
.top-2 {
  top: 0.5rem;
}
.top-4 {
  top: 1rem;
}
.top-full {
  top: 100%;
}
.z-10 {
  z-index: 10;
}
.z-50 {
  z-index: 50;
}
.mb-1 {
  margin-bottom: 0.25rem;
}
.mb-2 {
  margin-bottom: 0.5rem;
}
.mb-3 {
  margin-bottom: 0.75rem;
}
.mb-4 {
  margin-bottom: 1rem;
}
.mb-5 {
  margin-bottom: 1.25rem;
}
.ml-2 {
  margin-left: 0.5rem;
}
.mr-2 {
  margin-right: 0.5rem;
}
.mt-1 {
  margin-top: 0.25rem;
}
.mt-2 {
  margin-top: 0.5rem;
}
.inline-block {
  display: inline-block;
}
.flex {
  display: flex;
}
.inline-flex {
  display: inline-flex;
}
.contents {
  display: contents;
}
.hidden {
  display: none;
}
.aspect-video {
  aspect-ratio: 16 / 9;
}
.h-2 {
  height: 0.5rem;
}
.h-4 {
  height: 1rem;
}
.h-6 {
  height: 1.5rem;
}
.h-8 {
  height: 2rem;
}
.h-full {
  height: 100%;
}
.max-h-\\[60vh\\] {
  max-height: 60vh;
}
.max-h-\\[70vh\\] {
  max-height: 70vh;
}
.max-h-\\[80vh\\] {
  max-height: 80vh;
}
.max-h-full {
  max-height: 100%;
}
.min-h-0 {
  min-height: 0px;
}
.w-2 {
  width: 0.5rem;
}
.w-4 {
  width: 1rem;
}
.w-48 {
  width: 12rem;
}
.w-6 {
  width: 1.5rem;
}
.w-8 {
  width: 2rem;
}
.w-\\[350px\\] {
  width: 350px;
}
.w-\\[400px\\] {
  width: 400px;
}
.w-full {
  width: 100%;
}
.max-w-\\[90vw\\] {
  max-width: 90vw;
}
.max-w-full {
  max-width: 100%;
}
.flex-1 {
  flex: 1 1 0%;
}
.flex-shrink-0 {
  flex-shrink: 0;
}
.flex-grow {
  flex-grow: 1;
}
.origin-top-left {
  transform-origin: top left;
}
.-translate-x-1\\/2 {
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.-translate-y-1\\/2 {
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.translate-y-2 {
  --tw-translate-y: 0.5rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.scale-100 {
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.scale-95 {
  --tw-scale-x: .95;
  --tw-scale-y: .95;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.transform {
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.animate-spin {
  animation: spin 1s linear infinite;
}
.list-disc {
  list-style-type: disc;
}
.flex-col {
  flex-direction: column;
}
.items-center {
  align-items: center;
}
.justify-center {
  justify-content: center;
}
.justify-between {
  justify-content: space-between;
}
.gap-2 {
  gap: 0.5rem;
}
.gap-4 {
  gap: 1rem;
}
.space-x-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.5rem * var(--tw-space-x-reverse));
  margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
}
.space-x-3 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.75rem * var(--tw-space-x-reverse));
  margin-left: calc(0.75rem * calc(1 - var(--tw-space-x-reverse)));
}
.space-y-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));
}
.space-y-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1rem * var(--tw-space-y-reverse));
}
.space-y-6 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(1.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1.5rem * var(--tw-space-y-reverse));
}
.overflow-auto {
  overflow: auto;
}
.overflow-hidden {
  overflow: hidden;
}
.overflow-x-auto {
  overflow-x: auto;
}
.overflow-y-auto {
  overflow-y: auto;
}
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.whitespace-nowrap {
  white-space: nowrap;
}
.whitespace-pre-wrap {
  white-space: pre-wrap;
}
.break-words {
  overflow-wrap: break-word;
}
.rounded {
  border-radius: 0.25rem;
}
.rounded-full {
  border-radius: 9999px;
}
.rounded-lg {
  border-radius: 0.5rem;
}
.rounded-md {
  border-radius: 0.375rem;
}
.border {
  border-width: 1px;
}
.border-2 {
  border-width: 2px;
}
.border-b {
  border-bottom-width: 1px;
}
.border-b-2 {
  border-bottom-width: 2px;
}
.border-l-2 {
  border-left-width: 2px;
}
.border-t {
  border-top-width: 1px;
}
.border-blue-500 {
  --tw-border-opacity: 1;
  border-color: rgb(59 130 246 / var(--tw-border-opacity, 1));
}
.border-gray-200 {
  --tw-border-opacity: 1;
  border-color: rgb(229 231 235 / var(--tw-border-opacity, 1));
}
.border-gray-300 {
  --tw-border-opacity: 1;
  border-color: rgb(209 213 219 / var(--tw-border-opacity, 1));
}
.border-purple-600 {
  --tw-border-opacity: 1;
  border-color: rgb(147 51 234 / var(--tw-border-opacity, 1));
}
.border-red-200 {
  --tw-border-opacity: 1;
  border-color: rgb(254 202 202 / var(--tw-border-opacity, 1));
}
.border-red-500 {
  --tw-border-opacity: 1;
  border-color: rgb(239 68 68 / var(--tw-border-opacity, 1));
}
.border-yellow-500 {
  --tw-border-opacity: 1;
  border-color: rgb(234 179 8 / var(--tw-border-opacity, 1));
}
.border-t-gray-600 {
  --tw-border-opacity: 1;
  border-top-color: rgb(75 85 99 / var(--tw-border-opacity, 1));
}
.border-t-transparent {
  border-top-color: transparent;
}
.bg-black\\/10 {
  background-color: rgb(0 0 0 / 0.1);
}
.bg-blue-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(239 246 255 / var(--tw-bg-opacity, 1));
}
.bg-blue-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(59 130 246 / var(--tw-bg-opacity, 1));
}
.bg-gray-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(243 244 246 / var(--tw-bg-opacity, 1));
}
.bg-gray-200 {
  --tw-bg-opacity: 1;
  background-color: rgb(229 231 235 / var(--tw-bg-opacity, 1));
}
.bg-gray-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(249 250 251 / var(--tw-bg-opacity, 1));
}
.bg-green-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(34 197 94 / var(--tw-bg-opacity, 1));
}
.bg-purple-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(243 232 255 / var(--tw-bg-opacity, 1));
}
.bg-purple-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(250 245 255 / var(--tw-bg-opacity, 1));
}
.bg-purple-600 {
  --tw-bg-opacity: 1;
  background-color: rgb(147 51 234 / var(--tw-bg-opacity, 1));
}
.bg-red-200 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 202 202 / var(--tw-bg-opacity, 1));
}
.bg-red-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 242 242 / var(--tw-bg-opacity, 1));
}
.bg-red-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(239 68 68 / var(--tw-bg-opacity, 1));
}
.bg-red-600 {
  --tw-bg-opacity: 1;
  background-color: rgb(220 38 38 / var(--tw-bg-opacity, 1));
}
.bg-white {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));
}
.bg-yellow-200 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 240 138 / var(--tw-bg-opacity, 1));
}
.bg-yellow-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 252 232 / var(--tw-bg-opacity, 1));
}
.bg-yellow-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(234 179 8 / var(--tw-bg-opacity, 1));
}
.object-contain {
  -o-object-fit: contain;
     object-fit: contain;
}
.p-1 {
  padding: 0.25rem;
}
.p-1\\.5 {
  padding: 0.375rem;
}
.p-2 {
  padding: 0.5rem;
}
.p-3 {
  padding: 0.75rem;
}
.p-4 {
  padding: 1rem;
}
.px-0\\.5 {
  padding-left: 0.125rem;
  padding-right: 0.125rem;
}
.px-2\\.5 {
  padding-left: 0.625rem;
  padding-right: 0.625rem;
}
.px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}
.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}
.py-1 {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}
.py-1\\.5 {
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
}
.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
.py-8 {
  padding-top: 2rem;
  padding-bottom: 2rem;
}
.pb-2 {
  padding-bottom: 0.5rem;
}
.pl-5 {
  padding-left: 1.25rem;
}
.pr-16 {
  padding-right: 4rem;
}
.pt-0 {
  padding-top: 0px;
}
.pt-2 {
  padding-top: 0.5rem;
}
.pt-8 {
  padding-top: 2rem;
}
.text-left {
  text-align: left;
}
.text-center {
  text-align: center;
}
.font-mono {
  font-family: SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;
}
.text-base {
  font-size: 1rem;
  line-height: 1.5rem;
}
.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}
.font-bold {
  font-weight: 700;
}
.font-medium {
  font-weight: 500;
}
.font-semibold {
  font-weight: 600;
}
.capitalize {
  text-transform: capitalize;
}
.text-black {
  --tw-text-opacity: 1;
  color: rgb(0 0 0 / var(--tw-text-opacity, 1));
}
.text-blue-600 {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity, 1));
}
.text-blue-800 {
  --tw-text-opacity: 1;
  color: rgb(30 64 175 / var(--tw-text-opacity, 1));
}
.text-gray-400 {
  --tw-text-opacity: 1;
  color: rgb(156 163 175 / var(--tw-text-opacity, 1));
}
.text-gray-500 {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity, 1));
}
.text-gray-600 {
  --tw-text-opacity: 1;
  color: rgb(75 85 99 / var(--tw-text-opacity, 1));
}
.text-gray-700 {
  --tw-text-opacity: 1;
  color: rgb(55 65 81 / var(--tw-text-opacity, 1));
}
.text-gray-800 {
  --tw-text-opacity: 1;
  color: rgb(31 41 55 / var(--tw-text-opacity, 1));
}
.text-purple-600 {
  --tw-text-opacity: 1;
  color: rgb(147 51 234 / var(--tw-text-opacity, 1));
}
.text-purple-700 {
  --tw-text-opacity: 1;
  color: rgb(126 34 206 / var(--tw-text-opacity, 1));
}
.text-red-500 {
  --tw-text-opacity: 1;
  color: rgb(239 68 68 / var(--tw-text-opacity, 1));
}
.text-red-700 {
  --tw-text-opacity: 1;
  color: rgb(185 28 28 / var(--tw-text-opacity, 1));
}
.text-red-800 {
  --tw-text-opacity: 1;
  color: rgb(153 27 27 / var(--tw-text-opacity, 1));
}
.text-white {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity, 1));
}
.text-yellow-800 {
  --tw-text-opacity: 1;
  color: rgb(133 77 14 / var(--tw-text-opacity, 1));
}
.opacity-0 {
  opacity: 0;
}
.opacity-100 {
  opacity: 1;
}
.opacity-25 {
  opacity: 0.25;
}
.opacity-75 {
  opacity: 0.75;
}
.opacity-90 {
  opacity: 0.9;
}
.shadow {
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.shadow-lg {
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.shadow-md {
  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.shadow-sm {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.shadow-xl {
  --tw-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.shadow-purple-500\\/25 {
  --tw-shadow-color: rgb(168 85 247 / 0.25);
  --tw-shadow: var(--tw-shadow-colored);
}
.shadow-red-500\\/25 {
  --tw-shadow-color: rgb(239 68 68 / 0.25);
  --tw-shadow: var(--tw-shadow-colored);
}
.blur {
  --tw-blur: blur(8px);
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}
.filter {
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}
.backdrop-blur-sm {
  --tw-backdrop-blur: blur(4px);
  -webkit-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
  backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
}
.transition {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.transition-opacity {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.duration-200 {
  transition-duration: 200ms;
}
.duration-300 {
  transition-duration: 300ms;
}
.duration-500 {
  transition-duration: 500ms;
}
.ease-out {
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
}

/* MetaScan specific styles */
.meta-scan-app {
  font-family: system-ui, -apple-system, sans-serif;
  width: 100%;
  max-width: 400px;
  position: fixed;
  box-sizing: border-box;
}

/* Toggle button styles */
.meta-scan-toggle {
  position: fixed;
  z-index: 999999;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #4a6cf7;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: transform 0.2s ease;
}

.meta-scan-toggle:hover {
  transform: scale(1.1);
}

/* Positioning classes */
.meta-scan-position-top-right {
  top: 20px;
  right: 20px;
}

.meta-scan-position-top-left {
  top: 20px;
  left: 20px;
}

.meta-scan-position-bottom-right {
  bottom: 20px;
  right: 20px;
}

.meta-scan-position-bottom-left {
  bottom: 20px;
  left: 20px;
}

/* Animation classes */
.meta-scan-fade-in {
  animation: metaScanFadeIn 0.3s forwards;
}

.meta-scan-fade-out {
  animation: metaScanFadeOut 0.3s forwards;
}

@keyframes metaScanFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes metaScanFadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

/* Toggle button styles */
.meta-scan-toggle {
  position: fixed;
  z-index: 999999;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #4a6cf7;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: all 0.2s ease;
}

.meta-scan-toggle:hover {
  transform: scale(1.1);
}

.meta-scan-toggle-active {
  background-color: #ff6b6b;
  transform: rotate(45deg);
}

.meta-scan-toggle-active:hover {
  transform: rotate(45deg) scale(1.1);
}

/* Hide utility class */
.meta-scan-hidden {
  display: none !important;
}
.before\\:absolute::before {
  content: var(--tw-content);
  position: absolute;
}
.before\\:inset-0::before {
  content: var(--tw-content);
  inset: 0px;
}
.before\\:rounded-lg::before {
  content: var(--tw-content);
  border-radius: 0.5rem;
}
.before\\:bg-gradient-to-r::before {
  content: var(--tw-content);
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}
.before\\:from-white\\/10::before {
  content: var(--tw-content);
  --tw-gradient-from: rgb(255 255 255 / 0.1) var(--tw-gradient-from-position);
  --tw-gradient-to: rgb(255 255 255 / 0) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}
.before\\:to-transparent::before {
  content: var(--tw-content);
  --tw-gradient-to: transparent var(--tw-gradient-to-position);
}
.before\\:opacity-0::before {
  content: var(--tw-content);
  opacity: 0;
}
.before\\:transition-opacity::before {
  content: var(--tw-content);
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.after\\:absolute::after {
  content: var(--tw-content);
  position: absolute;
}
.after\\:inset-0::after {
  content: var(--tw-content);
  inset: 0px;
}
.after\\:rounded-lg::after {
  content: var(--tw-content);
  border-radius: 0.5rem;
}
.after\\:bg-gradient-to-r::after {
  content: var(--tw-content);
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}
.after\\:from-transparent::after {
  content: var(--tw-content);
  --tw-gradient-from: transparent var(--tw-gradient-from-position);
  --tw-gradient-to: rgb(0 0 0 / 0) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}
.after\\:to-white\\/5::after {
  content: var(--tw-content);
  --tw-gradient-to: rgb(255 255 255 / 0.05) var(--tw-gradient-to-position);
}
.after\\:opacity-0::after {
  content: var(--tw-content);
  opacity: 0;
}
.after\\:transition-opacity::after {
  content: var(--tw-content);
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.last\\:mb-0:last-child {
  margin-bottom: 0px;
}
.hover\\:scale-110:hover {
  --tw-scale-x: 1.1;
  --tw-scale-y: 1.1;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.hover\\:scale-\\[1\\.02\\]:hover {
  --tw-scale-x: 1.02;
  --tw-scale-y: 1.02;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.hover\\:bg-gray-100:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(243 244 246 / var(--tw-bg-opacity, 1));
}
.hover\\:bg-gray-200:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(229 231 235 / var(--tw-bg-opacity, 1));
}
.hover\\:bg-gray-300:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(209 213 219 / var(--tw-bg-opacity, 1));
}
.hover\\:bg-purple-200:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(233 213 255 / var(--tw-bg-opacity, 1));
}
.hover\\:bg-purple-700:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(126 34 206 / var(--tw-bg-opacity, 1));
}
.hover\\:bg-red-700:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(185 28 28 / var(--tw-bg-opacity, 1));
}
.hover\\:text-gray-600:hover {
  --tw-text-opacity: 1;
  color: rgb(75 85 99 / var(--tw-text-opacity, 1));
}
.hover\\:text-gray-700:hover {
  --tw-text-opacity: 1;
  color: rgb(55 65 81 / var(--tw-text-opacity, 1));
}
.hover\\:text-purple-600:hover {
  --tw-text-opacity: 1;
  color: rgb(147 51 234 / var(--tw-text-opacity, 1));
}
.hover\\:shadow:hover {
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.hover\\:shadow-lg:hover {
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.hover\\:shadow-md:hover {
  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.hover\\:shadow-purple-500\\/35:hover {
  --tw-shadow-color: rgb(168 85 247 / 0.35);
  --tw-shadow: var(--tw-shadow-colored);
}
.hover\\:shadow-red-500\\/35:hover {
  --tw-shadow-color: rgb(239 68 68 / 0.35);
  --tw-shadow: var(--tw-shadow-colored);
}
.hover\\:before\\:opacity-100:hover::before {
  content: var(--tw-content);
  opacity: 1;
}
.hover\\:after\\:opacity-100:hover::after {
  content: var(--tw-content);
  opacity: 1;
}
.focus\\:outline-none:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.focus\\:ring-1:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.focus\\:ring-2:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.focus\\:ring-gray-500:focus {
  --tw-ring-opacity: 1;
  --tw-ring-color: rgb(107 114 128 / var(--tw-ring-opacity, 1));
}
.focus\\:ring-purple-500:focus {
  --tw-ring-opacity: 1;
  --tw-ring-color: rgb(168 85 247 / var(--tw-ring-opacity, 1));
}
.focus\\:ring-red-500:focus {
  --tw-ring-opacity: 1;
  --tw-ring-color: rgb(239 68 68 / var(--tw-ring-opacity, 1));
}
.focus\\:ring-opacity-50:focus {
  --tw-ring-opacity: 0.5;
}
.focus\\:ring-offset-2:focus {
  --tw-ring-offset-width: 2px;
}
.active\\:scale-\\[0\\.98\\]:active {
  --tw-scale-x: 0.98;
  --tw-scale-y: 0.98;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.disabled\\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}
.disabled\\:opacity-50:disabled {
  opacity: 0.5;
}
.disabled\\:hover\\:scale-100:hover:disabled {
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.group:hover .group-hover\\:opacity-100 {
  opacity: 1;
}
.dark\\:border-gray-700:is(.dark *) {
  --tw-border-opacity: 1;
  border-color: rgb(55 65 81 / var(--tw-border-opacity, 1));
}
.dark\\:border-purple-400:is(.dark *) {
  --tw-border-opacity: 1;
  border-color: rgb(192 132 252 / var(--tw-border-opacity, 1));
}
.dark\\:border-red-800:is(.dark *) {
  --tw-border-opacity: 1;
  border-color: rgb(153 27 27 / var(--tw-border-opacity, 1));
}
.dark\\:border-t-gray-300:is(.dark *) {
  --tw-border-opacity: 1;
  border-top-color: rgb(209 213 219 / var(--tw-border-opacity, 1));
}
.dark\\:bg-blue-900\\/20:is(.dark *) {
  background-color: rgb(30 58 138 / 0.2);
}
.dark\\:bg-gray-700:is(.dark *) {
  --tw-bg-opacity: 1;
  background-color: rgb(55 65 81 / var(--tw-bg-opacity, 1));
}
.dark\\:bg-gray-800:is(.dark *) {
  --tw-bg-opacity: 1;
  background-color: rgb(31 41 55 / var(--tw-bg-opacity, 1));
}
.dark\\:bg-gray-900:is(.dark *) {
  --tw-bg-opacity: 1;
  background-color: rgb(17 24 39 / var(--tw-bg-opacity, 1));
}
.dark\\:bg-purple-500:is(.dark *) {
  --tw-bg-opacity: 1;
  background-color: rgb(168 85 247 / var(--tw-bg-opacity, 1));
}
.dark\\:bg-purple-700:is(.dark *) {
  --tw-bg-opacity: 1;
  background-color: rgb(126 34 206 / var(--tw-bg-opacity, 1));
}
.dark\\:bg-purple-900:is(.dark *) {
  --tw-bg-opacity: 1;
  background-color: rgb(88 28 135 / var(--tw-bg-opacity, 1));
}
.dark\\:bg-purple-900\\/30:is(.dark *) {
  background-color: rgb(88 28 135 / 0.3);
}
.dark\\:bg-red-500:is(.dark *) {
  --tw-bg-opacity: 1;
  background-color: rgb(239 68 68 / var(--tw-bg-opacity, 1));
}
.dark\\:bg-red-900:is(.dark *) {
  --tw-bg-opacity: 1;
  background-color: rgb(127 29 29 / var(--tw-bg-opacity, 1));
}
.dark\\:bg-red-900\\/20:is(.dark *) {
  background-color: rgb(127 29 29 / 0.2);
}
.dark\\:bg-red-900\\/30:is(.dark *) {
  background-color: rgb(127 29 29 / 0.3);
}
.dark\\:bg-yellow-700:is(.dark *) {
  --tw-bg-opacity: 1;
  background-color: rgb(161 98 7 / var(--tw-bg-opacity, 1));
}
.dark\\:bg-yellow-900\\/20:is(.dark *) {
  background-color: rgb(113 63 18 / 0.2);
}
.dark\\:text-blue-200:is(.dark *) {
  --tw-text-opacity: 1;
  color: rgb(191 219 254 / var(--tw-text-opacity, 1));
}
.dark\\:text-blue-400:is(.dark *) {
  --tw-text-opacity: 1;
  color: rgb(96 165 250 / var(--tw-text-opacity, 1));
}
.dark\\:text-gray-200:is(.dark *) {
  --tw-text-opacity: 1;
  color: rgb(229 231 235 / var(--tw-text-opacity, 1));
}
.dark\\:text-gray-300:is(.dark *) {
  --tw-text-opacity: 1;
  color: rgb(209 213 219 / var(--tw-text-opacity, 1));
}
.dark\\:text-gray-400:is(.dark *) {
  --tw-text-opacity: 1;
  color: rgb(156 163 175 / var(--tw-text-opacity, 1));
}
.dark\\:text-purple-300:is(.dark *) {
  --tw-text-opacity: 1;
  color: rgb(216 180 254 / var(--tw-text-opacity, 1));
}
.dark\\:text-purple-400:is(.dark *) {
  --tw-text-opacity: 1;
  color: rgb(192 132 252 / var(--tw-text-opacity, 1));
}
.dark\\:text-red-200:is(.dark *) {
  --tw-text-opacity: 1;
  color: rgb(254 202 202 / var(--tw-text-opacity, 1));
}
.dark\\:text-red-300:is(.dark *) {
  --tw-text-opacity: 1;
  color: rgb(252 165 165 / var(--tw-text-opacity, 1));
}
.dark\\:text-red-400:is(.dark *) {
  --tw-text-opacity: 1;
  color: rgb(248 113 113 / var(--tw-text-opacity, 1));
}
.dark\\:text-white:is(.dark *) {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity, 1));
}
.dark\\:text-yellow-200:is(.dark *) {
  --tw-text-opacity: 1;
  color: rgb(254 240 138 / var(--tw-text-opacity, 1));
}
.dark\\:hover\\:bg-gray-600:hover:is(.dark *) {
  --tw-bg-opacity: 1;
  background-color: rgb(75 85 99 / var(--tw-bg-opacity, 1));
}
.dark\\:hover\\:bg-gray-700:hover:is(.dark *) {
  --tw-bg-opacity: 1;
  background-color: rgb(55 65 81 / var(--tw-bg-opacity, 1));
}
.dark\\:hover\\:bg-purple-400:hover:is(.dark *) {
  --tw-bg-opacity: 1;
  background-color: rgb(192 132 252 / var(--tw-bg-opacity, 1));
}
.dark\\:hover\\:bg-purple-800:hover:is(.dark *) {
  --tw-bg-opacity: 1;
  background-color: rgb(107 33 168 / var(--tw-bg-opacity, 1));
}
.dark\\:hover\\:bg-red-400:hover:is(.dark *) {
  --tw-bg-opacity: 1;
  background-color: rgb(248 113 113 / var(--tw-bg-opacity, 1));
}
.dark\\:hover\\:text-gray-300:hover:is(.dark *) {
  --tw-text-opacity: 1;
  color: rgb(209 213 219 / var(--tw-text-opacity, 1));
}
.dark\\:hover\\:text-purple-400:hover:is(.dark *) {
  --tw-text-opacity: 1;
  color: rgb(192 132 252 / var(--tw-text-opacity, 1));
}
.dark\\:hover\\:text-purple-600:hover:is(.dark *) {
  --tw-text-opacity: 1;
  color: rgb(147 51 234 / var(--tw-text-opacity, 1));
}
.dark\\:focus\\:ring-purple-400:focus:is(.dark *) {
  --tw-ring-opacity: 1;
  --tw-ring-color: rgb(192 132 252 / var(--tw-ring-opacity, 1));
}
@media (min-width: 640px) {
  .sm\\:opacity-0 {
    opacity: 0;
  }
  .group:hover .sm\\:group-hover\\:opacity-100 {
    opacity: 1;
  }
}
`;var Eo={prefix:"MetaScan",level:2,enabled:!1},ee=class t{constructor(e={}){this.options={...Eo,...e}}configure(e){this.options={...this.options,...e}}setEnabled(e){this.options.enabled=e}setLevel(e){this.options.level=e}debug(...e){!this.options.enabled||this.options.level>0||console.debug(`[${this.options.prefix}:debug]`,...e)}info(...e){!this.options.enabled||this.options.level>1||console.info(`[${this.options.prefix}:info]`,...e)}warn(...e){!this.options.enabled||this.options.level>2||console.warn(`[${this.options.prefix}:warn]`,...e)}error(...e){!this.options.enabled||this.options.level>3||console.error(`[${this.options.prefix}:error]`,...e)}log(e,...r){switch(e){case 0:this.debug(...r);break;case 1:this.info(...r);break;case 2:this.warn(...r);break;case 3:this.error(...r);break}}child(e){return new t({...this.options,prefix:`${this.options.prefix}:${e}`})}},M=new ee;var To=Re;function Pe(){let t=document.createElement("div");t.id="meta-scan-root";let e=t.attachShadow({mode:"open"}),r=document.createElement("style");r.textContent=To,e.appendChild(r);let o=document.createElement("div");return o.className="meta-scan-mount",e.appendChild(o),document.body.appendChild(t),M.info("Shadow DOM container created"),o}function ze(t,e){let r=null;return function(...o){r&&clearTimeout(r),r=setTimeout(()=>t(...o),e)}}var ot=null,re=!1,st=null;function jt(t){ot||(st=t,document.addEventListener("visibilitychange",De),window.addEventListener("beforeunload",()=>{ot&&(ot.disconnect(),ot=null)}),window.addEventListener("load",()=>{st&&st(!0)}),Lo())}function Lo(){ot||(ot=new MutationObserver(ze(t=>{if(!st)return;t.some(r=>{if(r.target.nodeName==="HEAD")return!0;if(r.type==="childList")return Array.from(r.addedNodes).some(o=>o.nodeName==="META"||o.nodeName==="TITLE")||Array.from(r.removedNodes).some(o=>o.nodeName==="META"||o.nodeName==="TITLE");if(r.type==="attributes"){let o=r.target;return o.nodeName==="META"||o.nodeName==="TITLE"||o.nodeName==="LINK"}return!1})&&st&&st(!1)},500)),Io())}function Io(){if(!ot||re)return;let t=document.head;t&&(ot.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["content","property","name","href"]}),re=!0,M.info("MetaScan: Started observing DOM changes"))}function De(){document.visibilityState==="visible"&&st&&st(!0)}function Ut(){ot&&(ot.disconnect(),ot=null),document.removeEventListener("visibilitychange",De),re=!1,st=null}var Bt,v,Fe,Oo,ft,je,Be,Ge,Ve,ne,oe,ae,Ao,Lt={},We=[],Ro=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,It=Array.isArray;function lt(t,e){for(var r in e)t[r]=e[r];return t}function ie(t){t&&t.parentNode&&t.parentNode.removeChild(t)}function yt(t,e,r){var o,n,i,s={};for(i in e)i=="key"?o=e[i]:i=="ref"?n=e[i]:s[i]=e[i];if(arguments.length>2&&(s.children=arguments.length>3?Bt.call(arguments,2):r),typeof t=="function"&&t.defaultProps!=null)for(i in t.defaultProps)s[i]===void 0&&(s[i]=t.defaultProps[i]);return Ht(t,s,o,n,null)}function Ht(t,e,r,o,n){var i={type:t,props:e,key:r,ref:o,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:n==null?++Fe:n,__i:-1,__u:0};return n==null&&v.vnode!=null&&v.vnode(i),i}function D(t){return t.children}function at(t,e){this.props=t,this.context=e}function wt(t,e){if(e==null)return t.__?wt(t.__,t.__i+1):null;for(var r;e<t.__k.length;e++)if((r=t.__k[e])!=null&&r.__e!=null)return r.__e;return typeof t.type=="function"?wt(t):null}function Je(t){var e,r;if((t=t.__)!=null&&t.__c!=null){for(t.__e=t.__c.base=null,e=0;e<t.__k.length;e++)if((r=t.__k[e])!=null&&r.__e!=null){t.__e=t.__c.base=r.__e;break}return Je(t)}}function Ue(t){(!t.__d&&(t.__d=!0)&&ft.push(t)&&!Ft.__r++||je!==v.debounceRendering)&&((je=v.debounceRendering)||Be)(Ft)}function Ft(){for(var t,e,r,o,n,i,s,l=1;ft.length;)ft.length>l&&ft.sort(Ge),t=ft.shift(),l=ft.length,t.__d&&(r=void 0,n=(o=(e=t).__v).__e,i=[],s=[],e.__P&&((r=lt({},o)).__v=o.__v+1,v.vnode&&v.vnode(r),se(e.__P,r,o,e.__n,e.__P.namespaceURI,32&o.__u?[n]:null,i,n==null?wt(o):n,!!(32&o.__u),s),r.__v=o.__v,r.__.__k[r.__i]=r,Ye(i,r,s),r.__e!=n&&Je(r)));Ft.__r=0}function qe(t,e,r,o,n,i,s,l,c,p,g){var d,w,u,m,O,L,x=o&&o.__k||We,_=e.length;for(c=Po(r,e,x,c,_),d=0;d<_;d++)(u=r.__k[d])!=null&&(w=u.__i===-1?Lt:x[u.__i]||Lt,u.__i=d,L=se(t,u,w,n,i,s,l,c,p,g),m=u.__e,u.ref&&w.ref!=u.ref&&(w.ref&&le(w.ref,null,u),g.push(u.ref,u.__c||m,u)),O==null&&m!=null&&(O=m),4&u.__u||w.__k===u.__k?c=Xe(u,c,t):typeof u.type=="function"&&L!==void 0?c=L:m&&(c=m.nextSibling),u.__u&=-7);return r.__e=O,c}function Po(t,e,r,o,n){var i,s,l,c,p,g=r.length,d=g,w=0;for(t.__k=new Array(n),i=0;i<n;i++)(s=e[i])!=null&&typeof s!="boolean"&&typeof s!="function"?(c=i+w,(s=t.__k[i]=typeof s=="string"||typeof s=="number"||typeof s=="bigint"||s.constructor==String?Ht(null,s,null,null,null):It(s)?Ht(D,{children:s},null,null,null):s.constructor===void 0&&s.__b>0?Ht(s.type,s.props,s.key,s.ref?s.ref:null,s.__v):s).__=t,s.__b=t.__b+1,l=null,(p=s.__i=zo(s,r,c,d))!==-1&&(d--,(l=r[p])&&(l.__u|=2)),l==null||l.__v===null?(p==-1&&(n>g?w--:n<g&&w++),typeof s.type!="function"&&(s.__u|=4)):p!=c&&(p==c-1?w--:p==c+1?w++:(p>c?w--:w++,s.__u|=4))):t.__k[i]=null;if(d)for(i=0;i<g;i++)(l=r[i])!=null&&!(2&l.__u)&&(l.__e==o&&(o=wt(l)),Ze(l,l));return o}function Xe(t,e,r){var o,n;if(typeof t.type=="function"){for(o=t.__k,n=0;o&&n<o.length;n++)o[n]&&(o[n].__=t,e=Xe(o[n],e,r));return e}t.__e!=e&&(e&&t.type&&!r.contains(e)&&(e=wt(t)),r.insertBefore(t.__e,e||null),e=t.__e);do e=e&&e.nextSibling;while(e!=null&&e.nodeType==8);return e}function Ot(t,e){return e=e||[],t==null||typeof t=="boolean"||(It(t)?t.some(function(r){Ot(r,e)}):e.push(t)),e}function zo(t,e,r,o){var n,i,s=t.key,l=t.type,c=e[r];if(c===null&&t.key==null||c&&s==c.key&&l===c.type&&!(2&c.__u))return r;if(o>(c!=null&&!(2&c.__u)?1:0))for(n=r-1,i=r+1;n>=0||i<e.length;){if(n>=0){if((c=e[n])&&!(2&c.__u)&&s==c.key&&l===c.type)return n;n--}if(i<e.length){if((c=e[i])&&!(2&c.__u)&&s==c.key&&l===c.type)return i;i++}}return-1}function $e(t,e,r){e[0]=="-"?t.setProperty(e,r==null?"":r):t[e]=r==null?"":typeof r!="number"||Ro.test(e)?r:r+"px"}function $t(t,e,r,o,n){var i;t:if(e=="style")if(typeof r=="string")t.style.cssText=r;else{if(typeof o=="string"&&(t.style.cssText=o=""),o)for(e in o)r&&e in r||$e(t.style,e,"");if(r)for(e in r)o&&r[e]===o[e]||$e(t.style,e,r[e])}else if(e[0]=="o"&&e[1]=="n")i=e!=(e=e.replace(Ve,"$1")),e=e.toLowerCase()in t||e=="onFocusOut"||e=="onFocusIn"?e.toLowerCase().slice(2):e.slice(2),t.l||(t.l={}),t.l[e+i]=r,r?o?r.t=o.t:(r.t=ne,t.addEventListener(e,i?ae:oe,i)):t.removeEventListener(e,i?ae:oe,i);else{if(n=="http://www.w3.org/2000/svg")e=e.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(e!="width"&&e!="height"&&e!="href"&&e!="list"&&e!="form"&&e!="tabIndex"&&e!="download"&&e!="rowSpan"&&e!="colSpan"&&e!="role"&&e!="popover"&&e in t)try{t[e]=r==null?"":r;break t}catch(s){}typeof r=="function"||(r==null||r===!1&&e[4]!="-"?t.removeAttribute(e):t.setAttribute(e,e=="popover"&&r==1?"":r))}}function He(t){return function(e){if(this.l){var r=this.l[e.type+t];if(e.u==null)e.u=ne++;else if(e.u<r.t)return;return r(v.event?v.event(e):e)}}}function se(t,e,r,o,n,i,s,l,c,p){var g,d,w,u,m,O,L,x,_,F,U,S,b,R,q,Q,y,T=e.type;if(e.constructor!==void 0)return null;128&r.__u&&(c=!!(32&r.__u),i=[l=e.__e=r.__e]),(g=v.__b)&&g(e);t:if(typeof T=="function")try{if(x=e.props,_="prototype"in T&&T.prototype.render,F=(g=T.contextType)&&o[g.__c],U=g?F?F.props.value:g.__:o,r.__c?L=(d=e.__c=r.__c).__=d.__E:(_?e.__c=d=new T(x,U):(e.__c=d=new at(x,U),d.constructor=T,d.render=jo),F&&F.sub(d),d.props=x,d.state||(d.state={}),d.context=U,d.__n=o,w=d.__d=!0,d.__h=[],d._sb=[]),_&&d.__s==null&&(d.__s=d.state),_&&T.getDerivedStateFromProps!=null&&(d.__s==d.state&&(d.__s=lt({},d.__s)),lt(d.__s,T.getDerivedStateFromProps(x,d.__s))),u=d.props,m=d.state,d.__v=e,w)_&&T.getDerivedStateFromProps==null&&d.componentWillMount!=null&&d.componentWillMount(),_&&d.componentDidMount!=null&&d.__h.push(d.componentDidMount);else{if(_&&T.getDerivedStateFromProps==null&&x!==u&&d.componentWillReceiveProps!=null&&d.componentWillReceiveProps(x,U),!d.__e&&(d.shouldComponentUpdate!=null&&d.shouldComponentUpdate(x,d.__s,U)===!1||e.__v==r.__v)){for(e.__v!=r.__v&&(d.props=x,d.state=d.__s,d.__d=!1),e.__e=r.__e,e.__k=r.__k,e.__k.some(function(P){P&&(P.__=e)}),S=0;S<d._sb.length;S++)d.__h.push(d._sb[S]);d._sb=[],d.__h.length&&s.push(d);break t}d.componentWillUpdate!=null&&d.componentWillUpdate(x,d.__s,U),_&&d.componentDidUpdate!=null&&d.__h.push(function(){d.componentDidUpdate(u,m,O)})}if(d.context=U,d.props=x,d.__P=t,d.__e=!1,b=v.__r,R=0,_){for(d.state=d.__s,d.__d=!1,b&&b(e),g=d.render(d.props,d.state,d.context),q=0;q<d._sb.length;q++)d.__h.push(d._sb[q]);d._sb=[]}else do d.__d=!1,b&&b(e),g=d.render(d.props,d.state,d.context),d.state=d.__s;while(d.__d&&++R<25);d.state=d.__s,d.getChildContext!=null&&(o=lt(lt({},o),d.getChildContext())),_&&!w&&d.getSnapshotBeforeUpdate!=null&&(O=d.getSnapshotBeforeUpdate(u,m)),Q=g,g!=null&&g.type===D&&g.key==null&&(Q=Ke(g.props.children)),l=qe(t,It(Q)?Q:[Q],e,r,o,n,i,s,l,c,p),d.base=e.__e,e.__u&=-161,d.__h.length&&s.push(d),L&&(d.__E=d.__=null)}catch(P){if(e.__v=null,c||i!=null)if(P.then){for(e.__u|=c?160:128;l&&l.nodeType==8&&l.nextSibling;)l=l.nextSibling;i[i.indexOf(l)]=null,e.__e=l}else for(y=i.length;y--;)ie(i[y]);else e.__e=r.__e,e.__k=r.__k;v.__e(P,e,r)}else i==null&&e.__v==r.__v?(e.__k=r.__k,e.__e=r.__e):l=e.__e=Do(r.__e,e,r,o,n,i,s,c,p);return(g=v.diffed)&&g(e),128&e.__u?void 0:l}function Ye(t,e,r){for(var o=0;o<r.length;o++)le(r[o],r[++o],r[++o]);v.__c&&v.__c(e,t),t.some(function(n){try{t=n.__h,n.__h=[],t.some(function(i){i.call(n)})}catch(i){v.__e(i,n.__v)}})}function Ke(t){return typeof t!="object"||t==null?t:It(t)?t.map(Ke):lt({},t)}function Do(t,e,r,o,n,i,s,l,c){var p,g,d,w,u,m,O,L=r.props,x=e.props,_=e.type;if(_=="svg"?n="http://www.w3.org/2000/svg":_=="math"?n="http://www.w3.org/1998/Math/MathML":n||(n="http://www.w3.org/1999/xhtml"),i!=null){for(p=0;p<i.length;p++)if((u=i[p])&&"setAttribute"in u==!!_&&(_?u.localName==_:u.nodeType==3)){t=u,i[p]=null;break}}if(t==null){if(_==null)return document.createTextNode(x);t=document.createElementNS(n,_,x.is&&x),l&&(v.__m&&v.__m(e,i),l=!1),i=null}if(_===null)L===x||l&&t.data===x||(t.data=x);else{if(i=i&&Bt.call(t.childNodes),L=r.props||Lt,!l&&i!=null)for(L={},p=0;p<t.attributes.length;p++)L[(u=t.attributes[p]).name]=u.value;for(p in L)if(u=L[p],p!="children"){if(p=="dangerouslySetInnerHTML")d=u;else if(!(p in x)){if(p=="value"&&"defaultValue"in x||p=="checked"&&"defaultChecked"in x)continue;$t(t,p,null,u,n)}}for(p in x)u=x[p],p=="children"?w=u:p=="dangerouslySetInnerHTML"?g=u:p=="value"?m=u:p=="checked"?O=u:l&&typeof u!="function"||L[p]===u||$t(t,p,u,L[p],n);if(g)l||d&&(g.__html===d.__html||g.__html===t.innerHTML)||(t.innerHTML=g.__html),e.__k=[];else if(d&&(t.innerHTML=""),qe(e.type==="template"?t.content:t,It(w)?w:[w],e,r,o,_=="foreignObject"?"http://www.w3.org/1999/xhtml":n,i,s,i?i[0]:r.__k&&wt(r,0),l,c),i!=null)for(p=i.length;p--;)ie(i[p]);l||(p="value",_=="progress"&&m==null?t.removeAttribute("value"):m!==void 0&&(m!==t[p]||_=="progress"&&!m||_=="option"&&m!==L[p])&&$t(t,p,m,L[p],n),p="checked",O!==void 0&&O!==t[p]&&$t(t,p,O,L[p],n))}return t}function le(t,e,r){try{if(typeof t=="function"){var o=typeof t.__u=="function";o&&t.__u(),o&&e==null||(t.__u=t(e))}else t.current=e}catch(n){v.__e(n,r)}}function Ze(t,e,r){var o,n;if(v.unmount&&v.unmount(t),(o=t.ref)&&(o.current&&o.current!==t.__e||le(o,null,e)),(o=t.__c)!=null){if(o.componentWillUnmount)try{o.componentWillUnmount()}catch(i){v.__e(i,e)}o.base=o.__P=null}if(o=t.__k)for(n=0;n<o.length;n++)o[n]&&Ze(o[n],e,r||typeof t.type!="function");r||ie(t.__e),t.__c=t.__=t.__e=void 0}function jo(t,e,r){return this.constructor(t,r)}function ce(t,e,r){var o,n,i,s;e==document&&(e=document.documentElement),v.__&&v.__(t,e),n=(o=typeof r=="function")?null:r&&r.__k||e.__k,i=[],s=[],se(e,t=(!o&&r||e).__k=yt(D,null,[t]),n||Lt,Lt,e.namespaceURI,!o&&r?[r]:n?null:e.firstChild?Bt.call(e.childNodes):null,i,!o&&r?r:n?n.__e:e.firstChild,o,s),Ye(i,t,s)}Bt=We.slice,v={__e:function(t,e,r,o){for(var n,i,s;e=e.__;)if((n=e.__c)&&!n.__)try{if((i=n.constructor)&&i.getDerivedStateFromError!=null&&(n.setState(i.getDerivedStateFromError(t)),s=n.__d),n.componentDidCatch!=null&&(n.componentDidCatch(t,o||{}),s=n.__d),s)return n.__E=n}catch(l){t=l}throw t}},Fe=0,Oo=function(t){return t!=null&&t.constructor==null},at.prototype.setState=function(t,e){var r;r=this.__s!=null&&this.__s!==this.state?this.__s:this.__s=lt({},this.state),typeof t=="function"&&(t=t(lt({},r),this.props)),t&&lt(r,t),t!=null&&this.__v&&(e&&this._sb.push(e),Ue(this))},at.prototype.forceUpdate=function(t){this.__v&&(this.__e=!0,t&&this.__h.push(t),Ue(this))},at.prototype.render=D,ft=[],Be=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,Ge=function(t,e){return t.__v.__b-e.__v.__b},Ft.__r=0,Ve=/(PointerCapture)$|Capture$/i,ne=0,oe=He(!1),ae=He(!0),Ao=0;var Qe={general:[{key:"title",importance:"critical",description:"Page title"},{key:"meta:description",importance:"critical",description:"Page description"},{key:"meta:keywords",importance:"medium",description:"Page keywords"},{key:"link:favicon",importance:"low",description:"Favicon"}],opengraph:[{key:"og:title",importance:"critical",description:"OG title"},{key:"og:description",importance:"critical",description:"OG description"},{key:"og:image",importance:"critical",description:"OG image"},{key:"og:url",importance:"medium",description:"OG URL"},{key:"og:type",importance:"medium",description:"OG type"},{key:"og:site_name",importance:"low",description:"OG site name"}],twitter:[{key:"twitter:title",importance:"medium",description:"Twitter title"},{key:"twitter:description",importance:"medium",description:"Twitter description"},{key:"twitter:image",importance:"medium",description:"Twitter image"},{key:"twitter:card",importance:"medium",description:"Twitter card type"},{key:"twitter:site",importance:"low",description:"Twitter site account"},{key:"twitter:creator",importance:"low",description:"Twitter content creator"}],technical:[{key:"meta:viewport",importance:"critical",description:"Viewport settings"},{key:"link:canonical",importance:"medium",description:"Canonical URL"},{key:"meta:robots",importance:"medium",description:"Robots directives"},{key:"html:lang",importance:"medium",description:"Page language"}]};function Uo(t){let e={general:[],opengraph:[],twitter:[],technical:[],hasCritical:!1};return Object.keys(Qe).forEach(r=>{let o=Qe[r],n=t[r];o.forEach(i=>{let s=n[i.key];if(s==null||s===""||Array.isArray(s)&&s.length===0){let l={key:i.key,importance:i.importance,description:i.description};e[r].push(l),i.importance==="critical"&&(e.hasCritical=!0)}})}),e}function ht(){M.info("Extracting metadata from page");let t=Vo(),e={general:{title:document.title,"meta:description":_t("description"),"meta:author":_t("author"),"meta:keywords":$o("keywords"),"link:favicon":Bo(),"meta:theme-color":_t("theme-color")},opengraph:{"og:title":vt("og:title"),"og:description":vt("og:description"),"og:image":vt("og:image"),"og:url":vt("og:url"),"og:type":vt("og:type"),"og:site_name":vt("og:site_name")},twitter:{"twitter:title":xt("twitter:title"),"twitter:description":xt("twitter:description"),"twitter:image":xt("twitter:image"),"twitter:card":xt("twitter:card"),"twitter:site":xt("twitter:site"),"twitter:creator":xt("twitter:creator")},technical:{"meta:viewport":_t("viewport"),"meta:charset":document.characterSet,"link:canonical":Ho("canonical"),"meta:robots":_t("robots"),"html:lang":document.documentElement.lang||void 0,"meta:content-security-policy":Fo("Content-Security-Policy"),"header:strict-transport-security":Go()},structured:t,extractedAt:new Date().toISOString()};return e.missing=Uo(e),M.info("Metadata extracted:",e),e}function $o(t){let e=_t(t);if(e)return e.split(",").map(r=>r.trim()).filter(Boolean)}function Ho(t){let e=document.querySelector(`link[rel="${t}"]`);return e&&e.getAttribute("href")||void 0}function Fo(t){let e=document.querySelector(`meta[http-equiv="${t}"]`);return e&&e.getAttribute("content")||void 0}function Bo(){let t=[];try{let e=document.querySelector('link[rel="icon"]');if(e&&e.getAttribute("href")){let i=e.getAttribute("href");i&&t.push(i)}document.querySelectorAll('link[rel="apple-touch-icon"], link[rel="apple-touch-icon-precomposed"]').forEach(i=>{let s=i.getAttribute("href");s&&t.push(s)});let o=document.querySelector('meta[name="msapplication-TileImage"]');if(o&&o.getAttribute("content")){let i=o.getAttribute("content");i&&t.push(i)}let n=document.querySelector('link[rel="shortcut icon"]');if(n&&n.getAttribute("href")){let i=n.getAttribute("href");i&&t.push(i)}}catch(e){M.error("Error extracting favicons:",e)}return t.length>0?t:void 0}function Go(){try{let t=document.querySelector('meta[http-equiv="Strict-Transport-Security"]');return t&&t.getAttribute("content")||void 0}catch(t){M.error("Error extracting security headers:",t);return}}function Vo(){try{let t={jsonLd:[],microdata:[]};try{let e=document.querySelectorAll('script[type="application/ld+json"]');e&&e.length>0&&e.forEach((r,o)=>{var n;try{let i=r.textContent;if(i){let s=JSON.parse(i);t.jsonLd.push(s)}}catch(i){M.warn(`Failed to parse JSON-LD script #${o+1}:`,i),t.jsonLd.push({__error:"Failed to parse JSON-LD",__errorMessage:i instanceof Error?i.message:String(i),__rawContent:((n=r.textContent)==null?void 0:n.substring(0,150))+(r.textContent&&r.textContent.length>150?"...":"")})}})}catch(e){M.error("Error extracting JSON-LD data:",e)}try{let e=document.querySelectorAll("[itemscope]");e&&e.length>0&&e.forEach((r,o)=>{try{let n=r.getAttribute("itemtype"),i={},s=r.querySelectorAll("[itemprop]");s&&s.length>0&&s.forEach(l=>{try{let c=l.getAttribute("itemprop");if(!c)return;let p=null;l.hasAttribute("content")||l.tagName==="META"?p=l.getAttribute("content"):l.tagName==="IMG"?p=l.getAttribute("src"):l.tagName==="A"?p=l.getAttribute("href"):l.tagName==="TIME"?p=l.getAttribute("datetime"):p=l.textContent,p&&(i[c]=p)}catch(c){M.warn(`Error extracting microdata property in item #${o+1}:`,c),i[`__error_${Date.now()}`]=`Failed to extract property: ${c instanceof Error?c.message:String(c)}`}}),t.microdata.push({type:n||"Unknown",properties:i})}catch(n){M.warn(`Error processing microdata item #${o+1}:`,n),t.microdata.push({type:"Error",properties:{__error:`Failed to process microdata item: ${n instanceof Error?n.message:String(n)}`}})}})}catch(e){M.error("Error extracting microdata:",e)}return t.jsonLd.length>0||t.microdata.length>0?t:void 0}catch(t){return M.error("Error extracting structured data:",t),{jsonLd:[{__error:"Failed to extract structured data",__errorMessage:t instanceof Error?t.message:String(t),__timestamp:new Date().toISOString()}],microdata:[]}}}function _t(t){let e=document.querySelector(`meta[name="${t}"]`);return e&&e.getAttribute("content")||void 0}function vt(t){let e=document.querySelector(`meta[property="${t}"]`);return e&&e.getAttribute("content")||void 0}function xt(t){let e=document.querySelector(`meta[name="${t}"]`);return e&&e.getAttribute("content")||void 0}var At,j,de,tr,Rt=0,lr=[],H=v,er=H.__b,rr=H.__r,or=H.diffed,ar=H.__c,nr=H.unmount,ir=H.__;function ue(t,e){H.__h&&H.__h(j,t,Rt||e),Rt=0;var r=j.__H||(j.__H={__:[],__h:[]});return t>=r.__.length&&r.__.push({}),r.__[t]}function z(t){return Rt=1,cr(pr,t)}function cr(t,e,r){var o=ue(At++,2);if(o.t=t,!o.__c&&(o.__=[r?r(e):pr(void 0,e),function(l){var c=o.__N?o.__N[0]:o.__[0],p=o.t(c,l);c!==p&&(o.__N=[p,o.__[1]],o.__c.setState({}))}],o.__c=j,!j.__f)){var n=function(l,c,p){if(!o.__c.__H)return!0;var g=o.__c.__H.__.filter(function(w){return!!w.__c});if(g.every(function(w){return!w.__N}))return!i||i.call(this,l,c,p);var d=o.__c.props!==l;return g.forEach(function(w){if(w.__N){var u=w.__[0];w.__=w.__N,w.__N=void 0,u!==w.__[0]&&(d=!0)}}),i&&i.call(this,l,c,p)||d};j.__f=!0;var i=j.shouldComponentUpdate,s=j.componentWillUpdate;j.componentWillUpdate=function(l,c,p){if(this.__e){var g=i;i=void 0,n(l,c,p),i=g}s&&s.call(this,l,c,p)},j.shouldComponentUpdate=n}return o.__N||o.__}function Z(t,e){var r=ue(At++,3);!H.__s&&dr(r.__H,e)&&(r.__=t,r.u=e,j.__H.__h.push(r))}function Y(t){return Rt=5,ge(function(){return{current:t}},[])}function ge(t,e){var r=ue(At++,7);return dr(r.__H,e)&&(r.__=t(),r.__H=e,r.__h=t),r.__}function fe(t,e){return Rt=8,ge(function(){return t},e)}function Wo(){for(var t;t=lr.shift();)if(t.__P&&t.__H)try{t.__H.__h.forEach(Gt),t.__H.__h.forEach(pe),t.__H.__h=[]}catch(e){t.__H.__h=[],H.__e(e,t.__v)}}H.__b=function(t){j=null,er&&er(t)},H.__=function(t,e){t&&e.__k&&e.__k.__m&&(t.__m=e.__k.__m),ir&&ir(t,e)},H.__r=function(t){rr&&rr(t),At=0;var e=(j=t.__c).__H;e&&(de===j?(e.__h=[],j.__h=[],e.__.forEach(function(r){r.__N&&(r.__=r.__N),r.u=r.__N=void 0})):(e.__h.forEach(Gt),e.__h.forEach(pe),e.__h=[],At=0)),de=j},H.diffed=function(t){or&&or(t);var e=t.__c;e&&e.__H&&(e.__H.__h.length&&(lr.push(e)!==1&&tr===H.requestAnimationFrame||((tr=H.requestAnimationFrame)||Jo)(Wo)),e.__H.__.forEach(function(r){r.u&&(r.__H=r.u),r.u=void 0})),de=j=null},H.__c=function(t,e){e.some(function(r){try{r.__h.forEach(Gt),r.__h=r.__h.filter(function(o){return!o.__||pe(o)})}catch(o){e.some(function(n){n.__h&&(n.__h=[])}),e=[],H.__e(o,r.__v)}}),ar&&ar(t,e)},H.unmount=function(t){nr&&nr(t);var e,r=t.__c;r&&r.__H&&(r.__H.__.forEach(function(o){try{Gt(o)}catch(n){e=n}}),r.__H=void 0,e&&H.__e(e,r.__v))};var sr=typeof requestAnimationFrame=="function";function Jo(t){var e,r=function(){clearTimeout(o),sr&&cancelAnimationFrame(e),setTimeout(t)},o=setTimeout(r,100);sr&&(e=requestAnimationFrame(r))}function Gt(t){var e=j,r=t.__c;typeof r=="function"&&(t.__c=void 0,r()),j=e}function pe(t){var e=j;t.__c=t.__(),j=e}function dr(t,e){return!t||t.length!==e.length||e.some(function(r,o){return r!==t[o]})}function pr(t,e){return typeof e=="function"?e(t):e}function ur(t){var e,r,o="";if(typeof t=="string"||typeof t=="number")o+=t;else if(typeof t=="object")if(Array.isArray(t)){var n=t.length;for(e=0;e<n;e++)t[e]&&(r=ur(t[e]))&&(o&&(o+=" "),o+=r)}else for(r in t)t[r]&&(o&&(o+=" "),o+=r);return o}function gr(){for(var t,e,r=0,o="",n=arguments.length;r<n;r++)(t=arguments[r])&&(e=ur(t))&&(o&&(o+=" "),o+=e);return o}var ye="-",qo=t=>{let e=Yo(t),{conflictingClassGroups:r,conflictingClassGroupModifiers:o}=t;return{getClassGroupId:s=>{let l=s.split(ye);return l[0]===""&&l.length!==1&&l.shift(),br(l,e)||Xo(s)},getConflictingClassGroupIds:(s,l)=>{let c=r[s]||[];return l&&o[s]?[...c,...o[s]]:c}}},br=(t,e)=>{var s;if(t.length===0)return e.classGroupId;let r=t[0],o=e.nextPart.get(r),n=o?br(t.slice(1),o):void 0;if(n)return n;if(e.validators.length===0)return;let i=t.join(ye);return(s=e.validators.find(({validator:l})=>l(i)))==null?void 0:s.classGroupId},fr=/^\[(.+)\]$/,Xo=t=>{if(fr.test(t)){let e=fr.exec(t)[1],r=e==null?void 0:e.substring(0,e.indexOf(":"));if(r)return"arbitrary.."+r}},Yo=t=>{let{theme:e,classGroups:r}=t,o={nextPart:new Map,validators:[]};for(let n in r)me(r[n],o,n,e);return o},me=(t,e,r,o)=>{t.forEach(n=>{if(typeof n=="string"){let i=n===""?e:hr(e,n);i.classGroupId=r;return}if(typeof n=="function"){if(Ko(n)){me(n(o),e,r,o);return}e.validators.push({validator:n,classGroupId:r});return}Object.entries(n).forEach(([i,s])=>{me(s,hr(e,i),r,o)})})},hr=(t,e)=>{let r=t;return e.split(ye).forEach(o=>{r.nextPart.has(o)||r.nextPart.set(o,{nextPart:new Map,validators:[]}),r=r.nextPart.get(o)}),r},Ko=t=>t.isThemeGetter,Zo=t=>{if(t<1)return{get:()=>{},set:()=>{}};let e=0,r=new Map,o=new Map,n=(i,s)=>{r.set(i,s),e++,e>t&&(e=0,o=r,r=new Map)};return{get(i){let s=r.get(i);if(s!==void 0)return s;if((s=o.get(i))!==void 0)return n(i,s),s},set(i,s){r.has(i)?r.set(i,s):n(i,s)}}},be="!",we=":",Qo=we.length,ta=t=>{let{prefix:e,experimentalParseClassName:r}=t,o=n=>{let i=[],s=0,l=0,c=0,p;for(let m=0;m<n.length;m++){let O=n[m];if(s===0&&l===0){if(O===we){i.push(n.slice(c,m)),c=m+Qo;continue}if(O==="/"){p=m;continue}}O==="["?s++:O==="]"?s--:O==="("?l++:O===")"&&l--}let g=i.length===0?n:n.substring(c),d=ea(g),w=d!==g,u=p&&p>c?p-c:void 0;return{modifiers:i,hasImportantModifier:w,baseClassName:d,maybePostfixModifierPosition:u}};if(e){let n=e+we,i=o;o=s=>s.startsWith(n)?i(s.substring(n.length)):{isExternal:!0,modifiers:[],hasImportantModifier:!1,baseClassName:s,maybePostfixModifierPosition:void 0}}if(r){let n=o;o=i=>r({className:i,parseClassName:n})}return o},ea=t=>t.endsWith(be)?t.substring(0,t.length-1):t.startsWith(be)?t.substring(1):t,ra=t=>{let e=Object.fromEntries(t.orderSensitiveModifiers.map(o=>[o,!0]));return o=>{if(o.length<=1)return o;let n=[],i=[];return o.forEach(s=>{s[0]==="["||e[s]?(n.push(...i.sort(),s),i=[]):i.push(s)}),n.push(...i.sort()),n}},oa=t=>({cache:Zo(t.cacheSize),parseClassName:ta(t),sortModifiers:ra(t),...qo(t)}),aa=/\s+/,na=(t,e)=>{let{parseClassName:r,getClassGroupId:o,getConflictingClassGroupIds:n,sortModifiers:i}=e,s=[],l=t.trim().split(aa),c="";for(let p=l.length-1;p>=0;p-=1){let g=l[p],{isExternal:d,modifiers:w,hasImportantModifier:u,baseClassName:m,maybePostfixModifierPosition:O}=r(g);if(d){c=g+(c.length>0?" "+c:c);continue}let L=!!O,x=o(L?m.substring(0,O):m);if(!x){if(!L){c=g+(c.length>0?" "+c:c);continue}if(x=o(m),!x){c=g+(c.length>0?" "+c:c);continue}L=!1}let _=i(w).join(":"),F=u?_+be:_,U=F+x;if(s.includes(U))continue;s.push(U);let S=n(x,L);for(let b=0;b<S.length;++b){let R=S[b];s.push(F+R)}c=g+(c.length>0?" "+c:c)}return c};function ia(){let t=0,e,r,o="";for(;t<arguments.length;)(e=arguments[t++])&&(r=wr(e))&&(o&&(o+=" "),o+=r);return o}var wr=t=>{if(typeof t=="string")return t;let e,r="";for(let o=0;o<t.length;o++)t[o]&&(e=wr(t[o]))&&(r&&(r+=" "),r+=e);return r};function sa(t,...e){let r,o,n,i=s;function s(c){let p=e.reduce((g,d)=>d(g),t());return r=oa(p),o=r.cache.get,n=r.cache.set,i=l,l(c)}function l(c){let p=o(c);if(p)return p;let g=na(c,r);return n(c,g),g}return function(){return i(ia.apply(null,arguments))}}var W=t=>{let e=r=>r[t]||[];return e.isThemeGetter=!0,e},yr=/^\[(?:(\w[\w-]*):)?(.+)\]$/i,vr=/^\((?:(\w[\w-]*):)?(.+)\)$/i,la=/^\d+\/\d+$/,ca=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,da=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,pa=/^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,ua=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,ga=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,kt=t=>la.test(t),E=t=>!!t&&!Number.isNaN(Number(t)),mt=t=>!!t&&Number.isInteger(Number(t)),mr=t=>t.endsWith("%")&&E(t.slice(0,-1)),dt=t=>ca.test(t),fa=()=>!0,ha=t=>da.test(t)&&!pa.test(t),ve=()=>!1,ma=t=>ua.test(t),ba=t=>ga.test(t),wa=t=>!f(t)&&!h(t),ya=t=>St(t,kr,ve),f=t=>yr.test(t),bt=t=>St(t,Sr,ha),he=t=>St(t,La,E),va=t=>St(t,xr,ve),xa=t=>St(t,_r,ba),_a=t=>St(t,ve,ma),h=t=>vr.test(t),Vt=t=>Mt(t,Sr),ka=t=>Mt(t,Ia),Sa=t=>Mt(t,xr),Ma=t=>Mt(t,kr),Ca=t=>Mt(t,_r),Na=t=>Mt(t,Oa,!0),St=(t,e,r)=>{let o=yr.exec(t);return o?o[1]?e(o[1]):r(o[2]):!1},Mt=(t,e,r=!1)=>{let o=vr.exec(t);return o?o[1]?e(o[1]):r:!1},xr=t=>t==="position",Ea=new Set(["image","url"]),_r=t=>Ea.has(t),Ta=new Set(["length","size","percentage"]),kr=t=>Ta.has(t),Sr=t=>t==="length",La=t=>t==="number",Ia=t=>t==="family-name",Oa=t=>t==="shadow";var Aa=()=>{let t=W("color"),e=W("font"),r=W("text"),o=W("font-weight"),n=W("tracking"),i=W("leading"),s=W("breakpoint"),l=W("container"),c=W("spacing"),p=W("radius"),g=W("shadow"),d=W("inset-shadow"),w=W("drop-shadow"),u=W("blur"),m=W("perspective"),O=W("aspect"),L=W("ease"),x=W("animate"),_=()=>["auto","avoid","all","avoid-page","page","left","right","column"],F=()=>["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"],U=()=>["auto","hidden","clip","visible","scroll"],S=()=>["auto","contain","none"],b=()=>[h,f,c],R=()=>[kt,"full","auto",...b()],q=()=>[mt,"none","subgrid",h,f],Q=()=>["auto",{span:["full",mt,h,f]},h,f],y=()=>[mt,"auto",h,f],T=()=>["auto","min","max","fr",h,f],P=()=>["start","end","center","between","around","evenly","stretch","baseline"],tt=()=>["start","end","center","stretch"],X=()=>["auto",...b()],nt=()=>[kt,"auto","full","dvw","dvh","lvw","lvh","svw","svh","min","max","fit",...b()],I=()=>[t,h,f],Et=()=>[mr,bt],B=()=>["","none","full",p,h,f],G=()=>["",E,Vt,bt],ut=()=>["solid","dashed","dotted","double"],Tt=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],C=()=>["","none",u,h,f],k=()=>["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",h,f],$=()=>["none",E,h,f],V=()=>["none",E,h,f],gt=()=>[E,h,f],rt=()=>[kt,"full",...b()];return{cacheSize:500,theme:{animate:["spin","ping","pulse","bounce"],aspect:["video"],blur:[dt],breakpoint:[dt],color:[fa],container:[dt],"drop-shadow":[dt],ease:["in","out","in-out"],font:[wa],"font-weight":["thin","extralight","light","normal","medium","semibold","bold","extrabold","black"],"inset-shadow":[dt],leading:["none","tight","snug","normal","relaxed","loose"],perspective:["dramatic","near","normal","midrange","distant","none"],radius:[dt],shadow:[dt],spacing:["px",E],text:[dt],tracking:["tighter","tight","normal","wide","wider","widest"]},classGroups:{aspect:[{aspect:["auto","square",kt,f,h,O]}],container:["container"],columns:[{columns:[E,f,h,l]}],"break-after":[{"break-after":_()}],"break-before":[{"break-before":_()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],sr:["sr-only","not-sr-only"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[...F(),f,h]}],overflow:[{overflow:U()}],"overflow-x":[{"overflow-x":U()}],"overflow-y":[{"overflow-y":U()}],overscroll:[{overscroll:S()}],"overscroll-x":[{"overscroll-x":S()}],"overscroll-y":[{"overscroll-y":S()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:R()}],"inset-x":[{"inset-x":R()}],"inset-y":[{"inset-y":R()}],start:[{start:R()}],end:[{end:R()}],top:[{top:R()}],right:[{right:R()}],bottom:[{bottom:R()}],left:[{left:R()}],visibility:["visible","invisible","collapse"],z:[{z:[mt,"auto",h,f]}],basis:[{basis:[kt,"full","auto",l,...b()]}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["nowrap","wrap","wrap-reverse"]}],flex:[{flex:[E,kt,"auto","initial","none",f]}],grow:[{grow:["",E,h,f]}],shrink:[{shrink:["",E,h,f]}],order:[{order:[mt,"first","last","none",h,f]}],"grid-cols":[{"grid-cols":q()}],"col-start-end":[{col:Q()}],"col-start":[{"col-start":y()}],"col-end":[{"col-end":y()}],"grid-rows":[{"grid-rows":q()}],"row-start-end":[{row:Q()}],"row-start":[{"row-start":y()}],"row-end":[{"row-end":y()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":T()}],"auto-rows":[{"auto-rows":T()}],gap:[{gap:b()}],"gap-x":[{"gap-x":b()}],"gap-y":[{"gap-y":b()}],"justify-content":[{justify:[...P(),"normal"]}],"justify-items":[{"justify-items":[...tt(),"normal"]}],"justify-self":[{"justify-self":["auto",...tt()]}],"align-content":[{content:["normal",...P()]}],"align-items":[{items:[...tt(),"baseline"]}],"align-self":[{self:["auto",...tt(),"baseline"]}],"place-content":[{"place-content":P()}],"place-items":[{"place-items":[...tt(),"baseline"]}],"place-self":[{"place-self":["auto",...tt()]}],p:[{p:b()}],px:[{px:b()}],py:[{py:b()}],ps:[{ps:b()}],pe:[{pe:b()}],pt:[{pt:b()}],pr:[{pr:b()}],pb:[{pb:b()}],pl:[{pl:b()}],m:[{m:X()}],mx:[{mx:X()}],my:[{my:X()}],ms:[{ms:X()}],me:[{me:X()}],mt:[{mt:X()}],mr:[{mr:X()}],mb:[{mb:X()}],ml:[{ml:X()}],"space-x":[{"space-x":b()}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":b()}],"space-y-reverse":["space-y-reverse"],size:[{size:nt()}],w:[{w:[l,"screen",...nt()]}],"min-w":[{"min-w":[l,"screen","none",...nt()]}],"max-w":[{"max-w":[l,"screen","none","prose",{screen:[s]},...nt()]}],h:[{h:["screen",...nt()]}],"min-h":[{"min-h":["screen","none",...nt()]}],"max-h":[{"max-h":["screen",...nt()]}],"font-size":[{text:["base",r,Vt,bt]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:[o,h,he]}],"font-stretch":[{"font-stretch":["ultra-condensed","extra-condensed","condensed","semi-condensed","normal","semi-expanded","expanded","extra-expanded","ultra-expanded",mr,f]}],"font-family":[{font:[ka,f,e]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractions"],tracking:[{tracking:[n,h,f]}],"line-clamp":[{"line-clamp":[E,"none",h,he]}],leading:[{leading:[i,...b()]}],"list-image":[{"list-image":["none",h,f]}],"list-style-position":[{list:["inside","outside"]}],"list-style-type":[{list:["disc","decimal","none",h,f]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"placeholder-color":[{placeholder:I()}],"text-color":[{text:I()}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...ut(),"wavy"]}],"text-decoration-thickness":[{decoration:[E,"from-font","auto",h,bt]}],"text-decoration-color":[{decoration:I()}],"underline-offset":[{"underline-offset":[E,"auto",h,f]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:b()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",h,f]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",h,f]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[...F(),Sa,va]}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","space","round"]}]}],"bg-size":[{bg:["auto","cover","contain",Ma,ya]}],"bg-image":[{bg:["none",{linear:[{to:["t","tr","r","br","b","bl","l","tl"]},mt,h,f],radial:["",h,f],conic:[mt,h,f]},Ca,xa]}],"bg-color":[{bg:I()}],"gradient-from-pos":[{from:Et()}],"gradient-via-pos":[{via:Et()}],"gradient-to-pos":[{to:Et()}],"gradient-from":[{from:I()}],"gradient-via":[{via:I()}],"gradient-to":[{to:I()}],rounded:[{rounded:B()}],"rounded-s":[{"rounded-s":B()}],"rounded-e":[{"rounded-e":B()}],"rounded-t":[{"rounded-t":B()}],"rounded-r":[{"rounded-r":B()}],"rounded-b":[{"rounded-b":B()}],"rounded-l":[{"rounded-l":B()}],"rounded-ss":[{"rounded-ss":B()}],"rounded-se":[{"rounded-se":B()}],"rounded-ee":[{"rounded-ee":B()}],"rounded-es":[{"rounded-es":B()}],"rounded-tl":[{"rounded-tl":B()}],"rounded-tr":[{"rounded-tr":B()}],"rounded-br":[{"rounded-br":B()}],"rounded-bl":[{"rounded-bl":B()}],"border-w":[{border:G()}],"border-w-x":[{"border-x":G()}],"border-w-y":[{"border-y":G()}],"border-w-s":[{"border-s":G()}],"border-w-e":[{"border-e":G()}],"border-w-t":[{"border-t":G()}],"border-w-r":[{"border-r":G()}],"border-w-b":[{"border-b":G()}],"border-w-l":[{"border-l":G()}],"divide-x":[{"divide-x":G()}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":G()}],"divide-y-reverse":["divide-y-reverse"],"border-style":[{border:[...ut(),"hidden","none"]}],"divide-style":[{divide:[...ut(),"hidden","none"]}],"border-color":[{border:I()}],"border-color-x":[{"border-x":I()}],"border-color-y":[{"border-y":I()}],"border-color-s":[{"border-s":I()}],"border-color-e":[{"border-e":I()}],"border-color-t":[{"border-t":I()}],"border-color-r":[{"border-r":I()}],"border-color-b":[{"border-b":I()}],"border-color-l":[{"border-l":I()}],"divide-color":[{divide:I()}],"outline-style":[{outline:[...ut(),"none","hidden"]}],"outline-offset":[{"outline-offset":[E,h,f]}],"outline-w":[{outline:["",E,Vt,bt]}],"outline-color":[{outline:[t]}],shadow:[{shadow:["","none",g,Na,_a]}],"shadow-color":[{shadow:I()}],"inset-shadow":[{"inset-shadow":["none",h,f,d]}],"inset-shadow-color":[{"inset-shadow":I()}],"ring-w":[{ring:G()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:I()}],"ring-offset-w":[{"ring-offset":[E,bt]}],"ring-offset-color":[{"ring-offset":I()}],"inset-ring-w":[{"inset-ring":G()}],"inset-ring-color":[{"inset-ring":I()}],opacity:[{opacity:[E,h,f]}],"mix-blend":[{"mix-blend":[...Tt(),"plus-darker","plus-lighter"]}],"bg-blend":[{"bg-blend":Tt()}],filter:[{filter:["","none",h,f]}],blur:[{blur:C()}],brightness:[{brightness:[E,h,f]}],contrast:[{contrast:[E,h,f]}],"drop-shadow":[{"drop-shadow":["","none",w,h,f]}],grayscale:[{grayscale:["",E,h,f]}],"hue-rotate":[{"hue-rotate":[E,h,f]}],invert:[{invert:["",E,h,f]}],saturate:[{saturate:[E,h,f]}],sepia:[{sepia:["",E,h,f]}],"backdrop-filter":[{"backdrop-filter":["","none",h,f]}],"backdrop-blur":[{"backdrop-blur":C()}],"backdrop-brightness":[{"backdrop-brightness":[E,h,f]}],"backdrop-contrast":[{"backdrop-contrast":[E,h,f]}],"backdrop-grayscale":[{"backdrop-grayscale":["",E,h,f]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[E,h,f]}],"backdrop-invert":[{"backdrop-invert":["",E,h,f]}],"backdrop-opacity":[{"backdrop-opacity":[E,h,f]}],"backdrop-saturate":[{"backdrop-saturate":[E,h,f]}],"backdrop-sepia":[{"backdrop-sepia":["",E,h,f]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":b()}],"border-spacing-x":[{"border-spacing-x":b()}],"border-spacing-y":[{"border-spacing-y":b()}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["","all","colors","opacity","shadow","transform","none",h,f]}],"transition-behavior":[{transition:["normal","discrete"]}],duration:[{duration:[E,"initial",h,f]}],ease:[{ease:["linear","initial",L,h,f]}],delay:[{delay:[E,h,f]}],animate:[{animate:["none",x,h,f]}],backface:[{backface:["hidden","visible"]}],perspective:[{perspective:[m,h,f]}],"perspective-origin":[{"perspective-origin":k()}],rotate:[{rotate:$()}],"rotate-x":[{"rotate-x":$()}],"rotate-y":[{"rotate-y":$()}],"rotate-z":[{"rotate-z":$()}],scale:[{scale:V()}],"scale-x":[{"scale-x":V()}],"scale-y":[{"scale-y":V()}],"scale-z":[{"scale-z":V()}],"scale-3d":["scale-3d"],skew:[{skew:gt()}],"skew-x":[{"skew-x":gt()}],"skew-y":[{"skew-y":gt()}],transform:[{transform:[h,f,"","none","gpu","cpu"]}],"transform-origin":[{origin:k()}],"transform-style":[{transform:["3d","flat"]}],translate:[{translate:rt()}],"translate-x":[{"translate-x":rt()}],"translate-y":[{"translate-y":rt()}],"translate-z":[{"translate-z":rt()}],"translate-none":["translate-none"],accent:[{accent:I()}],appearance:[{appearance:["none","auto"]}],"caret-color":[{caret:I()}],"color-scheme":[{scheme:["normal","dark","light","light-dark","only-dark","only-light"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",h,f]}],"field-sizing":[{"field-sizing":["fixed","content"]}],"pointer-events":[{"pointer-events":["auto","none"]}],resize:[{resize:["none","","y","x"]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":b()}],"scroll-mx":[{"scroll-mx":b()}],"scroll-my":[{"scroll-my":b()}],"scroll-ms":[{"scroll-ms":b()}],"scroll-me":[{"scroll-me":b()}],"scroll-mt":[{"scroll-mt":b()}],"scroll-mr":[{"scroll-mr":b()}],"scroll-mb":[{"scroll-mb":b()}],"scroll-ml":[{"scroll-ml":b()}],"scroll-p":[{"scroll-p":b()}],"scroll-px":[{"scroll-px":b()}],"scroll-py":[{"scroll-py":b()}],"scroll-ps":[{"scroll-ps":b()}],"scroll-pe":[{"scroll-pe":b()}],"scroll-pt":[{"scroll-pt":b()}],"scroll-pr":[{"scroll-pr":b()}],"scroll-pb":[{"scroll-pb":b()}],"scroll-pl":[{"scroll-pl":b()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",h,f]}],fill:[{fill:["none",...I()]}],"stroke-w":[{stroke:[E,Vt,bt,he]}],stroke:[{stroke:["none",...I()]}],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-s","border-color-e","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],translate:["translate-x","translate-y","translate-none"],"translate-none":["translate","translate-x","translate-y","translate-z"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]},orderSensitiveModifiers:["before","after","placeholder","file","marker","selection","first-line","first-letter","backdrop","*","**"]}};var Mr=sa(Aa);function K(...t){return Mr(gr(t))}var Ra=0,En=Array.isArray;function a(t,e,r,o,n,i){e||(e={});var s,l,c=e;if("ref"in c)for(l in c={},e)l=="ref"?s=e[l]:c[l]=e[l];var p={type:t,props:c,key:r,ref:s,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--Ra,__i:-1,__u:0,__source:n,__self:i};if(typeof t=="function"&&(s=t.defaultProps))for(l in s)c[l]===void 0&&(c[l]=s[l]);return v.vnode&&v.vnode(p),p}var Cr=()=>a("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[a("path",{d:"M13 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6"}),a("path",{d:"m3 3 9 9"}),a("path",{d:"M3 9V3h6"})]}),Nr=()=>a("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[a("path",{d:"M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"}),a("path",{d:"m21 3-9 9"}),a("path",{d:"M15 3h6v6"})]}),Er=()=>a("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[a("path",{d:"M13 21h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6"}),a("path",{d:"m3 21 9-9"}),a("path",{d:"M9 21H3v-6"})]}),Tr=()=>a("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[a("path",{d:"M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"}),a("path",{d:"m21 21-9-9"}),a("path",{d:"M21 15v6h-6"})]}),Lr=()=>a("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[a("circle",{cx:"12",cy:"12",r:"4"}),a("path",{d:"M12 2v2"}),a("path",{d:"M12 20v2"}),a("path",{d:"m4.93 4.93 1.41 1.41"}),a("path",{d:"m17.66 17.66 1.41 1.41"}),a("path",{d:"M2 12h2"}),a("path",{d:"M20 12h2"}),a("path",{d:"m6.34 17.66-1.41 1.41"}),a("path",{d:"m19.07 4.93-1.41 1.41"})]}),Ir=()=>a("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:a("path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"})}),Or=()=>a("svg",{width:18,height:18,viewBox:"0 0 32 32",stroke:"currentColor",xmlns:"http://www.w3.org/2000/svg",children:a("path",{d:"M27.232 3.993h-.8a.8.8 0 0 0-.681.381l-.002.003-9.75 16.058L6.251 4.377a.8.8 0 0 0-.683-.385h-.8a.8.8 0 0 0-.8.8v22.4c0 .442.358.8.8.801h.928a.8.8 0 0 0 .8-.801V9.605l8.437 13.905a.8.8 0 0 0 .684.387h.736a.8.8 0 0 0 .682-.381l.002-.003 8.467-13.915v17.595c.001.442.359.8.801.801h.928a.803.803 0 0 0 .801-.801v-22.4a.8.8 0 0 0-.801-.8z"})}),Ar=()=>a("svg",{width:18,height:18,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[a("path",{d:"M18 6 6 18"}),a("path",{d:"m6 6 12 12"})]}),Rr=()=>a("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[a("path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}),a("path",{d:"M21 3v5h-5"}),a("path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}),a("path",{d:"M3 21v-5h5"})]}),xe=()=>a("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[a("rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2"}),a("path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"})]}),_e=()=>a("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:a("path",{d:"M20 6 9 17l-5-5"})});var Pr=()=>a("svg",{xmlns:"http://www.w3.org/2000/svg",width:14,height:14,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"lucide lucide-info",children:[a("circle",{cx:12,cy:12,r:10}),a("path",{d:"M12 16v-4"}),a("path",{d:"M12 8h.01"})]}),zr=()=>a("svg",{xmlns:"http://www.w3.org/2000/svg",width:14,height:14,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"lucide lucide-bug",children:[a("path",{d:"m8 2 1.88 1.88"}),a("path",{d:"M14.12 3.88 16 2"}),a("path",{d:"M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"}),a("path",{d:"M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"}),a("path",{d:"M12 20v-9"}),a("path",{d:"M6.53 9C4.6 8.8 3 7.1 3 5"}),a("path",{d:"M6 13H2"}),a("path",{d:"M3 21c0-2.1 1.7-3.9 3.8-4"}),a("path",{d:"M20.97 5c0 2.1-1.6 3.8-3.5 4"}),a("path",{d:"M22 13h-4"}),a("path",{d:"M17.2 17c2.1.1 3.8 1.9 3.8 4"})]}),Dr=()=>a("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:a("path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"})}),jr=()=>a("svg",{xmlns:"http://www.w3.org/2000/svg",width:14,height:14,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"lucide lucide-circle-help",children:[a("circle",{cx:12,cy:12,r:10}),a("path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"}),a("path",{d:"M12 17h.01"})]}),Ur=()=>a("svg",{xmlns:"http://www.w3.org/2000/svg",width:14,height:14,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",children:[a("path",{d:"M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"}),a("path",{d:"m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"}),a("path",{d:"M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"}),a("path",{d:"M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"})]}),$r=()=>a("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[a("path",{d:"M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"}),a("path",{d:"M16 3h1a2 2 0 0 1 2 2v5a2 2 0 0 0 2 2 2 2 0 0 0-2 2v5a2 2 0 0 1-2 2h-1"})]});var Hr=()=>a("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[a("rect",{x:"4",y:"4",width:"16",height:"16",rx:"2"}),a("path",{d:"M4 12h16"}),a("path",{d:"M12 4v16"})]});var Fr=({showSettingsMenu:t,toggleSettingsMenu:e,version:r})=>a(D,{children:[a("div",{className:"relative",children:a("button",{id:"settings-toggle",onClick:e,className:"w-6 h-6 flex items-center justify-center text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 bg-gray-100 dark:bg-gray-700 rounded-full",title:"Help & Support",children:a(jr,{})})}),t&&a("div",{className:"absolute w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700 settings-menu",style:{top:"3.5rem",right:"3.5rem"},children:[a("a",{href:"https://github.com/rjvim/meta-scan",target:"_blank",rel:"noopener noreferrer",className:"flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",children:[a("span",{className:"mr-2",children:a(Pr,{})}),"About"]}),a("a",{href:"https://github.com/rjvim/meta-scan/issues/new",target:"_blank",rel:"noopener noreferrer",className:"flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",children:[a("span",{className:"mr-2",children:a(zr,{})}),"Raise an issue"]}),a("a",{href:"https://github.com/rjvim/meta-scan#documentation",target:"_blank",rel:"noopener noreferrer",className:"flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",children:[a("span",{className:"mr-2",children:a(Dr,{})}),"Documentation"]}),a("a",{href:`https://github.com/rjvim/meta-scan/releases/tag/v${r}`,target:"_blank",rel:"noopener noreferrer",className:"flex items-center px-4 py-2 text-sm text-blue-600 dark:text-blue-400 border-t border-gray-200 dark:border-gray-700 mt-1 hover:bg-gray-100 dark:hover:bg-gray-700",children:a("div",{className:"flex items-center",children:[a("span",{className:"mr-2",children:a(Ur,{})}),"Version: ",r]})})]})]});var Br=({theme:t,toggleTheme:e})=>{let r=Y(null),o=Y(!1),n=Y();return a("button",{ref:r,onClick:()=>{var d;if(o.current)return;n.current&&clearTimeout(n.current),o.current=!0,(d=r.current)==null||d.setAttribute("disabled","true");let s=r.current;if(!s){e();return}let l=s.getBoundingClientRect(),c=l.left+l.width/2,p=l.top+l.height/2,g=new CSSStyleSheet;g.replaceSync(`
      ::view-transition-group(root) {
        animation-duration: 1200ms;
        animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      }

      ::view-transition-new(root),
      ::view-transition-old(root) {
        animation: none;
        mix-blend-mode: normal;
        transform-origin: ${c}px ${p}px;
      }

      ::view-transition-new(root) {
        mask: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="-50 -50 100 100"><defs><filter id="blur"><feGaussianBlur stdDeviation="5"/></filter></defs><circle cx="0" cy="0" r="25" fill="white" filter="url(%23blur)"/></svg>') 0 0 / 100% 100% no-repeat;
        mask-position: ${c}px ${p}px;
        animation: maskScale 1200ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
      }

      ::view-transition-old(root) {
        animation: maskScale 1200ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
      }

      @keyframes maskScale {
        0% {
          mask-size: 0px;
          mask-position: ${c}px ${p}px;
        }
        100% {
          mask-size: 10240px;
          mask-position: ${c-5120}px ${p-5120}px;
        }
      }
    `),document.adoptedStyleSheets=[...document.adoptedStyleSheets,g],"startViewTransition"in document?document.startViewTransition(()=>{e()}).finished.finally(()=>{var w;o.current=!1,(w=r.current)==null||w.removeAttribute("disabled")}):(e(),n.current=window.setTimeout(()=>{var w;o.current=!1,(w=r.current)==null||w.removeAttribute("disabled")},1200))},className:`
        w-6 h-6 flex items-center justify-center 
        relative overflow-hidden
        text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 
        bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600
        rounded-full shadow-sm hover:shadow-md
        transition-all duration-300
        transform hover:scale-110
      `,style:{transition:"all 0.3s ease-out"},title:`Switch to ${t==="light"?"dark":"light"} theme`,children:a("div",{className:"relative z-10 transition-transform duration-500 hover:scale-110",children:t==="dark"?a(Ir,{}):a(Lr,{})})})};var Gr=({show:t,children:e,className:r="",style:o={}})=>{let[n,i]=z(!1),s=Y(t);return Z(()=>{if(!t&&s.current){i(!0);let l=setTimeout(()=>i(!1),200);return()=>clearTimeout(l)}s.current=t},[t]),!t&&!n?null:a("div",{className:`
        ${r}
        transform origin-top-left
        transition-all duration-200 ease-out
        ${t?"opacity-100 scale-100":"opacity-0 scale-95"}
      `,style:{...o,pointerEvents:t?"auto":"none"},children:e})};var Vr=({showPositionMenu:t,togglePositionMenu:e,changePosition:r,uiState:o})=>a("div",{className:"relative",children:[a("button",{id:"position-toggle",onClick:e,className:"w-6 h-6 flex items-center justify-center text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 bg-gray-100 dark:bg-gray-700 rounded-full",title:"Switch Position",children:a(Hr,{})}),a(Gr,{show:t,className:"w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700",style:{position:"absolute",top:"calc(100% + 0.5rem)",right:0,zIndex:9999},children:[a("button",{onClick:()=>{r("top-left"),e(new MouseEvent("click"))},className:`flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full ${o.position==="top-left"?"bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300":""}`,children:[a("span",{className:"mr-2",children:a(Cr,{})}),"Top Left"]}),a("button",{onClick:()=>{r("top-right"),e(new MouseEvent("click"))},className:`flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full ${o.position==="top-right"?"bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300":""}`,children:[a("span",{className:"mr-2",children:a(Nr,{})}),"Top Right"]}),a("button",{onClick:()=>{r("bottom-left"),e(new MouseEvent("click"))},className:`flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full ${o.position==="bottom-left"?"bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300":""}`,children:[a("span",{className:"mr-2",children:a(Er,{})}),"Bottom Left"]}),a("button",{onClick:()=>{r("bottom-right"),e(new MouseEvent("click"))},className:`flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full ${o.position==="bottom-right"?"bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300":""}`,children:[a("span",{className:"mr-2",children:a(Tr,{})}),"Bottom Right"]})]})]});var Wr=({value:t,onChange:e,placeholder:r="Search...",className:o="",ref:n})=>{let[i,s]=z(!1),l=p=>{let g=p.target.value;e(g),s(!0),setTimeout(()=>s(!1),300)},c=()=>{e(""),s(!1),n&&"current"in n&&n.current&&n.current.focus()};return a("div",{className:K("relative",o),children:[a("input",{ref:n,type:"text",value:t,onChange:l,placeholder:r,className:K("w-full px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-800","border border-gray-200 dark:border-gray-700 rounded-md","focus:outline-none focus:ring-1 focus:ring-purple-500 dark:focus:ring-purple-400",t?"pr-16":"")}),i&&a("div",{className:"absolute right-8 top-1/2 transform -translate-y-1/2",children:a("div",{className:"w-4 h-4 border-2 border-gray-300 border-t-gray-600 dark:border-gray-700 dark:border-t-gray-300 rounded-full animate-spin"})}),t&&a("button",{onClick:c,className:"absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 p-1",title:"Clear search",children:a("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:a("path",{d:"M18 6L6 18M6 6l12 12",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})})]})};function Da(t,e){for(var r in e)t[r]=e[r];return t}function Se(t,e){for(var r in t)if(r!=="__source"&&!(r in e))return!0;for(var o in e)if(o!=="__source"&&t[o]!==e[o])return!0;return!1}function Jr(t,e){this.props=t,this.context=e}function eo(t,e){function r(n){var i=this.props.ref,s=i==n.ref;return!s&&i&&(i.call?i(null):i.current=null),e?!e(this.props,n)||!s:Se(this.props,n)}function o(n){return this.shouldComponentUpdate=r,yt(t,n)}return o.displayName="Memo("+(t.displayName||t.name)+")",o.prototype.isReactComponent=!0,o.__f=!0,o}(Jr.prototype=new at).isPureReactComponent=!0,Jr.prototype.shouldComponentUpdate=function(t,e){return Se(this.props,t)||Se(this.state,e)};var qr=v.__b;v.__b=function(t){t.type&&t.type.__f&&t.ref&&(t.props.ref=t.ref,t.ref=null),qr&&qr(t)};var ii=typeof Symbol!="undefined"&&Symbol.for&&Symbol.for("react.forward_ref")||3911;var ja=v.__e;v.__e=function(t,e,r,o){if(t.then){for(var n,i=e;i=i.__;)if((n=i.__c)&&n.__c)return e.__e==null&&(e.__e=r.__e,e.__k=r.__k),n.__c(t,e)}ja(t,e,r,o)};var Xr=v.unmount;function ro(t,e,r){return t&&(t.__c&&t.__c.__H&&(t.__c.__H.__.forEach(function(o){typeof o.__c=="function"&&o.__c()}),t.__c.__H=null),(t=Da({},t)).__c!=null&&(t.__c.__P===r&&(t.__c.__P=e),t.__c=null),t.__k=t.__k&&t.__k.map(function(o){return ro(o,e,r)})),t}function oo(t,e,r){return t&&r&&(t.__v=null,t.__k=t.__k&&t.__k.map(function(o){return oo(o,e,r)}),t.__c&&t.__c.__P===e&&(t.__e&&r.appendChild(t.__e),t.__c.__e=!0,t.__c.__P=r)),t}function ke(){this.__u=0,this.o=null,this.__b=null}function ao(t){var e=t.__.__c;return e&&e.__a&&e.__a(t)}function Wt(){this.i=null,this.l=null}v.unmount=function(t){var e=t.__c;e&&e.__R&&e.__R(),e&&32&t.__u&&(t.type=null),Xr&&Xr(t)},(ke.prototype=new at).__c=function(t,e){var r=e.__c,o=this;o.o==null&&(o.o=[]),o.o.push(r);var n=ao(o.__v),i=!1,s=function(){i||(i=!0,r.__R=null,n?n(l):l())};r.__R=s;var l=function(){if(!--o.__u){if(o.state.__a){var c=o.state.__a;o.__v.__k[0]=oo(c,c.__c.__P,c.__c.__O)}var p;for(o.setState({__a:o.__b=null});p=o.o.pop();)p.forceUpdate()}};o.__u++||32&e.__u||o.setState({__a:o.__b=o.__v.__k[0]}),t.then(s,s)},ke.prototype.componentWillUnmount=function(){this.o=[]},ke.prototype.render=function(t,e){if(this.__b){if(this.__v.__k){var r=document.createElement("div"),o=this.__v.__k[0].__c;this.__v.__k[0]=ro(this.__b,r,o.__O=o.__P)}this.__b=null}var n=e.__a&&yt(D,null,t.fallback);return n&&(n.__u&=-33),[yt(D,null,e.__a?null:t.children),n]};var Yr=function(t,e,r){if(++r[1]===r[0]&&t.l.delete(e),t.props.revealOrder&&(t.props.revealOrder[0]!=="t"||!t.l.size))for(r=t.i;r;){for(;r.length>3;)r.pop()();if(r[1]<r[0])break;t.i=r=r[2]}};(Wt.prototype=new at).__a=function(t){var e=this,r=ao(e.__v),o=e.l.get(t);return o[0]++,function(n){var i=function(){e.props.revealOrder?(o.push(n),Yr(e,t,o)):n()};r?r(i):i()}},Wt.prototype.render=function(t){this.i=null,this.l=new Map;var e=Ot(t.children);t.revealOrder&&t.revealOrder[0]==="b"&&e.reverse();for(var r=e.length;r--;)this.l.set(e[r],this.i=[1,0,this.i]);return t.children},Wt.prototype.componentDidUpdate=Wt.prototype.componentDidMount=function(){var t=this;this.l.forEach(function(e,r){Yr(t,r,e)})};var Ua=typeof Symbol!="undefined"&&Symbol.for&&Symbol.for("react.element")||60103,$a=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,Ha=/^on(Ani|Tra|Tou|BeforeInp|Compo)/,Fa=/[A-Z0-9]/g,Ba=typeof document!="undefined",Ga=function(t){return(typeof Symbol!="undefined"&&typeof Symbol()=="symbol"?/fil|che|rad/:/fil|che|ra/).test(t)};at.prototype.isReactComponent={},["componentWillMount","componentWillReceiveProps","componentWillUpdate"].forEach(function(t){Object.defineProperty(at.prototype,t,{configurable:!0,get:function(){return this["UNSAFE_"+t]},set:function(e){Object.defineProperty(this,t,{configurable:!0,writable:!0,value:e})}})});var Kr=v.event;function Va(){}function Wa(){return this.cancelBubble}function Ja(){return this.defaultPrevented}v.event=function(t){return Kr&&(t=Kr(t)),t.persist=Va,t.isPropagationStopped=Wa,t.isDefaultPrevented=Ja,t.nativeEvent=t};var no,qa={enumerable:!1,configurable:!0,get:function(){return this.class}},Zr=v.vnode;v.vnode=function(t){typeof t.type=="string"&&function(e){var r=e.props,o=e.type,n={},i=o.indexOf("-")===-1;for(var s in r){var l=r[s];if(!(s==="value"&&"defaultValue"in r&&l==null||Ba&&s==="children"&&o==="noscript"||s==="class"||s==="className")){var c=s.toLowerCase();s==="defaultValue"&&"value"in r&&r.value==null?s="value":s==="download"&&l===!0?l="":c==="translate"&&l==="no"?l=!1:c[0]==="o"&&c[1]==="n"?c==="ondoubleclick"?s="ondblclick":c!=="onchange"||o!=="input"&&o!=="textarea"||Ga(r.type)?c==="onfocus"?s="onfocusin":c==="onblur"?s="onfocusout":Ha.test(s)&&(s=c):c=s="oninput":i&&$a.test(s)?s=s.replace(Fa,"-$&").toLowerCase():l===null&&(l=void 0),c==="oninput"&&n[s=c]&&(s="oninputCapture"),n[s]=l}}o=="select"&&n.multiple&&Array.isArray(n.value)&&(n.value=Ot(r.children).forEach(function(p){p.props.selected=n.value.indexOf(p.props.value)!=-1})),o=="select"&&n.defaultValue!=null&&(n.value=Ot(r.children).forEach(function(p){p.props.selected=n.multiple?n.defaultValue.indexOf(p.props.value)!=-1:n.defaultValue==p.props.value})),r.class&&!r.className?(n.class=r.class,Object.defineProperty(n,"className",qa)):(r.className&&!r.class||r.class&&r.className)&&(n.class=n.className=r.className),e.props=n}(t),t.$$typeof=Ua,Zr&&Zr(t)};var Qr=v.__r;v.__r=function(t){Qr&&Qr(t),no=t.__c};var to=v.diffed;v.diffed=function(t){to&&to(t);var e=t.props,r=t.__e;r!=null&&t.type==="textarea"&&"value"in e&&e.value!==r.value&&(r.value=e.value==null?"":e.value),no=null};var Me=eo(function({text:e,searchTerm:r,className:o="",highlightClassName:n="bg-yellow-200 dark:bg-yellow-700 rounded px-0.5"}){if(!r||!e)return a("span",{className:o,children:e});let i=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),s=new RegExp(`(${i})`,"gi"),l=e.split(s);return l.length===1?a("span",{className:o,children:e}):a("span",{className:o,children:l.map((c,p)=>s.test(c)?a("span",{className:n,children:c},p):a(D,{children:c},p))})});var io={general:["title","meta:description","meta:author","meta:keywords","meta:theme-color","link:favicon"],opengraph:["og:title","og:description","og:image","og:url","og:type","og:site_name"],twitter:["twitter:title","twitter:description","twitter:image","twitter:card","twitter:site","twitter:creator"],technical:["meta:viewport","meta:charset","link:canonical","meta:robots","html:lang","meta:content-security-policy","header:strict-transport-security"]},it=t=>{try{if(!t)return"";let e=t,r=["meta:","link:","html:","header:","og:","twitter:"];for(let o of r)if(e.startsWith(o)){e=e.replace(o,"");break}return e.split("-").map(o=>o.charAt(0).toUpperCase()+o.slice(1)).join(" ")}catch(e){return console.warn(`Error formatting key: ${t}`,e),t}},pt=(t,e)=>[...t].sort((r,o)=>{let n=io[e].indexOf(r[0]),i=io[e].indexOf(o[0]);return n!==-1&&i!==-1?n-i:n!==-1?-1:i!==-1?1:r[0].localeCompare(o[0])}),et=({label:t,value:e,copyable:r=!0,searchTerm:o=""})=>{let[n,i]=z(!1),s=()=>{e&&(navigator.clipboard.writeText(String(e)),i(!0),setTimeout(()=>i(!1),2e3))};return e?a("div",{className:"mb-4 last:mb-0 group",children:[a("div",{className:"flex items-center justify-between mb-2",children:[a("div",{className:"text-xs font-semibold text-gray-500 dark:text-gray-400",children:o?a(Me,{text:t,searchTerm:o}):t}),r&&a("button",{onClick:s,className:"opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded","aria-label":`Copy ${t}`,title:"Copy to clipboard",children:n?a(_e,{}):a(xe,{})})]}),a("div",{className:"text-xs break-words text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto",children:typeof e=="object"?a("pre",{className:"whitespace-pre-wrap",children:JSON.stringify(e,null,2)}):o?a(Me,{text:String(e),searchTerm:o,className:"whitespace-pre-wrap"}):String(e)})]}):null},so=({src:t,alt:e})=>{let[r,o]=z(!1);return!t||r?null:a("div",{className:"mb-3",children:[a("div",{className:"bg-gray-100 dark:bg-gray-800 rounded overflow-hidden",children:a("div",{className:"relative aspect-video flex items-center justify-center p-2",children:a("img",{src:t,alt:e||"Preview Image",className:"max-h-full max-w-full object-contain",onError:()=>o(!0)})})}),a("p",{className:"text-xs text-center mt-1 text-gray-500 dark:text-gray-400",children:"Preview Image"})]})},Xa=({title:t,children:e})=>a("div",{className:K("flex-shrink-0 w-[350px] rounded-lg overflow-hidden shadow-md transition-all duration-300","bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700","hover:shadow-lg"),children:[a("div",{className:"p-3 border-b border-gray-200 dark:border-gray-700",children:a("div",{className:"w-full text-left text-sm font-semibold text-gray-700 dark:text-gray-200",children:t})}),a("div",{className:"p-3 overflow-y-auto max-h-[60vh]",children:e})]}),Ya=({searchTerm:t,metadata:e,filterMetadataItems:r,getJsonLdType:o,getTypeFromUrl:n})=>{if(!t)return null;let i=pt(r(Object.entries(e.general||{})),"general"),s=pt(r(Object.entries(e.opengraph||{})),"opengraph"),l=pt(r(Object.entries(e.twitter||{})),"twitter"),c=pt(r(Object.entries(e.technical||{})),"technical"),p=e.structured||{jsonLd:[],microdata:[]},g=p.jsonLd?p.jsonLd.filter(u=>JSON.stringify(u).toLowerCase().includes(t.toLowerCase())):[],d=p.microdata?p.microdata.filter(u=>u.type.toLowerCase().includes(t.toLowerCase())||JSON.stringify(u.properties).toLowerCase().includes(t.toLowerCase())):[];return i.length>0||s.length>0||l.length>0||c.length>0||g.length>0||d.length>0?a("div",{className:"w-full space-y-6",children:[a("div",{className:"text-sm text-gray-500 dark:text-gray-400 mb-4",children:['Search results for "',t,'"']}),i.length>0&&a("div",{className:"bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4",children:[a("h3",{className:"text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200",children:"General"}),a("div",{className:"space-y-2",children:i.map(([u,m])=>a(et,{label:it(u),value:m!=null?m:null,searchTerm:t},`general-${u}`))})]}),s.length>0&&a("div",{className:"bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4",children:[a("h3",{className:"text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200",children:"Open Graph"}),a("div",{className:"space-y-2",children:s.map(([u,m])=>a(et,{label:it(u),value:m!=null?m:null,searchTerm:t},`og-${u}`))})]}),l.length>0&&a("div",{className:"bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4",children:[a("h3",{className:"text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200",children:"Twitter"}),a("div",{className:"space-y-2",children:l.map(([u,m])=>a(et,{label:it(u),value:m!=null?m:null,searchTerm:t},`twitter-${u}`))})]}),c.length>0&&a("div",{className:"bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4",children:[a("h3",{className:"text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200",children:"Technical"}),a("div",{className:"space-y-2",children:c.map(([u,m])=>a(et,{label:it(u),value:m!=null?m:null,searchTerm:t},`technical-${u}`))})]}),(g.length>0||d.length>0)&&a("div",{className:"bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4",children:[a("h3",{className:"text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200",children:"Structured Data"}),g.length>0&&a("div",{className:"mb-4",children:[a("h4",{className:"text-xs font-semibold mb-2 text-gray-600 dark:text-gray-300",children:"JSON-LD"}),g.map((u,m)=>u?a(et,{label:`JSON-LD ${m+1} (${o(u)})`,value:u,searchTerm:t},`search-jsonld-${m}`):null)]}),d.length>0&&a("div",{children:[a("h4",{className:"text-xs font-semibold mb-2 text-gray-600 dark:text-gray-300",children:"Microdata"}),d.map((u,m)=>u?a(et,{label:`Microdata ${m+1} (${n(u.type)})`,value:u.properties,searchTerm:t},`search-microdata-${m}`):null)]})]})]}):a("div",{className:"w-full text-center py-8",children:a("div",{className:"text-gray-500 dark:text-gray-400",children:['No results found for "',t,'"']})})},Ka=({metadata:t,refreshMetadata:e,theme:r="light",toggleTheme:o,showSettingsMenu:n,toggleSettingsMenu:i,showPositionMenu:s,togglePositionMenu:l,changePosition:c,uiState:p,version:g})=>{var ut,Tt;if(!t)return null;let[d,w]=z(!1),[u,m]=z(!1),[O,L]=z(!1),[x,_]=z(""),[F,U]=z(""),[S,b]=z(""),R=Y(null),q=Y(null),Q=Y(null),y=Y(null),T=Y(null);Z(()=>()=>{R.current&&window.clearTimeout(R.current),q.current&&window.clearTimeout(q.current)},[]),Z(()=>{let C=k=>{var $,V;(k.ctrlKey||k.metaKey)&&k.key==="f"&&(k.preventDefault(),($=T.current)==null||$.focus()),k.key==="Escape"&&F&&(U(""),(V=T.current)==null||V.blur())};return document.addEventListener("keydown",C),()=>{document.removeEventListener("keydown",C)}},[F]),Z(()=>{let C=setTimeout(()=>{b(F)},300);return()=>clearTimeout(C)},[F]);let P=[{id:"general",label:"General"},{id:"opengraph",label:"Open Graph"},{id:"twitter",label:"Twitter"},{id:"technical",label:"Technical"},{id:"structured",label:"Structured Data"},{id:"missing",label:"Missing Tags",badge:(ut=t.missing)!=null&&ut.hasCritical?"critical":void 0}],tt=C=>{try{let k=document.createElement("textarea");k.value=C,k.style.position="fixed",k.style.left="-999999px",k.style.top="-999999px",document.body.appendChild(k),k.focus(),k.select();let $=document.execCommand("copy");return document.body.removeChild(k),$}catch(k){return console.error("Fallback: Could not copy text: ",k),!1}},X=async()=>{if(!t||u)return;let C=nt(t),k=JSON.stringify(C,null,2);try{if(navigator.clipboard)await navigator.clipboard.writeText(k);else if(!tt(k))throw new Error("Fallback copy method failed");m(!0),L(!1),_("JSON copied to clipboard"),R.current&&window.clearTimeout(R.current),R.current=window.setTimeout(()=>{m(!1),_(""),R.current=null},2e3)}catch($){console.error("Failed to copy JSON:",$),L(!0),_("Failed to copy"),q.current&&window.clearTimeout(q.current),q.current=window.setTimeout(()=>{L(!1),_(""),q.current=null},2e3)}},nt=C=>JSON.parse(JSON.stringify(C)),I=fe(C=>{if(!S)return C;let k=S.toLowerCase();return C.filter(([$,V])=>$.toLowerCase().includes(k)||it($).toLowerCase().includes(k)||typeof V=="string"&&V.toLowerCase().includes(k)||Array.isArray(V)&&V.some(rt=>typeof rt=="string"&&rt.toLowerCase().includes(k))?!0:V&&typeof V=="object"?JSON.stringify(V).toLowerCase().includes(k):!1)},[S,it]),Et=C=>{var k,$,V,gt;switch(C){case"general":let rt=pt(I(Object.entries(t.general||{})),"general");return a(D,{children:[rt.map(([N,A])=>a(et,{label:it(N),value:A!=null?A:null,searchTerm:S},N)),rt.length===0&&S&&a("div",{className:"py-2 text-center text-gray-500 dark:text-gray-400 text-sm",children:"No matching general metadata found"})]});case"opengraph":let Ie=pt(I(Object.entries(t.opengraph||{})),"opengraph");return a(D,{children:[!S&&((k=t.opengraph)==null?void 0:k["og:image"])&&a(so,{src:t.opengraph["og:image"]||null,alt:t.opengraph["og:title"]||(($=t.general)==null?void 0:$.title)||""}),Ie.map(([N,A])=>a(et,{label:it(N),value:A!=null?A:null,searchTerm:S},N)),Ie.length===0&&S&&a("div",{className:"py-2 text-center text-gray-500 dark:text-gray-400 text-sm",children:"No matching Open Graph metadata found"})]});case"twitter":let Oe=pt(I(Object.entries(t.twitter||{})),"twitter");return a(D,{children:[!S&&((V=t.twitter)==null?void 0:V["twitter:image"])&&a(so,{src:t.twitter["twitter:image"]||null,alt:t.twitter["twitter:title"]||((gt=t.general)==null?void 0:gt.title)||""}),Oe.map(([N,A])=>a(et,{label:it(N),value:A!=null?A:null,searchTerm:S},N)),Oe.length===0&&S&&a("div",{className:"py-2 text-center text-gray-500 dark:text-gray-400 text-sm",children:"No matching Twitter metadata found"})]});case"technical":let Ae=pt(I(Object.entries(t.technical||{})),"technical");return a(D,{children:[Ae.map(([N,A])=>a(et,{label:it(N),value:A!=null?A:null,searchTerm:S},N)),Ae.length===0&&S&&a("div",{className:"py-2 text-center text-gray-500 dark:text-gray-400 text-sm",children:"No matching technical metadata found"})]});case"structured":if(!t.structured)return a("div",{className:"py-2 text-center text-gray-500 dark:text-gray-400 text-sm",children:"No structured data found"});let ct=t.structured,wo=ct.jsonLd&&ct.jsonLd.length>0,yo=ct.microdata&&ct.microdata.length>0,qt=S?ct.jsonLd.filter(N=>JSON.stringify(N).toLowerCase().includes(S.toLowerCase())):ct.jsonLd,Xt=S?ct.microdata.filter(N=>N.type.toLowerCase().includes(S.toLowerCase())||JSON.stringify(N.properties).toLowerCase().includes(S.toLowerCase())):ct.microdata,vo=S&&qt.length===0&&Xt.length===0;return a(D,{children:[wo&&qt.length>0&&a("div",{className:"mb-4",children:[a("h3",{className:"text-sm font-semibold mb-2",children:"JSON-LD"}),qt.map((N,A)=>N?a(et,{label:`JSON-LD ${A+1} (${B(N)})`,value:N,searchTerm:S},`jsonld-${A}`):null)]}),yo&&Xt.length>0&&a("div",{className:"mb-4",children:[a("h3",{className:"text-sm font-semibold mb-2",children:"Microdata"}),Xt.map((N,A)=>N?a(et,{label:`Microdata ${A+1} (${G(N.type)})`,value:N.properties,searchTerm:S},`microdata-${A}`):null)]}),vo&&a("div",{className:"py-2 text-center text-gray-500 dark:text-gray-400 text-sm",children:"No matching structured data found"})]});case"missing":if(!t.missing||t.missing.general.length===0&&t.missing.opengraph.length===0&&t.missing.twitter.length===0&&t.missing.technical.length===0)return a("div",{className:"flex items-center justify-center h-full",children:a("div",{className:"text-center text-gray-500 dark:text-gray-400 text-sm",children:"No missing metadata tags detected."})});let Yt=[...t.missing.general,...t.missing.opengraph,...t.missing.twitter,...t.missing.technical],Kt=Yt.filter(N=>N.importance==="critical"),Zt=Yt.filter(N=>N.importance==="medium"),Qt=Yt.filter(N=>N.importance==="low");return a(D,{children:[a("div",{className:"bg-gray-50 dark:bg-gray-800 p-3 rounded-md mb-4",children:a("p",{className:"text-xs text-gray-600 dark:text-gray-400",children:"This panel shows metadata tags that are missing from the page but are recommended for better SEO and sharing."})}),t.missing.hasCritical&&a("div",{className:"bg-red-50 dark:bg-red-900/30 p-3 rounded-md mb-4 border border-red-200 dark:border-red-800",children:a("p",{className:"text-xs text-red-700 dark:text-red-300 font-medium",children:"Critical tags are missing! These tags are essential for proper SEO and social sharing."})}),Kt.length>0&&a("div",{className:"mb-5",children:[a("div",{className:"flex items-center mb-2",children:[a("div",{className:"w-2 h-2 bg-red-500 rounded-full mr-2"}),a("h3",{className:"text-sm font-semibold text-red-800 dark:text-red-200",children:"Critical Priority"})]}),a("div",{className:"bg-red-50 dark:bg-red-900/20 rounded-md p-3 border-l-2 border-red-500",children:a("ul",{className:"list-disc pl-5 space-y-2",children:Kt.map((N,A)=>a("li",{className:"text-sm text-gray-700 dark:text-gray-300",children:N.key},A))})})]}),Zt.length>0&&a("div",{className:"mb-5",children:[a("div",{className:"flex items-center mb-2",children:[a("div",{className:"w-2 h-2 bg-yellow-500 rounded-full mr-2"}),a("h3",{className:"text-sm font-semibold text-yellow-800 dark:text-yellow-200",children:"Medium Priority"})]}),a("div",{className:"bg-yellow-50 dark:bg-yellow-900/20 rounded-md p-3 border-l-2 border-yellow-500",children:a("ul",{className:"list-disc pl-5 space-y-2",children:Zt.map((N,A)=>a("li",{className:"text-sm text-gray-700 dark:text-gray-300",children:N.key},A))})})]}),Qt.length>0&&a("div",{className:"mb-5",children:[a("div",{className:"flex items-center mb-2",children:[a("div",{className:"w-2 h-2 bg-blue-500 rounded-full mr-2"}),a("h3",{className:"text-sm font-semibold text-blue-800 dark:text-blue-200",children:"Low Priority"})]}),a("div",{className:"bg-blue-50 dark:bg-blue-900/20 rounded-md p-3 border-l-2 border-blue-500",children:a("ul",{className:"list-disc pl-5 space-y-2",children:Qt.map((N,A)=>a("li",{className:"text-sm text-gray-700 dark:text-gray-300",children:N.key},A))})})]}),Kt.length===0&&Zt.length===0&&Qt.length===0&&a("div",{className:"py-2 text-center text-gray-500 dark:text-gray-400 text-sm",children:"No missing metadata tags found matching your search."})]});default:return null}};function B(C){var k;if(!C)return"Unknown";if(C["@type"]){let $=Array.isArray(C["@type"])?C["@type"][0]:C["@type"];return G($)}return C["@graph"]&&Array.isArray(C["@graph"])&&((k=C["@graph"][0])!=null&&k["@type"])?`Graph (${G(C["@graph"][0]["@type"])})`:"Generic"}function G(C){if(!C)return"Unknown";let k=C.split(/[/#:]/);return k[k.length-1]}return a("div",{className:K("overflow-hidden max-h-[80vh] flex flex-col","bg-white dark:bg-gray-900","text-black dark:text-white","transition-colors duration-200","theme-transition-container",r==="dark"?"dark":""),children:[a("div",{className:"p-3 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-900 z-50 space-y-4 flex-shrink-0",children:[a("div",{className:"flex items-center justify-between",children:[a("h2",{className:"font-mono text-sm font-bold",children:"MetaScan"}),a("div",{className:"flex items-center space-x-3",children:[a("div",{className:"relative",children:a(Vr,{showPositionMenu:s,togglePositionMenu:l,changePosition:c,uiState:p})}),a(Fr,{showSettingsMenu:n,toggleSettingsMenu:i,version:g}),a(Br,{theme:r,toggleTheme:o}),a("button",{onClick:()=>w(!d),className:`w-6 h-6 flex items-center justify-center rounded-full ${d?"bg-purple-100 dark:bg-purple-700 text-purple-600 dark:text-purple-400":"text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-600 bg-gray-100 dark:bg-gray-700"}`,title:d?"Hide JSON":"Show JSON",children:a($r,{})}),a("button",{onClick:e,className:"w-6 h-6 flex items-center justify-center text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-600 bg-gray-100 dark:bg-gray-700 rounded-full",title:"Refresh metadata",children:a(Rr,{})})]})]}),a("div",{className:"relative",children:a(Wr,{value:F,onChange:U,placeholder:"Search metadata... (Ctrl+F)",className:"w-full",ref:T})})]}),a("div",{className:"flex-1 overflow-auto min-h-0",children:d?a("div",{className:"p-3 overflow-y-auto",children:a("div",{className:"bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto text-xs relative group",children:[a("button",{onClick:X,className:K("absolute top-2 right-2 transition-opacity bg-gray-200 dark:bg-gray-700 p-1.5 rounded-full","text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600","focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50","sm:opacity-0 sm:group-hover:opacity-100",O?"bg-red-200 dark:bg-red-900 text-red-700 dark:text-red-300":""),"aria-label":"Copy JSON",title:O?"Failed to copy":"Copy JSON to clipboard",tabIndex:0,children:O?a("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[a("path",{d:"M18 6 6 18"}),a("path",{d:"m6 6 12 12"})]}):u?a(_e,{}):a(xe,{})}),x&&a("div",{className:"sr-only",role:"status","aria-live":"polite",children:x}),a("pre",{ref:Q,className:"pt-8",children:JSON.stringify(nt(t),null,2)})]})}):S?a("div",{className:"p-3 overflow-y-auto",children:a(Ya,{searchTerm:S,metadata:t,filterMetadataItems:I,getJsonLdType:B,getTypeFromUrl:G})}):a("div",{ref:y,className:K("p-3 flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600"),style:{scrollbarWidth:"thin"},children:P.map(C=>a(Xa,{title:a("div",{className:"flex items-center",children:[C.label,C.badge==="critical"&&a("span",{className:"ml-2 w-2 h-2 bg-red-500 rounded-full inline-block"})]}),children:Et(C.id)},C.id))})}),a("div",{className:"p-3 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 text-center flex-shrink-0 bg-white dark:bg-gray-900",children:["Data extracted at ",new Date(t.extractedAt).toLocaleTimeString(),((Tt=t.missing)==null?void 0:Tt.hasCritical)&&a("span",{className:"ml-2 text-red-500 dark:text-red-400 font-medium",children:"\u2022 Critical tags missing"})]})]})},lo=Ka;var co="meta-scan-ui-state",Za={position:"bottom-right",isOpen:!1,theme:"auto",extractedAt:new Date().toISOString()},Ce=class{constructor(){this.listeners=[];this.state=this.loadState()||Za}loadState(){if(typeof window=="undefined")return null;try{let e=localStorage.getItem(co);return e?JSON.parse(e):null}catch(e){return M.error("Failed to load state:",e),null}}saveState(){if(typeof window!="undefined")try{localStorage.setItem(co,JSON.stringify(this.state))}catch(e){M.error("Failed to save state:",e)}}getState(){return{...this.state}}updateState(e){this.state={...this.state,...e},this.saveState(),this.notifyListeners()}setEnableDisable(e){this.updateState({lastEnableDisable:e})}getEnableDisable(){var e;return(e=this.state.lastEnableDisable)!=null?e:!0}subscribe(e){return this.listeners.push(e),()=>{this.listeners=this.listeners.filter(r=>r!==e)}}notifyListeners(){this.listeners.forEach(e=>e(this.getState()))}},J=new Ce;var po="0.12.1";function uo({initialMetadata:t}){let[e,r]=z(J.getState()),[o,n]=z(!1),[i,s]=z(!1);Z(()=>J.subscribe(T=>{r(P=>({...P,...T}))}),[]);let[l,c]=z(t),[p,g]=z(!1),[d,w]=z(()=>e.theme==="auto"?window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":e.theme);Z(()=>{if(e.theme!=="auto")return;let y=window.matchMedia("(prefers-color-scheme: dark)"),T=P=>{w(P.matches?"dark":"light")};return y.addEventListener("change",T),()=>y.removeEventListener("change",T)},[e.theme]);let u=()=>{let y=d==="dark"?"light":"dark";"startViewTransition"in document?document.startViewTransition(()=>{requestAnimationFrame(()=>{r(T=>({...T,theme:y})),w(y),J.updateState({theme:y})})}):(r(T=>({...T,theme:y})),w(y),J.updateState({theme:y}))},m=Y(null),[O,L]=z(!1),x=()=>{e.isOpen?(L(!0),setTimeout(()=>{r(y=>({...y,isOpen:!1})),J.updateState({isOpen:!1}),L(!1)},300)):(r(y=>({...y,isOpen:!0})),J.updateState({isOpen:!0}))},_=y=>{y.stopPropagation(),s(!1),n(!o)},F=y=>{y.stopPropagation(),n(!1),s(!i)};Z(()=>{if(!o)return;let y=T=>{let P=T.target,tt=P.closest(".settings-menu")!==null,X=P.closest("#settings-toggle")!==null;!tt&&!X&&n(!1)};return document.addEventListener("click",y),()=>{document.removeEventListener("click",y)}},[o]),Z(()=>{if(!i)return;let y=T=>{let P=T.target,tt=P.closest(".position-menu")!==null,X=P.closest("#position-toggle")!==null;!tt&&!X&&s(!1)};return document.addEventListener("click",y),()=>{document.removeEventListener("click",y)}},[i]);let U=y=>{r(T=>({...T,position:y})),J.updateState({position:y})},S=()=>{g(!0),c(ht()),r(y=>({...y,extractedAt:new Date().toISOString()})),J.updateState({extractedAt:new Date().toISOString()}),setTimeout(()=>g(!1),300)},b=()=>({"top-left":"top-4 left-4","top-right":"top-4 right-4","bottom-left":"bottom-4 left-4","bottom-right":"bottom-4 right-4"})[e.position],R=()=>({"top-left":"top left","top-right":"top right","bottom-left":"bottom left","bottom-right":"bottom right"})[e.position]||"top right",q=()=>{let y=e.position.includes("top");return K("absolute w-[400px] max-w-[90vw]",y?"top-full mt-2":"bottom-full mb-2",e.position.includes("right")?"right-0":"left-0")};Z(()=>(jt(y=>{M.info(`MetaScan: Detected ${y?"page reload":"DOM changes"}`);let T=ht();c(T),r(P=>({...P,extractedAt:new Date().toISOString()})),J.updateState({extractedAt:new Date().toISOString()})}),()=>{Ut()}),[]);let Q=()=>a("div",{className:"absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm rounded z-10",children:a("div",{className:"p-2 bg-white dark:bg-gray-800 rounded shadow-lg flex items-center space-x-2",children:[a("div",{className:"h-4 w-4 border-2 border-t-transparent border-purple-600 dark:border-purple-400 rounded-full animate-spin"}),a("span",{className:"text-xs",children:"Refreshing..."})]})});return a("div",{className:K("fixed z-50",b()),children:a("div",{className:K("flex flex-col meta-scan-container",d==="dark"?"dark":""),children:[(e.isOpen||O)&&a("div",{ref:m,className:K("relative rounded-lg shadow-xl overflow-hidden bg-white dark:bg-gray-800","meta-scan-panel",!O&&e.isOpen?"active":"closing",q()),style:{"--panel-origin":R()},children:[p&&a(Q,{}),a(lo,{metadata:l,refreshMetadata:S,theme:d,toggleTheme:u,showSettingsMenu:o,toggleSettingsMenu:_,showPositionMenu:i,togglePositionMenu:F,changePosition:U,uiState:e,version:po})]}),a("button",{onClick:x,className:K("w-8 h-8 flex items-center justify-center rounded-full","shadow-lg toggle-button","bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400",e.isOpen?"bg-purple-600 text-white hover:bg-purple-700 toggle-button-active":""),title:e.isOpen?"Close MetaScan panel":"Open MetaScan panel",children:e.isOpen?a(Ar,{}):a(Or,{})})]})})}var Ne=null,tn=!1;function Pt(){if(!Ne){Ne=Pe();let t=ht();ce(a(uo,{initialMetadata:t}),Ne),tn=!0,M.info("UI rendered")}}var en=5,go=3e3,zt=0,fo=0,Dt=null;function Ee(){zt=0,Dt!==null&&(window.clearTimeout(Dt),Dt=null)}function rn(){let t=Date.now();if(t-fo>go&&zt>0&&Ee(),fo=t,zt++,Dt===null&&(Dt=window.setTimeout(()=>{Ee()},go)),zt>=en){let r=!J.getEnableDisable();return M.info(`MetaScan: 5-tap sequence detected, ${r?"enabling":"disabling"} MetaScan`),Ee(),Ct(r),!0}return!1}function ho(){typeof window!="undefined"&&(document.addEventListener("click",()=>{rn(),M.info("MetaScan: Tap detected, count: "+zt)}),M.info("MetaScan: Tap detector initialized"))}var on={enabled:!0,position:"top-right",theme:"auto"},Nt={...on};function Ct(t){var r;if(J.setEnableDisable(t),M.info(`MetaScan ${t?"enabled":"disabled"}`),typeof window=="undefined")return;let e=document.getElementById("meta-scan-root");t?(e?(e.style.display="",J.updateState({isOpen:!0})):Pt(),(r=window.MetaScan._watchers)!=null&&r.domWatcher&&jt(o=>{M.info(`MetaScan: Detected ${o?"page reload":"DOM changes"}`)})):(e&&(e.style.display="none",J.updateState({isOpen:!1})),Ut())}function Jt(t){t&&(Nt={...Nt,...t}),M.info("MetaScan initialized with options:",Nt),ho()}function Te(){return M.info("Getting metadata"),ht()}function mo(t){let e=Te();if(M.info(`Exporting metadata as ${t}`),t==="json")return JSON.stringify(e,null,2);if(t==="csv"){let r=`Category,Key,Value
`;for(let[o,n]of Object.entries(e))for(let[i,s]of Object.entries(n))s&&(r+=`${o},${i},"${String(s).replace(/"/g,'""')}"
`);return r}else{let r=`MetaScan Metadata Report

`;for(let[o,n]of Object.entries(e)){r+=`== ${o.toUpperCase()} ==
`;for(let[i,s]of Object.entries(n))s&&(r+=`${i}: ${s}
`);r+=`
`}return r}}function bo(t){Nt={...Nt,...t},M.info("MetaScan reconfigured with options:",Nt)}var Le={getMetadata:Te,export:mo,configure:bo,enableOrDisable:Ct,_watchers:{}};if(typeof window!="undefined"){window.MetaScan=Le;let t=()=>{let e=document.querySelectorAll('script[src*="meta-scan"]'),r=!0;if(e.length>0){let o=e[0];if(o.dataset.autoEnable==="false"){let i=J.getState();r=Object.prototype.hasOwnProperty.call(i,"lastEnableDisable")?!!i.lastEnableDisable:!1}let n={enabled:r};o.dataset.position&&(n.position=o.dataset.position),o.dataset.autoUpdate!=="false"&&(n.autoUpdate=!0),o.dataset.theme&&(n.theme=o.dataset.theme),Jt(n),r?(Pt(),M.info("MetaScan auto-initialized and enabled")):(Ct(!1),M.info("MetaScan initialized but disabled (user preference or auto-enable: false)"))}else Jt({autoUpdate:!0,enabled:r}),r&&(Pt(),M.info("MetaScan auto-initialized with defaults"))};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t):setTimeout(t,0)}return Co(an);})();
//# sourceMappingURL=auto.global.js.map