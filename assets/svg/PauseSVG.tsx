import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

function PauseSVG() {
  return (
    <Svg viewBox="0 0 31 31" width={31} height={31}>
      <G data-name="Layer 2">
        <Path
          d="M15 2.5A12.5 12.5 0 1027.5 15 12.514 12.514 0 0015 2.5zm-1.696 16.429a1.25 1.25 0 01-2.5 0V11.07a1.25 1.25 0 012.5 0zm5.892 0a1.25 1.25 0 01-2.5 0V11.07a1.25 1.25 0 012.5 0z"
          fill="#DBA604"
        />
        <Path d="M15 0a15 15 0 1015 15A15.017 15.017 0 0015 0zm0 27.5A12.5 12.5 0 1127.5 15 12.514 12.514 0 0115 27.5z" />
        <Path d="M12.054 9.821a1.25 1.25 0 00-1.25 1.25v7.858a1.25 1.25 0 002.5 0V11.07a1.25 1.25 0 00-1.25-1.25zM17.946 9.821a1.25 1.25 0 00-1.25 1.25v7.858a1.25 1.25 0 002.5 0V11.07a1.25 1.25 0 00-1.25-1.25z" />
      </G>
    </Svg>
  );
}

export default PauseSVG;
