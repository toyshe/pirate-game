import { useNavigate } from "react-router-dom";

export default function TitlePage() {
  const navigate = useNavigate()

  function handleClick(){
    navigate("/story")
  }

  return (
    <>
    <center>
      <div className="parent">
        <img src={"../../images/scroll2.png"} className="title-scroll"/>
        <div className="scroll-child">
          <h1>The Siren's Wrath</h1>
        </div>
      </div>
      <button onClick={handleClick}>Start Game</button>
    </center>
    </>
  );
}