// Initialize global namespace
window.parliamentApp = {};

// Remove this line as it's trying to access content that doesn't exist yet
// document.getElementById("constitution").innerHTML = data.TextTabs.constitution;

document.getElementById("logo").src = data.ParliamentLogo;
document.title = data.nameOfParliament;

// Create sorted array of parties and make it global
window.parliamentApp.parties = Object.values(data.Parties)
    .map((party) => ({
        ...party,
        name: party.Name,
        seats: party.Seats,
        logoUrl: party.Logo,
    }))
    .sort((a, b) => b.Seats - a.Seats);

// Calculate total seats once
window.parliamentApp.totalSeats =
    window.parliamentApp.parties.reduce(
        (sum, party) => sum + party.seats,
        0
    );
const svg = document.getElementById("parliament");
const tooltip = document.getElementById("tooltip");

// SVG namespace for creating elements
const svgNS = "http://www.w3.org/2000/svg";

// Set up diagram parameters
const seatSize = 24;
const seatRadius = seatSize / 2;
const seatSpacing = 4; // Space between seats
const effectiveSeatSize = seatSize + seatSpacing;
const maxRowCount = 10;

// Distribute seats to fill semicircle evenly
function distributeSeats() {
    // Calculate how many rows and seats per row
    const rows = [];
    let remainingSeats = window.parliamentApp.totalSeats;
    let maxWidthSeats = 0;

    for (
        let rowIndex = 0;
        rowIndex < maxRowCount && remainingSeats > 0;
        rowIndex++
    ) {
        const radius = effectiveSeatSize * (rowIndex + 2); // Start with a minimum radius
        const rowCircumference = Math.PI * radius;
        const maxPossibleSeats = Math.floor(
            rowCircumference / effectiveSeatSize
        );

        // Fill row as much as possible
        const seatsInRow = Math.min(
            maxPossibleSeats,
            remainingSeats
        );

        if (seatsInRow > 0) {
            rows.push({
                rowIndex,
                radius,
                seatsCount: seatsInRow,
            });

            remainingSeats -= seatsInRow;
            maxWidthSeats = Math.max(maxWidthSeats, seatsInRow);
        }
    }

    return { rows, maxWidthSeats };
}

// Place seats and calculate dimensions
function placeSeats() {
    const { rows, maxWidthSeats } = distributeSeats();
    let seatCount = 0;
    let partyIndex = 0;
    let seatsPlacedInParty = 0;

    // Calculate SVG dimensions based on the diagram
    const maxRadius =
        rows.length > 0
            ? rows[rows.length - 1].radius + seatRadius
            : 0;
    const svgWidth = maxRadius * 2 + seatSize;
    const svgHeight = maxRadius + seatSize;

    // Set SVG attributes with the calculated dimensions
    svg.setAttribute("width", svgWidth);
    svg.setAttribute("height", svgHeight);
    svg.setAttribute("viewBox", `0 0 ${svgWidth} ${svgHeight}`);

    // Calculate center point
    const centerX = svgWidth / 2;
    const centerY = svgHeight - seatRadius;

    // For each row
    rows.forEach((row) => {
        const angleStep = Math.PI / (row.seatsCount - 1 || 1);

        // For each seat in row
        for (
            let seatInRow = 0;
            seatInRow < row.seatsCount;
            seatInRow++
        ) {
            // Find current party
            while (
                seatsPlacedInParty >=
                window.parliamentApp.parties[partyIndex].seats
            ) {
                partyIndex++;
                seatsPlacedInParty = 0;
            }

            const party = window.parliamentApp.parties[partyIndex];

            // Calculate angle (distribute seats evenly across 180 degrees)
            let angle;
            if (row.seatsCount === 1) {
                angle = Math.PI / 2; // Place single seat at the top
            } else {
                angle =
                    (Math.PI * seatInRow) / (row.seatsCount - 1);
            }

            // Calculate position
            const x = centerX + row.radius * Math.cos(angle);
            const y = centerY - row.radius * Math.sin(angle);

            // Create circle clip path
            const clipPathId = `clip-${seatCount}`;
            const clipPath = document.createElementNS(
                svgNS,
                "clipPath"
            );
            clipPath.setAttribute("id", clipPathId);

            const clipCircle = document.createElementNS(
                svgNS,
                "circle"
            );
            clipCircle.setAttribute("cx", x);
            clipCircle.setAttribute("cy", y);
            clipCircle.setAttribute("r", seatRadius);

            clipPath.appendChild(clipCircle);
            svg.appendChild(clipPath);

            // Create image (with circular clipping)
            const image = document.createElementNS(svgNS, "image");
            image.setAttribute("x", x - seatRadius);
            image.setAttribute("y", y - seatRadius);
            image.setAttribute("width", seatSize);
            image.setAttribute("height", seatSize);
            image.setAttribute("href", party.logoUrl);
            image.setAttribute("clip-path", `url(#${clipPathId})`);
            image.setAttribute("class", "seat");
            image.setAttribute("data-party", party.name);

            // Add mouse events with corrected tooltip positioning
            image.addEventListener("mousemove", (event) => {
                tooltip.innerText = party.name;
                tooltip.style.left = `${event.clientX + 10}px`;
                tooltip.style.top = `${event.clientY + 10}px`;
                tooltip.style.display = "block";
            });

            image.addEventListener("mouseout", () => {
                tooltip.style.display = "none";
            });

            svg.appendChild(image);

            seatCount++;
            seatsPlacedInParty++;
        }
    });

    return { width: svgWidth, height: svgHeight };
}

