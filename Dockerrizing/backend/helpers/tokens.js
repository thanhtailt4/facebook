const jwt = require("jsonwebtoken");

exports.generateToken = (payload, expired) => {
  return jwt.sign(payload, "u(n60qq^#N9pi^neyZdo5[u$S0_GyB>}5YjxEvH2u*9oG-NE@3:wdPv)gBZmPdz", {
    expiresIn: expired,
  });
};
