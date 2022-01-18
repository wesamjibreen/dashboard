"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderSass = void 0;
const sass = require("sass");
function renderSass(sassFilePathOrOptions) {
    const sassOptions = typeof sassFilePathOrOptions === 'string' ? { file: sassFilePathOrOptions } : sassFilePathOrOptions;
    const rendered = sass.renderSync(sassOptions);
    const renderedCss = rendered.css.toString();
    return renderedCss;
}
exports.renderSass = renderSass;
