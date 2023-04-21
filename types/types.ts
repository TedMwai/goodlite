import {
  Discount,
  ORDER_STATUS,
  OrderItems,
  PAYMENT_STATUS,
  Region,
  User,
  Products as products
} from "@prisma/client";

export type Products = (products & {
  discount: {
    discount: number;
  } | null;
  images: {
    image: string;
  }[];
  category: {
    id: number;
    name: string;
  };
})[];

export type Cart = {
  id: string;
  product: {
    id: number;
    name: string;
    categoryId: number;
    price: number;
    coverImage: string;
    discount: {
      discount: number;
    } | null;
  };
  quantity: number;
  userId: string;
}[];

export type Product = Products[0];

export type accessToken = {
  access_token: string;
  expires_in: string;
};

export type responseBody = {
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResponseCode: string;
  ResponseDescription: string;
  CustomerMessage: string;
};

export type resultBody = {
  Body: {
    stkCallback: {
      MerchantRequestID: string;
      CheckoutRequestID: string;
      ResultCode: number;
      ResultDesc: string;
      CallbackMetadata: {
        Item: [
          {
            Name: string;
            Value: number;
          },
          {
            Name: string;
            Value: string;
          },
          {
            Name: string;
            Value: number;
          },
          {
            Name: string;
            Value: number;
          }
        ];
      };
    };
  };
};

export type OrderDetailsType = {
  id: string;
  userId: string;
  total: number;
  paymentId: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  regionId: number;
  checkoutRequestID: string;
  paymentStatus: PAYMENT_STATUS;
  orderStatus: ORDER_STATUS;
};

export type Orders = (OrderDetailsType & {
  region: Region;
  user: User;
  orderItems: (OrderItems & {
    product: {
      name: string;
      coverImage: string;
      price: number;
      description: string;
      discount: Discount | null;
      productSlug: string;
    };
  })[];
})[];