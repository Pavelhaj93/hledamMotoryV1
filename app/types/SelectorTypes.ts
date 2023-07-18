export enum SelectorType {
  Mark = "Mark",
  Model = "Model",
  EngineType = "EngineType",
}

export interface SelectedFormProps {
  mark: string | null;
  model: string | null;
  engineType: string | null;
}
