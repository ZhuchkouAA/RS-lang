// import React from 'react';
// import PropTypes from 'prop-types';

// import { Box, Button, Tooltip, Typography, CircularProgress, makeStyles, withStyles } from '@material-ui/core';

// import style from './UserStateIndicator.module.scss';

// const useStyles = makeStyles((theme) => ({
//   button: {
//     margin: theme.spacing(1),
//   },
//   customWidth: {
//     maxWidth: 500,
//   },
//   noMaxWidth: {
//     maxWidth: 'none',
//   },
//   abc: {
//     backgroundColor: 'red',
//   }
// }));

// const CircularProgressWithLabel = (props) => {
//   const { value, hint } = props;
//   const classes = useStyles();

//   const Circular = () => {
//     return (
//       <Box position="relative" display="inline-flex">
//         <CircularProgress variant="static" value={value} />
//         <Box
//           top={0}
//           left={0}
//           bottom={0}
//           right={0}
//           position="absolute"
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//         >
//           <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
//             value
//           )}%`}</Typography>
//         </Box>
//       </Box>
//     );
//   };


//   return (
//     <Tooltip title={hint} classes={{tooltip: classes.abc}}><Button className={classes.button}>{Circular()}</Button></Tooltip>
//   );
// };

// export default CircularProgressWithLabel;

// CircularProgressWithLabel.propTypes = {
//   value: PropTypes.number.isRequired,
// };
