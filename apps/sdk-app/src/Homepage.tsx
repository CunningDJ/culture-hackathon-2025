import { Link } from "react-router";
import { IconArrow } from "./IconArrow";

const Homepage = () => {
  return (
    <div className="color/background $color/background:black layout/wrapper layout/height:100% $color/white layout/flex:column layout/justify:between layout/padding:page">
      <div className="">
        <span>
          <h1>
            <span className="typography $typography/size:extra-extra-large">MoMA</span>
          </h1>
          <span className="typography $typography/size:medium">x</span>
          <span className="typography $typography/size:medium"><img src="static/econify.png" /></span>
        </span>
        <h2 className="typography $typography/size:extra-large layout/margin:top:cap:0.5">Draw Your Own<sup>TM</sup></h2>
      </div>

      <div className="">
        <h3 className="typography $typography/size:80pt">How do you do fellow kids?</h3>
        <span className="typography $typography/size:extra-large $typography/weight:regular layout/margin:top:page:1.5">Learn about the art you see, draw your own version, and share it with other kids around the world!</span>
      </div>

      <div className="">
        <Link to="/select-artwork">
          <span className="typography $typography/size:30pt">Start <IconArrow /></span>
        </Link>
      </div>
    </div>
  );
}

export default Homepage;