export interface ICompanyModel {
    companyId: number;
    companyName: string;
    companyAddress: string;
    companyEmail: string;
    companyPhone1: string;
    companyPhone2: string;
    companyAbn: string;
    companyAcn: string;
}

export interface IProductModel {
    productId: number;
    productDesc: string;
    productMaker: string;
}

export interface IContactModel {
    contactId: number;
    contactName: string;
    contactEmail: string;
    contactPhone1: string;
    contactPhone2: string;
    companyId: number;
    companyName: string;
}

export interface ICompanySelectModel {
    companyId: number;
    companyName: string;
}