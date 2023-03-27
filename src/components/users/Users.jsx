import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import useStyles from '../posts/styles';
import User from './User';

const Users = () => {
  const classes = useStyles();
  const { isLoading, currentUser, users } = useSelector((state) => state.users);
  const allUsersExceptCurrent = users?.filter((user) => user?._id !== currentUser[0]?._id);
  const [allusers, setAllUsers] = useState(allUsersExceptCurrent);

  useEffect(() => {
    setAllUsers(allUsersExceptCurrent);
  }, [isLoading]);

  if (!allusers.length && !isLoading) return 'No Users Found';

  return (
    isLoading ? <CircularProgress /> : (
      <div>
        <Grid className={classes.mainContainer} container alignItems='stretch' spacing={1}>
          {allusers.map((user) => (
            <Grid key={user._id} item xs={12} sm={6} md={4} lg={3}>
              <User user={user} />
            </Grid>
          ))}
        </Grid>
      </div>
    )
  );
};

export default Users;
