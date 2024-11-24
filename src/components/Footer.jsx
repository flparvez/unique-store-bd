import Link from 'next/link';
import { FaFacebookF } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Quality Is Here</h2>
        <div className="flex justify-center items-center space-x-4 mb-4">
          <Link href="https://www.facebook.com/uniquestorebd23">
            <h2
              className="text-gray-400 hover:text-white transition duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF size={24} />
            </h2>
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
          <Link href="/policy/returns">
            <h2 className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300">
              Return Policy
            </h2>
          </Link>
          <Link href="/policy/replacement-warranty">
            <h2 className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-300">
              Replacement Warranty
            </h2>
          </Link>
          <Link href="/policy/after-sales-support">
            <h2 className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded transition duration-300">
              After-Sales Support
            </h2>
          </Link>
        </div>
        <p className="mt-4 text-gray-400">
          &copy; {new Date().getFullYear()} Unique Store BD. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;