const data = {
    Config: {
        ParlimentName: "HC Parliament",
        Parlimentlogo: "https://hc-cdn.hel1.your-objectstorage.com/s/v3/0ebba62bf38e330f80b841a6dcefa47f3090b2f8_image.png",
        parlimentSeatsNo: 144,
        howToStart: `
# How to Start a Party

1. ## Requirements
- Active Hack Club member
- Minimum 5 supporters
- Unique party name and platform

2. ## Steps
- Create a Slack channel
- Submit party registration
- Gather supporters
- Nominate candidates

3. ## Documentation
All parties must provide:
- Party constitution
- Leadership structure
- Policy platform
        `,
        defaultTheme: "dark",
        votingButtonEnabled: false,
        votingUrl: "https://arches.elexn.uk/",
        seatsPerRow: 12
    },
    Election: {
        ElectionDate: "2025-03-05",
        ElectionTime: "00:00",
        ElectionDescription: "The March 2025 Hack Club Parliament Elections will determine the future of our community...",
        onOpenTime: "TBA"
    },
    Parties: {
        "HackClubCommunistParty": {
            name: "Hack Club Communist Party",
            logo: "https://hc-cdn.hel1.your-objectstorage.com/s/v3/94daa48a3e04b49a33cc411165a370bbeb03df60_group_12.svg",
            bannerColor: "#FF4D4D", // Red color for communist party
            candidates: [
                { name: "@Manan", profile: "https://hackclub.slack.com/team/U0807ADEC6L" },
                { name: "@Souptik Samanta", profile: "https://hackclub.slack.com/team/U07E4196AMA" }
            ],
            channel: "#hcp",
            channelUrl: "https://hackclub.slack.com/archives/C084L3XF0G4",
            supporters: 99,
            tagline: "Open source, Open revolution!",
            bannerImage: "https://example.com/communist-banner.jpg",
            seatLogo: "https://example.com/communist-seat.png"
        },
        "ABCParty": {
            name: "The ABC Party",
            logo: "/api/placeholder/100/100", // Placeholder since we don't have the actual logo
            bannerColor: "#FF9900", // Orange color as shown in the image
            candidates: [
                { name: "TechyBoy", profile: "#" }
            ],
            channel: "#chanle", // As shown in the image
            channelUrl: "#",
            supporters: 42, // Example number
            tagline: "Slogan", // As shown in the image
            bannerImage: "https://example.com/abc-banner.jpg",
            seatLogo: "https://example.com/abc-seat.png"
        },
        "TechProgressives": {
            name: "Tech Progressives",
            logo: "/api/placeholder/100/100",
            bannerColor: "#4CAF50", // Green color
            candidates: [
                { name: "@Developer1", profile: "#" },
                { name: "@TechAdvocate", profile: "#" }
            ],
            channel: "#tech-prog",
            channelUrl: "#",
            supporters: 78,
            tagline: "Innovation for everyone, not just the few!"
        },
        "CodeConservatives": {
            name: "Code Conservatives",
            logo: "/api/placeholder/100/100",
            bannerColor: "#2196F3", // Blue color
            candidates: [
                { name: "@StabilityDev", profile: "#" },
                { name: "@SecurityFirst", profile: "#" }
            ],
            channel: "#code-cons",
            channelUrl: "#",
            supporters: 65,
            tagline: "Stable code, stable community!"
        }
    },
    IndividualCandidates: [
        {
            name: "Independent 1",
            profile: "https://hackclub.slack.com/team/U123456",
            logo: "https://example.com/ind1.png",
            supporters: 15
        }
        // Add more independent candidates as needed
    ],
    Constitution: `
# Hack Club Parliament Constitution

## Article 1: Foundation
The Hack Club Parliament is established as the representative body of the Hack Club community...

## Article 2: Structure
The Parliament consists of elected representatives from various parties...

[Rest of constitution in Markdown format]
    `,
    Rules: `
# Election Rules

1. All candidates must be active Hack Club members
2. Parties need minimum 5 supporters to register
3. Election threshold is 6.0%
4. Voting period is 5 days

[More rules in Markdown format]
    `
};