const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) =>
{  
  const token = req.headers.authorization;

  if (!token) return res.sendStatus(401);
  

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedPayload) =>
    {
      if (err) return res.sendStatus(403);

      req.user = decodedPayload;
      next();
    }
  );
};

