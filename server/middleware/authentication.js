const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const authHeader = req.header('Authorization');


  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }




  // const token = req.header('Authorization')?.split(' ')[1];
  // if (!token) {
  //   return res.status(401).json({ error: 'No token provided' });
  // }

  // try {
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //   req.userId = decoded.userId;
  //   next();
  // } catch (error) {
  //   res.status(401).json({ error: 'Invalid token' });
  // }
};

module.exports = authenticateUser;