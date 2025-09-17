import React from "react";
import Testimonal from "./testimonal";
const Testimonals = () => {
  return (
    <section className="home-testimonals">
      <div className="home-left4">
        <span className="home-text190">Testimonals</span>
        <span className="home-text191 title">What people say about Us</span>
      </div>
      <div className="home-right3 mb-10 md:mb-0">
        <div className="home-column1">
          <Testimonal quote='"Pellentesque sodales libero nulla, ac imperdiet ante tincidunt vel. Fusce auctor augue sed massa finibus, et dictum sem mollis. In luctus.”'></Testimonal>
          <Testimonal
            from="Social Club"
            name="Jessica Smith"
            quote="“Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo.\u2028 Inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.”"></Testimonal>
          <Testimonal
            from="BeMe"
            name="Logan Boy"
            quote="“Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo..”"></Testimonal>
          <Testimonal
            from="Hello W."
            name="Laraine Summers"
            quote="“Rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae.”"></Testimonal>
        </div>
        <div className="home-column2">
          <Testimonal
            from="Handsly"
            name="William McPau"
            quote='"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”'></Testimonal>
          <Testimonal
            from="Share"
            name="Mariah Mae"
            quote="“Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.”"></Testimonal>
          <Testimonal
            from="Gather"
            name="John Finati"
            quote='"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.”'></Testimonal>
          <Testimonal
            from="Zigo"
            name="Mary Pau"
            quote='"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ”'></Testimonal>
        </div>
      </div>
      {/* <span className="home-text192">
        <span>Show more</span>
        <br></br>
      </span> */}
    </section>
  );
};

export default Testimonals;
