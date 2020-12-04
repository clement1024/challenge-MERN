import React from "react";
import { User } from './Crud';
import ListCard from "./ListCard";

interface DataListsProps{
  removeData: Function,
  handleUpdate: Function,
  lists: User[]
}
const DataLists:React.FC<DataListsProps> = props => {
  const { lists, removeData, handleUpdate } = props;
  return (
    <div>
      {lists.map(data => {
        return (
          <ListCard
            key={data.Id}
            Id={data.Id}
            Name={data.Name}
            Occupation={data.Occupation}
            Description={data.Description}
            removeData={removeData}
            handleUpdate={handleUpdate}
          />
        );
      })}
    </div>
  );
};

export default DataLists;
