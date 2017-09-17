export interface Stallion {
  $key: string;
  $exists: any;
  name: string;
  description: string;
  short?: string;
  height?: string;
  color?: string;
  breed_by?: string;
  stud_fees?: string;
  birth?: string;
  updated?: any;
  studbooks?: Studbook[];
  images: Image;
  owner: Owner;
  location: Location;
  copyright: string;
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
  $exists: any;
  alias: string;
  name: string;
  stable: string;
  address: string;
  pc: string;
  city: string;
  country: string;
  phone: string;
  description?: string;
  email?: string;
  website?: string;
  facebook?: string;
  logo?: string;
  stallions: { name: string, alias: string }[];
  updated?: any;
}

export interface Location {
  lat: number;
  lon: number;
  description: string;
}

export interface KeyValue {
  $key: string;
  value: string;
}

export interface KeyStorageImage {
  $key: string;
  value: StorageImage;
}

export interface StorageImage {
  name: string;
  url: string;
  progress: number;
}
