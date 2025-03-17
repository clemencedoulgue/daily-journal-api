import jwt from 'jsonwebtoken';
import User from '../models/User.js';


export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(404).json({ message: 'User not found' });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};




































// authMiddleware.js
// export const protect = (req, res, next) => {
  // Simple placeholder logic for authentication
//   console.log('Protect middleware running...');

//   next();
// };

// const jwt = require('jsonwebtoken');
// import jwt from 'jsonwebtoken';

// const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
  //   return res.status(401).json({ message: 'Unauthorized' });
  // }

  // const token = authHeader.split(' ')[1];

  // try {
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // req.user = decoded; 

    // Contains user id
//     next();
//   } catch (err) {
//     res.status(401).json({ message: 'Token invalid or expired' });
//   }
// };

// module.exports = authMiddleware;
// export default authMiddleware;
