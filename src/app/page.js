"use client";
import Component1 from "@/svgComponents/component1";
import styles from "./page.module.css";
import Component2 from "@/svgComponents/Component2";
import Component3 from "@/svgComponents/Component3";
import Component4 from "@/svgComponents/Component4";
import Component5 from "@/svgComponents/Component5";
import Component6 from "@/svgComponents/Component6";
import Line1 from "@/svgComponents/Line1";
import Line2 from "@/svgComponents/Line2";
import FComponent2 from "@/Components/FrontComponent2/FComponent2";
import Fcomponent3 from "@/Components/FrontComponent3/Fcomponent3";
import Fcomponent4 from "@/Components/FrontComponent4/Fcomponent4";
import Fcomponent5 from "@/Components/FrontComponent5/Fcomponent5";
import Fcomponent6 from "@/Components/FrontComponent6/Fcomponent6";
import Fcomponent7 from "@/Components/FrontComponent7/Fcomponent7";
export default function page() {
  return (
    <>
      <div className={styles.front}>
        <div className={styles.frontPic}>
          <div className={styles.positionContainer}>
            <div className={styles.line1}>
              <Line1 />
            </div>
            <div className={styles.line2}>
              <Line2 />
            </div>
          </div>
        </div>
        <div className={styles.header}>
          <div className={styles.component2}>
          <div className={styles.component2a}><Component2/></div>
            <h1 class={styles.heading}>GnF</h1>
          </div>
          <div class={styles.navbar}>
              <ul class={styles.navlist}>
                <li class={styles.navitem} id="home">
                  Home
                </li>
                <li class={`${styles.navitem} ${styles.dropdown}`} id="artist">
                  Artist
                  <ul class={styles.dropdownmenu}>
                    <li class={styles.dropdownitem}>All Artists</li>
                    <li class={styles.dropdownitem}>Popular Artists</li>
                  </ul>
                </li>
                <li class={styles.navitem} id="about">
                  Contact
                </li>
              </ul>
          </div> 
        </div>
         <div className={styles.component1}>
          <Component1 />
        </div>
        <div className={styles.text}>
          <h1 style={{ color: "#FD7A05" }}>Pakistan's Leading</h1>
          <h1 style={{ color: "#F9FDFF" }}>Artist Facilitation Company</h1>
        </div>
        <div className={styles.buttons}>
          <button className={styles.btn1}>Book an Artist</button>
          <button className={styles.btn2}>Find all Artist</button>
        </div>
        <div className={styles.information}>
          <p>
            Lorem ipsum dolor sit amet, cons Lorem ipsum dolor sit amet, cons
            sum dolor sit amet, cons Lorem ipsum dolor sit amet, cons dolor sit
            amet, cons Lorem ipsum dolor sit amet, cons met, cons Lorem ipsum
            dolor sit amet, cons
          </p>
        </div>
        <div className={styles.component3}>
          <Component3 />
        </div>
        <div className={styles.component4}>
          <Component4 />
        </div>
        <div className={styles.component5}>
          <Component5 />
        </div>
        <div className={styles.component6}>
          <Component6 />
        </div>
      </div>
      <FComponent2/>
         <Fcomponent3/>
        <Fcomponent5/>
        <Fcomponent6/>
        <Fcomponent7/>
    </>
  );
}
