import React from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton
} from "@material-ui/core";
import { DeleteOutlined, EditOutlined } from "@material-ui/icons";


interface PropsFromState {
  Id: number,
  Name: string,
  Occupation: string,
  Description: string,
  handleUpdate: Function,
  removeData: Function
}

const ListCard : React.FC<PropsFromState> = props => {
  const {
    Id,
    Name,
    Occupation,
    Description,
    handleUpdate,
    removeData
  } = props;
  return (
    <Card elevation={1}>
      <CardContent>
        <IconButton
          aria-label="Update"
          onClick={e => handleUpdate(e, Id)}
        >
          <EditOutlined />
        </IconButton>
        <IconButton
          aria-label="Delete"
          onClick={() => removeData(Id)}
        >
          <DeleteOutlined />
        </IconButton>
        <Typography variant="h4" >
          {Name}
        </Typography>
        <Typography variant="h6" >
          {Occupation}
        </Typography>
        <Typography variant="body1">
          {Description}
        </Typography>
      </CardContent>
    </Card>
  );
};


export default (ListCard);
