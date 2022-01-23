import React, { Component } from "react";
import Marquee from "react-fast-marquee";
import Raccoon1 from '../../assets/raccoon_1.png';
import Raccoon2 from '../../assets/raccoon_2.png';
import Raccoon3 from '../../assets/raccoon_3.png';
import Raccoon4 from '../../assets/raccoon_4.png';
import Raccoon5 from '../../assets/raccoon_5.png';
import Raccoon6 from '../../assets/raccoon_6.png';




const RACCOONS = [
    <div className="w-3/6 sm:w-3/6 sm:h-3/6 md:w-5/6 lg:w-11/12 xl:w-full pr-12">
        <img className="rounded-full object-cover h-350-px  sm:h-20 sm:w-40 md:h-28 md:w-32 lg:h-48 lg:w-52	" src={Raccoon1}></img>
    </div>,
    <div className="w-3/6 sm:w-3/6 md:w-5/6 lg:w-11/12 xl:w-full pr-12">
        <img className="rounded-full object-cover h-350-px  sm:h-20 sm:w-40 md:h-28 md:w-32  lg:h-48 lg:w-52" src={Raccoon2}></img>
    </div>,
    <div className="w-3/6 sm:w-3/6 md:w-5/6 lg:w-11/12 xl:w-full pr-12">
        <img className="rounded-full object-cover h-350-px sm:h-20 sm:w-40 md:h-28 md:w-32 lg:h-48 lg:w-52" src={Raccoon3}></img>
    </div>,
    <div className="w-3/6 sm:w-3/6 md:w-5/6 lg:w-11/12 xl:w-full pr-12">
        <img className="rounded-full object-cover h-350-px sm:h-20 sm:w-40 md:h-28 md:w-32 lg:h-48 lg:w-52" src={Raccoon4}></img>
    </div>,
    <div className="w-3/6 sm:w-3/6 md:w-5/6 lg:w-11/12 xl:w-full pr-12">
        <img className="rounded-full object-cover h-350-px sm:h-20 sm:w-40 md:h-28 md:w-32 lg:h-48 lg:w-52" src={Raccoon5}></img>
    </div>,
    <div className="w-3/6 sm:w-3/6 md:w-5/6 lg:w-11/12 xl:w-full pr-12 ">
        <img className="rounded-full object-cover h-350-px sm:h-20 sm:w-40 md:h-28 md:w-32 lg:h-48 lg:w-52" src={Raccoon6}></img>
    </div>
]

export default class AutoPlay extends Component {
  render() {
    return (
      <div className="relative py-20">
        <Marquee gradient={false} speed={60}>
            {[...RACCOONS, ...RACCOONS].map((comp, index) => (
            <div key={index}>{comp}</div>
            ))}
        </Marquee>
      </div>
    );
  }
}