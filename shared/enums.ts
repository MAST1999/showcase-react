
export enum Place {
  Iran = "iran",
  US = "us",
  UK = "uk",
  Canada = "canada",
  Japan = "japan",
  Unknown = "unknown",
}

export enum Checkbox {
  First = 2,
  Second = 3,
  Third = 5,
}

export enum CheckboxSelection {
  First = Checkbox.First,
  FirstAndSecond = Checkbox.First * Checkbox.Second,
  All = Checkbox.First * Checkbox.Second * Checkbox.Third,
  Second = Checkbox.Second,
  SecondAndThird = Checkbox.Second * Checkbox.Third,
  Third = Checkbox.Third,
  None = 0,
}

export enum Version {
  NotSet,
  One,
  Two,
  Three,
  Four,
  Five,
}

export enum TypeOfFile {
  NotSet,
  NotImportant,
  Image,
  Document,
  Secret,
}