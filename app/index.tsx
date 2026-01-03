import { Redirect } from "expo-router";

const index = () => {
  return <Redirect href={'/calculator'} />;
};

export default index;