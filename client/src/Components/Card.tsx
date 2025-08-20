import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";

type ClickableCardProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
};

export default function ClickableCard({
  onClick,
  title,
  subtitle,
  icon,
}: ClickableCardProps) {
  return (
    <Card>
      <CardActionArea onClick={onClick}>
        <CardContent>
          {icon && (
            <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
              {icon}
            </Box>
          )}
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2">{subtitle}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
