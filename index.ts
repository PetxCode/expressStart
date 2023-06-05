import express, { Application, Response, Request } from "express";
import crypto from "crypto";
import axios from "axios";

interface iData {
  name?: string;
  price?: number;
  id?: string;
}

const dataSet: iData[] = [];
const port: number = 3344;
const app: Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response): Response => {
  try {
    return res.status(200).json({
      message: "reading data",
      data: dataSet,
    });
  } catch (error) {
    throw error;
  }
});

app.post("/create", (req: Request, res: Response): Response => {
  try {
    //grabbing/collecting|";"  rom the request body
    const { name, price } = req.body;

    const ID = dataSet.length + 1;

    const newID = crypto.randomUUID();
    const newID2 = crypto.randomBytes(16).toString("hex");

    const newObj = {
      id: newID,
      name,
      price,
    };
    dataSet.push(newObj);

    return res.status(201).json({
      message: "creating data",
      data: newObj,
    });
  } catch (error) {
    throw error;
  }
});

app.get("/:id", (req: Request, res: Response): Response => {
  try {
    const { id } = req.params;

    let readData = dataSet.filter((el: iData) => {
      return el.id === id;
    });

    return res.status(201).json({
      message: "getting single data",
      data: readData,
    });
  } catch (error) {
    throw error;
  }
});

app.get("/api/github", async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const url = `https://api.github.com/users/${name}`;

    let myData = await axios.get(url).then((res) => {
      // console.log(res);
      return res.data;
    });

    res.status(200).json({ message: "success", data: myData });
  } catch (error) {
    throw error;
  }
});

app.get("/api/weather", async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const APIKEY = "5c19a6e23f573c848cbc396ac9e374f5";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${APIKEY}`;

    let myData = await axios.get(url).then((res) => {
      // console.log(res);
      return res.data;
    });

    res.status(200).json({ message: "success", data: myData });
  } catch (error) {
    throw error;
  }
});

app.listen(port, () => {
  console.log("server is on and listeninig to port:", port);
});

// https://i.stack.imgur.com/l60Hf.png
