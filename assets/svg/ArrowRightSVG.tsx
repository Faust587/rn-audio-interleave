import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';

function ArrowRightSVG() {
  return (
    <Svg width={22} height={22} viewBox="0 0 21 22" fill="none">
      <G
        clipPath="url(#clip0_166_239)"
        fill="#1B1B1B"
        stroke="#1B1B1B"
        strokeWidth={1.72793}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M11.303 16.842l7.775-6.048-7.775-6.048v12.096zM1.8 16.842l7.775-6.048-7.776-6.048v12.096z" />
      </G>
      <Defs>
        <ClipPath id="clip0_166_239">
          <Path
            fill="#fff"
            transform="translate(.071 .427)"
            d="M0 0H20.7352V20.7352H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default ArrowRightSVG;
