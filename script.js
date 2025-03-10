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

// Calculate total seats
const totalSeats = parties.reduce((sum, party) => sum + party.seats, 0);

// Distribute seats to fill semicircle evenly
function distributeSeats() {
    // Calculate how many rows and seats per row
    const rows = [];
    let remainingSeats = totalSeats;
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
        const seatsInRow = Math.min(maxPossibleSeats, remainingSeats);

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
        rows.length > 0 ? rows[rows.length - 1].radius + seatRadius : 0;
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
        for (let seatInRow = 0; seatInRow < row.seatsCount; seatInRow++) {
            // Find current party
            while (seatsPlacedInParty >= parties[partyIndex].seats) {
                partyIndex++;
                seatsPlacedInParty = 0;
            }

            const party = parties[partyIndex];

            // Calculate angle (distribute seats evenly across 180 degrees)
            let angle;
            if (row.seatsCount === 1) {
                angle = Math.PI / 2; // Place single seat at the top
            } else {
                angle = (Math.PI * seatInRow) / (row.seatsCount - 1);
            }

            // Calculate position
            const x = centerX + row.radius * Math.cos(angle);
            const y = centerY - row.radius * Math.sin(angle);

            // Create circle clip path
            const clipPathId = `clip-${seatCount}`;
            const clipPath = document.createElementNS(svgNS, "clipPath");
            clipPath.setAttribute("id", clipPathId);

            const clipCircle = document.createElementNS(svgNS, "circle");
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
document.getElementById("container").style.width = `${dimensions.width}px`;
document.getElementById("container").style.height = `${dimensions.height}px`;
// Fixed tab system
const tabs = document.querySelectorAll("#tabsTopNav button");
const indicator = document.querySelector(".tab-indicator");

function updateIndicator(element) {
    requestAnimationFrame(() => {
        indicator.style.width = `${element.offsetWidth}px`;
        indicator.style.left = `${element.offsetLeft}px`;
    });
}

function switchTab(tab) {
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

tabs.forEach((tab) => {
    tab.addEventListener("click", () => switchTab(tab));
});

// Initialize first tab
document
    .querySelector('[data-tab="parties"]')
    .classList.add("pagesTabIntabsTopNavselected");
updateIndicator(document.querySelector(".pagesTabIntabsTopNavselected"));

// Add theme toggle functionality
const themeToggle = document.querySelector(".theme-toggle");
themeToggle.addEventListener("click", () => {
    document.documentElement.setAttribute(
        "data-theme",
        document.documentElement.getAttribute("data-theme") === "light"
            ? "dark"
            : "light"
    );
    themeToggle.querySelector(".material-icons").textContent =
        document.documentElement.getAttribute("data-theme") === "light"
            ? "light_mode"
            : "dark_mode";
});
