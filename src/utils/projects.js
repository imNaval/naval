export const projects = [
    {
        id: 1,
        title: "Foody App",
        technologies: ["React", "Jest", "Tailwind-css", "Swiggy-API", "Redux"],
        images: [
            "/src/assets/projects/FoodApp/img1.png",
            "/src/assets/projects/FoodApp/img2.png",
            "/src/assets/projects/FoodApp/img3.png",
            "/src/assets/projects/FoodApp/img4.png",
            "/src/assets/projects/FoodApp/img5.png",
            "/src/assets/projects/FoodApp/img6.png"
        ],
        desc: "Collaborated on developing a dynamic web application that integrates live API data from Swiggy, enhancing the online food ordering experience.",
        keyFeatures: [
            "Implemented efficient infinite scrolling, enhancing user experience by 35%",
            "Developed a seamless cart feature, persisting data using local storage and Redux",
            "Introduces location-based features, enabling users to interact with restaurants nationwide and expanding the app's reach and functionality"
        ],
        links: {
            github: "https://github.com/yourusername/foody-app",
            live: "https://fastfood.learnjavascript.in/",

        }
    },
    {
        id: 2,
        title: "Streaming App",
        technologies: ["Javascript", "React", "Node", "YouTube Video API", "HTML"],
        images: [
            "/src/assets/projects/Streaming/img1.png",
            "/src/assets/projects/Streaming/img2.png",
            "/src/assets/projects/Streaming/img3.png",
            "/src/assets/projects/Streaming/img4.png",
            "/src/assets/projects/Streaming/img5.png"
        ],
        desc: "Developed an innovative streaming platform utilising the YouTube Video API for dynamic content, focusing on a seamless and responsive streaming experience.",
        keyFeatures: [
            "Incorporated advanced debouncing techniques, contributing to super-fast loading times within 400ms",
            "Provides a smooth streaming experience",
            "Implemented an intuitive video search functionality, allowing users to discover content effortlessly based on their preferences"
        ],
        links: {
            github: "https://github.com/yourusername/streaming-app",
            live: "https://nav-tube.vercel.app/",
        }
    },
    {
        id: 3,
        title: "Ai Application",
        images: [
            "/src/assets/projects/AI-app/img1.png",
        ],
        desc: "A simple ai application that uses the OpenAI API to generate text based on the user's input.",
        links: {
            github: "https://github.com/imNaval/chat-gpt-client",
            live: "https://chat-gpt-client-eight.vercel.app/",
        }
    },
]