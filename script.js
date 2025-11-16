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

        // Custom → 打開小窗
        if (item.amount === "Custom") {
            customModal.classList.add("active");
            customInputBox.innerText = "0";
            updateCustomModal(0);
            return;
        }

        // 一般固定套餐
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

/* ----------------------------- */
/*   Custom Popup Logic          */
/* ----------------------------- */

const customModal = document.getElementById("customModal");
const customInputBox = document.getElementById("customInputBox");
const customCancel = document.getElementById("customCancel");
const customApply = document.getElementById("customApply");
const customRechargeBtn = document.getElementById("customRechargeBtn");

const modalCoins = document.getElementById("customModalCoins");
const modalUSD = document.getElementById("customModalUSD");

/* 更新小窗匯率 */
function updateCustomModal(val) {
    const usd = (val * 0.013).toFixed(2);

    modalCoins.innerText = `${val} Coins`;
    modalUSD.innerText = `US$${usd}`;
}

/* 點數字按鈕 */
document.querySelectorAll(".num").forEach(btn => {
    btn.addEventListener("click", () => {
        let current = customInputBox.innerText;
        if (current === "0") current = "";
        const newVal = Number(current + btn.innerText);

        customInputBox.innerText = newVal;
        updateCustomModal(newVal);
    });
});

/* 刪除按鈕 */
document.querySelector(".del").addEventListener("click", () => {
    let v = customInputBox.innerText;
    v = v.length > 1 ? v.slice(0, -1) : "0";
    customInputBox.innerText = v;
    updateCustomModal(Number(v));
});

/* Cancel */
customCancel.addEventListener("click", () => {
    customModal.classList.remove("active");
});

/* Apply → 把小窗數字存進主畫面 */
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

/* 小窗 Recharge → 等於按主畫面 Recharge */
customRechargeBtn.addEventListener("click", () => {
    customApply.click();      // 先套用
    document.getElementById("payBtn").click();  // 再打開付款視窗
});

/* ----------------------------- */
/* Payment Modal                 */
/* ----------------------------- */

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

/* Success Modal */
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

/* 支付方式 active 效果 */
const methods = document.querySelectorAll(".method");

methods.forEach(m => {
    m.addEventListener("click", () => {
        methods.forEach(x => x.classList.remove("active"));
        m.classList.add("active");
    });
});
