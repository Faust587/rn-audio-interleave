import { useWindowDimensions } from "react-native";

export const useScreenWidth = () => {
  const { width } = useWindowDimensions();
  return width;
};
