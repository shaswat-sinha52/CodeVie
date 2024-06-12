

document.addEventListener("DOMContentLoaded", () => {
    const contestList = document.getElementById("contest-list");
    let users = [];
    const now = new Date().toISOString();
    const searchInput = document.querySelector("#search");

    searchInput.addEventListener("input", (e) => {
        const value = e.target.value.toLowerCase();
        users.forEach(contest => {
            const isVisible = contest.title && contest.title.toLowerCase().includes(value);
            contest.Element.classList.toggle("hide", !isVisible);
        });
    });

    const USERNAME=// add your username;
    const API_KEY=// add your api key;
    const apiUrl =`https://clist.by/api/v4/contest/?username=${USERNAME}&api_key=${API_KEY}&start__gt=${now}`;
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!data.objects || !Array.isArray(data.objects)) {
                throw new Error("Unexpected API response structure");
            }
            let contests = data.objects;
            contests.sort((a, b) => new Date(a.start) - new Date(b.start));

            if (contests.length === 0) {
                contestList.innerHTML = "<p>No contests available at the moment.</p>";
            } else {
                contestList.innerHTML = "";
                users = contests.map(contest => {
                    const contestElement = document.createElement("div");
                    contestElement.className = "contest";
                    const contestTitle = document.createElement("h2");
                    contestTitle.textContent = contest.event || "No title";
                    const contestDetails = document.createElement("p");
                    contestDetails.innerHTML = `Host: <a href="${contest.href || '#'}" target="_blank">${contest.host || "Unknown"}</a>`;
                    const contestDuration = document.createElement("p");
                    const durationInMinutes = Math.round(contest.duration / 60);
                    contestDuration.textContent = `Duration: ${durationInMinutes} minutes`;
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
                    return { title: contest.event, details: contest.host, duration: contest.duration, start: contest.start, end: contest.end, Element: contestElement };
                });
            }
        })
        .catch(error => {
            console.error("Error fetching contests:", error, "Check Your Internet Connection");
            contestList.innerHTML = `<p class="error">Error fetching contests: ${error.message}</p>`;
        });

    
    const homeLink = document.getElementById('home-link');
    const aboutLink = document.getElementById('about-link');
    const contactLink = document.getElementById('contact-link');
    const sections = document.querySelectorAll('.content');

    homeLink.addEventListener('click', () => showSection('home'));
    aboutLink.addEventListener('click', () => showSection('about'));
    contactLink.addEventListener('click', () => showSection('contact'));

    function showSection(sectionId) {
        sections.forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
    }

    document.getElementById('logo').addEventListener('click',()=>showSection('home'));

    document.getElementById('name').addEventListener('click',()=>showSection('home'));
});
