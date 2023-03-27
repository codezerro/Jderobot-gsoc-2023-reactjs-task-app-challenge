/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: "jit",
    content: [
        "./src/**/*.{html,js,jsx,ts,tsx}",
        "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",

        // "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
        // "./node_modules/flowbite/**/*.js",
        // "./node_modules/flowbite/**/*.css",
    ],
    theme: {
        extend: {
            borderWidth: {
                DEFAULT: "1px",
            },
            width: {
                midbar: "16rem",
            },
            colors: {
                leftbar: "#ff0000",
                txtprimary: "#9aa0a6",
                actionColor: "#00c39a",
            },
            backgroundColor: {
                actionColor: "#00c39a",
            },
            fill: {
                actionColor: "#00c39a",
            },
            translate: {
                neg2: "-2rem",
            },
        },
    },
    darkMode: "class",
    plugins: [require("flowbite/plugin")],
};
// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
