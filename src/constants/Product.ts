export interface Product {
  MenuItemId: number;
  Name: string;
  Image: string;
  Description: string;
  Price: number;
  Type: string;
  CoffeeShopId: number;
  CategoryId: number;
  Quantity: number;
  Note: string;
  CustomizationGroups: CustomizationGroup[];
}

export interface CustomizationGroup {
  CustomizationGroupId: number;
  Name: string;
  Customizations: Customization[];
}

export interface Customization {
  MenuItemCustomizationId: number;
  Name: string;
  Description: string;
  AdditionalCost: number;
  isSelected: boolean;
}

export interface Category {
  CategoryId: number;
  Name: string;
  Image: string;
  Description?: string;
  isSelected: boolean;
}
