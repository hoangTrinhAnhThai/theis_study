export type ContentType = {
  id: number;
  title: string;
  items: ItemType[];
  content?: string;
}

type ItemType = {
  id: number;
  title: string;
  content: string;
}
