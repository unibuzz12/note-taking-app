function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-2 mt-auto border-t border-gray-700">
      <div className="container mx-auto text-center">
        <p className="mb-2 text-gray-400">
          Made with <span className="text-red-500">❤️</span> by Scott Johnson
        </p>
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Notes App. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
