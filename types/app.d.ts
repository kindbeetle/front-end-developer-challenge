declare namespace NodeJS {
    interface Process {
        browser: boolean;
    }
}

declare interface ILink {
    id: string
    title: string,
    href: string
}

declare interface IArticle {
    id: string
    title: string,
    text: string,
    author: string,
    publishDate: string,
    coverImage: string
}

declare interface IUserProfile {
    firstName: string,
    lastName: string,
    age: number
}

declare interface IUser {
    email: string,
    profile: IUserProfile,
    funds: number
}

declare interface IProduct {
    id: string,
    title: string,
    quantity: number,
    price: number,
    picture: string
}

declare interface ISession {
    id: string,
    funds: number
}

declare interface ICurrencies {
    [key: string]: number
}
