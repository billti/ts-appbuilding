import { h, render } from "preact";

window.onload = () => {
    const loading = document.getElementById("loading");
    render((<div>
        <h1>Hello, world</h1>
        <p>This page rendered using Preact & JSX. See https://preactjs.com</p>
    </div>), document.body, loading);
};
