// import React from 'react';

// import {
//   Accordion,
//   AccordionDetails,
//   AccordionSummary,
//   Typography,
//   makeStyles,
// } from '@material-ui/core';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// import styles from './Details.module.scss';

// import PropTypes from 'prop-types';

// const useStyles = makeStyles({
//   root: {
//     fontWeight: 'bold',
//   },
// });

// const Details = ({ heading, paragraphs, lists }) => {
//   const classes = useStyles();
//   const [expanded, setExpanded] = React.useState(false);

//   const handleChange = (panel) => (event, isExpanded) => {
//     setExpanded(isExpanded ? panel : false);
//   };
//   return (
//     <>
//       <Accordion
//         expanded={expanded === `panel--${heading}`}
//         onChange={handleChange(`panel--${heading}`)}
//       >
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel1bh-content"
//           id="panel1bh-header"
//         >
//           <Typography classes={{ root: classes.root }}>{heading}</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Typography>
//             {paragraphs && paragraphs.map((paragrap) => <p className={styles.Accordion__paragrap}>{paragrap}</p>)}
//             {lists &&
//               lists.map((list) => (
//                 <>
//                   <p className={styles['Accordion__list-tittle']}>{list.tittle}</p>
//                   <ul className={styles.Accordion__list}>
//                     {list.points.map((point) => (
//                       <li>{point}</li>
//                     ))}
//                   </ul>
//                 </>
//               ))}
//           </Typography>
//         </AccordionDetails>
//       </Accordion>
//     </>
//   );
// };

// Details.propTypes = {
//   heading: PropTypes.string.isRequired,
//   paragraphs: PropTypes.array.isRequired,
//   lists: PropTypes.object.isRequired,
// };

// export default Details;
