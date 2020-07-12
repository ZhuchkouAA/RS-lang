import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Tab, Paper, AppBar, Fab, Tooltip } from '@material-ui/core';
import { TabPanel, TabContext, TabList } from '@material-ui/lab';
import RepeatIcon from '@material-ui/icons/Repeat';

import { makeStyles } from '@material-ui/core/styles';

import PATH from '../../constants/path';
import DictionaryTable from '../../components/DictionaryTable';
import wordHandler from '../../helpers/games-utils/wordHandler';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    alignSelf: 'normal',
    width: 'inherit',
  },

  flexContainer: {
    justifyContent: 'center',
  },
});

const DictionaryPage = ({
  learningWordsQueue,
  hardWordsQueue,
  deletedWordsQueue,
  finallySendWordAndProgress,
  serverSynchronization,
  setPrevPageAsDictionary,
}) => {
  const history = useHistory();
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState('1');

  const countHardWords = hardWordsQueue.length;

  useEffect(() => {
    serverSynchronization();
  }, []);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const updateWordServerState = async (word, option) => {
    const updatedWord = wordHandler(word, option);

    finallySendWordAndProgress(updatedWord);
  };

  const handlerClickTrainHard = () => {
    setPrevPageAsDictionary();

    history.push(PATH.WORD_CARD);
  };

  if (!learningWordsQueue || !hardWordsQueue || !deletedWordsQueue) return null;

  return (
    <Paper className={classes.root}>
      <TabContext value={selectedTab}>
        <AppBar position="static" color="transparent">
          <TabList
            onChange={handleChange}
            aria-label="simple tabs example"
            classes={{ flexContainer: classes.flexContainer }}
          >
            <Tab label="Изучаемые слова" value="1" />
            <Tab label="Сложные" value="2" />
            <Tab label="Удаленные" value="3" />
          </TabList>
        </AppBar>
        <TabPanel value="1">
          <DictionaryTable type="learning" words={learningWordsQueue} />
        </TabPanel>
        <TabPanel value="2">
          {countHardWords !== 0 && (
            <Tooltip title="Тренировать сложные" aria-label="add" enterDelay={1000}>
              <Fab onClick={handlerClickTrainHard} type="submit" color="primary" size="small">
                <RepeatIcon />
              </Fab>
            </Tooltip>
          )}
          <DictionaryTable
            type="hard"
            words={hardWordsQueue}
            updateWordServerState={updateWordServerState}
          />
        </TabPanel>
        <TabPanel value="3">
          <DictionaryTable
            type="deleted"
            words={deletedWordsQueue}
            updateWordServerState={updateWordServerState}
          />
        </TabPanel>
      </TabContext>
    </Paper>
  );
};

DictionaryPage.propTypes = {
  learningWordsQueue: PropTypes.arrayOf(PropTypes.object).isRequired,
  hardWordsQueue: PropTypes.arrayOf(PropTypes.object).isRequired,
  deletedWordsQueue: PropTypes.arrayOf(PropTypes.object).isRequired,
  serverSynchronization: PropTypes.func.isRequired,
  finallySendWordAndProgress: PropTypes.func.isRequired,
  setPrevPageAsDictionary: PropTypes.func.isRequired,
};

export default DictionaryPage;
