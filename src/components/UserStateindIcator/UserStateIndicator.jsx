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
//   Grid,
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
//   tooltipText: {
//     textAlign: 'justify',
//     padding: '10px',
//     opacity: 1,
//     fontSize: '15px',
//     color: 'white',
//   },
//   beforeText: {
//     margin: '10px',
//   },
//   circular: {
//     background: 'red',
//     color: 'red',
//     margin: '1000px',
//   }
// }));

// const CircularProgressWithLabel = (props) => {
//   const { nowValue, maxValue, tittle, hint } = props;
//   const value = (nowValue * 100) / maxValue;

//   const classes = useStyles();

//   const Circular = () => {
//     return (
//       <Grid container direction='row'>
//         <div className={style.BeforeText}>{tittle}</div>
//       <Box position="relative" display="inline-flex">
//         <CircularProgress classes={{ tool: classes.circular }} size="70px" variant="static" value={value} />
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
//       </Grid>
//     );
//   };

//   return (
//     <Tooltip title={hint} classes={{ tooltip: classes.tooltipText }}>
//       <Button className={classes.button}>{Circular()}</Button>
//     </Tooltip>
//   );
// };

// export default CircularProgressWithLabel;

// CircularProgressWithLabel.propTypes = {
//   hint: PropTypes.string.isRequired,
//   tittle: PropTypes.string.isRequired,
//   nowValue: PropTypes.number.isRequired,
//   maxValue: PropTypes.number.isRequired,
// };
