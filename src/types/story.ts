export enum StoryType {
  IMG = "IMG",
  VID = "VID",
}

export type Story = {
  id: string;
  url: string;
  created: string;
  userId: string;
  type?: StoryType;
};
