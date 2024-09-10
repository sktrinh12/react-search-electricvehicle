export type Car = {
  id: string;
  brand: string;
  model: string;
  price: number;
  usable_battery: number;
  real_range: number;
  efficiency: number;
  acceleration: number;
  top_speed: number;
  year: number;
  image: string;
};

export type CarCardProps = {
  result: Car;
};
