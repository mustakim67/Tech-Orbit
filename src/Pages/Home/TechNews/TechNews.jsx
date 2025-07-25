// components/TechNews.jsx
import React from 'react';
import { VscLinkExternal } from 'react-icons/vsc';

const news = [
    {
        title: "OpenAI Launches GPT-5: What Developers Should Know",
        excerpt: "The latest GPT-5 model introduces massive context window and real-time coding features for tech platforms...",
        url: "https://openai.com/blog/gpt-5-launch",
        date: "21-07-2025"
    },
    {
        title: "React 20 Released with Built-in AI Helpers",
        excerpt: "Meta announces React 20 with smarter debugging and code suggestion tools tailored for product builders...",
        url: "https://reactjs.org/blog/2025/07/20/react-20.html",
        date: "20-07-2025"
    },
    {
        title: "GitHub Copilot X Now Free for Students & Startups",
        excerpt: "GitHub's Copilot X gets a free tier for early-stage startups and student developers, empowering idea validation...",
        url: "https://github.blog/copilot-x-for-startups",
        date: "18-07-2025"
    }
];

const TechNews = () => {
    return (
        <section className="my-16 md:px-[75]">
            <h2 className="text-3xl font-bold text-center mb-8 text-blue-900">Tech News & Updates</h2>
            <div className="grid md:grid-cols-3 gap-6">
                {news.map((item, i) => (
                    <div key={i} className="bg-white border shadow-md hover:shadow-lg transition-all p-6 rounded-lg">
                        <p className="text-xs text-gray-400 mb-1">{item.date}</p>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.excerpt}</p>
                        <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 text-sm font-medium flex items-center mt-3 hover:underline"
                        >
                            Read More <VscLinkExternal className="ml-1" />
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TechNews;
