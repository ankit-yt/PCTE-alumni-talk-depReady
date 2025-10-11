import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="w-full bg-white text-gray-700 border-t border-gray-200 py-12">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        
        
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Alumni<span className="text-red-600">Talks</span>
          </h2>
          <p className="mt-4 text-sm text-gray-500 max-w-sm">
            Inspiring journeys. Powerful talks. Connecting students and alumni worldwide.
          </p>
        </div>

        
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link onClick={()=>{window.scrollTo(0,0)}} to={"/"} className="hover:text-red-600 transition">Home</Link></li>
            <li><Link onClick={()=>{window.scrollTo(0,0)}} to={"/talks"}  className="hover:text-red-600 transition">Alumni Talks</Link></li>
            <li><Link onClick={()=>{window.scrollTo(0,0)}} to={"/admin"}  className="hover:text-red-600 transition">Admin</Link></li>
          </ul>
        </div>

        
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Connect With Us</h3>
          <div className="flex space-x-4 text-sm">
            <a href="#" className="hover:text-red-600 transition">LinkedIn</a>
            <a href="#" className="hover:text-red-600 transition">Twitter</a>
            <a href="#" className="hover:text-red-600 transition">YouTube</a>
          </div>
        </div>
      </div>

      
      <div className="mt-10 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} PCTE AlumniTalks. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
