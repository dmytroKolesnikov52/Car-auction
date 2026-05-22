import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: 'cross-origin',
    },
  }),
);

const allowedOrigins = [
  'http://localhost:5173',
  'https://dmytrokolesnikov52.github.io',
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());

const db = await mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
});

// app.use(
//   '/images',
//   express.static('D:/projects/images_for_projects/images_car_auction'),
// );

app.use('/images', express.static('public/images'));

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    message: 'Забагато спроб. Спробуйте пізніше.',
  },
});

function createToken(user) {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    },
  );
}

function authMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: 'Не авторизований',
    });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({
      message: 'Недійсний токен',
    });
  }
}

function adminMiddleware(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      message: 'Немає доступу',
    });
  }

  next();
}

app.post('/api/auth/register', authLimiter, async (req, res) => {
  try {
    const { name, phone, password } = req.body;

    if (!name || !phone || !password) {
      return res.status(400).json({
        message: 'Заповніть всі поля',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: 'Пароль має бути мінімум 6 символів',
      });
    }

    const [existingUsers] = await db.query(
      'SELECT id FROM users WHERE phone = ?',
      [phone],
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        message: 'Користувач вже існує',
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const [result] = await db.query(
      `
      INSERT INTO users (
        name,
        phone,
        password_hash,
        role
      )
      VALUES (?, ?, ?, ?)
    `,
      [name, phone, passwordHash, 'user'],
    );

    const user = {
      id: result.insertId,
      name,
      phone,
      role: 'user',
    };

    const token = createToken(user);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Помилка реєстрації',
    });
  }
});

app.post('/api/auth/login', authLimiter, async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({
        message: 'Введіть номер телефону і пароль',
      });
    }

    const [users] = await db.query('SELECT * FROM users WHERE phone = ?', [
      phone,
    ]);

    const user = users[0];

    if (!user) {
      return res.status(401).json({
        message: 'Невірний логін або пароль',
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      return res.status(401).json({
        message: 'Невірний логін або пароль',
      });
    }

    const token = createToken(user);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Помилка входу',
    });
  }
});

app.get('/api/auth/me', authMiddleware, async (req, res) => {
  try {
    const [users] = await db.query(
      `
      SELECT
        id,
        name,
        phone,
        role
      FROM users
      WHERE id = ?
    `,
      [req.user.id],
    );

    const user = users[0];

    if (!user) {
      return res.status(401).json({
        message: 'Користувача не знайдено',
      });
    }

    res.json({
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Помилка авторизації',
    });
  }
});

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('token');

  res.json({
    success: true,
  });
});

app.get('/api/cars', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM cars');

    res.json(results);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to load cars',
    });
  }
});

app.get('/api/cars/:id/images', async (req, res) => {
  try {
    const carId = req.params.id;

    const [results] = await db.query(
      'SELECT * FROM car_images WHERE car_id = ?',
      [carId],
    );

    res.json(results);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to load images',
    });
  }
});

app.get('/api/cars-with-images', async (req, res) => {
  try {
    const sql = `
      SELECT c.*,
        (
          SELECT JSON_ARRAYAGG(image_url)
          FROM (
            SELECT image_url
            FROM car_images
            WHERE car_id = c.id
            ORDER BY id ASC
            LIMIT 4
          ) AS first_images
        ) AS images
      FROM cars c;
    `;

    const [results] = await db.query(sql);

    results.forEach((car) => {
      if (typeof car.images === 'string') {
        car.images = JSON.parse(car.images);
      }
    });

    res.json(results);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to load cars',
    });
  }
});

app.get('/api/cars/:id/full', async (req, res) => {
  try {
    const id = req.params.id;

    const [carResults] = await db.query('SELECT * FROM cars WHERE id = ?', [
      id,
    ]);

    const car = carResults[0];

    if (!car) {
      return res.status(404).json({
        message: 'Car not found',
      });
    }

    const [imgResults] = await db.query(
      `
      SELECT image_url
      FROM car_images
      WHERE car_id = ?
      ORDER BY id ASC
    `,
      [id],
    );

    car.images = imgResults.map((i) => i.image_url);

    res.json(car);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to load full car',
    });
  }
});

app.patch('/api/cars/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const fields = [];
    const values = [];

    if (req.body.is_bill_started !== undefined) {
      fields.push('is_bill_started = ?');
      values.push(req.body.is_bill_started);
    }

    if (req.body.is_sold !== undefined) {
      fields.push('is_sold = ?');
      values.push(req.body.is_sold);
    }

    if (req.body.current_bill !== undefined) {
      fields.push('current_bill = ?');
      values.push(req.body.current_bill);
    }

    if (req.body.phone_user !== undefined) {
      fields.push('phone_user = ?');
      values.push(req.body.phone_user);
    }

    if (fields.length === 0) {
      return res.status(400).json({
        error: 'No fields to update',
      });
    }

    values.push(id);

    const sql = `
      UPDATE cars
      SET ${fields.join(', ')}
      WHERE id = ?
    `;

    await db.query(sql, values);

    res.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Failed to update car',
    });
  }
});

app.patch('/api/auction/reset-daily', async (req, res) => {
  try {
    await db.query(`
      UPDATE cars
      SET
        is_bill_started = 0,
        is_sold = 0,
        current_bill = 0,
        phone_user = NULL
      WHERE is_auction = 1
    `);

    res.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to reset auctions',
    });
  }
});

app.post('/api/cars', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const {
      title,
      price,
      description,
      brand,
      model,
      year,
      mileage,
      engine_type,
      transmission,
      drive_type,
      seats,
      body_type,
      color,
    } = req.body;

    const [result] = await db.query(
      `
        INSERT INTO cars (
          title,
          price,
          description,
          brand,
          model,
          year,
          mileage,
          engine_type,
          transmission,
          drive_type,
          seats,
          body_type,
          color
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        title,
        price,
        description,
        brand,
        model,
        year,
        mileage,
        engine_type,
        transmission,
        drive_type,
        seats,
        body_type,
        color,
      ],
    );

    res.status(201).json({
      id: result.insertId,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to create car',
    });
  }
});

app.delete(
  '/api/cars/:id',
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const id = req.params.id;

      await db.query('DELETE FROM car_images WHERE car_id = ?', [id]);

      await db.query('DELETE FROM cars WHERE id = ?', [id]);

      res.json({
        success: true,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: 'Failed to delete car',
      });
    }
  },
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
