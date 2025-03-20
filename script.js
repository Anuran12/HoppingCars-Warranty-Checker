document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("submitBtn");
  const invoiceIdInput = document.getElementById("invoiceId");
  const errorMessage = document.getElementById("errorMessage");

  form.addEventListener("click", async function (e) {
    e.preventDefault();
    errorMessage.textContent = "";

    const invoiceId = invoiceIdInput.value.trim();

    if (!invoiceId) {
      errorMessage.textContent = "Please enter an invoice ID";
      return;
    }

    try {
      form.disabled = true;
      form.textContent = "Loading...";

      const response = await fetch(
        `https://test-backend-production-50d2.up.railway.app/api/warranty?invoiceId=${invoiceId}`
      );

      if (!response.ok) {
        throw new Error("Invalid invoice ID or server error");
      }

      const data = await response.json();

      // Store data in localStorage to use on the next page
      localStorage.setItem("warrantyData", JSON.stringify(data));

      // Redirect to warranty page
      window.location.href = "warranty.html";
    } catch (error) {
      errorMessage.textContent = error.message;
      form.disabled = false;
      form.textContent = "Submit";
    }
  });
});
