document.addEventListener("DOMContentLoaded", function () {
  // Get data from localStorage
  const warrantyDataString = localStorage.getItem("warrantyData");

  if (!warrantyDataString) {
    // Redirect back to the first page if data is not available
    window.location.href = "index.html";
    return;
  }

  try {
    const data = JSON.parse(warrantyDataString);
    displayWarrantyDetails(data);
  } catch (error) {
    console.error("Error parsing warranty data:", error);
    window.location.href = "index.html";
  }
});

function displayWarrantyDetails(data) {
  // Set customer details
  document.getElementById("customerName").textContent = data.customerName;
  document.getElementById("vehicleModel").textContent = data.vehicleModel;
  document.getElementById("vehicleNumber").textContent = data.vehicleNumber;

  // Set service details
  document.getElementById("serviceName").textContent = data.serviceName;
  document.getElementById("servicePlace").textContent = data.servicePlace;
  document.getElementById("serviceDate").textContent = formatDate(
    data.serviceDate
  );
  document.getElementById("productName").textContent = data.productName;
  document.getElementById("productId").textContent = data.productId;
  document.getElementById("invoiceNumber").textContent = data.invoiceId;

  // Format and set warranty period
  const warrantyEnd = formatDate(data.warrantyEndDate);
  const warrantyYears = calculateWarrantyYears(
    data.serviceDate,
    data.warrantyEndDate
  );
  document.getElementById(
    "warrantyTill"
  ).textContent = `${warrantyEnd} (${warrantyYears} Years)`;

  // Set profile image (using the first image as profile for demonstration)
  if (data.images && data.images.length > 0) {
    document.getElementById("profile-image").src = data.images[0];
  } else {
    document.getElementById("profile-image").src = "img/user.png";
  }

  // Add service images
  const serviceImagesContainer = document.getElementById("service-images");
  if (data.images && data.images.length > 0) {
    // Start from index 1 to skip the first image
    for (let i = 1; i < data.images.length; i++) {
      const imageUrl = data.images[i];
      const imageContainer = document.createElement("div");
      imageContainer.className = "image-container";

      const img = document.createElement("img");
      img.src = imageUrl;
      img.alt = "Service Image";

      imageContainer.appendChild(img);
      serviceImagesContainer.appendChild(imageContainer);
    }
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function calculateWarrantyYears(startDateString, endDateString) {
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);
  const diffTime = Math.abs(endDate - startDate);
  const diffYears = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 365));
  return diffYears;
}
