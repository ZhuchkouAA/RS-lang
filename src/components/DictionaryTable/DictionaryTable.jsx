import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
} from '@material-ui/core';

import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import DeleteIcon from '@material-ui/icons/Delete';
import RestorePageIcon from '@material-ui/icons/RestorePage';

import IconMini from '../IconMini';
import WordDifficultyIndicator from '../WordDifficultyIndicator';

import { TABLE_PAGE_SIZE, DICTIONARY_PAGINATION } from '../../constants/dictionary';
import WORD_HANDLER_KEYS from '../../constants/keys';
import URLS from '../../constants/APIUrls';

import styles from './DictionaryTable.module.scss';

const useStylesPagination = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions({ count, page, rowsPerPage, onChangePage }) {
  const classes = useStylesPagination();
  const theme = useTheme();

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStylesTable = makeStyles(() => ({
  table: {
    minWidth: 320,
  },
}));

const DictionaryTable = ({ words, type, updateWordServerState, settings }) => {
  const { isTextMeaningShow, isTextExampleShow, isTranscriptionShow } = settings;
  const classes = useStylesTable();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(TABLE_PAGE_SIZE);

  const cntWords = words && words.length ? words.length : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlerClickRestoreWord = (word, wordKey) => {
    const onlyWords = words.map(({ optional: { word: text } }) => text);
    const wordIndex = onlyWords.indexOf(word);
    const wordOption = [{ key: wordKey, value: false }];

    updateWordServerState(words[wordIndex], wordOption);
  };

  let tableCells;

  if (cntWords > 0) {
    tableCells = (rowsPerPage > 0
      ? words.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : words
    ).map(
      ({
        difficulty,
        optional: { word, transcription, wordTranslate, audio, textMeaning, textExample },
      }) => {
        const audioUrl = `${URLS.ASSETS}${audio}`;

        return (
          <TableRow hover key={word}>
            <TableCell>
              <IconMini srcUrl={audioUrl} />
            </TableCell>
            <TableCell>
              <WordDifficultyIndicator difficulty={difficulty} />
            </TableCell>
            <TableCell>{word}</TableCell>
            {isTranscriptionShow && <TableCell>{transcription}</TableCell>}
            <TableCell>{wordTranslate}</TableCell>
            {isTextMeaningShow && <TableCell>{textMeaning.replace(/<.?[i,b]>/g, '')}</TableCell>}
            {isTextExampleShow && <TableCell>{textExample.replace(/<.?[i,b]>/g, '')}</TableCell>}
            {type === 'deleted' && (
              <TableCell>
                <Tooltip title="Восстановить слово для изучения" enterDelay={500}>
                  <IconButton
                    aria-label="restore"
                    onClick={() => handlerClickRestoreWord(word, WORD_HANDLER_KEYS.isDeleted)}
                  >
                    <RestorePageIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            )}
            {type === 'hard' && (
              <TableCell>
                <Tooltip title="Удалить из сложных" enterDelay={500}>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handlerClickRestoreWord(word, WORD_HANDLER_KEYS.isHard)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            )}
          </TableRow>
        );
      }
    );
  } else {
    tableCells = (
      <TableRow>
        <TableCell component="th" scope="row" align="center">
          Список слов пуст.
        </TableCell>
      </TableRow>
    );
  }

  const columns = [' ', 'Уровень', 'Слово'];

  if (isTranscriptionShow) {
    columns.push('Транскрипция');
  }

  columns.push('Перевод');

  if (isTextMeaningShow) {
    columns.push('Значение слова');
  }

  if (isTextExampleShow) {
    columns.push('Пример использования');
  }

  if (type === 'hard' || type === 'deleted') {
    columns.push(' ');
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={styles.DictionaryTable}>
        <Table className={classes.table} size="small" aria-label="custom pagination table">
          {cntWords !== 0 && (
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column}>{column}</TableCell>
                ))}
              </TableRow>
            </TableHead>
          )}
          <TableBody>{tableCells}</TableBody>
        </Table>
      </TableContainer>
      {cntWords !== 0 && (
        <TablePagination
          rowsPerPageOptions={DICTIONARY_PAGINATION}
          component="div"
          colSpan={1}
          count={cntWords}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: { 'aria-label': 'Слов на странице' },
            native: true,
          }}
          labelRowsPerPage="Слов на странице: "
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      )}
    </Paper>
  );
};

DictionaryTable.defaultProps = {
  updateWordServerState: () => {},
};

DictionaryTable.propTypes = {
  words: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string.isRequired,
  updateWordServerState: PropTypes.func,
  settings: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DictionaryTable;
