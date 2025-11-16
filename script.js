/* -----------------------------
    TikTok 美區固定方案
----------------------------- */
const coinsData = [
    { amount: 30, usd: 0.42 },
    { amount: 350, usd: 4.95 },
    { amount: 700, usd: 9.90 },
    { amount: 7000, usd: 99.00 },
    { amount: 17500, usd: 247.50 },
    { amount: "Custom", usd: "Custom" }
];

const grid = document.getElementById("coinsGrid");

/* Render cards */
coinsData.forEach(item => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
        <img src="images/coin.png" class="icon">
        <div class="amount">${item.amount}</div>
        <div class="usd">US$${item.usd}</div>
    `;

    div.addEventListener("click", () => {

        // Custom → 開小窗
        if (item.amount === "Custom") {
            customModal.classList.add("active");
            customInputBox.innerText = "0";
            customModalCoins.innerText = `0 Coins`;
            customModalUSD.innerText = `US$0.00`;
            return;
        }

        // 固定方案選取
        document.querySelectorAll(".card").forEach(c => c.classList.remove("selected"));
        div.classList.add("selected");
        selectItem(item);
    });

    grid.appendChild(div);
});

let selected = null;

/* 選取固定方案 */
function selectItem(item) {
    selected = item;

    document.getElementById("selectedText").innerText =
        `Selected: ${item.amount} Coins`;

    document.getElementById("selectedUSD").innerText =
        `US$${item.usd}`;

    document.getElementById("payBtn").disabled = false;
}


/* -----------------------------
        Custom Modal
----------------------------- */
const customModal = document.getElementById("customModal");
const customInputBox = document.getElementById("customInputBox");
const customModalCoins = document.getElementById("customModalCoins");
const customModalUSD = document.getElementById("customModalUSD");
const customCancel = document.getElementById("customCancel");
const customApply = document.getElementById("customApply");
const customRechargeBtn = document.getElementById("customRechargeBtn");

/* 更新 Custom 小窗的匯率顯示 */
function updateCustomModal(val) {
    const coins = Number(val) || 0;
    const usd = (coins * 0.013).toFixed(2);

    customModalCoins.innerText = `${coins} Coins`;
    customModalUSD.innerText = `US$${usd}`;
}

/* 數字鍵 */
document.querySelectorAll(".num").forEach(btn => {
    btn.addEventListener("click", () => {
        let current = customInputBox.innerText;
        if (current === "0") current = "";

        let newVal = current + btn.innerText;
        customInputBox.innerText = newVal;

        updateCustomModal(newVal);
    });
});

/* 刪除鍵 */
document.querySelector(".del").addEventListener("click", () => {
    let val = customInputBox.innerText;
    let newVal = val.length > 1 ? val.slice(0, -1) : "0";

    customInputBox.innerText = newVal;
    updateCustomModal(newVal);
});

/* Cancel 關閉 */
customCancel.addEventListener("click", () => {
    customModal.classList.remove("active");
});

/* Apply → 套用到主頁面 */
function applyCustomValue() {
    let val = Number(customInputBox.innerText);
    if (!val || val <= 0) return;

    const usd = (val * 0.013).toFixed(2);

    selected = { amount: val, usd: usd };

    document.getElementById("selectedText").innerText = `Selected: ${val} Coins`;
    document.getElementById("selectedUSD").innerText = `US$${usd}`;
    document.getElementById("payBtn").disabled = false;

    customModal.classList.remove("active");

    // 清除固定方案的選取外框
    document.querySelectorAll(".card").forEach(c => c.classList.remove("selected"));
}

/* Apply 按鈕 */
customApply.addEventListener("click", applyCustomValue);

/* Custom 小窗的 Recharge 按鈕 */
customRechargeBtn.addEventListener("click", applyCustomValue);


/* -----------------------------
    Payment Modal
----------------------------- */
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


/* -----------------------------
    Success + Loading
----------------------------- */
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


/* -----------------------------
       Payment Method Active
----------------------------- */
const methods = document.querySelectorAll(".method");

methods.forEach(m => {
    m.addEventListener("click", () => {
        methods.forEach(x => x.classList.remove("active"));
        m.classList.add("active");
    });
});
