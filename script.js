const copyButton = document.querySelector("#copy-icon");
const passwordText = document.querySelector("#password");
const lengthSlider = document.querySelector("#length");
const lengthValue = document.querySelector("#length-value");
const upperCase = document.querySelector("#uppercase");
const lowerCase = document.querySelector("#lowercase");
const digits = document.querySelector("#digits");
const symbols = document.querySelector("#symbols");
const generateBtn = document.querySelector("#generate-btn");
const strengthLabel = document.querySelector("#strength-label");
const strengthBar = document.querySelector(".strength-bar")
const strengthMeter = document.querySelector(".strength-meter")

const allUpperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const allLowerCaseChars = "abcdefghijklmnopqrstuvwxyz"
const allDigits = "0123456789"
const allSymbols = "~!@#$%^&*()+_\-={}|[\]:;\"'<>,.?"

lengthSlider.addEventListener("input", () => {
  lengthValue.textContent = lengthSlider.value;
})

generateBtn.addEventListener("click", makePassword);

function makePassword() {
  const length = Number(lengthValue.textContent);
  const hasUpper = upperCase.checked;
  const hasLower = lowerCase.checked;
  const hasDigits = digits.checked;
  const hasSymbols = symbols.checked;

  if(!hasUpper && !hasLower && !hasDigits && !hasSymbols) {
    alert("Please select at least one parameter");
    return;
  }

  const newPassword = createRandomPassword(
    length,
    hasUpper,
    hasLower,
    hasDigits,
    hasSymbols
  )

  passwordText.value = newPassword;
  updateStrengthMeter(newPassword);
}

function createRandomPassword(length,hasUpper,hasLower,hasDigits,hasSymbols) {
  let allCharacters = "";
  if(hasUpper) allCharacters += allUpperCaseChars
  if(hasLower) allCharacters += allLowerCaseChars
  if(hasDigits) allCharacters += allDigits
  if(hasSymbols) allCharacters += allSymbols

  let password = "";

  for(let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * allCharacters.length);
    password += allCharacters[index];
  }

  return password;
}

function updateStrengthMeter(password) {
  const length = password.length;

  const hasUpper = /[A-Z]/.test(password)
  const hasLower = /[a-z]/.test(password)
  const hasDigits = /[0-9]/.test(password)
  const hasSymbols = /[~!@#$%^&*()+_\-={}|[\]:;"'<>,.?]/.test(password)

  let strengthScore = 0;

  strengthScore += Math.min(password.length * 2, 40);
  if(hasUpper) strengthScore += 15;
  if(hasLower) strengthScore += 15;
  if(hasDigits) strengthScore += 15;
  if(hasSymbols) strengthScore += 15;

  if(password.length < 8) {
    strengthScore = Math.min(strengthScore, 40);
  }

  const safeScore = Math.max(5, Math.min(strengthScore,100))
  strengthBar.style.width = safeScore + "%"

  let strengthLabelText = "";
  let barColor = "";

  if (strengthScore < 40) {
    // weak password
    barColor = "#fc8181";
    strengthLabelText = "Weak";
  } else if (strengthScore < 70) {
    // Medium password
    barColor = "#fbd38d"; // Yellow
    strengthLabelText = "Medium";
  } else {
    // Strong password
    barColor = "#68d391"; // Green
    strengthLabelText = "Strong";
  }

  strengthBar.style.backgroundColor = barColor;
  strengthLabel.textContent = strengthLabelText;
}

window.addEventListener("DOMContentLoaded", makePassword);

copyButton.addEventListener("click", () => {
  if (!passwordText.value) return;

  navigator.clipboard
    .writeText(passwordText.value)
    .then(() => showCopySuccess())
    .catch((error) => console.log("Could not copy:", error));
});

function showCopySuccess() {
  copyButton.classList.remove("far", "fa-copy");
  copyButton.classList.add("fas", "fa-check");
  copyButton.style.color = "#48bb78";

  setTimeout(() => {
    copyButton.classList.remove("fas", "fa-check");
    copyButton.classList.add("far", "fa-copy");
    copyButton.style.color = "";
  }, 1500);
}