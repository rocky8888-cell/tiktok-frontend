/* ===== Data ===== */
const coinsData = [
    { amount: 30, usd: 0.42 },
    { amount: 350, usd: 4.95 },
    { amount: 700, usd: 9.90 },
    { amount: 7000, usd: 99.00 },
    { amount: 17500, usd: 247.50 },
    { amount: "Custom", usd: "Custom" }
];

const COIN_TO_USD = 0.013; // 1 coin = $0.013

/* ===== Elements ===== */
const grid = document.getElementById("coinsGrid");
const selectedText = document.getElementById("selectedText");
const selectedUSD = document.getElementById("selectedUSD");
const payBtn = document.getElementById("payBtn");

const paymentModal = document.getElementById("paymentModal");
const cancelPay = document.getElementById("cancelPay");
const confirmPay = document.getElementById("confirmPay");

const successModal = document.getElementById("successModal");
const coinsResult = document.getElementById("coins");
const goBack = document.getElementById("goBack");

const loading = document.getElementById("loading");

/* Custom modal elements */
const customModal = document.getElementById("customModal");
const customInputBox = document.getElementById("customInputBox");
const customModalCoins = document.getElementById("customModalCoins");
const customModalUSD = document.getElementById("customModalUSD");
const customRechargeBtn = document.getElementById("customRechargeBtn");
const customBack = document.getElementById("customBack");

/* Payment method active styling */
let selected = null;

/* ===== Render cards ===== */
function renderCards() {
    coinsData.forEach(item => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
            <img src="images/coin.png" class="icon" alt="coin">
            <div class="amount">${item.amount}</div>
            <div class="usd">US$${item.usd}</div>
        `;

        div.addEventListener("click", () => {
            if (item.amount === "Custom") {
                openCustomModal();
                return;
            }
            document.querySelectorAll(".card").forEach(c => c.classList.remove("selected"));
            div.classList.add("selected");
            selectItem(item);
        });

        grid.appendChild(div);
    });
}

/* ===== Select fixed item ===== */
function selectItem(item) {
    selected = item;
    selectedText.innerText = `Selected: ${item.amount} Coins`;
    selectedUSD.innerText = `US$${Number(item.usd).toFixed(2)}`;
    payBtn.disabled = false;
}

/* ===== Custom modal helpers ===== */
function openCustomModal() {
    customModal.classList.add("active");
    customInputBox.innerText = "0";
    updateCustomSummary(0);
}

function closeCustomModal() {
    customModal.classList.remove("active");
}

/* update custom summary */
function updateCustomSummary(val) {
    const usd = (val * COIN_TO_USD);
    customModalCoins.innerText = `${val} Coins`;
    customModalUSD.innerText = `US$${usd.toFixed(2)}`;
}

/* number pad events */
function setupNumberPad() {
    document.querySelectorAll(".num").forEach(btn => {
        btn.addEventListener("click", () => {
            let current = customInputBox.innerText.trim();
            if (current === "0") current = "";
            const next = (current + btn.innerText).slice(0, 10);
            customInputBox.innerText = next || "0";
            updateCustomSummary(Number(customInputBox.innerText));
        });
    });

    document.querySelectorAll(".del").forEach(d => {
        d.addEventListener("click", () => {
            let v = customInputBox.innerText;
            if (!v || v === "0") { 
                customInputBox.innerText = "0"; 
                updateCustomSummary(0); 
                return;
            }
            const next = v.length > 1 ? v.slice(0, -1) : "0";
            customInputBox.innerText = next;
            updateCustomSummary(Number(next));
        });
    });
}

/* ===== Hook buttons ===== */
function setupButtons() {
    payBtn.addEventListener("click", () => {
        if (!selected) return;
        paymentModal.classList.add("active");
    });

    cancelPay.addEventListener("click", () => paymentModal.classList.remove("active"));

    confirmPay.addEventListener("click", () => {
        paymentModal.classList.remove("active");
        doPaymentFlow();
    });

    goBack.addEventListener("click", () => {
        successModal.classList.remove("active");
        location.reload();
    });

    customBack.addEventListener("click", () => closeCustomModal());

    customRechargeBtn.addEventListener("click", () => {
        const val = Number(customInputBox.innerText);
        if (!val || val <= 0) return;

        const usd = (val * COIN_TO_USD).toFixed(2);
        selected = { amount: val, usd: usd };

        selectedText.innerText = `Selected: ${val} Coins`;
        selectedUSD.innerText = `US$${usd}`;

        payBtn.disabled = false;

        closeCustomModal();
        paymentModal.classList.add("active");
    });
}

/* payment flow */
function doPaymentFlow() {
    loading.classList.remove("hidden");
    setTimeout(() => {
        loading.classList.add("hidden");
        coinsResult.innerText = `Recharged ${selected.amount} Coins`;
        successModal.classList.add("active");
    }, 1800);
}

/* payment method selection */
function setupMethodSelection() {
    const methods = document.querySelectorAll(".method");
    methods.forEach(m => {
        m.addEventListener("click", () => {
            methods.forEach(x => x.classList.remove("active"));
            m.classList.add("active");
        });
    });
}

/* init */
function init() {
    renderCards();
    setupNumberPad();
    setupButtons();
    setupMethodSelection();
}

document.addEventListener("DOMContentLoaded", init);

/* ===== Fullscreen ===== */
function openFullscreen() {
    const elem = document.documentElement;

    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { 
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { 
        elem.msRequestFullscreen();
    }
}
