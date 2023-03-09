import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";
import authRoutes from "./routes/route-auth.js"
import routeRecipe from "./routes/route-recipe.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(bodyParser.json({limit: "30mb", extended:true}))
app.use(bodyParser.urlencoded({limit: "30mb"}))

//Routes
app.use("/auth", authRoutes);
// app.use("/community",recipeRoutes )
app.use(routeRecipe);

// Mongoose
const PORT = process.env.PORT || 6001 // for backup
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
}).catch((error) => console.log(`${error} did not connect`));