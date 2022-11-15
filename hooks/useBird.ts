import { useState } from "react";

type Id = string;

interface Audio {
  id: Id;
  audio: HTMLAudioElement;
  play: boolean;
}

export const useBird = () => {
  const [audios, setAudios] = useState<Audio[]>([]);
  const [currentBirdPlayingId, setCurrentBirdPlayingId] = useState<string>('');
  const [currentBirdPauseId, setCurrentBirdPauseId] = useState<string>('');

  function findBirdInAudios(id: string) {
    return audios.find((el) => {
      if (el.id === id) {
        return el;
      }

      return false;
    });
  }

  function setPlayButtonValue(id: string) {
    if (findBirdInAudios(id) === undefined) {
      return false;
    }

    if(findBirdInAudios(id) !== undefined) {
      return findBirdInAudios(id)!.play;
    }
  }

  function onClickPlay(id: string, path: string) {
    const checkExistEl = findBirdInAudios(id);

    const newAudios = [...audios];

    if (checkExistEl) {
      for(let i = 0; i < newAudios.length; i++) {
        const audio = newAudios[i];

        if(audio.id === id) {
          const copy = { ...audio };
                copy.play = true;

          newAudios[i] = copy;
          setCurrentBirdPlayingId(audio.id);
        }
      }

      checkExistEl.audio.play();

      setAudios(newAudios);
    } else {
      let newAudio = new Audio(path);
      setAudios([ ...audios, { id: id, audio: newAudio, play: true }]);
      newAudio.play();
      console.log(audios, "play")
    }
  }

  function onClickPause(id: string) {
    findBirdInAudios(id)!.audio.pause();

    let muteAudios = [...audios];

    for (let i = 0; i < muteAudios.length; i++) {
      muteAudios[i].play = false;
    }

    setCurrentBirdPauseId(id);
    setAudios(muteAudios);
  }

  return {
    currentBirdPauseId,
    currentBirdPlayingId,
    setPlayButtonValue,
    onClickPlay,
    onClickPause
  }
};