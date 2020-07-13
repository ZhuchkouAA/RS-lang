import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  makeStyles,
  Paper,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import styles from './Details.module.scss';

const useStyles = makeStyles({
  root: {
    fontWeight: '700',
  },
});

const Details = ({ heading, paragraphs, lists }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Accordion
      expanded={expanded === `panel--${heading}`}
      onChange={handleChange(`panel--${heading}`)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography classes={{ root: classes.root }}>{heading}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Paper>
          {paragraphs &&
            paragraphs.map((paragrap, j) => {
              const keyBody = `Details__${paragrap}-${j}`;

              return (
                <Typography className={styles.Accordion__paragrap} key={keyBody}>
                  {paragrap}
                </Typography>
              );
            })}
          {lists &&
            lists.map((list, index) => {
              const key = `Details__${list.tittle}-${index}`;

              return (
                <div key={key}>
                  <Typography className={styles['Accordion__list-tittle']}>
                    {list.tittle}
                  </Typography>
                  <ul className={styles.Accordion__list}>
                    {list.points.map((point, i) => {
                      const keyLi = `Details__${point}-${i}`;

                      return <li key={keyLi}>{point}</li>;
                    })}
                  </ul>
                </div>
              );
            })}
        </Paper>
      </AccordionDetails>
    </Accordion>
  );
};

Details.propTypes = {
  heading: PropTypes.string.isRequired,
  paragraphs: PropTypes.arrayOf(PropTypes.string).isRequired,
  lists: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Details;
