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
  model_type: string;
};

export type CarCardProps = {
  result: Car;
};

export interface CartItem {
  id: number;
  name: string;
  image: string;
  model: string;
  price: number;
  quantity: number;
}
