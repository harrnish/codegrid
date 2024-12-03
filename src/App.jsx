import "./App.css";
import Menu from "./components/menu/Menu";
import Footer from "./components/footer/Footer";

import { PiArrowUpRight } from "react-icons/pi";

function App() {
  return (
    <div className="app">
      <Menu />

      <div className="header">
        <h1>Forging ahead with elite web designs</h1>

        <button>
          Subscribe
          <div className="btn-icon">
            <PiArrowUpRight />
          </div>
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default App;
