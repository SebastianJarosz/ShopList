import { IPostData } from "../interface/IPostData";

export class ShopListModel implements IPostData{
    id?: number;
    listName?: string;
    listPostions?: Array<ListPostionModel>;
    creationDate?: string;
    lastModficationDate?: string;
    shopPrice?: number;
    status?: string;

    constructor(id: number,
        listName: string,
        listPostions: string,
        creationDate: string,
        lastModficationDate: string,
        shopPrice: number,
        status: string){
            this.id = id;
            this.listName = listName;
            this.listPostions = JSON.parse(listPostions);
            this.creationDate = creationDate;
            this.lastModficationDate = lastModficationDate;
            this.shopPrice = shopPrice
            this.status = status;
        }
}

export class ListPostionModel{
    posName?: string;
    quantity?: number;
    unit?: string;
}