import macaddress from "macaddress";
import getMAC from 'getmac';

const mac = getMAC();

macaddress.one((err, mac) => {
  if (err) {
    console.log(err);
  } else {
    console.log(mac);
  }
});

console.log(mac);