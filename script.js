const shades = [
  "#000",
  "#fff",
  "#da0054",
  "#7300ff",
  "#e262ff",
  "#4e4e4e",
  "aqua",
  "#00ac9e",
  "purple",
  "#00a0b9",
  "aqua",
  "#0068c8",
];
const colors = Array.from(document.getElementsByClassName("color"));
const toggleBtn = document.getElementsByClassName("toggle")[0];
const settingsBtn = document.getElementsByTagName("ion-icon")[0];
const page1 = document.getElementsByTagName("section")[0];
const page2 = document.getElementsByTagName("section")[1];
const backBtn = document.getElementsByName("add")[0];
const showLeft = document.getElementsByClassName("left")[0];
const buttons = document.querySelectorAll(".btns");
const count = document.getElementsByTagName("h1")[0];
const status = document.getElementsByClassName("status")[0];
const countIn = document.getElementsByTagName("input")[0];
const limit = document.getElementsByTagName("input")[1];
const sections = Array.from(document.getElementsByTagName("section"));
const text = document.getElementsByClassName("text");
const reload = document.getElementsByName("reload")[0];
const on = document.getElementsByTagName("span")[0];
const off = document.getElementsByTagName("span")[1];
const limitSet = document.getElementById("limit-show");
const footer = document.getElementsByTagName("footer")[0];
//
for (const element in colors) {
  colors[element].style.backgroundColor = shades[element];
}

colors.forEach((element) => {
  element.addEventListener("click", () => {
    sections.forEach((i) => {
      i.style.backgroundColor = shades[colors.indexOf(element)];
      i.style.transition = ".2s";
    });
    for (const u of colors) {
      u.style.boxShadow = "0 0 0 0 transparent";
    }
    if (element.id == "white") {
      document.documentElement.style.setProperty("--text-color", "#000");
    } else {
      document.documentElement.style.setProperty("--text-color", "#fff");
    }
    element.style.boxShadow = "0 0 5px 1px var(--text-color)";
  });
});

toggleBtn.addEventListener("click", () => {
  toggleBtn.classList.toggle("clicked");
  if (toggleBtn.classList.contains("clicked")) {
    off.id = " ";
    on.id = "selected";
    limitSet.style.zIndex = "-1";
    footer.style.zIndex = "-1";
  } else {
    footer.style.zIndex = "1";
    limitSet.style.zIndex = "1";
    on.id = " ";
    off.id = "selected";
  }
});

settingsBtn.addEventListener("click", () => {
  page1.style.display = "none";
  page2.style.display = "flex";
});

backBtn.addEventListener("click", () => {
  page2.style.display = "none";
  page1.style.display = "flex";
});

buttons.forEach((element) => {
  element.addEventListener("click", () => {
    if (element.name == "add-outline") {
      count.innerHTML = Number(count.innerHTML) + 1;
    } else {
      count.innerHTML = Number(count.innerHTML) - 1;
    }
    check();
  });
});

countIn.addEventListener("input", () => {
  count.innerHTML = countIn.value;
  check();
});

limit.addEventListener("input", () => {
  check();
});

reload.addEventListener("click", () => {
  countIn.value = "0";
  count.innerHTML = countIn.value;
  limit.value = "20";
  check();
  sections.forEach((element) => {
    element.style.background = "#000";
  });
  document.documentElement.style.setProperty("--text-color", "#fff");
  for (const element of colors) {
    if (element.id == "black") {
 
        element.style.boxShadow = "0 0 5px 1px var(--text-color)";
    } else {
      element.style.boxShadow = "0 0 0 0 transparent";
    }
  }
  footer.style.zIndex = "1";
  off.id = "selected";
  on.id = " ";
  limitSet.style.zIndex = "1";
  toggleBtn.classList.remove("clicked");
});

function check() {
  showLeft.innerHTML = Number(limit.value) - Number(count.innerHTML);
  countIn.value = count.innerHTML;
  if (count.innerHTML > 0) {
    buttons[0].style.zIndex = "1";
  } else {
    buttons[0].style.zIndex = "-1";
  }
  if (Number(count.innerHTML) > Number(limit.value)) {
    status.innerHTML = "Limit reached!";
    status.classList.add("blink");
  } else {
    status.classList.remove("blink");
    status.innerHTML = "AVAILABLE";
  }
}