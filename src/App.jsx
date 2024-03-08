import "./App.css";

import DisplayPicture from "./assets/images/harrnish.png";

function App() {
  return (
    <>
      <div className="container">
        <div className="message">
          <div className="message-id">
            <img src={DisplayPicture} alt="" />
          </div>
          <div className="message-copy">
            <p className="msg">
              Hey there, I'm Harrnish, you're a total giga-chad 💛🗿! This
              exclusive membership is just for chads like you, who want to make
              elite websites and think time is super important.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
