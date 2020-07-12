import URLS from '../constants/APIUrls';

export const getTrackList = (
  { isAudioMeaningShow, isAudioExampleShow },
  { audio, audioMeaning, audioExample }
) => {
  const res = [`${URLS.ASSETS}${audio}`];

  if (isAudioExampleShow) {
    res.push(`${URLS.ASSETS}${audioExample}`);
  }

  if (isAudioMeaningShow) {
    res.push(`${URLS.ASSETS}${audioMeaning}`);
  }

  return res;
};

export const playTrackList = (trackList, setPlayingStatusEnd) => {
  const player = new Audio();
  const cntTracks = trackList.length;

  let currTrackId = 0;

  player.src = trackList[currTrackId];
  player.autoplay = true;

  player.stop = () => {
    player.pause();
    player.currentTime = 0;
  };

  player.onended = () => {
    currTrackId += 1;
    if (currTrackId === cntTracks) {
      setPlayingStatusEnd();

      return;
    }

    player.src = trackList[currTrackId];
    player.play();
  };

  return player;
};
