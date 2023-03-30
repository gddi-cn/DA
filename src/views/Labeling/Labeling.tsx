import { Button, Typography } from "@mui/material";
import React from "react";

const Labeling: React.FC = () => {
  return (
    <div
      style={{
        height: "calc(100vh - 50px)",
        backgroundColor: "rgb(241, 245, 249)",
        width: "100%",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: 16,
          alignItems: "center",
        }}
      >
        <Typography variant="h5" component={"h2"}>
          即将上线，敬请期待
        </Typography>
        <Button variant="outlined" href="/">
          返回首页
        </Button>
      </div>
    </div>
  );
};

export default Labeling;
