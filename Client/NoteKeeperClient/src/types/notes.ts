import type { Tags } from "./Tag";

export interface Notes {
  id: string;
  title: string;
  description: string;
  createdDate: string;
  updatedDate: string;
  isArchived: boolean;
  tags:Tags[]
}

export interface AddNote {
  title: string;
  description: string;
  isArchived: boolean;
  tagName: string[];
}
