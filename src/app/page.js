"use client";
import Component1 from "@/svgComponents/Component1";
import styles from "./page.module.css";
import Component2 from "@/svgComponents/Component2";
import Component3 from "@/svgComponents/Component3";
import Component4 from "@/svgComponents/Component4";
import Component5 from "@/svgComponents/Component5";
import Component6 from "@/svgComponents/Component6";
import Line1 from "@/svgComponents/Line1";
import Line2 from "@/svgComponents/Line2";
import FComponent2 from "@/Components/FrontComponent2/FComponent2";
import Fcomponent6 from "@/Components/FrontComponent6/Fcomponent6";
import Fcomponent7 from "@/Components/FrontComponent7/Fcomponent7";
import Fcomponent8 from "@/Components/FrontComponent8/Fcomponent8";
import Footer from "@/Components/Footer/Footer";
import Fcomponent9 from "@/Components/FrontComponent9/Fcomponent9";
import FComponent10 from "@/Components/FrontComponent10/FComponent10";
export default function page() {
  return (
    <>
      <div className={styles.front}>
        <div className={styles.cube}>
          <img src="/images/cube.png"></img>
        </div>
        <div className={styles.cube3}>
          <img src="/images/cube3.png"></img>
        </div>
        <div className={styles.cube1}>
          <img src="/images/cube 1.png"></img>
        </div>
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
                  Artist&#11163;
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
          <h1 style={{ color: "#FF7A00", textShadow:" 0px 4px 30px rgba(0, 209, 255, 0.37)" }}>Pakistan&apos;s Leading</h1>
          <h1 style={{ color: "#F9FDFF",textShadow: "0px 4px 30px rgba(0, 209, 255, 0.37)" }}>Artist Facilitation Company</h1>
        </div>
        <div className={styles.buttons}>
          <button className={styles.btn1}>Book an Artist</button>
          <button className={styles.btn2}>Find all Artist</button>
        </div>
        <div className={styles.information}>
          <p>
          GnF Events provides 24/7 artist and event management, delivering innovative solutions for 
          </p>
          <p>artists and unparalleled service for global events. We are committed to excellence ,</p>
          <p> loyalty , and exceeding client expectations.  Our global network ensures </p>
          <p>top-tier support across all industries, and we pride ourselves </p>
          <p>on crafting memorable, high-impact experiences.</p>
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
       <Fcomponent7/>
      <Fcomponent6/>
      <Fcomponent8/>
      {/* <Fcomponent9/>
      <FComponent10/>
      <Footer/> */}
    </>
  );
}
