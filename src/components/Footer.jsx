import Link from 'next/link';
import { FaFacebookF } from 'react-icons/fa';

const Footer = () => {
  return (


<footer className="bg-gray-900 text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
    
        <p className="mb-4">
          <span className="font-semibold text-yellow-500">Unique Store BD</span> - The Most Reliable eCommerce Site in Bangladesh. We maintain a comprehensive stock to ensure you receive your orders as quickly as possible. Experience online shopping in Bangladesh for authentic products, including the latest tech gadgets such as live streaming gear, YouTube studio setups, vlogging gear, home studio equipment, webcams, microphones, lighting setups, ring lights, smartphones, gimbals, and related products.
        </p>
        <p className="mb-4">
          Enjoy the convenience of home delivery or courier service, or pick up your orders from our pickup point. We guarantee product quality, fast delivery, and exceptional after-sales support. Benefit from our free pre-sales and post-sales consultations to find the best budget-friendly gear.
        </p>
        <p className="mb-4">
          Our technical team is dedicated to providing a seamless online shopping experience in Bangladesh, offering world-class, original products at reasonable prices. Our customer care team is always ready to assist you with your purchases and provide technical support.
        </p>
        <p className="mb-4">
          With over one year of experience, we have earned the trust of millions of customers through authentic products and quality after-sales support, making us the most reliable and trusted platform in the Bangladesh eCommerce industry.
        </p>
        <p className="mb-4">
          Join our vibrant online community to share your shopping experiences, learn about new products, and get answers to your questions. We are highly active on social media, especially in our Facebook Page:<Link href="https://www.facebook.com/uniquestorebd23" passHref><span className="font-semibold text-yellow-500">Unique Store BD</span></Link>, where we engage with customers to improve our services.
        </p>
        <p className="mb-4">
          Whether you need live streaming equipment, YouTube studio gear, or other home studio equipment, <span className="font-semibold text-yellow-500">Unique Store BD</span> is your go-to recommendation. Help your friends by recommending us, and we'll provide friendly and professional assistance.
        </p>
      </div>
   
      <div className="container mx-auto text-center px-4">
        <h2 className="text-xl sm:text-2xl font-bold mb-2">Unique Store Bd | Quality Is Here</h2>
        <div className="flex justify-center items-center space-x-4 mb-2">
          <Link href="https://www.facebook.com/uniquestorebd23" passHref>
            <h2 className="text-gray-400 hover:text-white transition duration-300">
              <FaFacebookF size={24} />
            </h2>
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-12">
          <Link href="/policy/returns" passHref>
            <h2 className=" text-white font-semibold  px-2 rounded transition duration-300">
              Return Policy
            </h2>
          </Link>
          <Link href="/policy/replacement-warranty" passHref>
            <h2 className=" text-white font-semibold  px-2 rounded transition duration-300">
              Replacement Warranty
            </h2>
          </Link>
          <Link href="/policy/after-sales-support" passHref>
            <h2 className=" text-white font-semibold rounded transition duration-300">
              After Sales Support
            </h2>
          </Link>
        </div>
        <p className="mt-2 text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Unique Store BD. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
