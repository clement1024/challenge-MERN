import React, { Component } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles,
  Grid
} from '@material-ui/core';
import CreateData from "./CreateData";
import DataLists from "./DataLists";
import TopBar from "./TopBar";

export interface User {
  Id : number,
  Name : string,
  Occupation : string,
  Description : string,
}
interface MyState {
  dataLists : User[],
  Id : number,
  Name : string,
  Occupation : string,
  Description : string,
  isEditing: boolean,
  isMobileNavOpen : boolean,
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.

class Crud extends React.Component<{}, MyState>  {
  public state : MyState = {
    dataLists: [
      {
        Id: Math.random(),
        Name: "Tony Stark",
        Occupation: "Iron Man",
        Description:
          "SuperHero, PlayBoy, Billionaire, Philanthropist, Genious"
      },
      {
        Id: Math.random(),
        Name: "Steve Rogers",
        Occupation: "Captain America",
        Description: "SuperHero, Captain, Soldier "
      },
      {
        Id: Math.random(),
        Name: "Thor",
        Occupation: "God of Thunder",
        Description: "SuperHero, God, King"
      }
    ],
    Id: 0,
    Name: "",
    Occupation: "",
    Description: "",
    isEditing: false,
    isMobileNavOpen : false,
  };
  constructor(props : any) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.addData = this.addData.bind(this);
    this.reset = this.reset.bind(this);
    this.removeData = this.removeData.bind(this);
    this.saveUpdate = this.saveUpdate.bind(this);
  }

  private handleChange  (e : React.ChangeEvent<HTMLInputElement> ){
    const name = e.target.name;
    if(name === 'Name')
    {
      this.setState({
        Name : e.target.value
      });
    }
    if(name === 'Occupation')
    {
      this.setState({
        Occupation : e.target.value
      });
    }
    if(name === 'Description')
    {
      this.setState({
        Description : e.target.value
      });
    }
  };

  //To add data to the dataList array
  private addData (e : React.ChangeEvent<HTMLInputElement> ) {
    e.preventDefault();
    const { Name, Occupation, Description } = this.state;
    if (!Name || !Occupation || !Description) return;
    let dataLists = [
      ...this.state.dataLists,
      {
        Id: Math.random(),
        Name: this.state.Name,
        Occupation: this.state.Occupation,
        Description: this.state.Description
      }
    ];
    this.setState({
      dataLists
    });
    this.reset();
  };

  //To reset the form fields
  public reset () {
    this.setState({
      Name: "",
      Occupation: "",
      Description: ""
    });
  };

  //To remove the data from the list
  public removeData (Id : number) {
    let dataLists = this.state.dataLists.filter(data => {
      return data.Id !== Id;
    });

    this.setState({
      dataLists
    });
  };

  //To handle the data Update
  public handleUpdate(e : any, Id : number) {
    console.log(Id);
    const index = this.state.dataLists.findIndex(data => {
      return data.Id === Id;
    });
    const data = Object.assign({}, this.state.dataLists[index]);
    this.setState({
      Id: data.Id,
      Name: data.Name,
      Occupation: data.Occupation,
      Description: data.Description,
      isEditing: true
    });
  };

  //To save the updated data
  public saveUpdate (e: any, Id: number) {
    let newData : User[] = [];
    this.state.dataLists.map(data => {
      if (data.Id === Id) {
        newData.push({
          Id: data.Id,
          Name: this.state.Name,
          Occupation: this.state.Occupation,
          Description: this.state.Description
        });
      }
      else
      {
        newData.push(data);
      }
      return data;
    });
    this.setState(
      {
        dataLists: newData,
        isEditing: false
      },
      () => {
        this.reset();
      }
    );
  };

  public render() {
    const {
      dataLists,
      Id,
      Name,
      Occupation,
      Description,
      isEditing,
      isMobileNavOpen
    } = this.state;
    return (
      <Grid container spacing={0}>
        <Grid item={true} lg={12} xs={12} sm={12}>
          <TopBar onMobileNavOpen={() => this.setState({...this.state, isMobileNavOpen: true})} />
        </Grid>
        <Grid item={true} lg={6} md={6} sm={12} xs={12}>
          <CreateData
            Id={Id}
            Name={Name}
            Occupation={Occupation}
            Description={Description}
            addData={this.addData}
            handleChange={this.handleChange}
            saveUpdate={this.saveUpdate}
            isEditing={isEditing}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Hidden lgUp>
            <Drawer
              anchor="right"
              onClose={()=>{this.setState({...this.state, isMobileNavOpen: false})}}
              open={isMobileNavOpen}
              variant="temporary"
            >
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <DataLists
                lists={dataLists}
                removeData={this.removeData}
                handleUpdate={this.handleUpdate}
              />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <CreateData
                Id={Id}
                Name={Name}
                Occupation={Occupation}
                Description={Description}
                addData={this.addData}
                handleChange={this.handleChange}
                saveUpdate={this.saveUpdate}
                isEditing={isEditing}
              />
            </Grid>
          </Drawer>
          </Hidden>
          <Hidden mdDown>
            <Drawer
              anchor="right"
              open
              variant="persistent"
            >
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <DataLists
                  lists={dataLists}
                  removeData={this.removeData}
                  handleUpdate={this.handleUpdate}
                />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <CreateData
                  Id={Id}
                  Name={Name}
                  Occupation={Occupation}
                  Description={Description}
                  addData={this.addData}
                  handleChange={this.handleChange}
                  saveUpdate={this.saveUpdate}
                  isEditing={isEditing}
                />
              </Grid>
            </Drawer>
          </Hidden>
        </Grid>
      </Grid>
    );
  }
}

export default Crud;
