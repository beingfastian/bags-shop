import app from './app.js';
import sequelize from './config/database.js';
import { errorHandler } from './middlewares/errorMiddleware.js';
import router from './routes/rootRoute.js';
import { swaggerSpec, swaggerUi } from './swagger.js';
import cors from 'cors';

const PORT = process.env.PORT || 4000;
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(router);

app.use(errorHandler);

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err: any) => {
    console.error('Unable to connect to the database:', err);
  });
