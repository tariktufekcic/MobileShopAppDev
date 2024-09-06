import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-600 py-3 shadow-md">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
        <div className="flex flex-col md:flex-row md:space-x-4 text-sm">
          <a href="/" className="hover:text-gray-900 transition-colors">Home</a>
          <a href="/contact" className="hover:text-gray-900 transition-colors">Contact</a>
        </div>

        <div className="flex space-x-3 text-lg">
          <a href="https://facebook.com" className="hover:text-gray-900 transition-colors">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" className="hover:text-gray-900 transition-colors">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" className="hover:text-gray-900 transition-colors">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" className="hover:text-gray-900 transition-colors">
            <FaLinkedinIn />
          </a>
        </div>
      </div>

      <div className="border-t border-gray-200 mt-3 pt-2 text-center">
        <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Mobile Shop. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
