module.exports = (req, res, next) => {
  const { email, password, name, regNo, addressNo, street1, street2, city, district, fname, lname, nic, age, gender, registration_code } = req.body;

  function validEmail(userEmail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  // Validate PMC registration
  if (req.path === "/register") {
      if (![email, password, name, regNo, addressNo, street1, city, district].every(Boolean)) {
          return res.status(401).json("Missing Credentials");
      } else if (!validEmail(email)) {
          return res.status(401).json("Invalid Email");
      }
  } 
  
  // Validate user login
  else if (req.path === "/login") {
      if (![email, password].every(Boolean)) {
          return res.status(401).json("Missing Credentials");
      } else if (!validEmail(email)) {
          return res.status(403).json("Invalid Email");
      }
  }

  // Validate warden registration
  else if (req.path === "/registerWarden") {
      if (![fname, lname, nic, age, gender, registration_code].every(Boolean)) {
          return res.status(401).json("Missing Warden Details");
      }
  }

  next();
};
