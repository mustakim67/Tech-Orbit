import React from 'react';

const About = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-purple-100 px-6 md:px-[10%] py-50">
            <h2 className="text-2xl md:text-4xl font-bold text-center text-blue-900 mb-12">About TechOrbit</h2>

            <div className="space-y-6">

                {/* What is TechOrbit */}
                <div className="collapse collapse-arrow bg-base-100 border border-purple-200 rounded-xl shadow">
                    <input type="radio" name="about-accordion" defaultChecked />
                    <div className="collapse-title text-xl font-semibold text-blue-900">
                        What is TechOrbit?
                    </div>
                    <div className="collapse-content text-gray-600 leading-relaxed">
                        <p>
                            TechOrbit is a next-gen platform where tech enthusiasts and developers can discover, share,
                            and vote on the latest products, tools, and innovations in the tech space.
                        </p>
                    </div>
                </div>

                {/* Mission */}
                <div className="collapse collapse-arrow bg-base-100 border border-purple-200 rounded-xl shadow">
                    <input type="radio" name="about-accordion" />
                    <div className="collapse-title text-xl font-semibold text-blue-900">
                        Our Mission
                    </div>
                    <div className="collapse-content text-gray-600 leading-relaxed">
                        <p>
                            Our mission is to bridge the gap between creators and users by spotlighting innovative
                            digital products. We aim to help developers get the recognition they deserve and users
                            to discover the best tools out there.
                        </p>
                    </div>
                </div>

                {/* Why Choose Us */}
                <div className="collapse collapse-arrow bg-base-100 border border-purple-200 rounded-xl shadow">
                    <input type="radio" name="about-accordion" />
                    <div className="collapse-title text-xl font-semibold text-blue-900">
                        Why Choose Us?
                    </div>
                    <div className="collapse-content text-gray-600 leading-relaxed">
                        <ul className="list-disc list-inside space-y-1">
                            <li>Clean and user-friendly interface</li>
                            <li>Verified reviews and community ratings</li>
                            <li>Support for creators and open-source contributors</li>
                            <li>Dynamic trending and ranking system</li>
                        </ul>
                    </div>
                </div>

                {/* Team */}
                <div className="collapse collapse-arrow bg-base-100 border border-purple-200 rounded-xl shadow">
                    <input type="radio" name="about-accordion" />
                    <div className="collapse-title text-xl font-semibold text-blue-900">
                        Meet the Team
                    </div>
                    <div className="collapse-content text-gray-600 leading-relaxed">
                        <p>
                            We're a passionate group of developers, designers, and product lovers working together
                            to build a better product discovery ecosystem for the tech world.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;