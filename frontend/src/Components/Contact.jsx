import React from 'react';

const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>

      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Get in Touch</h2>
        <p className="text-lg mb-2">Address: 71000 Sarajevo, Bosnia and Herzegovina</p>
        <p className="text-lg mb-2">Phone: (+387)62-369-216</p>
        <p className="text-lg mb-2">Email: info@mobileshopapp.com</p>

        
        <div className="flex space-x-3 mt-3">
          <a href="https://facebook.com" className="text-blue-600 hover:text-blue-800">Facebook</a>
          <a href="https://twitter.com" className="text-blue-400 hover:text-blue-600">Twitter</a>
          <a href="https://instagram.com" className="text-pink-600 hover:text-pink-800">Instagram</a>
          <a href="https://linkedin.com" className="text-blue-700 hover:text-blue-900">LinkedIn</a>
        </div>
      </div>

      
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
            <input type="text" id="name" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Your Name" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input type="email" id="email" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Your Email" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">Subject</label>
            <input type="text" id="subject" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Subject" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">Message</label>
            <textarea id="message" className="w-full p-2 border border-gray-300 rounded-md" rows="5" placeholder="Your Message"></textarea>
          </div>
          <div className="text-right">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Send Message</button>
          </div>
        </form>
      </div>

     
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-3">Business Hours</h2>
        <p className="text-lg">Monday - Friday: <br/> 8:00 AM - 16:00 PM</p>
      </div>
    </div>
  );
};

export default Contact;
