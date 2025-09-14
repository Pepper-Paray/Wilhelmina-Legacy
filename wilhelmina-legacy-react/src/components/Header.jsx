export default function Header() {
  return (
    <header className="bg-gradient-to-r from-pink-100 via-yellow-50 to-pink-200 py-10 px-6 shadow-lg border-b-4 border-yellow-200 rounded-b-2xl">
      <nav className="mb-8">
        <ul className="flex space-x-8 justify-center">
          <li><a href="/" className="text-yellow-900 hover:underline font-bold font-serif">Home</a></li>
          <li><a href="/about" className="text-yellow-900 hover:underline font-bold font-serif">About</a></li>
          <li><a href="/contact" className="text-yellow-900 hover:underline font-bold font-serif">Contact</a></li>
        </ul>
      </nav>
      <h1 className="text-4xl font-bold text-center text-pink-900 mb-6 font-serif drop-shadow-lg">Wilhelmina Legacy Tribute</h1>
    </header>
  );
}
