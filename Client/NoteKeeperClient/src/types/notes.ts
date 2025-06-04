export interface Notes {
  id: string;
  title: string;
  description: string;
  createdDate: string;
  updatedDate: string;
  isArchived:boolean
}

export interface AddNote {
  title: string;
  description: string;
  isArchived:boolean
}