import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { Select, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
    minWidth: 220,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect(props) {
  const classes = useStyles();

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">{props.name}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.value ? props.value : ""}
          onOpen={(event) => props.handleOpen(event)}
          onChange={(event) => props.handleChange(event.target.value)}
        >
          {props.items.map((item, index) => {
            return (
              <MenuItem key={item.id} value={item}>
                {item.label}
              </MenuItem>
            );
          })}
          {props.isLoading && (
            <MenuItem>
              <CircularProgress size={30} />
            </MenuItem>
          )}
        </Select>
      </FormControl>
    </div>
  );
}
