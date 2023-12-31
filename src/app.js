import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { __dirname } from './path.js';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'

const app = express();
const PORT = process.env.PORT || 8080;
const connection = mongoose.connect(`mongodb+srv://zoomZK:<w8GlddqHZpfhkYiC>@zoomzk.qq9hh9t.mongodb.net/`)

const swaggerOptions = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: "Documentacion del curso de Backend",
            description: "API Coder Backend"
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}

console.log(__dirname)

const specs = swaggerJSDoc(swaggerOptions)

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', usersRouter);
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);

app.listen(PORT, () => console.log(`Listening on ${PORT}`))
