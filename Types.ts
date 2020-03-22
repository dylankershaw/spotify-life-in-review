export interface Song {
  master_metadata_album_artist_name: string;
  reason_end: string;
  ts: string;
}

export interface ChartData {
  [date: string]: number;
}