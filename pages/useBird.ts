import { useRef, useState } from "react";

export function useSwitchingPlay(play: boolean, id: string, path: string) {
  const [audios, setAudios] = useState([]);

  function findBirdInAudios(id: string) {
    return audios.find((el) => {
      if (el.id === id) {
        return el;
      }

      return false;
    });
  }

  if (play) {
    const checkExistEl = findBirdInAudios(id);

    const newAudios = [...audios];

    if (checkExistEl) {
      for (let i = 0; i < newAudios.length; i++) {
        const audio = newAudios[i];

        if (audio.id === id) {
          const copy = { ...audio };
          copy.play = true;

          newAudios[i] = copy;
        }
      }

      checkExistEl.audio.play();

      setAudios(newAudios);
    } else {
      let newAudio = new Audio(path);
      setAudios([...audios, { id: id, audio: newAudio, play: true }]);
      newAudio.play();
    }
  } else {
    findBirdInAudios(id).audio.pause();

    let muteAudios = [...audios];

    for (let i = 0; i < muteAudios.length; i++) {
      muteAudios[i].play = false;
    }

    setAudios(muteAudios);
  }

  return audios;
}
