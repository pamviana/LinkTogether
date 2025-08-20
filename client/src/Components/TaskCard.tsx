import { Checkbox, Paper, Typography, Box, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { DateTime } from "luxon";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface TaskCardProps {
  title: string;
  description?: string;
  priority: string;
  completed?: boolean;
  completedBy?: string;
  lastModified?: Date;
  id: string;
  onChange: () => void;
  setOpenTaskDrawer: (open: boolean) => void;
  setTaskId: (id: string) => void;
}

export function TaskCard({
  title,
  description,
  priority,
  completed,
  completedBy,
  lastModified,
  onChange,
  id,
  setOpenTaskDrawer,
  setTaskId,
}: TaskCardProps) {
  const priorityColor = () => {
    if (priority === "HIGH") {
      return "#b31e14";
    }

    if (priority === "MEDIUM") {
      return "#ccac1f";
    }

    if (priority === "LOW") {
      return "#00A8CC";
    }
  };

  const getSubtitle = () => {
    if (completed) {
      let modifiedDate: Date | undefined = undefined;
      if (lastModified) {
        const ts = lastModified as any;
        modifiedDate = new Date(ts._seconds * 1000);
      }
      let dateStr = "";
      if (modifiedDate) {
        dateStr = DateTime.fromJSDate(modifiedDate).toFormat("MM/dd/yyyy");
      }
      return `Completed by ${completedBy} on ${dateStr}`;
    } else {
      return description || "";
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      transition={{ duration: 0.5 }}
    >
      <Paper
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1em",
          borderLeft: `6px solid ${priorityColor()}`,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            variant="body1"
            fontWeight="bold"
            sx={{ textDecoration: completed ? "line-through" : "none" }}
          >
            {title}
          </Typography>
          <Typography variant="body2">{getSubtitle()}</Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Checkbox checked={!!completed} onChange={onChange} />
          <IconButton
            onClick={() => {
              setTaskId(id);
              setOpenTaskDrawer(true);
            }}
          >
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Paper>
    </motion.div>
  );
}
