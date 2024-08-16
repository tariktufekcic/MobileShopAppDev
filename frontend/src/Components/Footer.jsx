import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';


const Footer = () => {

    return (
        <footer className="bg-gray-200 text-gray-700 py-4 shadow-md">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row md:space-x-4 text-sm">
              <a href="/" className="hover:text-gray-400">Home</a>
              <a href="/about" className="hover:text-gray-400">About Us</a>
              <a href="/contact" className="hover:text-gray-400">Contact</a>
            </div>
      
            <div className="flex space-x-3">
              <a href="https://facebook.com" className="hover:text-gray-400">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" className="hover:text-gray-400">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" className="hover:text-gray-400">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" className="hover:text-gray-400">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
      
          <div className="border-t border-gray-400 mt-4 pt-2 text-center">
            <p className="text-xs">&copy; {new Date().getFullYear()} Mobile Shop. All rights reserved.</p>
          </div>
        </footer>
      );
      
    
}

export default Footer;