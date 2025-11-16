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

        // Custom -> open modal
        if (item.amount === "Custom") {
            customModal.classList.add("active");
            customInputBox.innerText = "0";
            updateCustomModal(0);
            return;
        }

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

    document.getElementById("selectedText").innerText = `Selected: ${item.amount} Coins`;
    document.getElementById("selectedUSD").innerText = `US$${item.usd}`;
    document.getElementById("payBtn").disabled = false;
}

/* ----------------------------- */
/*   Custom Modal Elements        */
/* ----------------------------- */

const customModal = document.getElementById("customModal");
const customInputBox = document.getElementById("customInputBox");
const customModalCoins = document.getElementById("customModalCoins");
const customModalUSD = document.getElementById("customModalUSD");
const customCancel = document.getElementById("customCancel");
const customApply = document.getElementById("customApply");
const customRechargeBtn = document.getElementById("customRechargeBtn");

/* Update modal preview */
function updateCustomModal(val) {
    const usd = (val * 0.013).toFixed(2);

    customModalCoins.innerText = `${val} Coins`;
    customModalUSD.innerText = `US$${usd}`;
}

/* Number pad input */
document.querySelectorAll(".num").forEach(btn => {
    btn.addEventListener("click", () => {
        let current = customInputBox.innerText;
        if (current === "0") current = "";
        customInputBox.innerText = current + btn.innerText;

        const val = Number(customInputBox.innerText);
        updateCustomModal(val);
    });
});

/* Delete key */
document.querySelector(".del").addEventListener("click", () => {
    let val = customInputBox.innerText;
    val = val.length > 1 ? val.slice(0, -1) : "0";
    customInputBox.innerText = val;

    updateCustomModal(Number(val));
});

/* Cancel */
customCancel.addEventListener("click", () => {
    customModal.classList.remove("active");
});

/* Apply → updates main selected area */
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

/* Custom Recharge button = same as Apply + open payment modal */
customRechargeBtn.addEventListener("click", () => {
    let val = Number(customInputBox.innerText);
    if (!val || val <= 0) return;

    const usd = (val * 0.013).toFixed(2);

    selected = { amount: val, usd: usd };

    document.getElementById("selectedText").innerText = `Selected: ${val} Coins`;
    document.getElementById("selectedUSD").innerText = `US$${usd}`;
    document.getElementById("payBtn").disabled = false;

    customModal.classList.remove("active");

    // Directly open payment modal
    paymentModal.classList.add("active");
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

/* Payment success */
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

/* Payment method highlight */
const methods = document.querySelectorAll(".method");

methods.forEach(m => {
    m.addEventListener("click", () => {
        methods.forEach(x => x.classList.remove("active"));
        m.classList.add("active");
    });
});
