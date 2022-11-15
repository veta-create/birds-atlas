export type Bird = {
  id: string;
  name: string;
  nameInLatin: string;
  article: string[];
  imagesPaths: string[];
  audioPath: string;
}


export type Audio = {
  id: string,
  audio: string, 
  play: boolean
}