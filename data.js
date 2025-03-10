/*
---------------------------- template --------------------------------

ExampleName: {
    Name: "", //name of the party
    Logo: "", //url of the logo
    Seats: 0, //number of seats (DON'T FILL ONLY FOR ASTRA)
    BackgroundImage:
        "", //(URL) it is an image because some idiots like ryan have multicolor flags/backgrounds
    Tagline: "", //tagline of the party
    candidates: {
        "@NAME": "", //name of the candidate and the slack link
        "@NAME": "", // you can add more candidates
    },
    channelName: "", //slack channel name (if none then set n/a)
    channelLink: "", //slack channel link (if none set as "/" nothing else)
    NoOfSupporters: "", //number of supporters
}

*/

let data = {
    nameOfParliament: "Parliament of Hack Club",
    ParliamentLogo:
        "https://hc-cdn.hel1.your-objectstorage.com/s/v3/0ebba62bf38e330f80b841a6dcefa47f3090b2f8_image.png",
    Parties: {
        HCPP: {
            Name: "HCPP",
            Logo: "https://cdn.hack.pet/U07E6R26ZC0/HCPPLogo.png",
            Seats: 16,
            Tagline: "Woof, meow, quack, together we rule the Slack!",
            candidates: {
                "@Ilwân": "https://hackclub.slack.com/team/U07E6R26ZC0",
            },
            channelName: "#hcpp",
            channelLink: "https://hackclub.slack.com/archives/C08FS47QT8A",
            NoOfSupporters: "16",
        },
        ExampleName: {
            Name: "Example Name 1",
            Logo: "https://hc-cdn.hel1.your-objectstorage.com/s/v3/eeb1bd266f2c9268ecb0d8a5a959907d496da699_image.png",
            Seats: 1,
            BackgroundImage:
                "https://hc-cdn.hel1.your-objectstorage.com/s/v3/6c89dc79b72572c7fc88eed56023e0ed17bc3a84_image.png",
            Tagline: "I am a stupid example guy",
            candidates: {
                "@StupidExample1": "https://example.com/",
                "@StupidExample2": "https://example.com/",
            },
            channelName: "#Parliament",
            channelLink: "https://example.com/",
            NoOfSupporters: "1",
        },
        ExampleName2: {
            Name: "Example Name 2",
            Logo: "https://hc-cdn.hel1.your-objectstorage.com/s/v3/eeb1bd266f2c9268ecb0d8a5a959907d496da699_image.png",
            Seats: 2,
            BackgroundImage:
                "https://hc-cdn.hel1.your-objectstorage.com/s/v3/6c89dc79b72572c7fc88eed56023e0ed17bc3a84_image.png",
            Tagline: "I am a stupid example guy",
            candidates: {
                "@StupidExample1": "https://example.com/",
                "@StupidExample2": "https://example.com/",
            },
            channelName: "#Parliament",
            channelLink: "https://example.com/",
            NoOfSupporters: "2",
        },
        ExampleName3: {
            Name: "Example Name 3",
            Logo: "https://hc-cdn.hel1.your-objectstorage.com/s/v3/eeb1bd266f2c9268ecb0d8a5a959907d496da699_image.png",
            Seats: 10,
            BackgroundImage:
                "https://hc-cdn.hel1.your-objectstorage.com/s/v3/6c89dc79b72572c7fc88eed56023e0ed17bc3a84_image.png",
            Tagline: "I am a stupid example guy",
            candidates: {
                "@StupidExample1": "https://example.com/",
                "@StupidExample2": "https://example.com/",
            },
            channelName: "#Parliament",
            channelLink: "https://example.com/",
            NoOfSupporters: "3",
        },
        ExampleName4: {
            Name: "Example Name 4",
            Logo: "https://hc-cdn.hel1.your-objectstorage.com/s/v3/eeb1bd266f2c9268ecb0d8a5a959907d496da699_image.png",
            Seats: 4,
            BackgroundImage:
                "https://hc-cdn.hel1.your-objectstorage.com/s/v3/6c89dc79b72572c7fc88eed56023e0ed17bc3a84_image.png",
            Tagline: "I am a stupid example guy",
            candidates: {
                "@StupidExample1": "https://example.com/",
                "@StupidExample2": "https://example.com/",
            },
            channelName: "#Parliament",
            channelLink: "https://example.com/",
            NoOfSupporters: "4",
        },
    },
    TextOnlyTabs: {
        "📜 Constitution": `<h2>
                        <span class="material-icons">book</span> Constitution of
                        the Hack Club Parliament
                    </h2>

                    <div class="constitution-article">
                        <h3>1. rhythm made this website</h3>
                        <p>
                            and you must praise him for his amazing work
                        </p>
                    </div>
                    <div class="constitution-article">
                        <h3>2. Astra maintains this website</h3>
                        <p>
                            she is the main #parliament organizer
                        </p>
                    </div>`,
    },
};
