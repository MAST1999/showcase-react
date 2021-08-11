export enum Place {
  Iran = "iran",
  US = "us",
  UK = "uk",
  Canada = "canada",
  Japan = "japan",
  Unknown = "unknown",
}

export enum CheckboxValues {
  First = 2,
  Second = 3,
  Third = 5,
}

export enum CheckboxSelection {
  First = CheckboxValues.First,
  FirstAndSecond = CheckboxValues.First * CheckboxValues.Second,
  All = CheckboxValues.First * CheckboxValues.Second * CheckboxValues.Third,
  Second = CheckboxValues.Second,
  SecondAndThird = CheckboxValues.Second * CheckboxValues.Third,
  Third = CheckboxValues.Third,
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
