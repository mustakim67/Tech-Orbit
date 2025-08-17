import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                "service_ala2i16",
                "template_h745ep3",
                form.current,
                "FCTrb40E4wz1ZrjWv"
            )
            .then(
                () => {
                    Swal.fire({
                        icon: "success",
                        title: "Message Sent!",
                        text: "Thank you for reaching out. We’ll get back to you shortly.",
                        confirmButtonColor: "#1565C0",
                        background: "#1e293b",
                        color: "#fff",
                    });
                    form.current.reset();
                },
                (error) => {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong. Please try again later.",
                        confirmButtonColor: "#1565C0",
                        background: "#1e293b",
                        color: "#fff",
                    });
                    console.error(error);
                }
            );
    };

    return (
        <section className="px-[7%] py-16 min-h-dvh flex flex-col justify-center">
            {/* Header */}
            <div className="text-center mb-16 max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold">
                    Contact Us
                </h1>
                <p className="mt-4 text-lg max-w-xl mx-auto px-2">
                    We’re here to answer your questions, listen to your feedback, and
                    explore ways we can work together to make a difference.
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-12 max-w-7xl mx-auto">
                {/* Contact Info + Image */}
                <div className="flex flex-col md:flex-row backdrop-blur-md bg-white/10 dark:bg-gray-800/50 rounded-2xl p-8 shadow-lg space-y-8 md:space-y-0 md:space-x-8 border border-white/20 flex-1">
                    {/* Contact Info */}
                    <div className="space-y-6 md:w-1/2 flex flex-col justify-center">
                        <h2 className="text-2xl font-semibold  pl-0 md:pl-8">
                            Get In Touch
                        </h2>

                        {[
                            {
                                icon: (
                                    <FaEnvelope className=" text-xl" />
                                ),
                                label: "Email",
                                value: "support@careforce.org",
                            },
                            {
                                icon: (
                                    <FaPhoneAlt className=" text-xl" />
                                ),
                                label: "Phone",
                                value: "+880 1234 567 890",
                            },
                            {
                                icon: (
                                    <FaMapMarkerAlt className=" text-xl" />
                                ),
                                label: "Location",
                                value: "Dhaka, Bangladesh",
                            },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="flex items-start gap-4 transform transition hover:scale-105"
                            >
                                {item.icon}
                                <div>
                                    <p className="font-medium">{item.label}</p>
                                    <p>{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Image with overlay & text */}
                    <div className="relative w-full md:w-1/2 h-64 md:h-auto rounded-xl overflow-hidden flex-shrink-0">
                        <img
                            className="w-full h-full object-cover"
                            src="https://i.ibb.co.com/8JSbqhn/uriel-soberanes-Mx-Vk-WPi-JALs-unsplash.jpg"
                            alt="Join us"
                        />
                        <div className="absolute inset-0 bg-black/50"></div>
                        <div className="absolute inset-0 flex justify-center items-end pb-15 px-4">
                            <p className="text-white text-lg md:text-2xl font-bold text-center leading-snug">
                                Explore the world of {" "}
                                <span className="text-blue-500">
                                    tech products
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <form
                    ref={form}
                    onSubmit={sendEmail}
                    className="backdrop-blur-md bg-white/10 dark:bg-gray-800/50 rounded-2xl p-8 shadow-lg space-y-6 border border-white/20 flex-1 max-w-full"
                >
                    <h2 className="text-2xl font-semibold">
                        Send a Message
                    </h2>

                    <input
                        type="text"
                        name="user_name"
                        placeholder="Your Name"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-transparent focus:outline-none focus:ring-2 transition"
                    />
                    <input
                        type="email"
                        name="user_email"
                        placeholder="Your Email"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-transparent focus:outline-none focus:ring-2  transition"
                    />
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        rows="5"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-transparent focus:outline-none focus:ring-2  transition"
                    ></textarea>

                    <button
                        type="submit"
                        className="w-full bg-blue-800 px-6 py-3 rounded-lg font-semibold text-white shadow-md hover:opacity-90 hover:scale-105 transform transition"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Contact;
