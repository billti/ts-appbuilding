import { h, render } from "preact";
window.onload = function () {
    var loading = document.getElementById("loading");
    render((h("div", null,
        h("h1", null, "Hello, world"),
        h("p", null, "This page rendered using Preact & JSX. See https://preactjs.com"))), document.body, loading);
};
//# sourceMappingURL=app.js.map