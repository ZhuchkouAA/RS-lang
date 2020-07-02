// import React from 'react';
// import PropTypes from 'prop-types';

// import {
//   Box,
//   Button,
//   Tooltip,
//   Typography,
//   CircularProgress,
//   makeStyles,
//   withStyles,
// } from '@material-ui/core';

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
//     width: '100px',
//     height: '100px',
//     backgroundColor: 'red',
//     padding: '100px',
//   },
// }));

// const CircularProgressWithLabel = (props) => {
//   const { nowValue, maxValue, hint } = props;
//   const value = (nowValue * 100) / maxValue;
//   const valueText = `${nowValue} / ${maxValue}`;
//   const classes = useStyles();

//   const Circular = () => {
//     return (
//       <Box position="relative" display="inline-flex">
//         <CircularProgress size="90px" variant="static" value={value} />
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
//           <Typography variant="caption" component="div" color="textSecondary">
//             <div className={style.nowValue}>{nowValue}<br/></div>
//             <div className={style.separatorValue}>/<br/></div>
//             <div className={style.maxValue}>{maxValue}</div>
//           </Typography>
//         </Box>
//       </Box>
//     );
//   };

//   return (
//     <Tooltip title={hint} classes={{ tooltip: classes.abc }}>
//       <Button className={classes.button}>{Circular()}</Button>
//     </Tooltip>
//   );
// };

// export default CircularProgressWithLabel;

// CircularProgressWithLabel.propTypes = {
//   hint: PropTypes.string.isRequired,
//   nowValue: PropTypes.number.isRequired,
//   maxValue: PropTypes.number.isRequired,
// };
