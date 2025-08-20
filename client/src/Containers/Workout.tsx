import React from "react";
import ClickableCard from "../Components/Card";

export default function Workout() {
  const [test, setTest] = React.useState("");

  React.useEffect(() => {
    setTest("Hello");
  }, []);

  return (
    <>
      <ClickableCard title={"Full Body"} subtitle={"5 exercises - 20 min"} />
      <ClickableCard title={"Upper/Lower"} subtitle={"5 exercises - 20 min"} />
      <ClickableCard title={"Body Part Split"} subtitle={"5 exercises - 20 min"} />
    </>
  );
}
