document.addEventListener("DOMContentLoaded", () => {
    const contestList = document.getElementById("contest-list");

    // Get the current date and time in ISO format for your timezone
    const now = new Date().toISOString();

    // Adjust the API URL to filter contests based on the current date and time
    const apiUrl = `https://clist.by/api/v4/contest/?username=Shaswat_78&api_key=733fd04bf4419f8b5a7fc837c9978ffcd43c316d&start__gt=${now}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("API response:", data); // Debugging line

            if (!data.objects || !Array.isArray(data.objects)) {
                throw new Error("Unexpected API response structure");
            }

            const contests = data.objects;

            if (contests.length === 0) {
                contestList.innerHTML = "<p>No contests available at the moment.</p>";
            } else {
                contestList.innerHTML = ""; // Clear any previous content
                contests.forEach(contest => {
                    const contestElement = document.createElement("div");
                    contestElement.className = "contest";

                    const contestTitle = document.createElement("h2");
                    contestTitle.textContent = contest.event || "No title";

                    const contestDetails = document.createElement("p");
                    contestDetails.textContent = `Host: ${contest.host || "Unknown"}`;

                    const contestDuration = document.createElement("p");
                    contestDuration.textContent = `Duration: ${contest.duration || "Unknown"}`;

                    const contestStart = document.createElement("p");
                    contestStart.textContent = `Starts at: ${contest.start ? new Date(contest.start).toLocaleString() : "Unknown"}`;

                    const contestEnd = document.createElement("p");
                    contestEnd.textContent = `Ends at: ${contest.end ? new Date(contest.end).toLocaleString() : "Unknown"}`;

                    contestElement.appendChild(contestTitle);
                    contestElement.appendChild(contestDetails);
                    contestElement.appendChild(contestDuration);
                    contestElement.appendChild(contestStart);
                    contestElement.appendChild(contestEnd);

                    contestList.appendChild(contestElement);
                });
            }
        })
        .catch(error => {
            console.error("Error fetching contests:", error);
            contestList.innerHTML = `<p class="error">Error fetching contests: ${error.message}</p>`;
        });
});
