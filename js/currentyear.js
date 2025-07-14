// Update current year in footer
function updateCurrentYear() {
  const year = new Date().getFullYear();
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = year;
  }
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", updateCurrentYear);