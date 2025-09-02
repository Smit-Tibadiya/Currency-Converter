console.log("Currency converter");
let select = document.querySelectorAll("select");
let frcon, tocon;
let URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json";
function code() {
    for (let opt of select) {
        for (key in countryList) {
            let option = document.createElement("option");
            option.setAttribute("value", key);
            option.innerText = key;
            opt.append(option);
            if (opt.id === "from" && key === "USD") {
                option.selected = "selected";
            } else if (opt.id === "to" && key === "INR") {
                option.selected = "selected";
            }
        }
        opt.addEventListener("change", (evt) => {
            updateURL(evt.target);
        })
    }
}
code();


const updateURL = (element) => {
    let curCode = element.value;
    let conCode = countryList[curCode];

    let imgdiv;
    if (element.name === "from") {
        imgdiv = document.querySelector(".frm img");
    } else {
        imgdiv = document.querySelector("#to img");
    }
    imgdiv.setAttribute("src", `https://flagsapi.com/${conCode.substring(0, 2)}/flat/64.png`);
}

async function changeURL(fromURL, toURL) {
    let promise = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromURL}.json`);
    let data = await promise.json();
    getOut(data[fromURL][toURL], fromURL, toURL);
}

let button = document.querySelector("button");
button.addEventListener("click", (event) => {
    event.preventDefault();
    let amount = document.querySelector("input");
    let amval = amount.value;
    if (amval == 0 || amval < 1) {
        amval = 1;
        amount.value = 1;
    }
    let frcur = "" + document.querySelector("#from").value;
    let tocur = "" + document.querySelector(".to select").value;
    changeURL(frcur.toLowerCase(), tocur.toLowerCase());
})

function getOut(rate, fr, to) {
    let ans = document.querySelector(".ans");
    let inp = document.querySelector("input");
    ans.innerText = `${inp.value} ${fr.toUpperCase()} = ${inp.value * rate} ${to.toUpperCase()}`;
}