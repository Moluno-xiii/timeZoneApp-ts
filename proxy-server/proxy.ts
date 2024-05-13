// import * as express from "express";
const express = require("express");


import { Request, Response } from "express";

import cors from "cors";
import fetch from "node-fetch";

const app: express.Application = express();

// Enable CORS middleware
app.use(cors());

// Define a route to proxy requests
app.get("/proxy", async (req: Request, res: Response) => {
  const { url } = req.query as { url: string };
  if (!url) {
    return res.status(400).send("Missing URL parameter");
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred while fetching data");
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
