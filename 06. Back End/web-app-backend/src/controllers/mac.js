// Import mac module
import macaddress from "macaddress";

export const getMac = (req, res, next) => {
  console.log("Getting MAC Address");

  macaddress.one((err, mac) => {
    if (err) {
      console.error("Error fetching MAC address:", err);
      return res.status(500).json({ error: "Unable to retrieve MAC address" });
    }

    console.log(`MAC Address: ${mac}`);
    res.status(201).json(mac);
  });
};
