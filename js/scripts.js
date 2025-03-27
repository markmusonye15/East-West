document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("booking");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    const date = document.getElementById("date").value;
    const passengers = document.getElementById("passengers").value;

    fetch(`http://localhost:3000/flights?from=${from}&to=${to}&date=${date}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          alert(`Flight Found: ${JSON.stringify(data)}`);
        } else {
          alert("No flights found!");
        }
      })
      .catch((error) => console.error("Error fetching flights:", error));
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.getElementById("search-form");
  const resultsContainer = document.createElement("div");
  document.body.appendChild(resultsContainer);

  searchForm.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent page refresh

    const from = document.getElementById("from").value.trim();
    const to = document.getElementById("to").value.trim();
    const date = document.getElementById("date").value;

    if (!from || !to || !date) {
      alert("Please enter all fields!");
      return;
    }

    console.log("Searching for flights:", { from, to, date });

    try {
      const response = await fetch(
        `http://localhost:3000/flights?from=${from}&to=${to}&date=${date}`
      );

      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }

      const flights = await response.json();
      console.log("Flights received:", flights);
      displayFlights(flights);
    } catch (error) {
      console.error("Fetch error:", error);
      resultsContainer.innerHTML = `<p style="color: red;">Error fetching flights. Check console for details.</p>`;
    }
  });

  function displayFlights(flights) {
    resultsContainer.innerHTML = "<h3>Available Flights:</h3>";

    if (flights.length === 0) {
      resultsContainer.innerHTML += "<p>No flights found.</p>";
      return;
    }

    flights.forEach((flight) => {
      resultsContainer.innerHTML += `
        <div class="flight">
          <p><strong>${flight.airline} - ${flight.flightNumber}</strong></p>
          <p>From: ${flight.from} → To: ${flight.to}</p>
          <p>Date: ${flight.date} | Seats: ${flight.seats}</p>
          <button onclick="bookFlight(${flight.id})">Book Now</button>
        </div>
        <hr>
      `;
    });
  }
});

function bookFlight(flightId) {
  alert(`Flight ${flightId} booked successfully!`);
}
