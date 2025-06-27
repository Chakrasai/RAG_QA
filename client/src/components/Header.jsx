import React from 'react';

/**
 * Header component that displays the application's title in a styled header bar.
 *
 * @component
 * @returns {JSX.Element} A header element with the title "DocuBot" styled using Tailwind CSS classes.
 */
function Header() {
  return (
    <header className="bg-blue-600 text-white py-5 text-center text-3xl font-bold shadow-md flex items-center justify-center gap-4">
      <img src="/doc.png" alt="DocuBot Logo" className="h-10 w-10 inline-block border-white " />
      DocuBot
    </header>
  );
}

export default Header;