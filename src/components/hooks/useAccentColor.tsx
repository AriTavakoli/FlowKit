import { useEffect, useState } from "react";

function useAccentColor(retrieveSetting) {
  const [accentColor, setAccentColor] = useState("");

  useEffect(() => {
    const fetchColorValue = async () => {
      const userSettings = await retrieveSetting("accentColor");
      console.log(
        "%cretrievedColor",
        "color: lightblue; font-size: 14px",
        userSettings
      );
      if (userSettings) {
        setAccentColor(userSettings.accentColor);
      }
    };

    fetchColorValue();
  }, [retrieveSetting]);

  return accentColor;
}
