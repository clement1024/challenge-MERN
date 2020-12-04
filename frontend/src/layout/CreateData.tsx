import React from "react";
import { TextField, Button } from "@material-ui/core";


interface CreateDataProps {
  Id: number,
  Name: string,
  Description: string,
  Occupation: string,
  addData: Function,
  handleChange: Function,
  saveUpdate: Function,
  isEditing: boolean,
};

const CreateData : React.FC<CreateDataProps> = props => {
  const {
    Id,
    Name,
    Occupation,
    Description,
    handleChange,
    addData,
    saveUpdate,
    isEditing
  } = props;

  return (
    <div>
      <form onSubmit={()=>addData()}>
        <TextField
          id="name-id"
          name="Name"
          label="Name"
          onChange={(e)=>handleChange(e)}
          value={Name}
          fullWidth
          required
        />
        <TextField
          id="occupation-id"
          name="Occupation"
          label="Occupation"
          onChange={(e)=>handleChange(e)}
          value={Occupation}
          fullWidth
          required
        />
        <TextField
          id="desc-id"
          name="Description"
          label="Description"
          onChange={(e)=>handleChange(e)}
          value={Description}
          fullWidth
          required
        />
        {isEditing ? (
          <Button
            type="submit"
            variant="outlined"
            onClick={e => saveUpdate(e, Id)}
            fullWidth
          >
            Update
          </Button>
        ) : (
          <Button
            type="submit"
            variant="outlined"
            fullWidth
          >
            Submit
          </Button>
        )}
      </form>
    </div>
  );
};

export default (CreateData);
