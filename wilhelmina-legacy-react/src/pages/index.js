
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import MessageForm from './components/MessageForm';
import message from './components/messages.ts';
import Contact from '../components/Contact.js';

function Home() {
  return (
    <div className="bg-yellow-50 py-10 px-6 rounded-xl shadow-md font-serif">
      <h2 className="text-3xl font-bold text-pink-900 mb-6 text-center">Welcome to Wilhelmina Legacy Tribute</h2>
      <p className="text-yellow-900 text-lg mb-6 italic text-center">
        This is the home page of my tribute to my grandmother Wilhelmina, lovingly called Mina.
      </p>
      <p className="text-yellow-900 text-lg text-center">
        Wilhelmina was born in 1941 in a small town in the Gulf region of Louisiana.<br />
        She lived through significant historical events, including World War II, and was known for her resilience and kindness.<br />
        She had a passion for gardening and cooking, often sharing her delicious recipes with family and friends.<br />
        Wilhelmina's legacy lives on through her children and grandchildren, who cherish the memories and values she instilled in them.
      </p>
      <p className="text-yellow-900 text-lg text-center">
        She passed away in December of 2009, but her spirit continues to inspire those who knew her.<br />
        This tribute page is dedicated to celebrating her life and the impact she had on her loved ones.
      </p>
    </div>
  );
}

function About() {
  return (
    <main className="bg-yellow-50 py-10 px-6 rounded-xl shadow-md font-serif">
      <p className="text-yellow-900 text-lg mb-6 italic">
        My grandmother was a kind soul who loved fishing, boating, and spending time with her grand and great-grandkids.<br />
        She was a devoted Christian, always willing to help anyone in need.<br />
        A great cook, baker, and talented seamstress, she made many of her own clothes.<br />
        Wilhelmina was strong, independent, and raised her family with love and care.<br />
        She taught the importance of family, faith, and hard work.<br />
        Her memory lives on in the hearts of those who knew and loved her.
      </p>
      <blockquote className="bg-pink-100 border-l-4 border-yellow-400 p-6 rounded-lg shadow-sm mb-6" cite="https://estherpress.com/bible-quotes-about-courage-and-strength/">
        <p className="italic text-pink-900 text-lg">
          "Fear not, for I am with you; be not dismayed, for I am your God; I will strengthen you, I will help you, I will uphold you with my righteous right hand."
        </p>
        <cite className="block text-right text-yellow-900 font-bold mt-2">Isaiah 41:10</cite>
      </blockquote>
    </main>
  );
}

function Contact() {
  return <MessageForm/>;
}

function App() {
  return (
    <Router>
      <Header />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
