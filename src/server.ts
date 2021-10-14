import { app } from "./app";

const port = process.env.PORT || 8080;

app.listen(port, () =>
    console.log(`Renfe api listening at port: ${port}`)
);