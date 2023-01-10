const OPENAI_API_KEY = "YOUR_API_KEY_HERE";

let selectedText = "";
let selectedEl = null;

document.onmouseup = function() {
    const selection = window.getSelection();
    if (!selection.isCollapsed) {
        selectedText = selection.toString().trim();
        selectedEl = selection.anchorNode.parentNode;

        const icon = document.createElement("img");
        icon.src = chrome.runtime.getURL("icon.png");
        icon.classList.add("openai-highlight-icon");

        const rect = selection.getRangeAt(0).getBoundingClientRect();
        icon.style.top = `${rect.top + window.scrollY - 16}px`;
        icon.style.left = `${rect.left + window.scrollX - 16}px`;
        icon.onclick = function() {
            chrome.runtime.sendMessage({ type: "highlight", text: selectedText });
        };
        document.body.appendChild(icon);
    }
};
document.onmousedown = function(event) {
    const target = event.target;
    if (target.classList.contains("openai-highlight-icon")) {
        target.remove();
    } else if (selectedEl) {
        const icons = document.querySelectorAll(".openai-highlight-icon");
        for (let i = 0; i < icons.length; i++) {
            icons[i].remove();
        }
        selectedEl = null;
    }
};