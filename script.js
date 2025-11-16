/* TikTok 美區固定方案 */
const coinsData = [
    { amount: 30, usd: 0.42 },
    { amount: 350, usd: 4.95 },
    { amount: 700, usd: 9.90 },
    { amount: 7000, usd: 99.00 },
    { amount: 17500, usd: 247.50 },
    { amount: "Custom", usd: "Custom" }
];

const grid = document.getElementById("coinsGrid");

/* Render Cards */
coinsData.forEach(item => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
        <img src="images/coin.png" class="icon">
        <div class="amount">${item.amount}</div>
        <div class="usd">US$${item.usd}</div>
    `;
    div.addEventListener("click", () => {
    document.querySelectorAll(".card").forEach(c => c.classList.remove("selected"));
    div.classList.add("selected");
    selectItem(item);
});
    grid.appendChild(div);
});

let selected = null;

/* Select fixed coin packages */
function selectItem(item) {
    selected = item;

    document.getElementById("selectedText").innerText =
        `Selected: ${item.amount} Coins`;

    document.getElementById("selectedUSD").innerText =
        `US$${item.usd}`;

    document.getElementById("payBtn").disabled = false;
}

/* Custom coins */
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

    /* 🔥 TikTok 美區匯率：70 coins = 0.91 → 1 coin = 0.013 USD */
    const usd = (val * 0.013).toFixed(2);

    customSummaryCoins.innerText = `${val} Coins`;
    customSummaryUSD.innerText = `US$${usd}`;

    selected = { amount: val, usd: usd };

    document.getElementById("selectedText").innerText =
        `Selected: ${val} Coins`;

    document.getElementById("selectedUSD").innerText =
        `US$${usd}`;

    document.getElementById("payBtn").disabled = false;
});

/* Payment Modal */
const payBtn = document.getElementById("payBtn");
const paymentModal = document.getElementById("paymentModal");
const cancelPay = document.getElementById("cancelPay");
const confirmPay = document.getElementById("confirmPay");

payBtn.addEventListener("click", () => {
    paymentModal.classList.add("active");
});

cancelPay.addEventListener("click", () => {
    paymentModal.classList.remove("active");
});

/* Success Modal + Loading */
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
/* ----------------------------- */
/*     Payment Method Active     */
/* ----------------------------- */

const methods = document.querySelectorAll(".method");

methods.forEach(m => {
    m.addEventListener("click", () => {
        methods.forEach(x => x.classList.remove("active"));
        m.classList.add("active");
    });
});
/* ----------------------------- */
/*     Custom Popup Logic        */
/* ----------------------------- */

const customModal = document.getElementById("customModal");
const popupInput = document.getElementById("popupCustomInput");
const popupCancel = document.getElementById("popupCancel");
const popupApply = document.getElementById("popupApply");

/* 找到 Custom 這張卡 */
const customCard = [...document.querySelectorAll(".card")]
    .find(c => c.innerText.includes("Custom"));

/* 點擊 Custom 顯示視窗 */
customCard.addEventListener("click", () => {
    customModal.classList.add("active");
    popupInput.value = "";
});

/* 關閉視窗 */
popupCancel.addEventListener("click", () => {
    customModal.classList.remove("active");
});

/* 按下 Apply 套用金額 */
popupApply.addEventListener("click", () => {
    let val = Number(popupInput.value);

    if (!val || val <= 0) return;

    // 用你原本的匯率： 1 coin = 0.013 USD
    let usd = (val * 0.013).toFixed(2);

    selected = { amount: val, usd: usd };

    document.getElementById("selectedText").innerText =
        `Selected: ${val} Coins`;

    document.getElementById("selectedUSD").innerText =
        `US$${usd}`;

    document.getElementById("customCoinsCount").innerText = `${val} Coins`;
    document.getElementById("customCoinsUSD").innerText = `US$${usd}`;

    document.getElementById("payBtn").disabled = false;
    customModal.classList.remove("active");
});
const customModal = document.getElementById("customModal");
const customInputBox = document.getElementById("customInputBox");
const customCancel = document.getElementById("customCancel");
const customApply = document.getElementById("customApply");

let customTemp = "";

// 打開 Custom 小窗
document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
        if (card.querySelector(".amount").innerText === "Custom") {
            customTemp = "";
            customInputBox.innerText = "0";
            customModal.classList.add("active");
        }
    });
});

// 數字鍵
document.querySelectorAll(".num").forEach(btn => {
    btn.addEventListener("click", () => {
        customTemp += btn.innerText;
        customInputBox.innerText = customTemp;
    });
});

// 刪除鍵
document.querySelector(".del").addEventListener("click", () => {
    customTemp = customTemp.slice(0, -1);
    customInputBox.innerText = customTemp || "0";
});

// Cancel
customCancel.addEventListener("click", () => {
    customModal.classList.remove("active");
});

// Apply
customApply.addEventListener("click", () => {

    let val = Number(customTemp);

    if (val <= 0) return;

    const usd = (val * 0.013).toFixed(2);

    document.getElementById("selectedText").innerText =
        `Selected: ${val} Coins`;

    document.getElementById("selectedUSD").innerText =
        `US$${usd}`;

    selected = { amount: val, usd: usd };

    document.getElementById("payBtn").disabled = false;

    customModal.classList.remove("active");
});