// Initialize and get diagram dimensions
const dimensions = placeSeats();

// Update container dimensions
document.getElementById(
    "container"
).style.width = `${dimensions.width}px`;
document.getElementById(
    "container"
).style.height = `${dimensions.height}px`;

document.getElementById("logo").src = data.ParliamentLogo;
document.title = data.nameOfParliament;

// Create sorted array of parties and make it global for other scripts
window.parties = Object.values(data.Parties)
    .map((party) => ({
        ...party,
        name: party.Name,
        seats: party.Seats,
        logoUrl: party.Logo,
    }))
    .sort((a, b) => b.Seats - a.Seats);

// Function to format candidates
function formatCandidates(candidates) {
    return Object.entries(candidates)
        .map(([handle, link]) => `<a href="${link}">${handle}</a>`)
        .join(", ");
}

// Handle top 3 parties
parties.slice(0, 3).forEach((party, index) => {
    const place = index + 1;
    const suffix = place === 1 ? "st" : place === 2 ? "nd" : "rd";
    const placeId = `place${place}`;

    document.getElementById(placeId).innerHTML = `
        <div class="placedetails">
            <div class="top-party-info">
                <div style="display: flex">
                    <img
                        src="${party.Logo}"
                        class="partylogo"
                        style="margin: 0"
                    />
                    <div class="top-party-name">
                        ${party.Name}
                    </div>
                </div>

                <div class="top-party-tagline"> 
                    "${party.Tagline}"
                </div>
                <div class="party-stats">
                    <span>👤 ${formatCandidates(
                        party.candidates
                    )}</span><br> 
                    <span>#️⃣ <a href="${party.channelLink}">${
        party.channelName
    }</a></span><br>
                    <span>❤️ ${
                        party.NoOfSupporters
                    } supporters</span>
                </div>
            </div>
        </div>
        <div id="place${place}box" class="placebox">
            <p style="text-align: center">
                <span style="font-size: larger">
                    ${place}<sup style="font-size: small">${suffix}</sup>
                </span>
                <br />
                ${party.Seats} seats
            </p>
        </div>
    `;
});

// Generate rows for remaining parties
const remainingPartiesHtml = parties
    .slice(3)
    .map(
        (party, index) => `
        <div class="partyrow">
            <div style="display: flex; align-items: center">
                <h1 style="margin: 0 20px">${index + 4}</h1>
                <img
                    class="partylogo"
                    src="${party.Logo}"
                    alt="${party.Name} Logo"
                />
                <div class="party-info">
                    <span class="party-name">${party.Name}</span>
                    <span class="party-tagline">"${
                        party.Tagline
                    }"</span>
                    <div class="party-stats">
                        👤 ${formatCandidates(party.candidates)}<br>
                        #️⃣ <a href="${party.channelLink}">${
            party.channelName
        }</a><br>
                        ❤️ ${party.NoOfSupporters} supporters
                    </div>
                </div>
            </div>
            <div class="seats-count">
                <span style="font-size: 32px">${party.Seats}</span>
                <br />Seats
            </div>
        </div>
    `
    )
    .join("");

// Replace the remaining parties container
document.querySelector("#parties > div:last-child").innerHTML =
    remainingPartiesHtml;

// Handle text tabs
const tabsContainer = document.getElementById("tabsTopNav");
const textTabsContainer = document.getElementById("textTabs");

// Create brand tab button first
const brandButton = document.createElement("button");
brandButton.className = "pagesTabIntabsTopNav";
brandButton.setAttribute("data-tab", "brand");
brandButton.innerHTML =
    '<span class="material-icons">brush</span> Brand';
tabsContainer.insertBefore(
    brandButton,
    tabsContainer.lastElementChild
);

