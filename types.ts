export enum GameState {
  WELCOME = 'WELCOME',
  LEVEL_1_QUIZ = 'LEVEL_1_QUIZ',
  LEVEL_2_MEMORY = 'LEVEL_2_MEMORY',
  LEVEL_3_CODE = 'LEVEL_3_CODE',
  FINAL_GIFT = 'FINAL_GIFT',
  ACCEPTED = 'ACCEPTED'
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
}
