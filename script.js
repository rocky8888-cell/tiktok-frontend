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
        if (item.amount === "Custom") {
            customModal.classList.add("active");
            customInputBox.innerText = "0";
            updateCustomSummary(0);
            return;
        }

        document.querySelectorAll(".card").forEach(c => c.classList.remove("selected"));
        div.classList.add("selected");
        selectItem(item);
    });

    grid.appendChild(div);
});

/* Selected items */
let selected = null;

function selectItem(item) {
    selected = item;
    document.getElementById("selectedText").innerText = `Selected: ${item.amount} Coins`;
    document.getElementById("selectedUSD").innerText = `US$${item.usd}`;
    document.getElementById("payBtn").disabled = false;
}

/* ---------------------- */
/*        Custom Modal    */
/* ---------------------- */

const customModal = document.getElementById("customModal");
const customBackBtn = document.getElementById("customBackBtn");

const customInputBox = document.getElementById("customInputBox");
const customCoinsText = document.getElementById("customModalCoins");
const customUSDText = document.getElementById("customModalUSD");

function updateCustomSummary(val) {
    const usd = (val * 0.013).toFixed(2);
    customCoinsText.innerText = `${val} Coins`;
    customUSDText.innerText = `US$${usd}`;
}

/* Number pad */
document.querySelectorAll(".num").forEach(btn => {
    btn.addEventListener("click", () => {
        let current = customInputBox.innerText;
        if (current === "0") current = "";
        const newVal = current + btn.innerText;
        customInputBox.innerText = newVal;
        updateCustomSummary(Number(newVal));
    });
});

document.querySelector(".del").addEventListener("click", () => {
    let val = customInputBox.innerText;
    val = val.length > 1 ? val.slice(0, -1) : "0";
    customInputBox.innerText = val;
    updateCustomSummary(Number(val));
});

/* Back button */
customBackBtn.addEventListener("click", () => {
    customModal.classList.remove("active");
});

/* Recharge inside custom popup */
document.getElementById("customRechargeBtn").addEventListener("click", () => {
    const val = Number(customInputBox.innerText);
    if (!val || val <= 0) return;

    const usd = (val * 0.013).toFixed(2);

    selected = { amount: val, usd: usd };

    document.getElementById("selectedText").innerText = `Selected: ${val} Coins`;
    document.getElementById("selectedUSD").innerText = `US$${usd}`;
    document.getElementById("payBtn").disabled = false;

    customModal.classList.remove("active");
});

/* ---------------------- */
/*      Payment Modal     */
/* ---------------------- */

const payBtn = document.getElementById("payBtn");
const paymentModal = document.getElementById("paymentModal");
const cancelPay = document.getElementById("cancelPay");
const confirmPay = document.getElementById("confirmPay");

payBtn.addEventListener("click", () => paymentModal.classList.add("active"));
cancelPay.addEventListener("click", () => paymentModal.classList.remove("active"));

/* Select payment method */
const methods = document.querySelectorAll(".method");
methods.forEach(m => {
    m.addEventListener("click", () => {
        methods.forEach(x => x.classList.remove("active"));
        m.classList.add("active");
    });
});

/* Success + Loading */
const loading = document.getElementById("loading");
const successModal = document.getElementById("successModal");
const coinsResult = document.getElementById("coins");
const goBack = document.getElementById("goBack");

confirmPay.addEventListener("click", () => {
    paymentModal.classList.remove("active");
    loading.classList.remove("hidden");
    
    setTimeout(() => {
        loading.classList.add("hidden");
        coinsResult.innerText = `Recharged ${selected.amount} Coins`;
        successModal.classList.add("active");
    }, 3500);
});

goBack.addEventListener("click", () => location.reload());
/* ----------------------------- */
/*   Custom Modal Recharge BTN   */
/* ----------------------------- */

const customRechargeBtn = document.getElementById("customRechargeBtn");

if (customRechargeBtn) {
    customRechargeBtn.addEventListener("click", () => {
        // 關閉 custom 小窗
        customModal.classList.remove("active");

        // 開啟付款 modal → 和主頁按鈕一模一樣
        paymentModal.classList.add("active");
    });
}