// Create text tabs
Object.entries(data.TextTabs).forEach(([tabId, tabData]) => {
    // Create tab button
    const button = document.createElement("button");
    button.className = "pagesTabIntabsTopNav";
    button.setAttribute("data-tab", tabId);
    button.innerHTML = `<span class="material-icons">${tabData.icon}</span> ${tabData.title}`;
    tabsContainer.insertBefore(
        button,
        tabsContainer.lastElementChild
    );

    // Create tab content
    const contentDiv = document.createElement("div");
    contentDiv.id = tabId;
    contentDiv.className = "tab-content constitution-section";

    const content = tabData.content
        .map(
            (item) => `
            <div class="constitution-article">
                <h3>${item.heading}</h3>
                <p>${item.text}</p>
            </div>
        `
        )
        .join("");

    contentDiv.innerHTML = content;
    textTabsContainer.appendChild(contentDiv);
});

const indicator = document.querySelector(".tab-indicator");

function updateIndicator(element) {
    requestAnimationFrame(() => {
        indicator.style.width = `${element.offsetWidth}px`;
        indicator.style.left = `${element.offsetLeft}px`;
    });
}

function switchTab(tab) {
    const tabs = document.querySelectorAll("#tabsTopNav button");
    tabs.forEach((t) => {
        t.classList.remove("pagesTabIntabsTopNavselected");
        t.style.color = "#ffffff";
    });

    tab.classList.add("pagesTabIntabsTopNavselected");

    document
        .querySelectorAll(".tab-content")
        .forEach((content) => content.classList.remove("active"));

    const tabName = tab.getAttribute("data-tab");
    document.getElementById(tabName).classList.add("active");

    updateIndicator(tab);
}

// Add click handlers to all tabs
document.querySelectorAll("#tabsTopNav button").forEach((tab) => {
    tab.addEventListener("click", () => switchTab(tab));
});

// Initialize the first tab
document
    .querySelector('[data-tab="parties"]')
    .classList.add("pagesTabIntabsTopNavselected");
updateIndicator(
    document.querySelector(".pagesTabIntabsTopNavselected")
);

// Add theme toggle functionality
const themeToggle = document.querySelector(".theme-toggle");
themeToggle.addEventListener("click", () => {
    document.documentElement.setAttribute(
        "data-theme",
        document.documentElement.getAttribute("data-theme") ===
            "light"
            ? "dark"
            : "light"
    );
    themeToggle.querySelector(".material-icons").textContent =
        document.documentElement.getAttribute("data-theme") ===
        "light"
            ? "light_mode"
            : "dark_mode";
});

// Create brand tab button

// Create brand content
const brandContainer = document.getElementById("brand");
data.Brand.forEach((brand) => {
    const card = document.createElement("div");
    card.className = "brand-card";

    card.innerHTML = `
        <div class="brand-preview">
            <img src="${brand.svg}" alt="${brand.name}" style="width: 100%; height: 100%; object-fit: contain;">
        </div>
        <div class="brand-controls">
            <div class="brand-name">${brand.name}</div>
            <button class="brand-button copy-path-btn" style="margin-bottom: 10px;">Copy SVG Path</button>
            <div class="brand-button-grid">
                <button class="brand-button" onclick="window.open('${brand.svg}', '_blank')">Download SVG</button>
                <button class="brand-button" onclick="window.open('${brand.png}', '_blank')">Download PNG</button>
                <button class="brand-button copy-svg-btn">Copy SVG Image</button>
                <button class="brand-button copy-png-btn">Copy PNG Image</button>
            </div>
            <div class="copy-success">Copied!</div>
        </div>
    `;

    // Add copy functionality
    const copyPath = card.querySelector(".copy-path-btn");
    copyPath.addEventListener("click", async () => {
        try {
            const response = await fetch(brand.svg);
            const text = await response.text();
            await navigator.clipboard.writeText(text);
            showCopySuccess(copyPath);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    });

    const copySvg = card.querySelector(".copy-svg-btn");
    copySvg.addEventListener("click", async () => {
        try {
            await copyImageToClipboard(brand.svg);
            showCopySuccess(copySvg);
        } catch (err) {
            console.error("Failed to copy image:", err);
        }
    });

    const copyPng = card.querySelector(".copy-png-btn");
    copyPng.addEventListener("click", async () => {
        try {
            await copyImageToClipboard(brand.png);
            showCopySuccess(copyPng);
        } catch (err) {
            console.error("Failed to copy image:", err);
        }
    });

    brandContainer.appendChild(card);
});

function showCopySuccess(button) {
    const successMsg = button
        .closest(".brand-controls")
        .querySelector(".copy-success");
    successMsg.classList.add("show");
    setTimeout(() => successMsg.classList.remove("show"), 2000);
}

async function copyImageToClipboard(url) {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        const item = new ClipboardItem({ [blob.type]: blob });
        await navigator.clipboard.write([item]);
    } catch (err) {
        console.error("Failed to copy image:", err);
    }
}