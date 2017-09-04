export interface Stallion {
  $key: string;
  name: string;
  description: string;
  short?: string;
  height?: string;
  color?: string;
  breed_by?: string;
  stud_fees?: string;
  birth?: string;
  studbooks?: Studbook[];
  images: Image;
  owner: string;
  location: Location;
}

export interface Image {
  large: string;
  small?: string;
  midi?: string[];
}

export interface Studbook {
  alias: string;
  name: string;
}

export interface Owner {
  $key: string;
  stable: string;
  name: string;
  address: string;
  pc: string;
  city: string;
  email?: string;
  website?: string;
  facebook?: string;
  stallions: { name: string, alias: string }[];
}

export interface Location {
  lat: number;
  lon: number;
  description: string;
}
