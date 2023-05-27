import React, { useState } from "react";
import Card from "../UI/Card";
import styles from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModal from "./../UI/ErrorModal";

const AppUser = props => {
  const [enterdUsername, setEnteredUsername] = useState("");
  const [enterdAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  const appUserHandler = event => {
    event.preventDefault();
    if (enterdUsername.trim().length === 0 || enterdAge.trim().length === 0) {
      setError({
        title: "Invalid Input",
        message:"Please enter a valid name and age (non-empty values)"
      })
      return;
    }
    if (+enterdAge < 1) {
      setError({
        title: "Invalid Input",
        message: "Please enter a valid age (>0)",
      });
      return;
    }
    // console.log(enterdAge, enterdUsername);
    props.onAddUser(enterdUsername, enterdAge);
    setEnteredUsername("");
    setEnteredAge("");
  };

  const usernameChangeHanler = event => {
    setEnteredUsername(event.target.value);
  };
  const ageChangeHanler = event => {
    setEnteredAge(event.target.value);
  };
  const errorHandler = () => {
    setError(null);
  }
  return (
    <div>
      {error && (
        <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />
      )}
      <Card className={styles.input}>
        <form onSubmit={appUserHandler}>
          <label htmlFor="username">UserName</label>
          <input
            type="text"
            id="username"
            value={enterdUsername}
            onChange={usernameChangeHanler}
          />
          <label htmlFor="age">Age (years)</label>
          <input
            type="number"
            id="age"
            value={enterdAge}
            onChange={ageChangeHanler}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};
export default AppUser;
