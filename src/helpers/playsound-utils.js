export const getTrackList = (
  { isAudioMeaningShow, isAudioExampleShow },
  { AUDIO, AUDIO_MEANING, AUDIO_EXAMPLE }
) => {
  const res = [AUDIO];
  if (isAudioMeaningShow) {
    res.push(AUDIO_MEANING);
  }
  if (isAudioExampleShow) {
    res.push(AUDIO_EXAMPLE);
  }
  return res;
};

export const playTrackList = (trackList, setPlayingStatusEnd) => {
  const player = new Audio();
  const cntTracks = trackList.length;

  let currTrackId = 0;

  player.src = trackList[currTrackId];
  player.autoplay = true;

  player.onended = () => {
    currTrackId += 1;
    if (currTrackId === cntTracks) {
      setPlayingStatusEnd();

      return;
    }

    player.src = trackList[currTrackId];
    player.play();
  };
};
