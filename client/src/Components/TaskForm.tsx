import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DateTime } from "luxon";
import { useState } from "react";
import { createTask } from "../api/tasks";
import { useUserStore } from "../store/useUserStore";

export function TaskForm() {
  const user = useUserStore((state) => state.user);
  const [formData, setFormData] = useState({
    title: "",
    recurrence: "None",
    description: "",
    startDate: DateTime.now().toFormat("yyyy-MM-dd"),
    endDate: DateTime.now().toFormat("yyyy-MM-dd"),
    dueDate: DateTime.now().toFormat("yyyy-MM-dd"),
    dayOfWeek: DateTime.now().weekdayShort,
    dayOfMonth: DateTime.now().day,
    createdBy: user.username,
    completed: false,
    assignedTo: [user.name],
    priority: "LOW" as "HIGH" | "MEDIUM" | "LOW",
  });
  const users = ["Pam", "Josh", "Lincoln"]; //Get it from state, group members
  const recurrenceOptions = ["None", "Daily", "Weekly", "Monthly"];
  const priorityOptions = ["HIGH", "MEDIUM", "LOW"];
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      lastModified: new Date(),
    }));
  };

  const handleAssignToChange = (value: string[]) => {
    setFormData((prev) => ({
      ...prev,
      assignedTo: value,
    }));
  };

  const handlePriorityChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      priority: value as "HIGH" | "MEDIUM" | "LOW",
    }));
  };

  const handleCreateTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newTaskId = await createTask({
        ...formData,
        createdTimestamp: new Date(),
        lastModified: new Date(),
        dayOfMonth: Number(formData.dayOfMonth),
      });
      console.log("Task id created:", newTaskId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        margin: "10px 30px",
        marginBottom: "50px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
      component="form"
      onSubmit={(e) => handleCreateTask(e)}
    >
      <Typography variant="h6" sx={{ padding: 2, alignSelf: "center" }}>
        Add New Task
      </Typography>
      <TextField
        required
        id="title"
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
      />
      <TextField
        id="description"
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />
      <FormControl>
        <InputLabel id="recurrence-label">Recurrence</InputLabel>
        <Select
          labelId="recurrence-label"
          id="recurrence"
          name="recurrence"
          value={formData.recurrence}
          input={<OutlinedInput label="Recurrence" />}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              recurrence: e.target.value,
            }))
          }
        >
          {recurrenceOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {formData.recurrence !== "None" && (
        <>
          <TextField
            required
            id="start-date"
            label="Start Date"
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
          <TextField
            required
            id="end-date"
            label="End Date"
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />
        </>
      )}
      {formData.recurrence === "None" && (
        <TextField
          required
          id="due-date"
          label="Due Date"
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />
      )}
      {formData.recurrence === "Weekly" && (
        <FormControl component="fieldset">
          <FormLabel component="legend">Day of week</FormLabel>
          <RadioGroup
            value={formData.dayOfWeek}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                dayOfWeek: e.target.value,
                lastModified: new Date(),
              }));
            }}
            row
          >
            {daysOfWeek.map((day) => (
              <FormControlLabel
                key={day}
                value={day}
                control={<Radio />}
                label={day}
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}
      {formData.recurrence === "Monthly" && (
        <TextField
          required
          id="day-of-month"
          label="Day of Month"
          type="number"
          name="dayOfMonth"
          value={formData.dayOfMonth}
          onChange={handleChange}
          slotProps={{
            input: {
              inputProps: {
                min: 1,
                max: 30,
              },
            },
          }}
        />
      )}
      <FormControl>
        <InputLabel id="assign-to-label">Assign To</InputLabel>
        <Select
          labelId="assign-to-label"
          id="assign-to"
          multiple
          value={formData.assignedTo}
          onChange={(e) => handleAssignToChange(e.target.value as string[])}
          input={<OutlinedInput label="Assign To" />}
        >
          {users.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="priority-label">Priority</InputLabel>
        <Select
          labelId="priority-label"
          id="priority"
          value={formData.priority}
          onChange={(e) => handlePriorityChange(e.target.value)}
          input={<OutlinedInput label="Priority" />}
        >
          {priorityOptions.map((priority) => (
            <MenuItem key={priority} value={priority}>
              {priority}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        type="submit"
        variant="contained"
        sx={{ marginTop: "20px", width: "40%", alignSelf: "center" }}
      >
        Create Task
      </Button>
    </Box>
  );
}
