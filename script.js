/* ================================
   TikTok 美區固定方案
================================ */
const coinsData = [
    { amount: 30, usd: 0.42 },
    { amount: 350, usd: 4.95 },
    { amount: 700, usd: 9.90 },
    { amount: 7000, usd: 99.00 },
    { amount: 17500, usd: 247.50 },
    { amount: "Custom", usd: "Custom" }
];

const grid = document.getElementById("coinsGrid");

/* ================================
   Render Cards
================================ */
coinsData.forEach(item => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
        <img src="images/coin.png" class="icon">
        <div class="amount">${item.amount}</div>
        <div class="usd">US$${item.usd}</div>
    `;

    div.addEventListener("click", () => {
        // 點到 Custom → 直接開輸入器
        if (item.amount === "Custom") {
            customModal.classList.add("active");
            customInputBox.innerText = "0";
            return;
        }

        // 一般固定方案
        document.querySelectorAll(".card").forEach(c => c.classList.remove("selected"));
        div.classList.add("selected");
        selectItem(item);
    });

    grid.appendChild(div);
});

let selected = null;

/* ================================
   Select fixed coin packages
================================ */
function selectItem(item) {
    selected = item;

    document.getElementById("selectedText").innerText =
        `Selected: ${item.amount} Coins`;

    document.getElementById("selectedUSD").innerText =
        `US$${item.usd}`;

    document.getElementById("payBtn").disabled = false;
}

/* ================================
   Custom coins (輸入框那個)
================================ */
const customInput = document.getElementById("customCoins");
const customSummaryCoins = document.getElementById("customCoinsCount");
const customSummaryUSD = document.getElementById("customCoinsUSD");

customInput.addEventListener("input", () => {
    const val = Number(customInput.value);

    if (!val || val <= 0) {
        selected = null;
        customSummaryCoins.innerText = "0 Coins";
        customSummaryUSD.innerText = "US$0.00";
        document.getElementById("payBtn").disabled = true;
        return;
    }

    const usd = (val * 0.013).toFixed(2);

    customSummaryCoins.innerText = `${val} Coins`;
    customSummaryUSD.innerText = `US$${usd}`;

    selected = { amount: val, usd: usd };

    document.getElementById("selectedText").innerText = `Selected: ${val} Coins`;
    document.getElementById("selectedUSD").innerText = `US$${usd}`;
    document.getElementById("payBtn").disabled = false;
});

/* ================================
   Payment Modal
================================ */
const payBtn = document.getElementById("payBtn");
const paymentModal = document.getElementById("paymentModal");
const cancelPay = document.getElementById("cancelPay");
const confirmPay = document.getElementById("confirmPay");

payBtn.addEventListener("click", () => {
    if (!selected) return;
    paymentModal.classList.add("active");
});

cancelPay.addEventListener("click", () => {
    paymentModal.classList.remove("active");
});

/* ================================
   Success Modal + Loading
================================ */
const successModal = document.getElementById("successModal");
const coinsResult = document.getElementById("coins");
const goBack = document.getElementById("goBack");
const loading = document.getElementById("loading");

confirmPay.addEventListener("click", () => {
    paymentModal.classList.remove("active");

    loading.classList.remove("hidden");

    setTimeout(() => {
        loading.classList.add("hidden");

        coinsResult.innerText = `Recharged ${selected.amount} Coins`;
        successModal.classList.add("active");

    }, 3500);
});

goBack.addEventListener("click", () => {
    location.reload();
});

/* ================================
   Payment Method Active
================================ */
const methods = document.querySelectorAll(".method");

methods.forEach(m => {
    m.addEventListener("click", () => {
        methods.forEach(x => x.classList.remove("active"));
        m.classList.add("active");
    });
});

/* ================================
   Custom Popup Logic (數字鍵盤)
================================ */
const customModal = document.getElementById("customModal");
const customInputBox = document.getElementById("customInputBox");
const customCancel = document.getElementById("customCancel");
const customApply = document.getElementById("customApply");

// 點數字按鈕
document.querySelectorAll(".num").forEach(btn => {
    btn.addEventListener("click", () => {
        let current = customInputBox.innerText;
        if (current === "0") current = "";
        customInputBox.innerText = current + btn.innerText;
    });
});

// 刪除鍵
document.querySelector(".del").addEventListener("click", () => {
    let val = customInputBox.innerText;
    customInputBox.innerText = val.length > 1 ? val.slice(0, -1) : "0";
});

// 取消
customCancel.addEventListener("click", () => {
    customModal.classList.remove("active");
});

// 確定（Apply）
customApply.addEventListener("click", () => {
    let val = Number(customInputBox.innerText);
    if (!val || val <= 0) return;

    const usd = (val * 0.013).toFixed(2);

    selected = { amount: val, usd: usd };

    document.getElementById("selectedText").innerText = `Selected: ${val} Coins`;
    document.getElementById("selectedUSD").innerText = `US$${usd}`;
    document.getElementById("payBtn").disabled = false;

    customModal.classList.remove("active");
});
