export interface StageProps<T> {
  title: string;
  value?: T;
  onChange?: (data: T) => void;
}
