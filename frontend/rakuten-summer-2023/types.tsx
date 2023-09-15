export interface ShopType {
    id: number,
    name: string,
    quantity: number,
    location: string,
    genre: string,
    num_fb: number,
    img_url: string,
}

export interface AverageQuantityType {
    personal: number,
    general: number,
}

export interface UserInfoType {
    userID: string,
    appetite: number,
    averageQuantity: number,
}

export interface QueryType {
    id: number,
    name: string,
    quantity: number,
    location: string,
    genre: string,
    num_fb: number,
    img_url: string,
    opening_time: string,
    explanation: string,
    userID: string,
    appetite: number,
    averageQuantity: number,
}

export interface HistoryType {
    date: String,
    shop_name: String,
    quantity: number,
    feedback: number,
    appetite: number,
}