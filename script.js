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

        // Custom → 打開 customModal
        if (item.amount === "Custom") {
            customModal.classList.add("active");
            customInputBox.innerText = "0";
            customModalCoins.innerText = "0 Coins";
            customModalUSD.innerText = "US$0.00";
            return;
        }

        // 固定方案
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
/*   Custom Popup Logic          */
/* ----------------------------- */

const customModal = document.getElementById("customModal");
const customInputBox = document.getElementById("customInputBox");
const customModalCoins = document.getElementById("customModalCoins");
const customModalUSD = document.getElementById("customModalUSD");
const customRechargeBtn = document.getElementById("customRechargeBtn");

/* 數字鍵 */
document.querySelectorAll(".num").forEach(btn => {
    btn.addEventListener("click", () => {
        let current = customInputBox.innerText;
        if (current === "0") current = "";

        customInputBox.innerText = current + btn.innerText;

        updateCustomSummary();
    });
});

/* 刪除鍵 */
document.querySelector(".del").addEventListener("click", () => {
    let val = customInputBox.innerText;
    customInputBox.innerText = val.length > 1 ? val.slice(0, -1) : "0";
    updateCustomSummary();
});

/* 更新數據 */
function updateCustomSummary() {
    let val = Number(customInputBox.innerText);
    if (!val) val = 0;

    const usd = (val * 0.013).toFixed(2);

    customModalCoins.innerText = `${val} Coins`;
    customModalUSD.innerText = `US$${usd}`;

    selected = { amount: val, usd: usd };

    document.getElementById("selectedText").innerText =
        `Selected: ${val} Coins`;
    document.getElementById("selectedUSD").innerText = `US$${usd}`;

    document.getElementById("payBtn").disabled = val <= 0;
}

/* Custom return < 按鈕 */
document.getElementById("customBack").addEventListener("click", () => {
    customModal.classList.remove("active");
});

/* Custom Recharge 按鈕 */
customRechargeBtn.addEventListener("click", () => {
    // 直接觸發主畫面的 Recharge
    payBtn.click();
});
