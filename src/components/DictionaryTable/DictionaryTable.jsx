import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
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
import RestorePageIcon from '@material-ui/icons/RestorePage';

import IconMini from '../IconMini';
import DeleteIconButton from '../DeleteIconButton';
import WordDifficultyIndicator from '../WordDifficultyIndicator';
import ModalImage from '../ModalImage';
import TablePaginationActions from './TablePaginationActions';
import TableButtonLink from './TableButtonLink';

import { getHintForCountDaysBeforeNextWordRepeat } from '../../helpers/repeat-logic-utils';
import { TABLE_PAGE_SIZE, DICTIONARY_PAGINATION } from '../../constants/dictionary';
import WORD_HANDLER_KEYS from '../../constants/keys';
import URLS from '../../constants/APIUrls';

import styles from './DictionaryTable.module.scss';

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
  const [wordImage, setWordImage] = useState({ word: '', imageSrc: '', isShow: false });

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

  const handlerClickShowWordImage = (word, imageSrc) => {
    setWordImage({ imageSrc, word, isShow: true });
  };

  let tableCells;

  if (cntWords > 0) {
    tableCells = (rowsPerPage > 0
      ? words.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : words
    ).map(({ difficulty, optional }) => {
      const audioUrl = `${URLS.ASSETS}${optional.audio}`;
      const lastRepeatDate = optional.lastRepeatWordDate
        ? new Date(optional.lastRepeatWordDate).toLocaleDateString('ru')
        : '';
      const nextRepeatDate = optional.repeatDate
        ? new Date(optional.repeatDate).toLocaleDateString('ru')
        : '';
      const leftDaysHint = getHintForCountDaysBeforeNextWordRepeat(optional.repeatDate);
      const cntRepeats = optional.countRepeatsWordAllTime || 0;

      return (
        <TableRow hover key={optional.word}>
          <TableCell>
            <IconMini srcUrl={audioUrl} />
          </TableCell>
          <TableCell>
            <WordDifficultyIndicator difficulty={difficulty} />
          </TableCell>
          <TableCell>{cntRepeats}</TableCell>
          <TableCell>
            <TableButtonLink
              word={optional.word}
              imageSrc={optional.image}
              onClick={handlerClickShowWordImage}
            />
          </TableCell>
          {isTranscriptionShow && <TableCell>{optional.transcription}</TableCell>}
          <TableCell>{optional.wordTranslate}</TableCell>

          {type !== 'deleted' && <TableCell>{lastRepeatDate}</TableCell>}
          {type !== 'deleted' && (
            <TableCell>
              <Tooltip title={leftDaysHint} enterDelay={500}>
                <span>{nextRepeatDate}</span>
              </Tooltip>
            </TableCell>
          )}
          {isTextMeaningShow && (
            <TableCell>{optional.textMeaning.replace(/<.?[i,b]>/g, '')}</TableCell>
          )}
          {isTextExampleShow && (
            <TableCell>{optional.textExample.replace(/<.?[i,b]>/g, '')}</TableCell>
          )}
          {type === 'deleted' && (
            <TableCell>
              <Tooltip title="Восстановить слово для изучения" enterDelay={500}>
                <IconButton
                  aria-label="restore"
                  onClick={() =>
                    handlerClickRestoreWord(optional.word, WORD_HANDLER_KEYS.isDeleted)
                  }
                >
                  <RestorePageIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </TableCell>
          )}
          {type === 'hard' && (
            <TableCell>
              <DeleteIconButton
                handlerClick={handlerClickRestoreWord}
                word={optional.word}
                wordKey={WORD_HANDLER_KEYS.isHard}
              />
            </TableCell>
          )}
        </TableRow>
      );
    });
  } else {
    tableCells = (
      <TableRow>
        <TableCell component="th" scope="row" align="center">
          Список слов пуст.
        </TableCell>
      </TableRow>
    );
  }

  const columns = [' ', 'Уровень', 'Количество повторений слова', 'Слово'];

  if (isTranscriptionShow) {
    columns.push('Транскрипция');
  }

  columns.push('Перевод');

  if (type !== 'deleted') {
    columns.push('Дата последнего повторения', 'Дата следующего повторения');
  }

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
                {columns.map((column, index) => {
                  const key = `DictionaryTable_${column}-${index}`;
                  return <TableCell key={key}>{column}</TableCell>;
                })}
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
      {wordImage.isShow && (
        <ModalImage
          isOpen={wordImage.isShow}
          imageAlt={wordImage.word}
          imageSrc={wordImage.imageSrc}
          callBack={setWordImage}
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
