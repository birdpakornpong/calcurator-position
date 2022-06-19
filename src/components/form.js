import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import styles from "./form.css";
import { textAlign } from "@mui/system";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.binance.com/en">
        Banance
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Form() {
  // State
  const [newPositionProfitPercent, setNewPositionProfitPercent] = useState(0);
  const [newPositionLossPercent, setNewPositionLossPercent] = useState(0);
  const [newPositionProfitDollar, setNewPositionProfitDollar] = useState(0);
  const [newPositionLossDollar, setNewPositionLossDollar] = useState(0);
  const [profitPercent, setProfitPercent] = useState(0);
  const [profitDollar, setProfitDollar] = useState(0);
  const [lossPercent, setLossPercent] = useState(0);
  const [lossDollar, setLossDollar] = useState(0);
  const [type, setType] = useState(0);
  // Function
  const findDifferencePositionPercent = (position, percent, multiplyRate) => {
    let differencePosition =
      (Number(position) * percent) / (multiplyRate * 100);
    return Number(differencePosition);
  };

  const findDifferancePositionDollar = (
    position,
    dollar,
    multiplyRate,
    cost
  ) => {
    let differencePosition =
      (Number(dollar) * Number(position)) /
      (Number(cost) * Number(multiplyRate));
    return Number(differencePosition);
  };

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const calcuratorByTypeProfit = (position, dif) => {
    let newPosition;
    if (type == 1) {
      newPosition = Number(position) - Number(dif);
    } else {
      newPosition = Number(position) + Number(dif);
    }

    return newPosition;
  };

  const calcuratorByTypeLoss = (position, dif) => {
    let newPosition;
    if (type == 1) {
      newPosition = Number(position) + Number(dif);
    } else {
      newPosition = Number(position) - Number(dif);
    }

    return newPosition;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let lengthNumberPosition = data.get("position").length;
    setProfitPercent(data.get("profitPercent"));
    setProfitDollar(data.get("profitDollar"));
    setLossPercent(data.get("lossPercent"));
    setLossDollar(data.get("lossDollar"));

    if (data.get("profitPercent")) {
      const dif = findDifferencePositionPercent(
        data.get("position"),
        data.get("profitPercent"),
        data.get("multiplyRate")
      );
      let result = calcuratorByTypeProfit(data.get("position"), dif);
      setNewPositionProfitPercent(result.toFixed(lengthNumberPosition - 2));
    }
    if (data.get("lossPercent")) {
      const dif = findDifferencePositionPercent(
        data.get("position"),
        data.get("lossPercent"),
        data.get("multiplyRate")
      );
      let result = calcuratorByTypeLoss(data.get("position"), dif);
      setNewPositionLossPercent(result.toFixed(lengthNumberPosition - 2));
    }
    if (data.get("cost") && data.get("profitDollar")) {
      const dif = findDifferancePositionDollar(
        data.get("position"),
        data.get("profitDollar"),
        data.get("multiplyRate"),
        data.get("cost")
      );
      let result = calcuratorByTypeProfit(data.get("position"), dif);
      setNewPositionProfitDollar(result.toFixed(lengthNumberPosition - 2));
    }
    if (data.get("cost") && data.get("lossDollar")) {
      const dif = findDifferancePositionDollar(
        data.get("position"),
        data.get("lossDollar"),
        data.get("multiplyRate"),
        data.get("cost")
      );
      let result = calcuratorByTypeLoss(data.get("position"), dif);
      setNewPositionLossDollar(result.toFixed(lengthNumberPosition - 2));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Typography component="h1" variant="h5">
            Calcurator Position
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="position"
                  label="ราคาเข้า"
                  name="position"
                  autoComplete="position"
                  autoFocus
                />
              </Grid>
              <Grid item xs={6} style={{ textAlign: "left" }}>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    label="Type"
                    onChange={handleChangeType}
                  >
                    <MenuItem value={0}>Long</MenuItem>
                    <MenuItem value={1}>Short</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="multiplyRate"
                  label="อัตราคูณ"
                  //   type="password"
                  id="multiplyRate"
                  autoComplete="multiplyRate"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  name="cost"
                  label="ต้นทุน $"
                  //   type="password"
                  id="cost"
                  autoComplete="cost"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="profitPercent"
                  label="กำไร %"
                  name="profitPercent"
                  autoComplete="profitPercent"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="lossPercent"
                  label="ขาดทุน %"
                  name="lossPercent"
                  autoComplete="lossPercent"
                  //   autoFocus
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  name="profitDollar"
                  label="กำไร $"
                  //   type="password"
                  id="profitDollar"
                  autoComplete="profitDollar"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  name="lossDollar"
                  label="ขาดทุน $"
                  //   type="password"
                  id="lossDollar"
                  autoComplete="lossDollar"
                />
              </Grid>
            </Grid>

            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ยืนยัน
            </Button>
          </Box>
        </Box>
        {newPositionProfitPercent ? (
          <p>
            <b>
              ต้องการกำไร <font color="green">{profitPercent} %</font> ขายที่{" "}
              <font color="green">{newPositionProfitPercent}</font>
            </b>
          </p>
        ) : (
          ""
        )}
        {newPositionProfitDollar ? (
          <p>
            <b>
              ต้องการกำไร <font color="green">{profitDollar} $</font> ขายที่{" "}
              <font color="green">{newPositionProfitDollar}</font>
            </b>
          </p>
        ) : (
          ""
        )}
        {newPositionLossPercent ? (
          <p>
            <b>
              {" "}
              ขาดทุน <font color="red">{lossPercent} %</font>ขายที่{" "}
              <font color="red">{newPositionLossPercent}</font>
            </b>
          </p>
        ) : (
          ""
        )}
        {newPositionLossDollar ? (
          <p>
            <b>
              ขาดทุน <font color="red">{lossDollar} $</font> ขายที่{" "}
              <font color="red">{newPositionLossDollar}</font>
            </b>
          </p>
        ) : (
          ""
        )}
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
